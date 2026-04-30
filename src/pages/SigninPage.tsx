import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { setToken as saveToken, setUser as saveUser } from '@/lib/auth';
import { toast } from 'sonner';
const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export function SigninPage() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: '', password: '' },
  });
  async function onSubmit(values: z.infer<typeof signinSchema>) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (json.success) {
        saveToken(json.data.token);
        saveUser(json.data.user);
        toast.success('Welcome back to RYSYS.');
        navigate('/forust');
      } else {
        toast.error(json.error || 'Login failed');
      }
    } catch (err) {
      toast.error('Connection error');
    }
  }
  return (
    <div className="min-h-screen bg-rysys-cream flex flex-col">
      <nav className="h-20 border-b-4 border-rysys-black flex items-center px-8 bg-white">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-rysys-gold border-3 border-rysys-black flex flex-col items-center justify-center shadow-brutal group-hover:translate-x-[1px] group-hover:translate-y-[1px] transition-all leading-none overflow-hidden">
            <span className="text-white font-black text-[10px]">RY</span>
            <span className="text-white font-black text-[10px]">SYS</span>
          </div>
          <span className="font-black text-xl uppercase tracking-tighter">RYSYS</span>
        </Link>
      </nav>
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8 border-4 border-rysys-black shadow-brutal-lg bg-white rounded-none">
          <h1 className="text-4xl font-black uppercase mb-2 tracking-tighter">Login</h1>
          <p className="text-muted-foreground font-bold uppercase text-[10px] mb-8 tracking-[0.1em]">Access the forUSt Infrastructure Portal</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <Button type="submit" className="w-full bg-rysys-black text-white h-12 rounded-none font-black uppercase shadow-brutal hover:shadow-brutal-gold transition-all mt-4">
                Authorize Session
              </Button>
            </form>
          </Form>
          <div className="mt-8 pt-6 border-t-2 border-rysys-grey flex justify-between text-[10px] font-black uppercase tracking-widest">
            <Link to="/register" className="hover:text-rysys-gold transition-colors">New Node? Register</Link>
            <span className="text-muted-foreground cursor-not-allowed">Reset Key</span>
          </div>
        </Card>
      </main>
    </div>
  );
}