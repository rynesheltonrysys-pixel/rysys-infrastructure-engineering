import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { setToken as saveToken, setUser as saveUser } from '@/lib/auth';
import { toast } from 'sonner';
const regSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Security threshold: 8 chars"),
  confirm: z.string(),
  name: z.string().min(2, "Name required (min 2 chars)"),
  state: z.string().default("OR"),
  city: z.string().default("Portland"),
  neighborhood: z.string().default(""),
  reason: z.string().min(10, "Minimum 10 characters required"),
  terms: z.literal(true, { message: "Must accept protocols" }),
}).refine(data => data.password === data.confirm, {
  message: "Parity error: Passwords mismatch",
  path: ["confirm"],
});
type RegisterFormValues = z.infer<typeof regSchema>;
export function RegisterPage() {
  const navigate = useNavigate();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(regSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
      name: '',
      state: 'OR',
      city: 'Portland',
      neighborhood: '',
      reason: '',
      terms: true
    },
  });
  async function onSubmit(values: RegisterFormValues) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          pass: values.password,
          name: values.name,
          state: values.state,
          city: values.city,
          neighborhood: values.neighborhood,
          reason: values.reason
        }),
      });
      const json = await res.json();
      if (json.success) {
        saveToken(json.data.token);
        saveUser(json.data.user);
        toast.success('Registration finalized.');
        navigate('/forust');
      } else {
        toast.error(json.error || 'Registration failed');
      }
    } catch (err) {
      toast.error('Network failure');
    }
  }
  return (
    <div className="min-h-screen bg-rysys-cream flex flex-col selection:bg-rysys-gold selection:text-white">
      <nav className="h-20 border-b-4 border-rysys-black flex items-center px-8 bg-white shrink-0">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-rysys-gold border-3 border-rysys-black flex flex-col items-center justify-center shadow-brutal group-hover:translate-x-[1px] group-hover:translate-y-[1px] transition-all leading-none overflow-hidden">
            <span className="text-white font-black text-[10px]">RY</span>
            <span className="text-white font-black text-[10px]">SYS</span>
          </div>
          <span className="font-black text-xl uppercase tracking-tighter">RYSYS</span>
        </Link>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12 flex items-center justify-center">
          <Card className="w-full max-w-2xl p-8 border-4 border-rysys-black shadow-brutal-lg bg-white rounded-none">
            <h1 className="text-4xl font-black uppercase mb-2 tracking-tighter">Register</h1>
            <p className="text-muted-foreground font-bold uppercase text-[10px] mb-8 tracking-[0.1em]">Join the for-US-t community to collaborate on civic projects</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-black uppercase text-sm border-b-2 border-rysys-black pb-1">Authentication</h3>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-black uppercase text-xs tracking-widest">Email</FormLabel>
                          <FormControl>
                            <Input {...field} className="border-2 border-rysys-black bg-rysys-cream rounded-none font-bold" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-black uppercase text-xs tracking-widest">Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} className="border-2 border-rysys-black bg-rysys-cream rounded-none font-bold" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-black uppercase text-xs tracking-widest">Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} className="border-2 border-rysys-black bg-rysys-cream rounded-none font-bold" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-black uppercase text-sm border-b-2 border-rysys-black pb-1">Operator Profile</h3>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-black uppercase text-xs tracking-widest">Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} className="border-2 border-rysys-black bg-rysys-cream rounded-none font-bold" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-black uppercase text-xs tracking-widest">State</FormLabel>
                            <FormControl>
                              <Input {...field} className="border-2 border-rysys-black bg-rysys-cream rounded-none font-bold" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-black uppercase text-xs tracking-widest">City</FormLabel>
                            <FormControl>
                              <Input {...field} className="border-2 border-rysys-black bg-rysys-cream rounded-none font-bold" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="neighborhood"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-black uppercase text-xs tracking-widest">Neighborhood</FormLabel>
                          <FormControl>
                            <Input {...field} className="border-2 border-rysys-black bg-rysys-cream rounded-none font-bold" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-black uppercase text-xs tracking-widest">Reason for Application</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="HOW DO YOU SEEK TO COLLABORATE ON CIVIC INFRASTRUCTURE? (MIN 10 CHARS)" className="border-2 border-rysys-black bg-rysys-cream rounded-none font-bold min-h-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0 pt-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked === true)}
                          className="border-2 border-rysys-black rounded-none data-[state=checked]:bg-rysys-gold"
                        />
                      </FormControl>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-tight">Accept Community Stewardship Protocols</FormLabel>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-rysys-black text-white h-14 rounded-none font-black uppercase shadow-brutal hover:shadow-brutal-gold transition-all mt-6">
                  Initialize Account Node
                </Button>
              </form>
            </Form>
            <div className="mt-8 pt-6 border-t-2 border-rysys-grey text-center text-[10px] font-black uppercase tracking-widest">
              <Link to="/signin" className="hover:text-rysys-gold transition-colors">Existing Operator? Login</Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}