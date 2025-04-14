
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, TrendingUp, Wallet } from 'lucide-react';

const Dashboard = () => {
  const performanceData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
    { name: 'Aug', value: 4000 },
    { name: 'Sep', value: 5000 },
    { name: 'Oct', value: 6000 },
    { name: 'Nov', value: 7000 },
    { name: 'Dec', value: 9000 },
  ];
  
  const investmentsData = [
    { name: 'Tech', value: 4000 },
    { name: 'Healthcare', value: 3000 },
    { name: 'Finance', value: 2000 },
    { name: 'Energy', value: 2780 },
    { name: 'Consumer', value: 1890 },
  ];
  
  const statCards = [
    { 
      title: 'Total Balance', 
      value: '$124,500.00', 
      trend: '+2.5%',
      trendUp: true,
      icon: <DollarSign className="text-blue-500" />, 
      description: 'From all accounts'
    },
    { 
      title: 'Investments', 
      value: '$86,320.00', 
      trend: '+1.2%',
      trendUp: true,
      icon: <TrendingUp className="text-green-500" />, 
      description: 'Total invested assets'
    },
    { 
      title: 'Cash Balance', 
      value: '$38,180.00', 
      trend: '-0.8%',
      trendUp: false,
      icon: <Wallet className="text-amber-500" />, 
      description: 'Available for trading'
    },
    { 
      title: 'Monthly Expenses', 
      value: '$2,840.00', 
      trend: '+4.7%',
      trendUp: true,
      icon: <CreditCard className="text-purple-500" />, 
      description: 'Last month'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-1">Good morning, John</h2>
        <p className="text-muted-foreground">Here's what's happening with your finances today.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <span className={`flex items-center ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {stat.trend}
                </span>
                <span className="ml-1 text-gray-500">{stat.description}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Monthly performance over the past year</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Value ($)" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={false}
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Distribution of your investments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={investmentsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Value ($)" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest account activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Apple Inc.', type: 'Buy', amount: '$3,240.50', date: 'Today', icon: <TrendingUp className="text-green-500" /> },
                { name: 'Amazon Transfer', type: 'Sell', amount: '$1,500.00', date: 'Yesterday', icon: <ArrowDownRight className="text-red-500" /> },
                { name: 'ETF Dividend', type: 'Dividend', amount: '$350.75', date: '3 days ago', icon: <DollarSign className="text-blue-500" /> },
              ].map((transaction, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
                      {transaction.icon}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.name}</p>
                      <p className="text-xs text-gray-500">{transaction.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{transaction.amount}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Best performing assets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Tesla Inc.', ticker: 'TSLA', price: '$242.50', change: '+5.3%' },
                { name: 'Microsoft', ticker: 'MSFT', price: '$340.27', change: '+2.1%' },
                { name: 'NVIDIA', ticker: 'NVDA', price: '$435.80', change: '+4.8%' },
              ].map((asset, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{asset.name}</p>
                    <p className="text-xs text-gray-500">{asset.ticker}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{asset.price}</p>
                    <p className="text-xs text-green-500">{asset.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
