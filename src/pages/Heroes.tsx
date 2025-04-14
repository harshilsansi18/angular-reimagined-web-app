
import React, { useState } from 'react';
import { useHeroes, Hero } from '@/services/HeroService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Heroes = () => {
  const { heroes, loading, addHero, updateHero, deleteHero } = useHeroes();
  const { toast } = useToast();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [currentHero, setCurrentHero] = useState<Hero | null>(null);
  const [newHero, setNewHero] = useState<Omit<Hero, 'id'>>({ name: '', power: 50 });
  
  const filteredHeroes = heroes.filter(hero => 
    hero.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (hero.alterEgo && hero.alterEgo.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleAddHero = async () => {
    try {
      await addHero(newHero);
      toast({
        title: "Hero added",
        description: `${newHero.name} has been added to the roster.`,
      });
      setIsAddDialogOpen(false);
      setNewHero({ name: '', power: 50 });
    } catch (error) {
      toast({
        title: "Failed to add hero",
        description: "There was an error adding the hero.",
        variant: "destructive",
      });
    }
  };
  
  const handleUpdateHero = async () => {
    if (!currentHero) return;
    
    try {
      await updateHero(currentHero);
      toast({
        title: "Hero updated",
        description: `${currentHero.name}'s details have been updated.`,
      });
      setIsEditDialogOpen(false);
    } catch (error) {
      toast({
        title: "Failed to update hero",
        description: "There was an error updating the hero.",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteHero = async (id: number) => {
    try {
      await deleteHero(id);
      toast({
        title: "Hero deleted",
        description: "The hero has been removed from the roster.",
      });
    } catch (error) {
      toast({
        title: "Failed to delete hero",
        description: "There was an error deleting the hero.",
        variant: "destructive",
      });
    }
  };
  
  const openEditDialog = (hero: Hero) => {
    setCurrentHero({...hero});
    setIsEditDialogOpen(true);
  };

  if (loading && heroes.length === 0) {
    return <div className="flex justify-center items-center h-full"><div className="ng-spinner"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Heroes</h2>
          <p className="text-muted-foreground">Manage your superhero roster.</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="ng-button-primary gap-1">
          <Plus size={16} />
          Add Hero
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Hero Roster</CardTitle>
          <CardDescription>
            A list of all registered heroes in your database.
          </CardDescription>
          <div className="flex pt-2">
            <Input 
              placeholder="Search heroes..." 
              className="max-w-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Alter Ego</TableHead>
                <TableHead>Power</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHeroes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    {searchQuery ? 'No heroes match your search' : 'No heroes in the database'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredHeroes.map((hero) => (
                  <TableRow key={hero.id}>
                    <TableCell className="font-medium">{hero.id}</TableCell>
                    <TableCell>{hero.name}</TableCell>
                    <TableCell>{hero.alterEgo || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-angular-red h-2.5 rounded-full" 
                            style={{ width: `${hero.power}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{hero.power}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openEditDialog(hero)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteHero(hero.id)}
                        >
                          <Trash2 size={16} className="text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredHeroes.length} of {heroes.length} heroes
          </div>
        </CardFooter>
      </Card>
      
      {/* Add Hero Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Hero</DialogTitle>
            <DialogDescription>
              Enter the details for a new superhero to add to the roster.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Hero Name</label>
              <Input 
                id="name" 
                value={newHero.name} 
                onChange={e => setNewHero({...newHero, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="alterEgo" className="text-sm font-medium">Alter Ego (optional)</label>
              <Input 
                id="alterEgo" 
                value={newHero.alterEgo || ''} 
                onChange={e => setNewHero({...newHero, alterEgo: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="power" className="text-sm font-medium">Power Level</label>
                <span className="text-sm">{newHero.power}</span>
              </div>
              <input 
                type="range" 
                id="power" 
                min="1" 
                max="100"
                value={newHero.power}
                onChange={e => setNewHero({...newHero, power: parseInt(e.target.value, 10)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddHero} disabled={!newHero.name} className="bg-angular-red hover:bg-angular-red-dark">Add Hero</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Hero Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Hero</DialogTitle>
            <DialogDescription>
              Update the details for this superhero.
            </DialogDescription>
          </DialogHeader>
          
          {currentHero && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="edit-name" className="text-sm font-medium">Hero Name</label>
                <Input 
                  id="edit-name" 
                  value={currentHero.name} 
                  onChange={e => setCurrentHero({...currentHero, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-alterEgo" className="text-sm font-medium">Alter Ego (optional)</label>
                <Input 
                  id="edit-alterEgo" 
                  value={currentHero.alterEgo || ''} 
                  onChange={e => setCurrentHero({...currentHero, alterEgo: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="edit-power" className="text-sm font-medium">Power Level</label>
                  <span className="text-sm">{currentHero.power}</span>
                </div>
                <input 
                  type="range" 
                  id="edit-power" 
                  min="1" 
                  max="100"
                  value={currentHero.power}
                  onChange={e => setCurrentHero({...currentHero, power: parseInt(e.target.value, 10)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateHero} disabled={!currentHero?.name} className="bg-angular-red hover:bg-angular-red-dark">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Heroes;
