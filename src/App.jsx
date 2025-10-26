import React, { useState, useMemo } from 'react';
import HeaderBrand from './components/HeaderBrand';
import RoleStep from './components/RoleStep';
import StudentStep from './components/StudentStep';
import ChatInterface from './components/ChatInterface';

const Container = ({ children }) => (
  <div className="min-h-screen w-full bg-neutral-950 relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(190,255,0,0.10),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(190,255,0,0.08),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(190,255,0,0.06),transparent_40%)]" />
    <div className="relative max-w-6xl mx-auto px-4">
      {children}
    </div>
  </div>
);

export default function App() {
  const [role, setRole] = useState(null); // 'student' | 'institute'
  const [standard, setStandard] = useState(null); // '1-10' | '11-12'
  const [stream, setStream] = useState(null); // 'science' | 'commerce' | 'humanities' | 'general'

  const readyForChat = useMemo(() => {
    if (role === 'student') {
      if (standard === '1-10' && stream === 'general') return true;
      if (standard === '11-12' && (stream === 'science' || stream === 'commerce' || stream === 'humanities')) return true;
    }
    return false;
  }, [role, standard, stream]);

  const showSidebar = useMemo(() => standard === '1-10', [standard]);

  return (
    <Container>
      <HeaderBrand />

      <main className="py-10">
        <div className="mx-auto max-w-4xl">
          {/* Step 1: Choose role */}
          {!role && (
            <section className="rounded-3xl bg-neutral-900/50 ring-1 ring-lime-400/40 p-8 shadow-[0_0_60px_rgba(190,255,0,0.25)]">
              <RoleStep value={role} onChange={setRole} />
            </section>
          )}

          {/* Step 2: Student details when role is student */}
          {role === 'student' && !readyForChat && (
            <section className="mt-8 rounded-3xl bg-neutral-900/50 ring-1 ring-lime-400/40 p-8 shadow-[0_0_60px_rgba(190,255,0,0.25)]">
              <StudentStep
                standard={standard}
                stream={stream}
                onStandard={(s) => {
                  setStandard(s);
                  setStream(null);
                }}
                onStream={(st) => setStream(st)}
              />
            </section>
          )}

          {/* Institute could be handled here in future */}
          {role === 'institute' && (
            <section className="mt-8 rounded-3xl bg-neutral-900/50 ring-1 ring-lime-400/40 p-8 shadow-[0_0_60px_rgba(190,255,0,0.25)]">
              <div className="text-neutral-200">
                Welcome, Institute Delegate. Please proceed to login or contact support. This section can be expanded with institute-specific dashboards.
              </div>
            </section>
          )}

          {/* Step 3: Chat interface */}
          {readyForChat && (
            <section className="mt-8 rounded-3xl p-6 ring-1 ring-lime-400/40 shadow-[0_0_60px_rgba(190,255,0,0.25)] bg-neutral-900/50">
              <div className="flex items-center justify-between mb-4">
                <div className="text-neutral-200 text-sm">
                  Role: <span className="text-lime-300 font-medium capitalize">{role}</span>
                  {standard && (
                    <>
                      <span className="mx-2">•</span>
                      <span>Class <span className="text-lime-300 font-medium">{standard}</span></span>
                    </>
                  )}
                  {stream && stream !== 'general' && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="capitalize">{stream}</span>
                    </>
                  )}
                </div>
                <button
                  onClick={() => {
                    setRole(null);
                    setStandard(null);
                    setStream(null);
                  }}
                  className="text-xs px-3 py-1 rounded-lg bg-neutral-800/60 text-neutral-300 ring-1 ring-lime-400/30 hover:ring-lime-400/60"
                >
                  Restart
                </button>
              </div>
              <ChatInterface showSidebar={showSidebar} />
            </section>
          )}
        </div>
      </main>
    </Container>
  );
}
