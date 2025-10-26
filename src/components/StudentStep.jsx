import React, { useMemo } from 'react';

const Pill = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm transition ${
      active
        ? 'bg-lime-400/20 text-lime-200 ring-1 ring-lime-400/70 shadow-[0_0_25px_rgba(190,255,0,0.35)]'
        : 'bg-neutral-900/60 text-neutral-300 ring-1 ring-lime-400/30 hover:ring-lime-400/50'
    }`}
  >
    {children}
  </button>
);

const OptionCard = ({ label, onClick, selected }) => (
  <button
    onClick={onClick}
    className={`relative w-full sm:w-48 rounded-xl p-5 text-left transition ${
      selected ? 'ring-2 ring-lime-400/80' : 'ring-1 ring-lime-400/40'
    } bg-neutral-900/60 backdrop-blur shadow-[0_0_35px_rgba(190,255,0,0.25)] hover:shadow-[0_0_45px_rgba(190,255,0,0.35)] hover:-translate-y-0.5`}
  >
    <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-br from-lime-400/10 to-transparent opacity-0 hover:opacity-100 transition" />
    <div className="text-neutral-100 font-medium">{label}</div>
  </button>
);

const StudentStep = ({ standard, stream, onStandard, onStream }) => {
  const showStream = useMemo(() => standard === '11-12', [standard]);

  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-neutral-100">Student Details</h2>
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <Pill active={standard === '1-10'} onClick={() => onStandard('1-10')}>Class 1–10</Pill>
          <Pill active={standard === '11-12'} onClick={() => onStandard('11-12')}>Class 11–12</Pill>
        </div>
        {standard && (
          <div className="flex gap-4">
            {standard === '1-10' && (
              <OptionCard label="Continue" onClick={() => onStream('general')} selected={true} />
            )}
            {standard === '11-12' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <OptionCard label="Science" onClick={() => onStream('science')} selected={stream === 'science'} />
                <OptionCard label="Commerce" onClick={() => onStream('commerce')} selected={stream === 'commerce'} />
                <OptionCard label="Humanities" onClick={() => onStream('humanities')} selected={stream === 'humanities'} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentStep;
