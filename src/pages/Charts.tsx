
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, BarChart, PieChart, AreaChart, Line, Area, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const monthlyData = [
  { name: 'Jan', browsers: 4000, devices: 2400, users: 2400 },
  { name: 'Feb', browsers: 3000, devices: 1398, users: 2210 },
  { name: 'Mar', browsers: 2000, devices: 9800, users: 2290 },
  { name: 'Apr', browsers: 2780, devices: 3908, users: 2000 },
  { name: 'May', browsers: 1890, devices: 4800, users: 2181 },
  { name: 'Jun', browsers: 2390, devices: 3800, users: 2500 },
  { name: 'Jul', browsers: 3490, devices: 4300, users: 2100 },
  { name: 'Aug', browsers: 4000, devices: 2400, users: 2400 },
  { name: 'Sep', browsers: 3000, devices: 1398, users: 2210 },
  { name: 'Oct', browsers: 2000, devices: 9800, users: 2290 },
  { name: 'Nov', browsers: 2780, devices: 3908, users: 2000 },
  { name: 'Dec', browsers: 1890, devices: 4800, users: 2181 },
];

const deviceData = [
  { name: 'Mobile', value: 400 },
  { name: 'Tablet', value: 300 },
  { name: 'Desktop', value: 300 },
  { name: 'Other', value: 200 },
];

const browserData = [
  { name: 'Chrome', value: 58 },
  { name: 'Firefox', value: 20 },
  { name: 'Safari', value: 15 },
  { name: 'Edge', value: 5 },
  { name: 'Opera', value: 2 },
];

const countryData = [
  { name: 'USA', users: 1200, sessions: 2400 },
  { name: 'UK', users: 800, sessions: 1398 },
  { name: 'Canada', users: 700, sessions: 1200 },
  { name: 'Germany', users: 600, sessions: 900 },
  { name: 'France', users: 500, sessions: 800 },
  { name: 'Japan', users: 400, sessions: 700 },
  { name: 'Brazil', users: 300, sessions: 500 },
];

const COLORS = ['#DD0031', '#C3002F', '#F1685E', '#61DAFB', '#4BC3D9'];

const Charts = () => {
  const [period, setPeriod] = useState<'year' | '6month' | '3month' | '1month'>('year');
  
  const filterDataByPeriod = (data: typeof monthlyData) => {
    switch (period) {
      case '1month':
        return data.slice(-1);
      case '3month':
        return data.slice(-3);
      case '6month':
        return data.slice(-6);
      default:
        return data;
    }
  };
  
  const filteredMonthlyData = filterDataByPeriod(monthlyData);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Charts</h2>
          <p className="text-muted-foreground">Visual analytics dashboard.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Period:</span>
          <Select value={period} onValueChange={(value: any) => setPeriod(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="year">Last 12 months</SelectItem>
              <SelectItem value="6month">Last 6 months</SelectItem>
              <SelectItem value="3month">Last 3 months</SelectItem>
              <SelectItem value="1month">Last month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Trends Over Time</CardTitle>
            <CardDescription>Monthly traffic trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#DD0031" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="browsers" stroke="#61DAFB" strokeWidth={2} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="devices" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Country Distribution</CardTitle>
            <CardDescription>User distribution by country</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={countryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#DD0031" />
                <Bar dataKey="sessions" fill="#61DAFB" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Device Distribution</CardTitle>
            <CardDescription>User sessions by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Browser Usage</CardTitle>
            <CardDescription>Sessions by browser</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={browserData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {browserData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Area Chart</CardTitle>
          <CardDescription>Stacked area visualization of data over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={filteredMonthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="users" stackId="1" stroke="#DD0031" fill="#DD0031" fillOpacity={0.8} />
              <Area type="monotone" dataKey="browsers" stackId="1" stroke="#61DAFB" fill="#61DAFB" fillOpacity={0.6} />
              <Area type="monotone" dataKey="devices" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.4} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Charts;
