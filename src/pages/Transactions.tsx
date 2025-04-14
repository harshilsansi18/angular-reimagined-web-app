
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter, Download, Plus, Search, ArrowDownToLine, ArrowUpFromLine, CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Transactions = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const transactions = [
    {
      id: 1,
      date: '2025-04-14',
      name: 'Apple Inc.',
      type: 'Buy',
      amount: 3240.50,
      status: 'Completed',
      category: 'Stocks'
    },
    {
      id: 2,
      date: '2025-04-13',
      name: 'Amazon.com Inc.',
      type: 'Sell',
      amount: 1500.00,
      status: 'Completed',
      category: 'Stocks'
    },
    {
      id: 3,
      date: '2025-04-11',
      name: 'Vanguard ETF',
      type: 'Dividend',
      amount: 350.75,
      status: 'Completed',
      category: 'ETF'
    },
    {
      id: 4,
      date: '2025-04-10',
      name: 'Bank Transfer',
      type: 'Deposit',
      amount: 5000.00,
      status: 'Completed',
      category: 'Transfer'
    },
    {
      id: 5,
      date: '2025-04-08',
      name: 'NVIDIA Corp.',
      type: 'Buy',
      amount: 2740.25,
      status: 'Completed',
      category: 'Stocks'
    },
    {
      id: 6,
      date: '2025-04-05',
      name: 'Trading Account',
      type: 'Withdrawal',
      amount: 1000.00,
      status: 'Completed',
      category: 'Transfer'
    },
    {
      id: 7,
      date: '2025-04-03',
      name: 'Microsoft Corp.',
      type: 'Buy',
      amount: 1698.55,
      status: 'Completed',
      category: 'Stocks'
    },
    {
      id: 8,
      date: '2025-04-01',
      name: 'Tesla Inc.',
      type: 'Sell',
      amount: 2175.80,
      status: 'Completed',
      category: 'Stocks'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => 
    transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'Buy':
        return <ArrowDownToLine size={16} className="text-green-500" />;
      case 'Sell':
        return <ArrowUpFromLine size={16} className="text-red-500" />;
      case 'Deposit':
        return <ArrowDownToLine size={16} className="text-blue-500" />;
      case 'Withdrawal':
        return <ArrowUpFromLine size={16} className="text-orange-500" />;
      case 'Dividend':
        return <CreditCard size={16} className="text-purple-500" />;
      default:
        return <CreditCard size={16} className="text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground">View and manage your transaction history.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Download size={16} />
            Export
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 gap-1" onClick={() => setIsAddDialogOpen(true)}>
            <Plus size={16} />
            Record Transaction
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$7,679.30</div>
            <p className="text-xs text-muted-foreground">3 transactions</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,675.80</div>
            <p className="text-xs text-muted-foreground">2 transactions</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Net Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">-$4,003.50</div>
            <p className="text-xs text-muted-foreground">Outflow exceeds inflow</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Recent financial activities in your portfolio.
          </CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md flex-1">
              <Search size={16} className="text-gray-400" />
              <Input 
                placeholder="Search transactions..." 
                className="border-0 bg-transparent h-7 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter size={14} />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No transactions match your search criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell className="font-medium">{transaction.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getTransactionIcon(transaction.type)}
                        <span>{transaction.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className="text-right">
                      <span className={transaction.type === 'Buy' || transaction.type === 'Withdrawal' ? 'text-red-500' : 'text-green-500'}>
                        {transaction.type === 'Buy' || transaction.type === 'Withdrawal' ? '-' : '+'}${transaction.amount.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record New Transaction</DialogTitle>
            <DialogDescription>
              Add a new financial transaction to your records.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="transaction-type" className="text-sm font-medium">Transaction Type</label>
                <select id="transaction-type" className="w-full rounded-md border border-gray-300 p-2">
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                  <option value="deposit">Deposit</option>
                  <option value="withdrawal">Withdrawal</option>
                  <option value="dividend">Dividend</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="transaction-date" className="text-sm font-medium">Date</label>
                <Input id="transaction-date" type="date" defaultValue="2025-04-14" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="transaction-name" className="text-sm font-medium">Description</label>
              <Input id="transaction-name" placeholder="e.g., Apple Inc. or Bank Transfer" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="transaction-amount" className="text-sm font-medium">Amount ($)</label>
                <Input id="transaction-amount" type="number" placeholder="0.00" min="0" step="0.01" />
              </div>
              <div className="space-y-2">
                <label htmlFor="transaction-category" className="text-sm font-medium">Category</label>
                <select id="transaction-category" className="w-full rounded-md border border-gray-300 p-2">
                  <option value="stocks">Stocks</option>
                  <option value="etf">ETF</option>
                  <option value="bonds">Bonds</option>
                  <option value="crypto">Crypto</option>
                  <option value="transfer">Transfer</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="transaction-notes" className="text-sm font-medium">Notes (Optional)</label>
              <textarea 
                id="transaction-notes" 
                placeholder="Add any additional details..." 
                className="w-full rounded-md border border-gray-300 p-2 min-h-[80px]"
              ></textarea>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setIsAddDialogOpen(false)}>Save Transaction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transactions;
