import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, BookOpen, FlaskConical, Languages, Globe2 } from 'lucide-react';

const SubjectButton = ({ label, active, onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition text-left ${
      active
        ? 'bg-neutral-800/80 text-lime-200 ring-1 ring-lime-400/60 shadow-[0_0_25px_rgba(190,255,0,0.3)]'
        : 'text-neutral-300 hover:bg-neutral-800/40 ring-1 ring-lime-400/20 hover:ring-lime-400/40'
    }`}
  >
    <Icon className="h-4 w-4 text-lime-300" />
    <span>{label}</span>
  </button>
);

const ChatBubble = ({ role, text }) => (
  <div className={`max-w-[80%] rounded-2xl px-4 py-2 ring-1 shadow-[0_0_25px_rgba(190,255,0,0.25)] ${
    role === 'user'
      ? 'self-end bg-lime-400/15 ring-lime-400/60 text-lime-100'
      : 'self-start bg-neutral-900/70 ring-lime-400/30 text-neutral-100'
  }`}>
    {text}
  </div>
);

const ChatInterface = ({ showSidebar }) => {
  const [subject, setSubject] = useState('Math');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I am your study buddy. Ask me anything.' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    const reply = {
      role: 'assistant',
      text: `Let's explore ${subject}: ${input}`,
    };
    setMessages((m) => [...m, userMsg, reply]);
    setInput('');
  };

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-6">
      {showSidebar && (
        <aside className="lg:col-span-3 space-y-3 p-4 rounded-2xl bg-neutral-900/60 ring-1 ring-lime-400/40 shadow-[0_0_35px_rgba(190,255,0,0.25)]">
          <div className="flex items-center gap-2 text-neutral-200 font-medium mb-2">
            <MessageSquare className="h-4 w-4 text-lime-300" /> Subjects
          </div>
          <SubjectButton label="Math" icon={BookOpen} active={subject === 'Math'} onClick={() => setSubject('Math')} />
          <SubjectButton label="Science" icon={FlaskConical} active={subject === 'Science'} onClick={() => setSubject('Science')} />
          <SubjectButton label="English" icon={Languages} active={subject === 'English'} onClick={() => setSubject('English')} />
          <SubjectButton label="Hindi" icon={Languages} active={subject === 'Hindi'} onClick={() => setSubject('Hindi')} />
          <SubjectButton label="Social Science" icon={Globe2} active={subject === 'Social Science'} onClick={() => setSubject('Social Science')} />
        </aside>
      )}

      <section className={`${showSidebar ? 'lg:col-span-9' : 'lg:col-span-12'} flex flex-col rounded-2xl bg-neutral-900/60 ring-1 ring-lime-400/40 shadow-[0_0_35px_rgba(190,255,0,0.25)]`}>        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <ChatBubble key={i} role={m.role} text={m.text} />
          ))}
          <div ref={endRef} />
        </div>
        <div className="p-3 border-t border-lime-400/20 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-neutral-800/70 text-neutral-100 rounded-xl px-4 py-2 outline-none ring-1 ring-lime-400/40 focus:ring-lime-400/70 placeholder-neutral-500"
            placeholder={`Ask about ${subject}...`}
          />
          <button
            onClick={handleSend}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-lime-400/20 text-lime-100 ring-1 ring-lime-400/60 shadow-[0_0_25px_rgba(190,255,0,0.3)] hover:bg-lime-400/30"
          >
            <Send className="h-4 w-4 text-lime-200" /> Send
          </button>
        </div>
      </section>
    </div>
  );
};

export default ChatInterface;
