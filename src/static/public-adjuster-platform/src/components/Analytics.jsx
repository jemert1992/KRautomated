import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, DollarSign, Clock, Users, Target } from 'lucide-react'

const mockMetrics = {
  responseTime: { value: '2.3', unit: 'hours', change: -15, trend: 'down' },
  successRate: { value: '87', unit: '%', change: 5, trend: 'up' },
  revenue: { value: '$124,500', unit: 'this month', change: 12, trend: 'up' },
  activeClaims: { value: '23', unit: 'claims', change: 3, trend: 'up' },
  conversionRate: { value: '34', unit: '%', change: -2, trend: 'down' },
  avgClaimValue: { value: '$8,750', unit: 'per claim', change: 8, trend: 'up' }
}

const recommendations = [
  {
    id: 1,
    type: 'opportunity',
    title: 'High Activity in Broward County',
    description: 'Storm damage claims increased 45% this week. Consider focusing outreach efforts in Fort Lauderdale and Hollywood areas.',
    priority: 'high'
  },
  {
    id: 2,
    type: 'optimization',
    title: 'Response Time Improvement',
    description: 'Your average response time has improved by 15%. Maintain this momentum to stay competitive.',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'alert',
    title: 'Hurricane Season Preparation',
    description: 'Peak hurricane season approaching. Review emergency response protocols and ensure adequate staffing.',
    priority: 'high'
  }
]

const recentActivity = [
  { id: 1, action: 'Claim submitted', client: 'Maria Rodriguez', amount: '$12,500', time: '2 hours ago' },
  { id: 2, action: 'Site visit scheduled', client: 'John Smith', amount: '$8,200', time: '4 hours ago' },
  { id: 3, action: 'Settlement reached', client: 'Lisa Johnson', amount: '$15,750', time: '6 hours ago' },
  { id: 4, action: 'Initial contact made', client: 'Robert Davis', amount: '$6,800', time: '8 hours ago' }
]

const MetricCard = ({ title, icon: Icon, metric }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-sm text-gray-500">{metric.unit}</p>
          </div>
          <div className="flex items-center gap-1 mt-1">
            {metric.trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(metric.change)}%
            </span>
          </div>
        </div>
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
    </CardContent>
  </Card>
)

export function Analytics() {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Performance Analytics</h2>
        <p className="text-gray-600">Track your performance and optimize your claim management process</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <MetricCard title="Avg Response Time" icon={Clock} metric={mockMetrics.responseTime} />
        <MetricCard title="Success Rate" icon={Target} metric={mockMetrics.successRate} />
        <MetricCard title="Monthly Revenue" icon={DollarSign} metric={mockMetrics.revenue} />
        <MetricCard title="Active Claims" icon={Users} metric={mockMetrics.activeClaims} />
        <MetricCard title="Conversion Rate" icon={TrendingUp} metric={mockMetrics.conversionRate} />
        <MetricCard title="Avg Claim Value" icon={DollarSign} metric={mockMetrics.avgClaimValue} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{rec.title}</h4>
                    <Badge variant={rec.priority === 'high' ? 'destructive' : 'default'}>
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.client}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{activity.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart Placeholder */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 rounded-lg p-8 h-64 flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <p className="text-lg font-medium text-blue-800">Interactive Charts</p>
              <p className="text-blue-600">Revenue, Claims, and Performance Trends</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

