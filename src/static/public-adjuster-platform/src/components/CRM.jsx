import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Search, Filter, Calendar, Mail, MessageSquare } from 'lucide-react'

const mockLeads = [
  {
    id: 1,
    name: 'Eleanor Pena',
    contact: '(728) 523-0188',
    claimType: 'Property Damage',
    status: 'new',
    location: 'Miami',
    date: '2024-01-15'
  },
  {
    id: 2,
    name: 'Ariens McCoy',
    contact: '(466) 332-0128',
    claimType: 'Auto',
    status: 'in-progress',
    location: 'Fort Lauderdale',
    date: '2024-01-14'
  },
  {
    id: 3,
    name: 'Dernet Steward',
    contact: '(508) 818-0198',
    claimType: 'Property Damage',
    status: 'in-progress',
    location: 'West Palm Beach',
    date: '2024-01-13'
  },
  {
    id: 4,
    name: 'Jecoo Jones',
    contact: '(216) 321-0148',
    claimType: 'Health',
    status: 'new',
    location: 'Miami Beach',
    date: '2024-01-12'
  },
  {
    id: 5,
    name: 'Theness Wekts',
    contact: '(687) 523-0122',
    claimType: 'Property Damage',
    status: 'closed',
    location: 'Boca Raton',
    date: '2024-01-11'
  }
]

export function CRM() {
  const [selectedLead, setSelectedLead] = useState(null)
  const [outreachType, setOutreachType] = useState('email')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLeads = mockLeads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.contact.includes(searchTerm) ||
    lead.claimType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Client Acquisition & Lead Generation</h2>
        <p className="text-gray-600">Manage leads and generate outreach campaigns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Leads</CardTitle>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search leads..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500 border-b pb-2">
                <div>Name</div>
                <div>Contact</div>
                <div>Claim Type</div>
                <div>Status</div>
              </div>
              
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className={`grid grid-cols-4 gap-4 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedLead?.id === lead.id ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedLead(lead)}
                >
                  <div className="font-medium">{lead.name}</div>
                  <div className="text-gray-600">{lead.contact}</div>
                  <div className="text-gray-600">{lead.claimType}</div>
                  <div>
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Outreach Tools */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Outreach Template</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="outreach"
                  value="email"
                  checked={outreachType === 'email'}
                  onChange={(e) => setOutreachType(e.target.value)}
                  className="text-blue-600"
                />
                <Mail className="h-4 w-4" />
                Email
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="outreach"
                  value="sms"
                  checked={outreachType === 'sms'}
                  onChange={(e) => setOutreachType(e.target.value)}
                  className="text-blue-600"
                />
                <MessageSquare className="h-4 w-4" />
                SMS
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Preview</label>
              <Textarea
                placeholder={
                  selectedLead
                    ? `Hello ${selectedLead.name},\n\nWe would like to offer you assistance with your ${selectedLead.claimType.toLowerCase()} claim. Our team of experienced public adjusters can help ensure you receive the maximum settlement you deserve.\n\nBest regards,\nPublic Adjuster Pro Team`
                    : 'Select a lead to generate a personalized template...'
                }
                rows={6}
                className="resize-none"
                disabled={!selectedLead}
              />
            </div>

            <Button 
              className="w-full bg-yellow-600 hover:bg-yellow-700"
              disabled={!selectedLead}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Visit
            </Button>

            <Button 
              className="w-full"
              disabled={!selectedLead}
            >
              Send {outreachType === 'email' ? 'Email' : 'SMS'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

