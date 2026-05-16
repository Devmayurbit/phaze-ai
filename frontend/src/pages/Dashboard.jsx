import { useState } from 'react'
import GlobalSidebar from '../components/layout/GlobalSidebar'
import DashboardContent from '../components/dashboard/DashboardContent'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <GlobalSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <DashboardContent />
      </main>
    </div>
  )
}
