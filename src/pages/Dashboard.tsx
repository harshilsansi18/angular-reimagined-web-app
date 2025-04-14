
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useHeroes } from '@/services/HeroService';
import { Trophy, TrendingUp, Users, Activity } from 'lucide-react';

const Dashboard = () => {
  const { heroes, loading } = useHeroes();
  
  const powerData = heroes.map(hero => ({
    name: hero.name,
    power: hero.power
  }));
  
  const pieData = [
    { name: 'High Power', value: heroes.filter(h => h.power >= 90).length },
    { name: 'Medium Power', value: heroes.filter(h => h.power >= 70 && h.power < 90).length },
    { name: 'Low Power', value: heroes.filter(h => h.power < 70).length }
  ];
  
  const COLORS = ['#DD0031', '#C3002F', '#F1685E'];
  
  const statCards = [
    { title: 'Total Heroes', value: heroes.length, icon: <Users className="text-emerald-500" />, trend: '+2.5%' },
    { title: 'Avg Power', value: heroes.reduce((acc, h) => acc + h.power, 0) / heroes.length || 0, icon: <Activity className="text-blue-500" />, trend: '+1.2%' },
    { title: 'Top Hero', value: heroes.sort((a, b) => b.power - a.power)[0]?.name || '-', icon: <Trophy className="text-amber-500" />, trend: 'unchanged' },
    { title: 'Power Gain', value: '2.4k', icon: <TrendingUp className="text-purple-500" />, trend: '+4.7%' }
  ];

  if (loading) {
    return <div className="flex justify-center items-center h-full"><div className="ng-spinner"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome to your hero statistics dashboard.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className="h-8 w-8 bg-muted rounded-md flex items-center justify-center">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{typeof stat.value === 'number' ? stat.value.toFixed(1) : stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <span className={`${stat.trend.includes('+') ? 'text-emerald-500' : stat.trend === 'unchanged' ? 'text-gray-500' : 'text-red-500'}`}>
                  {stat.trend}
                </span>
                <span className="ml-1">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Hero Power Levels</CardTitle>
            <CardDescription>Distribution of power across all heroes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={powerData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="power" fill="#DD0031" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Power Categories</CardTitle>
            <CardDescription>Hero distribution by power level</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
