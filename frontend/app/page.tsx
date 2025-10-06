import Twin from '@/components/twin';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Tech Stack Info Bar */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="font-medium">Built with:</span>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Next.js</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">FastAPI</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">AWS</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">Terraform</span>
              </div>
            </div>
            <div className="text-xs text-slate-500">
              Industrial Grade Digital Twin
            </div>
          </div>
        </div>
      </div>

      {/* Main Twin Component - Full Height */}
      <div className="h-[calc(100vh-60px)]">
        <Twin />
      </div>
    </main>
  );
}