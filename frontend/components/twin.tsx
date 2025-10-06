'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Code, Sparkles } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function Twin() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,
                    session_id: sessionId || undefined,
                }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            const data = await response.json();

            if (!sessionId) {
                setSessionId(data.session_id);
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 shadow-xl">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Sparkles className="w-7 h-7 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-900"></div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Fehru&apos;s Digital Twin</h1>
                            <p className="text-slate-300 text-sm flex items-center gap-2 mt-1">
                                <Code className="w-4 h-4" />
                                AI Engineer • Backend Developer • DevOps Specialist
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-slate-50 to-slate-100">
                <div className="max-w-4xl mx-auto">
                    {messages.length === 0 && (
                        <div className="text-center py-12">
                            <div className="inline-flex p-6 bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl mb-6 shadow-sm">
                                <Sparkles className="w-20 h-20 text-emerald-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-3">
                                Hi! I&apos;m Fehru&apos;s AI Twin
                            </h2>
                            <p className="text-slate-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                                I&apos;m an AI representation trained on Fehru Mandala Putra&apos;s professional experience, 
                                projects, and expertise. Ask me anything about his background in AI engineering, 
                                machine learning, backend development, or DevOps.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                                        <Code className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h3 className="font-semibold text-slate-800 mb-2">Technical Expertise</h3>
                                    <p className="text-sm text-slate-600">
                                        PyTorch, TensorFlow, AWS, GCP, Docker, Kubernetes
                                    </p>
                                </div>
                                
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mb-3">
                                        <Bot className="w-5 h-5 text-cyan-600" />
                                    </div>
                                    <h3 className="font-semibold text-slate-800 mb-2">AI Projects</h3>
                                    <p className="text-sm text-slate-600">
                                        NLP, Computer Vision, LLMs, RAG Systems
                                    </p>
                                </div>
                                
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                                        <Sparkles className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <h3 className="font-semibold text-slate-800 mb-2">Experience</h3>
                                    <p className="text-sm text-slate-600">
                                        Aibeecara, GreenTree Capital, G2i Inc
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mt-8 text-sm text-slate-500">
                                Try asking: &quot;Tell me about your experience at Aibeecara&quot; or &quot;What AI projects have you worked on?&quot;
                            </div>
                        </div>
                    )}

                    <div className="space-y-6">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-4 ${
                                    message.role === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                {message.role === 'assistant' && (
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                                            <Sparkles className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                )}

                                <div
                                    className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${
                                        message.role === 'user'
                                            ? 'bg-slate-800 text-white'
                                            : 'bg-white border border-slate-200 text-slate-800'
                                    }`}
                                >
                                    <p className="whitespace-pre-wrap leading-relaxed text-[15px]">
                                        {message.content}
                                    </p>
                                    <p
                                        className={`text-xs mt-2 ${
                                            message.role === 'user' ? 'text-slate-400' : 'text-slate-500'
                                        }`}
                                    >
                                        {message.timestamp.toLocaleTimeString([], { 
                                            hour: '2-digit', 
                                            minute: '2-digit' 
                                        })}
                                    </p>
                                </div>

                                {message.role === 'user' && (
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center shadow-md">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {isLoading && (
                        <div className="flex gap-4 justify-start mt-6">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100" />
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200" />
                                    </div>
                                    <span className="text-sm text-slate-600">Thinking...</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input */}
            <div className="border-t border-slate-200 bg-white p-6 shadow-lg">
                <div className="max-w-4xl mx-auto">
                    <div className="flex gap-3 items-end">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Ask me anything..."
                                className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 bg-white transition-all placeholder-slate-400 text-[15px]"
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim() || isLoading}
                            className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl hover:from-emerald-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="mt-3 text-xs text-slate-500 text-center">
                        Press Enter to send • Shift + Enter for new line
                    </div>
                </div>
            </div>
        </div>
    );
}