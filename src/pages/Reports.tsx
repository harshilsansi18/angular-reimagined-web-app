import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Download, Filter, Share2, ClipboardList, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';

const Reports = () => {
  const [timeRange, setTimeRange] = useState('1y');
  
  const performanceData = {
    '1m': [
      { name: 'Week 1', portfolio: 5.2, benchmark: 4.8 },
      { name: 'Week 2', portfolio: 4.9, benchmark: 4.5 },
      { name: 'Week 3', portfolio: 6.5, benchmark: 5.9 },
      { name: 'Week 4', portfolio: 5.8, benchmark: 5.3 },
    ],
    '3m': [
      { name: 'Jan', portfolio: 4.8, benchmark: 4.5 },
      { name: 'Feb', portfolio: 5.2, benchmark: 4.8 },
      { name: 'Mar', portfolio: 6.5, benchmark: 5.5 },
    ],
    '1y': [
      { name: 'Apr', portfolio: 4.2, benchmark: 4.0 },
      { name: 'May', portfolio: 4.8, benchmark: 4.5 },
      { name: 'Jun', portfolio: 3.9, benchmark: 3.5 },
      { name: 'Jul', portfolio: 4.5, benchmark: 4.2 },
      { name: 'Aug', portfolio: 5.2, benchmark: 4.8 },
      { name: 'Sep', portfolio: 5.8, benchmark: 5.3 },
      { name: 'Oct', portfolio: 4.9, benchmark: 4.7 },
      { name: 'Nov', portfolio: 5.5, benchmark: 5.2 },
      { name: 'Dec', portfolio: 6.2, benchmark: 5.7 },
      { name: 'Jan', portfolio: 5.9, benchmark: 5.6 },
      { name: 'Feb', portfolio: 6.5, benchmark: 5.9 },
      { name: 'Mar', portfolio: 7.2, benchmark: 6.3 },
    ],
    '5y': [
      { name: '2020', portfolio: 12.5, benchmark: 11.2 },
      { name: '2021', portfolio: 18.3, benchmark: 16.5 },
      { name: '2022', portfolio: 9.7, benchmark: 8.6 },
      { name: '2023', portfolio: 15.6, benchmark: 14.2 },
      { name: '2024', portfolio: 22.4, benchmark: 19.8 },
    ],
  };
  
  const incomeData = [
    { name: 'Dividends', value: 3250 },
    { name: 'Interest', value: 1750 },
    { name: 'Capital Gains', value: 8500 },
    { name: 'Other', value: 500 },
  ];
  
  const recentReports = [
    { name: 'Tax Year Summary 2024', type: 'PDF', date: 'April 10, 2025', size: '1.2 MB' },
    { name: 'Annual Performance Review', type: 'PDF', date: 'March 15, 2025', size: '2.8 MB' },
    { name: 'Quarterly Statement Q1 2025', type: 'PDF', date: 'April 5, 2025', size: '1.5 MB' },
    { name: 'Portfolio Analysis', type: 'XLSX', date: 'March 28, 2025', size: '940 KB' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">Financial reports and analysis.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Share2 size={16} />
            Share
          </Button>
          <Button variant="outline" className="gap-1">
            <Download size={16} />
            Export
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 gap-1">
            <ClipboardList size={16} />
            Generate Report
          </Button>
        </div>
      </div>
      
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Performance Comparison</CardTitle>
              <CardDescription>Your portfolio vs. market benchmark</CardDescription>
            </div>
            <div className="flex items-center gap-2 self-start">
              <Button 
                size="sm" 
                variant={timeRange === '1m' ? "default" : "outline"}
                className={timeRange === '1m' ? "bg-blue-500 hover:bg-blue-600" : ""}
                onClick={() => setTimeRange('1m')}
              >
                1M
              </Button>
              <Button 
                size="sm" 
                variant={timeRange === '3m' ? "default" : "outline"}
                className={timeRange === '3m' ? "bg-blue-500 hover:bg-blue-600" : ""}
                onClick={() => setTimeRange('3m')}
              >
                3M
              </Button>
              <Button 
                size="sm" 
                variant={timeRange === '1y' ? "default" : "outline"}
                className={timeRange === '1y' ? "bg-blue-500 hover:bg-blue-600" : ""}
                onClick={() => setTimeRange('1y')}
              >
                1Y
              </Button>
              <Button 
                size="sm" 
                variant={timeRange === '5y' ? "default" : "outline"}
                className={timeRange === '5y' ? "bg-blue-500 hover:bg-blue-600" : ""}
                onClick={() => setTimeRange('5y')}
              >
                5Y
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={performanceData[timeRange]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value) => [`${value}%`, undefined]} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="portfolio" 
                name="Your Portfolio" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="benchmark" 
                name="Market Index" 
                stroke="#9ca3af" 
                strokeWidth={2} 
                dot={false}
                strokeDasharray="5 5"
                activeDot={{ r: 4 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground border-t p-4">
          <div>
            <span className="font-medium text-blue-600">Your Portfolio: +14.2%</span> vs <span>Market Index: +11.8%</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            Last updated: April 14, 2025
          </div>
        </CardFooter>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Income Breakdown</CardTitle>
            <CardDescription>Annual investment income by source</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" tickFormatter={(value) => `$${value}`} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                <Legend />
                <Bar dataKey="value" name="Amount ($)" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground border-t p-4">
            Total annual income: $14,000
          </CardFooter>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Download or view recent financial reports</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter size={14} />
              Filter
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-md p-2 ${report.type === 'PDF' ? 'bg-red-100' : 'bg-green-100'}`}>
                      <span className={`text-xs font-medium ${report.type === 'PDF' ? 'text-red-700' : 'text-green-700'}`}>
                        {report.type}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-xs text-gray-500">{report.date} — {report.size}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download size={14} className="mr-1" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button className="w-full bg-blue-500 hover:bg-blue-600">View All Reports</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-sm col-span-3">
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>Generate custom financial reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { 
                  title: 'Tax Summary', 
                  description: 'Annual tax document with capital gains and dividend information',
                  icon: <ClipboardList size={24} className="text-blue-500" />
                },
                { 
                  title: 'Performance Analysis', 
                  description: 'Detailed analysis of portfolio performance and attribution',
                  icon: <TrendingUp size={24} className="text-green-500" />
                },
                { 
                  title: 'Holdings Report', 
                  description: 'Complete breakdown of all current portfolio holdings',
                  icon: <PieChartIcon size={24} className="text-amber-500" />
                }
              ].map((report, i) => (
                <div key={i} className="p-4 border rounded-lg flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    {report.icon}
                  </div>
                  <h3 className="font-medium mb-2">{report.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{report.description}</p>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">Generate</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
