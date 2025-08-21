import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './components/Dashboard'
import { Alerts } from './components/Alerts'
import { CRM } from './components/CRM'
import { Analytics } from './components/Analytics'
import './App.css'

// Placeholder components for sections not yet implemented
const PlaceholderSection = ({ title, description }) => (
  <div className="flex-1 p-6 bg-gray-50">
    <div className="mb-6">
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
    <div className="bg-white rounded-lg p-8 text-center">
      <p className="text-gray-500">This section is under development</p>
    </div>
  </div>
)

function App() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />
      case 'alerts':
        return <Alerts />
      case 'crm':
        return <CRM />
      case 'analytics':
        return <Analytics />
      case 'tools':
        return <PlaceholderSection title="Tools" description="Claim estimators, damage calculators, and other utilities" />
      case 'knowledge':
        return <PlaceholderSection title="Knowledge Base" description="Florida insurance laws, guides, and best practices" />
      case 'collaboration':
        return <PlaceholderSection title="Collaboration" description="Community forum and team collaboration tools" />
      case 'settings':
        return <PlaceholderSection title="Settings" description="Account settings and preferences" />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      {renderSection()}
    </div>
  )
}

export default App

