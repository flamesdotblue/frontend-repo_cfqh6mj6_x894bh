import React from 'react';

const Card = ({ children, onClick, selected }) => (
  <button
    onClick={onClick}
    className={`group relative w-full sm:w-72 rounded-2xl p-6 text-left transition transform hover:-translate-y-0.5 focus:-translate-y-0.5 outline-none ${
      selected ? 'ring-2 ring-lime-400/80' : 'ring-1 ring-lime-400/40'
    } bg-neutral-900/60 backdrop-blur shadow-[0_0_35px_rgba(190,255,0,0.25)] hover:shadow-[0_0_45px_rgba(190,255,0,0.35)]`}
  >
    <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-lime-400/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
    {children}
  </button>
);

const RoleStep = ({ value, onChange }) => {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-100">
        Who are you?
      </h1>
      <p className="text-neutral-400 text-sm max-w-md text-center">
        Choose your role to get a tailored experience.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Card onClick={() => onChange('student')} selected={value === 'student'}>
          <div className="flex flex-col gap-2">
            <div className="text-lg font-medium text-neutral-100">Student</div>
            <div className="text-neutral-400 text-sm">Learn with a guided, chat-first interface.</div>
          </div>
        </Card>
        <Card onClick={() => onChange('institute')} selected={value === 'institute'}>
          <div className="flex flex-col gap-2">
            <div className="text-lg font-medium text-neutral-100">Institute Delegate</div>
            <div className="text-neutral-400 text-sm">Manage cohorts, track progress and insights.</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RoleStep;
