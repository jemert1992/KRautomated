import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Calendar, Mail, MapPin } from 'lucide-react'

const mockAlerts = [
  {
    id: 1,
    location: 'Miami-Dade',
    type: 'Hurricane Damage',
    severity: 'high',
    time: 'Apr 26, 3:13 pm',
    description: 'Severe wind damage reported'
  },
  {
    id: 2,
    location: 'Broward',
    type: 'Flood Damage',
    severity: 'medium',
    time: 'Jun 21, 3:10 pm',
    description: 'Water damage from heavy rainfall'
  },
  {
    id: 3,
    location: 'Palm Beach',
    type: 'Fire Damage',
    severity: 'high',
    time: 'May 25, 3:13 pm',
    description: 'Residential fire incident'
  },
  {
    id: 4,
    location: 'Monroe',
    type: 'Storm Damage',
    severity: 'low',
    time: 'Apr 31, 3:0 am',
    description: 'Minor storm-related damage'
  }
]

export function Dashboard() {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Real-time insights for South Florida public adjusters</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Real-Time Claim Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Real-Time Claim Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Map Placeholder */}
              <div className="bg-blue-100 rounded-lg p-4 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-blue-800 font-medium">Interactive Map</p>
                  <p className="text-blue-600 text-sm">South Florida Hotspots</p>
                </div>
              </div>
              
              {/* Alert List */}
              <div className="space-y-3">
                {mockAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                    <AlertTriangle className={`h-4 w-4 mt-1 ${
                      alert.severity === 'high' ? 'text-red-500' : 
                      alert.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={
                          alert.severity === 'high' ? 'destructive' : 
                          alert.severity === 'medium' ? 'default' : 'secondary'
                        }>
                          {alert.location}
                        </Badge>
                        <span className="text-xs text-gray-500">{alert.time}</span>
                      </div>
                      <p className="font-medium text-sm">{alert.type}</p>
                      <p className="text-xs text-gray-600">{alert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              <Mail className="mr-2 h-4 w-4" />
              Generate Outreach
            </Button>
            <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Visit
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Claim Prediction Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Claim Prediction Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Heatmap Placeholder */}
            <div className="bg-gradient-to-br from-green-100 to-red-100 rounded-lg p-6 h-48 flex items-center justify-center">
              <div className="text-center">
                <div className="grid grid-cols-5 gap-1 mb-4">
                  {Array.from({ length: 25 }, (_, i) => (
                    <div 
                      key={i} 
                      className={`w-4 h-4 rounded ${
                        i < 5 ? 'bg-green-300' :
                        i < 10 ? 'bg-yellow-300' :
                        i < 15 ? 'bg-orange-300' :
                        i < 20 ? 'bg-red-300' : 'bg-red-500'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm font-medium">Risk Heatmap</p>
                <p className="text-xs text-gray-600">Neighborhood Risk Scores</p>
              </div>
            </div>
            
            {/* Trend Graph Placeholder */}
            <div className="bg-blue-50 rounded-lg p-6 h-48 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4">
                  <svg className="w-32 h-20 mx-auto" viewBox="0 0 100 50">
                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      points="0,40 20,35 40,25 60,30 80,15 100,20"
                    />
                    <polyline
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      points="0,45 20,40 40,35 60,25 80,20 100,15"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium">Trend Analysis</p>
                <p className="text-xs text-gray-600">Claim Volume Predictions</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

