import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FileText, Plus, LogOut, Send, History, MessageSquare, Loader2, Search, User as UserIcon, RefreshCw
} from 'lucide-react';
import { isAuthed, authHeader, clearAuth, getUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from 'sonner';
import type { Doc, Message, Comment, UserPublic } from '@shared/types';
export function ForustPage() {
  const navigate = useNavigate();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [sharedMsgs, setSharedMsgs] = useState<Message[]>([]);
  const [users, setUsers] = useState<UserPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'shared' | 'direct'>('shared');
  // DM specific state
  const [peer, setPeer] = useState<UserPublic | null>(null);
  const [dmMsgs, setDmMsgs] = useState<Message[]>([]);
  const [dmLoading, setDmLoading] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const user = getUser();
  const fetchData = useCallback(async () => {
    try {
      const [dRes, mRes, uRes] = await Promise.all([
        fetch('/api/forust/docs', { headers: authHeader() }),
        fetch('/api/forust/messages', { headers: authHeader() }),
        fetch('/api/forust/users', { headers: authHeader() })
      ]);
      const [dJson, mJson, uJson] = await Promise.all([dRes.json(), mRes.json(), uRes.json()]);
      if (dJson.success) setDocs(dJson.data);
      if (mJson.success) setSharedMsgs(mJson.data);
      if (uJson.success) setUsers(uJson.data);
    } catch {
      toast.error('Sync failure');
    } finally {
      setLoading(false);
    }
  }, []);
  const fetchDmMessages = useCallback(async (pId: string) => {
    setDmLoading(true);
    try {
      const res = await fetch(`/api/forust/messages?peerId=${pId}`, { headers: authHeader() });
      const json = await res.json();
      if (json.success) setDmMsgs(json.data);
    } catch {
      toast.error('DM thread sync failed');
    } finally {
      setDmLoading(false);
    }
  }, []);
  useEffect(() => {
    if (!isAuthed()) {
      navigate('/signin');
    } else {
      fetchData();
    }
  }, [navigate, fetchData]);
  // Focus-based refresh
  useEffect(() => {
    const handleFocus = () => {
      if (activeTab === 'shared') {
        fetchData();
      } else if (activeTab === 'direct' && peer) {
        fetchDmMessages(peer.id);
      }
    };
    window.addEventListener('focus', handleFocus);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') handleFocus();
    });
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('visibilitychange', handleFocus);
    };
  }, [activeTab, peer, fetchData, fetchDmMessages]);
  const handleLogout = () => {
    clearAuth();
    navigate('/signin');
  };
  const filteredUsers = users.filter(u => 
    u.id !== user?.id && 
    (u.email.toLowerCase().includes(userSearch.toLowerCase()))
  );
  if (loading) return <div className="min-h-screen bg-rysys-cream flex items-center justify-center font-black uppercase tracking-widest animate-pulse">Initializing Portal...</div>;
  return (
    <div className="min-h-screen bg-rysys-cream text-rysys-black font-sans flex flex-col">
      <header className="h-20 bg-white border-b-4 border-rysys-black flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-rysys-gold border-3 border-rysys-black flex flex-col items-center justify-center shadow-brutal group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-brutal-hover transition-all leading-none overflow-hidden">
            <span className="text-white font-black text-[10px] select-none">RY</span>
            <span className="text-white font-black text-[10px] select-none">SYS</span>
          </div>
          <span className="font-black text-xl uppercase tracking-[0.1em]">for-US-t Portal</span>
        </Link>
        <div className="flex items-center gap-4">
          <Badge className="hidden sm:inline-flex bg-rysys-green-power text-white border-2 border-rysys-black rounded-none px-3 font-mono text-[10px]">
            NODE: {user?.email}
          </Badge>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="border-2 border-rysys-black rounded-none hover:bg-rysys-grey h-10 w-10">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Proposals & Docs</h2>
              <NewDocDialog onCreated={fetchData} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {docs.map(doc => (
                <DocCard key={doc.id} initialDoc={doc} />
              ))}
              {docs.length === 0 && (
                <div className="col-span-2 py-20 border-4 border-dashed border-rysys-black/20 flex flex-col items-center justify-center opacity-50 bg-white/30">
                  <FileText className="w-12 h-12 mb-4" />
                  <p className="font-black uppercase text-sm">No Active Proposals</p>
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Intelligence Feed</h2>
            <Tabs defaultValue="shared" onValueChange={(v) => setActiveTab(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-rysys-grey border-4 border-rysys-black rounded-none h-14 p-1">
                <TabsTrigger value="shared" className="data-[state=active]:bg-rysys-black data-[state=active]:text-white rounded-none font-black uppercase tracking-widest text-xs">Shared</TabsTrigger>
                <TabsTrigger value="direct" className="data-[state=active]:bg-rysys-black data-[state=active]:text-white rounded-none font-black uppercase tracking-widest text-xs">Direct</TabsTrigger>
              </TabsList>
              <TabsContent value="shared" className="mt-6">
                <Card className="border-4 border-rysys-black bg-white shadow-brutal flex flex-col h-[600px] rounded-none overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {sharedMsgs.map(m => (
                      <div key={m.id} className={`p-3 border-2 border-rysys-black ${m.fromId === user?.id ? 'bg-rysys-cream ml-4 shadow-brutal-hover' : 'bg-white mr-4 shadow-brutal-hover'}`}>
                        <div className="flex justify-between items-center mb-1 border-b border-rysys-black/10 pb-1">
                          <span className="text-[10px] font-black uppercase truncate max-w-[120px]">{m.fromId === user?.id ? 'You' : m.fromEmail}</span>
                          <span className="text-[8px] opacity-50 font-mono">{new Date(m.createdAt).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-sm font-medium mt-1">{m.text}</p>
                      </div>
                    ))}
                  </div>
                  <MessageComposer onSent={fetchData} />
                </Card>
              </TabsContent>
              <TabsContent value="direct" className="mt-6 space-y-4">
                <Card className="border-4 border-rysys-black bg-white p-4 rounded-none shadow-brutal-hover">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="SEARCH OPERATORS..." 
                      className="pl-10 border-2 border-rysys-black rounded-none bg-rysys-cream font-bold uppercase"
                      value={userSearch}
                      onChange={e => setUserSearch(e.target.value)}
                    />
                  </div>
                  <ScrollArea className="h-32">
                    <div className="space-y-1 pr-4">
                      {filteredUsers.map(u => (
                        <button
                          key={u.id}
                          onClick={() => { setPeer(u); fetchDmMessages(u.id); }}
                          className={`w-full text-left p-2 border-2 transition-all font-black uppercase text-[10px] tracking-widest ${peer?.id === u.id ? 'bg-rysys-gold text-white border-rysys-black' : 'hover:bg-rysys-grey border-transparent'}`}
                        >
                          {u.email}
                        </button>
                      ))}
                      {filteredUsers.length === 0 && (
                        <p className="text-center text-[10px] font-bold opacity-30 py-4 uppercase">No Nodes Found</p>
                      )}
                    </div>
                  </ScrollArea>
                </Card>
                {peer ? (
                  <Card className="border-4 border-rysys-black bg-white shadow-brutal flex flex-col h-[450px] rounded-none overflow-hidden relative">
                    <div className="p-3 bg-rysys-black text-white flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-rysys-gold" />
                        <span className="text-[10px] font-black uppercase truncate max-w-[150px]">{peer.email}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => fetchDmMessages(peer.id)}
                        className="h-6 w-6 hover:bg-white/10"
                      >
                        <RefreshCw className={`w-3 h-3 ${dmLoading ? 'animate-spin' : ''}`} />
                      </Button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-rysys-cream/10">
                      {dmMsgs.map(m => (
                        <div key={m.id} className={`max-w-[85%] p-3 border-2 border-rysys-black ${m.fromId === user?.id ? 'ml-auto bg-rysys-gold text-white shadow-brutal-hover' : 'mr-auto bg-white shadow-brutal-hover'}`}>
                          <p className="text-sm font-bold leading-snug">{m.text}</p>
                          <div className={`mt-1 text-[8px] font-mono opacity-60 text-right ${m.fromId === user?.id ? 'text-white' : ''}`}>
                            {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ))}
                      {dmMsgs.length === 0 && !dmLoading && (
                        <div className="h-full flex flex-col items-center justify-center opacity-30 text-center py-10">
                          <MessageSquare className="w-8 h-8 mb-2" />
                          <p className="text-[10px] font-black uppercase">Start Secure Session</p>
                        </div>
                      )}
                    </div>
                    <MessageComposer peerId={peer.id} onSent={() => fetchDmMessages(peer.id)} />
                  </Card>
                ) : (
                  <div className="h-[450px] border-4 border-dashed border-rysys-black/20 flex flex-col items-center justify-center opacity-50 bg-white/30 text-center px-8">
                    <UserIcon className="w-12 h-12 mb-4" />
                    <p className="font-black uppercase text-xs tracking-widest leading-loose">Select a peer node to initiate <br/> private communications</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
function DocCard({ initialDoc }: { initialDoc: Doc }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="p-6 border-4 border-rysys-black shadow-brutal hover:shadow-brutal-gold hover:-translate-y-1 transition-all cursor-pointer bg-white rounded-none group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-rysys-grey border-2 border-rysys-black flex items-center justify-center group-hover:bg-rysys-gold transition-colors">
              <FileText className="w-5 h-5 group-hover:text-white transition-colors" />
            </div>
            <Badge className="bg-white border-2 border-rysys-black text-rysys-black rounded-none font-mono text-[10px]">
              V{initialDoc.versions.length}
            </Badge>
          </div>
          <h3 className="text-xl font-black uppercase tracking-tighter mb-2 group-hover:text-rysys-gold transition-colors">{initialDoc.title}</h3>
          <p className="text-[10px] font-bold text-muted-foreground uppercase">Updated {new Date(initialDoc.updatedAt).toLocaleDateString()}</p>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-5xl rounded-none border-4 border-rysys-black bg-rysys-cream p-0 shadow-brutal-lg overflow-hidden outline-none">
        <DocViewer doc={initialDoc} />
      </DialogContent>
    </Dialog>
  );
}
function DocViewer({ doc: initialDoc }: { doc: Doc }) {
  const [doc, setDoc] = useState<Doc>(initialDoc);
  const [activeVer, setActiveVer] = useState(doc.versions[doc.versions.length - 1]?.version ?? 1);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [newVersionContent, setNewVersionContent] = useState('');
  const [isCommitting, setIsCommitting] = useState(false);
  const fetchComments = useCallback(async () => {
    setCommentsLoading(true);
    try {
      const res = await fetch(`/api/forust/docs/${doc.id}/comments`, { headers: authHeader() });
      const json = await res.json();
      if (json.success) setComments(json.data);
    } catch {
      toast.error('Failed to load intelligence feed');
    } finally {
      setCommentsLoading(false);
    }
  }, [doc.id]);
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);
  const handlePostComment = async () => {
    if (newComment.length < 2) return;
    setIsPostingComment(true);
    try {
      const res = await fetch(`/api/forust/docs/${doc.id}/comments`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ version: activeVer, text: newComment })
      });
      const json = await res.json();
      if (json.success) {
        setComments(prev => [...prev, json.data]);
        setNewComment('');
        toast.success('Comment logged');
      }
    } catch {
      toast.error('Communication error');
    } finally {
      setIsPostingComment(false);
    }
  };
  const handleCommitVersion = async () => {
    if (!newVersionContent.trim()) return;
    setIsCommitting(true);
    try {
      const res = await fetch(`/api/forust/docs/${doc.id}/versions`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ content: newVersionContent })
      });
      const json = await res.json();
      if (json.success) {
        setDoc(json.data);
        setActiveVer(json.data.versions.length);
        setNewVersionContent('');
        toast.success('Protocol updated to V' + json.data.versions.length);
      }
    } catch {
      toast.error('System failure during commit');
    } finally {
      setIsCommitting(false);
    }
  };
  const currentVersion = doc.versions.find(v => v.version === activeVer) || doc.versions[doc.versions.length - 1];
  const verComments = comments.filter(c => c.version === activeVer);
  return (
    <div className="flex flex-col h-[85vh] lg:h-[90vh]">
      <div className="p-6 border-b-4 border-rysys-black bg-white flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-black uppercase tracking-tighter">{doc.title}</h2>
          </div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">INFRASTRUCTURE ID: {doc.id}</p>
        </div>
        <div className="flex items-center gap-3">
          <History className="w-4 h-4 text-rysys-gold" />
          <select
            value={activeVer}
            onChange={(e) => setActiveVer(Number(e.target.value))}
            className="border-3 border-rysys-black bg-white px-3 py-1.5 font-mono text-sm font-black outline-none focus:ring-2 focus:ring-rysys-gold"
          >
            {[...doc.versions].reverse().map(v => (
              <option key={v.version} value={v.version}>VERSION {v.version}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8 font-mono text-sm leading-relaxed bg-white/40 border-b-4 lg:border-b-0 lg:border-r-4 border-rysys-black">
          <pre className="whitespace-pre-wrap">{currentVersion.content}</pre>
          <div className="mt-12 pt-8 border-t-4 border-rysys-black">
            <h4 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Commit Iteration
            </h4>
            <div className="bg-white border-3 border-rysys-black p-4 shadow-brutal-hover">
              <Textarea
                value={newVersionContent}
                onChange={e => setNewVersionContent(e.target.value)}
                placeholder="INPUT UPDATED SPECIFICATIONS..."
                className="min-h-[120px] border-none bg-transparent font-mono focus-visible:ring-0 resize-none p-0"
              />
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={handleCommitVersion}
                  disabled={!newVersionContent.trim() || isCommitting}
                  className="bg-rysys-black text-white rounded-none font-black uppercase h-10 px-6 shadow-brutal hover:shadow-brutal-gold transition-all"
                >
                  {isCommitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  DEPLOY V{doc.versions.length + 1}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[400px] flex flex-col bg-white overflow-hidden">
          <div className="p-4 border-b-2 border-rysys-black bg-rysys-grey/30 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <h3 className="text-xs font-black uppercase tracking-widest">Intelligence Feed (V{activeVer})</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {commentsLoading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-rysys-grey/50 animate-pulse border-2 border-rysys-black/10" />
              ))
            ) : verComments.length > 0 ? (
              verComments.map(c => (
                <div key={c.id} className="p-3 border-2 border-rysys-black shadow-brutal-hover bg-rysys-cream/20">
                  <div className="flex justify-between items-center mb-1 text-[8px] font-black uppercase border-b border-rysys-black/5 pb-1">
                    <span className="text-rysys-gold">{c.authorEmail}</span>
                    <span className="opacity-40">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs font-medium leading-relaxed">{c.text}</p>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-30 border-4 border-dashed border-rysys-black/10 p-8 text-center">
                <MessageSquare className="w-8 h-8 mb-2" />
                <p className="text-[10px] font-black uppercase">No Intelligence Logged</p>
              </div>
            )}
          </div>
          <div className="p-4 border-t-4 border-rysys-black bg-rysys-cream">
            <Textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="LOG COMMENTARY..."
              className="border-2 border-rysys-black bg-white rounded-none text-xs font-bold min-h-[80px] focus-visible:ring-rysys-gold"
            />
            <Button
              onClick={handlePostComment}
              disabled={newComment.length < 2 || isPostingComment}
              className="w-full mt-2 bg-rysys-black text-white rounded-none font-black uppercase text-[10px] h-10 shadow-brutal hover:shadow-brutal-gold transition-all"
            >
              {isPostingComment ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Send className="w-3 h-3 mr-2" />}
              Transmit Intelligence
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
function NewDocDialog({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sharing, setSharing] = useState('');
  const [open, setOpen] = useState(false);
  const handleSubmit = async () => {
    if (!title || !content) return;
    try {
      const res = await fetch('/api/forust/docs', {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ title, content, shareWith: sharing.split(',').map(s => s.trim()).filter(Boolean) })
      });
      if (res.ok) {
        toast.success('Proposal Drafted');
        onCreated();
        setTitle(''); setContent(''); setSharing('');
        setOpen(false);
      }
    } catch {
      toast.error('System error');
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-rysys-black text-white rounded-none font-black uppercase shadow-brutal hover:shadow-brutal-gold transition-all h-12 px-6">
          <Plus className="w-4 h-4 mr-2" /> New Proposal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg rounded-none border-4 border-rysys-black bg-white p-8 shadow-brutal-lg outline-none">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black uppercase tracking-tighter">Create Technical Proposal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest">Title</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} className="border-2 border-rysys-black rounded-none bg-rysys-cream font-bold" placeholder="E.G. GRID_PROTOCOL_V1" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest">Share with (Emails, comma separated)</label>
            <Input value={sharing} onChange={e => setSharing(e.target.value)} className="border-2 border-rysys-black rounded-none bg-rysys-cream font-bold" placeholder="ENG@RYSYS.ORG" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest">Initial Content</label>
            <Textarea value={content} onChange={e => setContent(e.target.value)} className="border-2 border-rysys-black rounded-none bg-rysys-cream min-h-[200px] font-mono" placeholder="DEFINE SYSTEM ARCHITECTURE..." />
          </div>
          <Button onClick={handleSubmit} className="w-full bg-rysys-green-power text-white h-14 rounded-none font-black uppercase shadow-brutal hover:shadow-brutal-gold transition-all mt-4">
            Deploy Proposal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
function MessageComposer({ onSent, peerId }: { onSent: () => void, peerId?: string }) {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const handleSend = async () => {
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch('/api/forust/messages', {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 
          toEmail: peerId ? undefined : 'support', 
          toUserId: peerId,
          text 
        })
      });
      if (res.ok) {
        setText('');
        onSent();
      }
    } catch {
      toast.error('Transmission failed');
    } finally {
      setSending(false);
    }
  };
  return (
    <div className="p-4 border-t-4 border-rysys-black bg-rysys-cream flex gap-2">
      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        className="border-2 border-rysys-black rounded-none bg-white flex-1 font-bold"
        placeholder={peerId ? "SECURE SIGNAL..." : "BROADCAST..."}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
        disabled={sending}
      />
      <Button 
        onClick={handleSend} 
        disabled={sending || !text.trim()}
        className="bg-rysys-black text-white rounded-none px-4 hover:bg-rysys-green-power hover:shadow-brutal-hover transition-all"
      >
        {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
      </Button>
    </div>
  );
}