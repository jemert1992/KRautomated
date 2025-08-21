import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, MapPin, Clock, Eye, Bell } from 'lucide-react'

const mockAlerts = [
  {
    id: 1,
    title: 'Hurricane Warning - Miami-Dade County',
    description: 'Category 2 hurricane approaching with sustained winds of 105 mph. Expected landfall in 18 hours.',
    severity: 'critical',
    location: 'Miami-Dade',
    time: '2 hours ago',
    source: 'National Hurricane Center',
    affectedAreas: ['Downtown Miami', 'Miami Beach', 'Coral Gables', 'Homestead'],
    estimatedClaims: '2,500-3,000'
  },
  {
    id: 2,
    title: 'Severe Thunderstorm Warning - Broward County',
    description: 'Severe thunderstorms with hail up to 2 inches and winds up to 70 mph moving through the area.',
    severity: 'high',
    location: 'Broward',
    time: '45 minutes ago',
    source: 'National Weather Service',
    affectedAreas: ['Fort Lauderdale', 'Hollywood', 'Pembroke Pines'],
    estimatedClaims: '800-1,200'
  },
  {
    id: 3,
    title: 'Flood Advisory - Palm Beach County',
    description: 'Heavy rainfall causing street flooding in low-lying areas. 3-5 inches of rain expected.',
    severity: 'medium',
    location: 'Palm Beach',
    time: '1 hour ago',
    source: 'Local Emergency Management',
    affectedAreas: ['West Palm Beach', 'Delray Beach', 'Boynton Beach'],
    estimatedClaims: '400-600'
  },
  {
    id: 4,
    title: 'Wildfire Alert - Everglades Area',
    description: 'Brush fire spreading due to dry conditions and high winds. Evacuation orders issued.',
    severity: 'high',
    location: 'Monroe',
    time: '3 hours ago',
    source: 'Florida Forest Service',
    affectedAreas: ['Homestead', 'Florida City'],
    estimatedClaims: '200-400'
  }
]

const getSeverityColor = (severity) => {
  switch (severity) {
    case 'critical': return 'bg-red-100 text-red-800 border-red-200'
    case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'low': return 'bg-green-100 text-green-800 border-green-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getSeverityIcon = (severity) => {
  const baseClasses = "h-5 w-5"
  switch (severity) {
    case 'critical': return <AlertTriangle className={`${baseClasses} text-red-600`} />
    case 'high': return <AlertTriangle className={`${baseClasses} text-orange-600`} />
    case 'medium': return <AlertTriangle className={`${baseClasses} text-yellow-600`} />
    case 'low': return <AlertTriangle className={`${baseClasses} text-green-600`} />
    default: return <AlertTriangle className={`${baseClasses} text-gray-600`} />
  }
}

export function Alerts() {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Real-Time Alerts</h2>
        <p className="text-gray-600">Monitor emerging disasters and claim opportunities across South Florida</p>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-orange-600">2</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Medium Priority</p>
                <p className="text-2xl font-bold text-yellow-600">1</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Est. Claims</p>
                <p className="text-2xl font-bold text-blue-600">3.9K-5.2K</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert List */}
      <div className="space-y-4">
        {mockAlerts.map((alert) => (
          <Card key={alert.id} className={`border-l-4 ${getSeverityColor(alert.severity)}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getSeverityIcon(alert.severity)}
                  <div>
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {alert.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {alert.time}
                      </div>
                      <Badge variant="outline">{alert.source}</Badge>
                    </div>
                  </div>
                </div>
                <Badge className={getSeverityColor(alert.severity)}>
                  {alert.severity.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-700 mb-4">{alert.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-900 mb-2">Affected Areas</h4>
                  <div className="flex flex-wrap gap-1">
                    {alert.affectedAreas.map((area, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-gray-900 mb-2">Estimated Claims</h4>
                  <p className="text-lg font-semibold text-blue-600">{alert.estimatedClaims}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button size="sm">
                  Generate Leads
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

