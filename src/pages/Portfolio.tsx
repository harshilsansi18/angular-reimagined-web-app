
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';

const Portfolio = () => {
  const pieData = [
    { name: 'Technology', value: 35 },
    { name: 'Healthcare', value: 20 },
    { name: 'Financial', value: 15 },
    { name: 'Consumer', value: 12 },
    { name: 'Energy', value: 10 },
    { name: 'Others', value: 8 },
  ];
  
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6b7280'];
  
  const riskData = [
    { name: 'Stocks', value: 65 },
    { name: 'Bonds', value: 20 },
    { name: 'Cash', value: 10 },
    { name: 'Alternatives', value: 5 },
  ];
  
  const RISK_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Portfolio</h2>
          <p className="text-muted-foreground">Analysis of your investment allocations.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Share2 size={16} />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download size={16} />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Sector Allocation</CardTitle>
            <CardDescription>Distribution by industry sector</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Distribution by asset class</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={RISK_COLORS[index % RISK_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Risk Profile</CardTitle>
            <CardDescription>Your investment risk level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative h-36 w-36">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">Moderate</span>
                </div>
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="10"
                    strokeDasharray="282.7"
                    strokeDashoffset="141.4"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <p className="mt-4 text-sm text-gray-500 text-center">
                Your portfolio has a moderate risk level, balancing growth and security.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Diversification Score</CardTitle>
            <CardDescription>Portfolio diversification metric</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative h-36 w-36">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">78</span>
                </div>
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="10"
                    strokeDasharray="282.7"
                    strokeDashoffset="62.2"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <p className="mt-4 text-sm text-gray-500 text-center">
                Your portfolio is well-diversified across multiple sectors and asset classes.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Performance Rating</CardTitle>
            <CardDescription>Overall portfolio performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative h-36 w-36">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">A-</span>
                </div>
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="10"
                    strokeDasharray="282.7"
                    strokeDashoffset="56.5"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <p className="mt-4 text-sm text-gray-500 text-center">
                Your portfolio is outperforming 85% of similar investors in this market.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Investment Recommendations</CardTitle>
          <CardDescription>Suggested portfolio adjustments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-1">Increase Technology Exposure</h3>
              <p className="text-sm text-blue-700">
                Consider increasing your exposure to the technology sector by 5-7% to capture growth opportunities in AI and cloud computing.
              </p>
            </div>
            
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
              <h3 className="font-medium text-amber-800 mb-1">Diversify Healthcare Holdings</h3>
              <p className="text-sm text-amber-700">
                Your healthcare sector is concentrated in pharmaceutical companies. Consider adding exposure to medical devices and healthcare services.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
              <h3 className="font-medium text-green-800 mb-1">Add Bond Allocation</h3>
              <p className="text-sm text-green-700">
                With rising interest rates, it may be beneficial to increase your bond allocation by 5% to reduce overall portfolio volatility.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;
