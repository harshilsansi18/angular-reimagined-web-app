
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, Save, Plus } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  
  const [general, setGeneral] = useState({
    appName: 'Angular App',
    appDescription: 'A modern Angular-inspired web application',
    enableAnalytics: true,
    darkMode: false,
    language: 'en',
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    updates: true,
    securityAlerts: true,
  });
  
  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '30',
    rememberMe: true,
  });
  
  const [apiKeys, setApiKeys] = useState([
    { name: 'Development', key: 'dev_ZW5jcnlwdGVkX2tleV9oZXJl', created: '2023-09-01', active: true },
    { name: 'Production', key: 'prod_ZW5jcnlwdGVkX2tleV9oZXJl', created: '2023-09-01', active: true },
  ]);
  
  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Settings updated",
      description: "Your general settings have been updated",
    });
  };
  
  const handleNotificationsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved",
    });
  };
  
  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Security settings updated",
      description: "Your security settings have been saved",
    });
  };
  
  const generateApiKey = () => {
    const newKey = {
      name: `API Key ${apiKeys.length + 1}`,
      key: `key_${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split('T')[0],
      active: true,
    };
    
    setApiKeys([...apiKeys, newKey]);
    
    toast({
      title: "New API key generated",
      description: "Your new API key has been created",
    });
  };
  
  const toggleApiKeyStatus = (index: number) => {
    const updatedKeys = [...apiKeys];
    updatedKeys[index].active = !updatedKeys[index].active;
    setApiKeys(updatedKeys);
    
    toast({
      title: updatedKeys[index].active ? "API key activated" : "API key deactivated",
      description: `The API key "${updatedKeys[index].name}" has been ${updatedKeys[index].active ? 'activated' : 'deactivated'}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your application settings and preferences.</p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your basic application settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleGeneralSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="appName">Application Name</Label>
                  <Input 
                    id="appName" 
                    value={general.appName} 
                    onChange={(e) => setGeneral({...general, appName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="appDescription">Application Description</Label>
                  <textarea 
                    id="appDescription"
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={general.appDescription}
                    onChange={(e) => setGeneral({...general, appDescription: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select 
                    id="language"
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={general.language}
                    onChange={(e) => setGeneral({...general, language: e.target.value})}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable dark mode for the application UI</p>
                  </div>
                  <Switch 
                    id="darkMode"
                    checked={general.darkMode}
                    onCheckedChange={(checked) => setGeneral({...general, darkMode: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="analytics">Analytics</Label>
                    <p className="text-sm text-muted-foreground">Collect anonymous usage data to improve the application</p>
                  </div>
                  <Switch 
                    id="analytics"
                    checked={general.enableAnalytics}
                    onCheckedChange={(checked) => setGeneral({...general, enableAnalytics: checked})}
                  />
                </div>
                
                <Button type="submit" className="bg-angular-red hover:bg-angular-red-dark">Save Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how you receive notifications from the application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNotificationsSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div className="flex flex-row items-start space-x-3 space-y-0">
                    <Checkbox 
                      id="email" 
                      checked={notifications.email}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, email: checked === true})
                      }
                    />
                    <div className="space-y-1 leading-none">
                      <label htmlFor="email" className="text-sm font-medium leading-none cursor-pointer">
                        Email Notifications
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for important updates.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-row items-start space-x-3 space-y-0">
                    <Checkbox 
                      id="push" 
                      checked={notifications.push}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, push: checked === true})
                      }
                    />
                    <div className="space-y-1 leading-none">
                      <label htmlFor="push" className="text-sm font-medium leading-none cursor-pointer">
                        Push Notifications
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications in your browser.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-row items-start space-x-3 space-y-0">
                    <Checkbox 
                      id="marketing" 
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, marketing: checked === true})
                      }
                    />
                    <div className="space-y-1 leading-none">
                      <label htmlFor="marketing" className="text-sm font-medium leading-none cursor-pointer">
                        Marketing Communications
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Receive marketing communications and newsletters.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-row items-start space-x-3 space-y-0">
                    <Checkbox 
                      id="updates" 
                      checked={notifications.updates}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, updates: checked === true})
                      }
                    />
                    <div className="space-y-1 leading-none">
                      <label htmlFor="updates" className="text-sm font-medium leading-none cursor-pointer">
                        Product Updates
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about product updates and new features.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-row items-start space-x-3 space-y-0">
                    <Checkbox 
                      id="securityAlerts" 
                      checked={notifications.securityAlerts}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, securityAlerts: checked === true})
                      }
                    />
                    <div className="space-y-1 leading-none">
                      <label htmlFor="securityAlerts" className="text-sm font-medium leading-none cursor-pointer">
                        Security Alerts
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Receive important security alerts and notifications.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button type="submit" className="bg-angular-red hover:bg-angular-red-dark">Save Preferences</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication options.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSecuritySubmit} className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch 
                      id="twoFactor"
                      checked={security.twoFactor}
                      onCheckedChange={(checked) => setSecurity({...security, twoFactor: checked})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input 
                      id="sessionTimeout"
                      type="number"
                      min="5"
                      max="240"
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex flex-row items-start space-x-3 space-y-0">
                    <Checkbox 
                      id="rememberMe" 
                      checked={security.rememberMe}
                      onCheckedChange={(checked) => 
                        setSecurity({...security, rememberMe: checked === true})
                      }
                    />
                    <div className="space-y-1 leading-none">
                      <label htmlFor="rememberMe" className="text-sm font-medium leading-none cursor-pointer">
                        Remember Me
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Stay signed in on this device for 30 days.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button type="submit" className="bg-angular-red hover:bg-angular-red-dark">Save Security Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for accessing the application programmatically.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button onClick={generateApiKey} className="flex items-center gap-2 mb-4">
                  <Plus size={16} />
                  Generate New API Key
                </Button>
                
                <div className="border rounded-md">
                  <div className="grid grid-cols-12 bg-muted p-4 text-sm font-medium">
                    <div className="col-span-3">Name</div>
                    <div className="col-span-5">API Key</div>
                    <div className="col-span-2">Created</div>
                    <div className="col-span-2 text-right">Status</div>
                  </div>
                  
                  {apiKeys.map((key, index) => (
                    <div key={index} className="grid grid-cols-12 p-4 text-sm border-t items-center">
                      <div className="col-span-3">{key.name}</div>
                      <div className="col-span-5 font-mono text-xs bg-muted p-2 rounded">{key.key}</div>
                      <div className="col-span-2 text-muted-foreground">{key.created}</div>
                      <div className="col-span-2 text-right">
                        <Switch 
                          checked={key.active}
                          onCheckedChange={() => toggleApiKeyStatus(index)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2 rounded-md border p-4 bg-yellow-50">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <div className="text-sm text-yellow-700">
                    <strong>Security Notice:</strong> Keep your API keys secure. They provide access to your account.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
