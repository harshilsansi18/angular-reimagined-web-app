
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const profileFormSchema = z.object({
  username: z.string()
    .min(2, { message: 'Username must be at least 2 characters.' })
    .max(30, { message: 'Username cannot exceed 30 characters.' }),
  email: z.string()
    .email({ message: 'Please enter a valid email address.' }),
  bio: z.string()
    .max(500, { message: 'Bio cannot exceed 500 characters.' })
    .optional(),
  role: z.string({
    required_error: 'Please select a role.',
  }),
  notifications: z.boolean().default(false),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: ProfileFormValues = {
  username: '',
  email: '',
  bio: '',
  role: '',
  notifications: false,
};

// Simple form validation for template-driven form
const validateTemplateForm = (values: any) => {
  const errors: Record<string, string> = {};
  
  if (!values.name) {
    errors.name = 'Name is required';
  }
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!values.message) {
    errors.message = 'Message is required';
  } else if (values.message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  
  return errors;
};

const Forms = () => {
  const { toast } = useToast();
  
  // Reactive form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });
  
  // Template-driven form
  const [templateForm, setTemplateForm] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
    copy: false,
  });
  
  const [templateFormErrors, setTemplateFormErrors] = useState<Record<string, string>>({});
  const [templateFormSubmitted, setTemplateFormSubmitted] = useState(false);
  const [templateFormSuccess, setTemplateFormSuccess] = useState(false);
  
  const onSubmitReactiveForm = (values: ProfileFormValues) => {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    
    setTimeout(() => {
      form.reset(values);
    }, 1000);
  };
  
  const handleTemplateInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTemplateForm(prev => ({ ...prev, [name]: value }));
    
    if (templateFormSubmitted) {
      const errors = validateTemplateForm({ ...templateForm, [name]: value });
      setTemplateFormErrors(errors);
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTemplateForm(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmitTemplateForm = (e: React.FormEvent) => {
    e.preventDefault();
    setTemplateFormSubmitted(true);
    
    const errors = validateTemplateForm(templateForm);
    setTemplateFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setTemplateFormSuccess(true);
      
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully.",
      });
      
      setTimeout(() => {
        setTemplateFormSuccess(false);
        setTemplateForm({
          name: '',
          email: '',
          subject: 'general',
          message: '',
          copy: false,
        });
        setTemplateFormSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Forms</h2>
        <p className="text-muted-foreground">Explore Angular-inspired form handling approaches.</p>
      </div>
      
      <Tabs defaultValue="reactive">
        <TabsList className="w-full max-w-xs mb-6">
          <TabsTrigger value="reactive" className="flex-1">Reactive Form</TabsTrigger>
          <TabsTrigger value="template" className="flex-1">Template Form</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reactive">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Angular-inspired reactive form with powerful validation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitReactiveForm)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="johndoe" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your contact email address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <textarea 
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="Tell us about yourself"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Brief description for your profile.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="developer">Developer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Your role determines your permissions.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Email Notifications</FormLabel>
                          <FormDescription>
                            Receive email notifications for important updates.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="bg-angular-red hover:bg-angular-red-dark">Update Profile</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="template">
          <Card>
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
              <CardDescription>
                Angular-inspired template-driven form with validation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {templateFormSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-green-100 p-3 mb-4">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium">Message Sent Successfully</h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    Thank you for your message. We will get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitTemplateForm} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={templateForm.name}
                      onChange={handleTemplateInputChange}
                      className={templateFormErrors.name ? "border-red-500" : ""}
                    />
                    {templateFormErrors.name && (
                      <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={14} />
                        {templateFormErrors.name}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={templateForm.email}
                      onChange={handleTemplateInputChange}
                      className={templateFormErrors.email ? "border-red-500" : ""}
                    />
                    {templateFormErrors.email && (
                      <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={14} />
                        {templateFormErrors.email}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <select 
                      id="subject"
                      name="subject"
                      value={templateForm.subject}
                      onChange={handleTemplateInputChange}
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Your message"
                      value={templateForm.message}
                      onChange={handleTemplateInputChange}
                      className={`flex w-full rounded-md border ${templateFormErrors.message ? "border-red-500" : "border-input"} bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                    />
                    {templateFormErrors.message && (
                      <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={14} />
                        {templateFormErrors.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="copy"
                      name="copy"
                      checked={templateForm.copy}
                      onCheckedChange={(checked) => 
                        setTemplateForm(prev => ({ ...prev, copy: checked === true }))
                      }
                    />
                    <div className="space-y-1 leading-none">
                      <label htmlFor="copy" className="text-sm font-medium cursor-pointer">
                        Send me a copy
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Get a copy of this message in your inbox.
                      </p>
                    </div>
                  </div>
                  
                  <Button type="submit" className="bg-angular-red hover:bg-angular-red-dark">
                    Submit Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Forms;
