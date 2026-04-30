import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, Plus, MessageSquare, LogOut, ChevronRight, Send, Clock, User 
} from 'lucide-react';
import { isAuthed, authHeader, clearAuth, getUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import type { Doc, Message, Comment } from '@shared/types';
export function ForustPage() {
  const navigate = useNavigate();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const user = getUser();
  const isAuthedRef = React.useRef(isAuthed());
  useEffect(() => {
    isAuthedRef.current = isAuthed();
    if (!isAuthedRef.current) navigate('/signin');
    else fetchData();
  }, [navigate]);
  const fetchData = async () => {
    try {
      const [dRes, mRes] = await Promise.all([
        fetch('/api/forust/docs', { headers: authHeader() }),
        fetch('/api/forust/messages', { headers: authHeader() })
      ]);
      const [dJson, mJson] = await Promise.all([dRes.json(), mRes.json()]);
      if (dJson.success) setDocs(dJson.data);
      if (mJson.success) setMsgs(mJson.data);
    } catch { toast.error('Sync failure'); }
    finally { setLoading(false); }
  };
  const handleLogout = () => {
    clearAuth();
    navigate('/signin');
  };
  if (loading) return <div className="min-h-screen bg-rysys-cream flex items-center justify-center font-black uppercase tracking-widest animate-pulse">Initializing Portal...</div>;
  return (
    <div className="min-h-screen bg-rysys-cream text-rysys-black font-sans flex flex-col">
      <header className="h-20 bg-white border-b-4 border-rysys-black flex items-center justify-between px-8 sticky top-0 z-30">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-rysys-gold border-2 border-rysys-black flex items-center justify-center">
            <span className="text-white font-black">R</span>
          </div>
          <span className="font-black text-xl uppercase tracking-tighter">forUST Portal</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-rysys-green-power text-white border-2 border-rysys-black rounded-none px-3 font-mono text-[10px]">
            NODE: {user?.email}
          </Badge>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="border-2 border-rysys-black rounded-none">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Docs Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Proposals & Docs</h2>
              <NewDocDialog onCreated={fetchData} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {docs.map(doc => (
                <DocCard key={doc.id} doc={doc} />
              ))}
              {docs.length === 0 && (
                <div className="col-span-2 py-20 border-4 border-dashed border-rysys-black/20 flex flex-col items-center justify-center opacity-50">
                  <FileText className="w-12 h-12 mb-4" />
                  <p className="font-black uppercase text-sm">No Active Proposals</p>
                </div>
              )}
            </div>
          </div>
          {/* Messaging Column */}
          <div className="lg:col-span-4 space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Intelligence Feed</h2>
            <Card className="border-4 border-rysys-black bg-white shadow-brutal flex flex-col h-[600px] rounded-none">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {msgs.map(m => (
                  <div key={m.id} className={`p-3 border-2 border-rysys-black ${m.fromId === user?.id ? 'bg-rysys-cream ml-4' : 'bg-white mr-4'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black uppercase">{m.fromId === user?.id ? 'You' : m.fromEmail}</span>
                      <span className="text-[8px] opacity-50">{new Date(m.createdAt).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm font-medium">{m.text}</p>
                  </div>
                ))}
              </div>
              <MessageComposer onSent={fetchData} />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
function DocCard({ doc }: { doc: Doc }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="p-6 border-4 border-rysys-black shadow-brutal hover:shadow-brutal-gold hover:-translate-y-1 transition-all cursor-pointer bg-white rounded-none group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-rysys-grey border-2 border-rysys-black flex items-center justify-center group-hover:bg-rysys-gold transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <Badge className="bg-white border-2 border-rysys-black text-rysys-black rounded-none font-mono text-[10px]">
              V{doc.versions.length}
            </Badge>
          </div>
          <h3 className="text-xl font-black uppercase tracking-tighter mb-2">{doc.title}</h3>
          <p className="text-[10px] font-bold text-muted-foreground uppercase">Updated {new Date(doc.updatedAt).toLocaleDateString()}</p>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl border-4 border-rysys-black rounded-none bg-rysys-cream p-0">
        <DocViewer doc={doc} />
      </DialogContent>
    </Dialog>
  );
}
function DocViewer({ doc }: { doc: Doc }) {
  const [activeVer, setActiveVer] = useState(doc.versions[0]?.version ?? 1);
  const version = doc.versions.find(v => v.version === activeVer) || doc.versions[0];
  return (
    <div className="flex flex-col h-[80vh]">
      <div className="p-6 border-b-4 border-rysys-black bg-white flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">{doc.title}</h2>
          <p className="text-[10px] font-bold text-muted-foreground uppercase">Doc ID: {doc.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase">Version</span>
          <select 
            value={activeVer} 
            onChange={(e) => setActiveVer(Number(e.target.value))}
            className="border-2 border-rysys-black bg-rysys-cream px-2 py-1 font-mono text-sm"
          >
            {doc.versions.map(v => <option key={v.version} value={v.version}>v{v.version}</option>).reverse()}
          </select>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 font-mono text-sm leading-relaxed bg-white/50">
        <pre className="whitespace-pre-wrap">{version.content}</pre>
      </div>
      <div className="p-6 border-t-4 border-rysys-black bg-white">
         <Badge className="rounded-none bg-rysys-gold text-white mb-2">Technical Commentary Required</Badge>
         <p className="text-xs text-muted-foreground italic">Note: Live technical commentary syncing coming in v1.3.0</p>
      </div>
    </div>
  );
}
function NewDocDialog({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sharing, setSharing] = useState('');
  const handleSubmit = async () => {
    if (!title || !content) return;
    const res = await fetch('/api/forust/docs', {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify({ title, content, shareWith: sharing.split(',').map(s => s.trim()).filter(Boolean) })
    });
    if (res.ok) {
      toast.success('Proposal Drafted');
      onCreated();
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-rysys-black text-white rounded-none font-black uppercase shadow-brutal hover:shadow-brutal-gold transition-all h-12">
          <Plus className="w-4 h-4 mr-2" /> New Proposal
        </Button>
      </DialogTrigger>
      <DialogContent className="border-4 border-rysys-black rounded-none bg-white p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black uppercase">Create Technical Proposal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase">Title</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} className="border-2 border-rysys-black rounded-none bg-rysys-cream" placeholder="E.G. GRID_PROTOCOL_V1" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase">Share with (Emails, comma separated)</label>
            <Input value={sharing} onChange={e => setSharing(e.target.value)} className="border-2 border-rysys-black rounded-none bg-rysys-cream" placeholder="ENG@RYSYS.ORG" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase">Initial Content</label>
            <Textarea value={content} onChange={e => setContent(e.target.value)} className="border-2 border-rysys-black rounded-none bg-rysys-cream min-h-[200px]" placeholder="DEFINE SYSTEM ARCHITECTURE..." />
          </div>
          <Button onClick={handleSubmit} className="w-full bg-rysys-green-power text-white h-12 rounded-none font-black uppercase shadow-brutal">
            Deploy Proposal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
function MessageComposer({ onSent }: { onSent: () => void }) {
  const [text, setText] = useState('');
  const handleSend = async () => {
    if (!text.trim()) return;
    const res = await fetch('/api/forust/messages', {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify({ toEmail: 'support', text })
    });
    if (res.ok) {
      setText('');
      onSent();
    }
  };
  return (
    <div className="p-4 border-t-4 border-rysys-black bg-rysys-cream flex gap-2">
      <Input 
        value={text} 
        onChange={e => setText(e.target.value)}
        className="border-2 border-rysys-black rounded-none bg-white flex-1"
        placeholder="SIGNAL..."
        onKeyDown={e => e.key === 'Enter' && handleSend()}
      />
      <Button onClick={handleSend} className="bg-rysys-black text-white rounded-none px-4">
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
}