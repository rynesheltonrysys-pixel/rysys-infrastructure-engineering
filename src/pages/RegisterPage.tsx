import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { setToken, setUser } from '@/lib/auth';
import { toast } from 'sonner';
const regSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Security threshold: 8 chars"),
  confirm: z.string(),
  terms: z.literal(true, { errorMap: () => ({ message: "Must accept protocols" }) }),
}).refine(data => data.password === data.confirm, {
  message: "Parity error: Passwords mismatch",
  path: ["confirm"],
});
export function RegisterPage() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof regSchema>>({
    resolver: zodResolver(regSchema),
    defaultValues: { email: '', password: '', confirm: '', terms: true },
  });
  async function onSubmit(values: z.infer<typeof regSchema>) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, password: values.password }),
      });
      const json = await res.json();
      if (json.success) {
        setToken(json.data.token);
        setUser(json.data.user);
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
    <div className="min-h-screen bg-rysys-cream flex flex-col">
      <nav className="h-20 border-b-4 border-rysys-black flex items-center px-8 bg-white">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-rysys-gold border-2 border-rysys-black flex items-center justify-center">
            <span className="text-white font-black">R</span>
          </div>
          <span className="font-black text-xl">RYSYS</span>
        </Link>
      </nav>
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8 border-4 border-rysys-black shadow-brutal-lg bg-white rounded-none">
          <h1 className="text-4xl font-black uppercase mb-2">Register</h1>
          <p className="text-muted-foreground font-bold uppercase text-xs mb-8">Establish your Node identity</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black uppercase text-xs">Email</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-2 border-rysys-black bg-rysys-cream rounded-none" />
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
                    <FormLabel className="font-black uppercase text-xs">Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} className="border-2 border-rysys-black bg-rysys-cream rounded-none" />
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
                    <FormLabel className="font-black uppercase text-xs">Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} className="border-2 border-rysys-black bg-rysys-cream rounded-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-2 border-rysys-black rounded-none" />
                    </FormControl>
                    <FormLabel className="text-[10px] font-bold uppercase">Accept Infrastructure Protocols</FormLabel>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-rysys-black text-white h-12 rounded-none font-black uppercase shadow-brutal hover:shadow-brutal-gold transition-all mt-4">
                Initialize Account
              </Button>
            </form>
          </Form>
          <div className="mt-8 pt-6 border-t-2 border-rysys-grey text-center text-[10px] font-black uppercase">
            <Link to="/signin" className="hover:text-rysys-gold">Existing Operator? Login</Link>
          </div>
        </Card>
      </main>
    </div>
  );
}