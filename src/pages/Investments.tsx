
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Plus, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Investments = () => {
  const investmentData = [
    { id: 1, name: 'Apple Inc.', ticker: 'AAPL', quantity: 25, price: 182.63, value: 4565.75, change: +1.25, performance: '+15.2%' },
    { id: 2, name: 'Microsoft Corp.', ticker: 'MSFT', quantity: 12, price: 339.71, value: 4076.52, change: +0.54, performance: '+8.7%' },
    { id: 3, name: 'Amazon.com Inc.', ticker: 'AMZN', quantity: 10, price: 178.35, value: 1783.50, change: -0.85, performance: '+23.4%' },
    { id: 4, name: 'Alphabet Inc.', ticker: 'GOOGL', quantity: 8, price: 142.17, value: 1137.36, change: +1.15, performance: '+5.1%' },
    { id: 5, name: 'Tesla Inc.', ticker: 'TSLA', quantity: 15, price: 242.50, value: 3637.50, change: +5.32, performance: '-12.6%' },
    { id: 6, name: 'NVIDIA Corp.', ticker: 'NVDA', quantity: 6, price: 435.80, value: 2614.80, change: +4.76, performance: '+140.2%' },
  ];
  
  const chartData = [
    { name: 'Week 1', value: 18500 },
    { name: 'Week 2', value: 19200 },
    { name: 'Week 3', value: 18700 },
    { name: 'Week 4', value: 19800 },
    { name: 'Week 5', value: 20400 },
    { name: 'Week 6', value: 21300 },
    { name: 'Week 7', value: 20900 },
    { name: 'Week 8', value: 21400 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Investments</h2>
          <p className="text-muted-foreground">Manage your investment portfolio.</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 gap-1">
          <Plus size={16} />
          Add Investment
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Total Value</CardTitle>
            <CardDescription>Current portfolio value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$86,320.00</div>
            <p className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUpRight size={16} />
              +5.3% ($4,320)
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Today's Change</CardTitle>
            <CardDescription>Market value change</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+$1,245.30</div>
            <p className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUpRight size={16} />
              +1.5% today
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Buying Power</CardTitle>
            <CardDescription>Available cash to invest</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$38,180.00</div>
            <p className="flex items-center text-xs text-gray-500 mt-1">
              In your cash account
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
          <CardDescription>Last 8 weeks performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                name="Portfolio Value ($)" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your Investments</CardTitle>
            <CardDescription>A detailed list of all your investments</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Filter size={14} />
            Filter
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Ticker</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">24h</TableHead>
                <TableHead className="text-right">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investmentData.map((investment) => (
                <TableRow key={investment.id}>
                  <TableCell className="font-medium">{investment.name}</TableCell>
                  <TableCell>{investment.ticker}</TableCell>
                  <TableCell className="text-right">{investment.quantity}</TableCell>
                  <TableCell className="text-right">${investment.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${investment.value.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <span className={investment.change > 0 ? "text-green-500 flex items-center justify-end" : "text-red-500 flex items-center justify-end"}>
                      {investment.change > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {investment.change > 0 ? "+" : ""}{investment.change.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell className={`text-right ${investment.performance.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {investment.performance}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <div className="text-sm text-muted-foreground">
            Showing {investmentData.length} investments
          </div>
          <div className="text-sm text-muted-foreground">
            Last updated: April 14, 2025, 9:30 AM
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Investments;
