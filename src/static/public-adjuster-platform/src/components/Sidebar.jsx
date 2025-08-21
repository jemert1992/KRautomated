import { 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  Users, 
  BookOpen, 
  MessageSquare, 
  TrendingUp,
  Home
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const sidebarItems = [
  { icon: Home, label: 'Dashboard', id: 'dashboard' },
  { icon: AlertTriangle, label: 'Alerts', id: 'alerts' },
  { icon: TrendingUp, label: 'Tools', id: 'tools' },
  { icon: Users, label: 'CRM', id: 'crm' },
  { icon: BookOpen, label: 'Knowledge Base', id: 'knowledge' },
  { icon: MessageSquare, label: 'Collaboration', id: 'collaboration' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

export function Sidebar({ activeSection, onSectionChange }) {
  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold">Public Adjuster Pro</h1>
      </div>
      
      <nav className="flex-1 px-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start mb-2 text-left ${
                activeSection === item.id 
                  ? 'bg-slate-700 text-white' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          )
        })}
      </nav>
    </div>
  )
}

