import { useState, useEffect } from 'react';

const STORY1 = "Ben est allé s'aventurer dans la forêt de Brocéliande, bannie par les villageois depuis des années. En s'y aventurant, il attire l'attention d'une sorcière, la brume se referme autour de lui.";

const STORY2_PARTS = [
  { text: "Entre la vie et la mort, Ben n'a qu'un seul espoir : retrouver le bon chemin. ", yellow: false },
  { text: "Mémorise chaque bonne case dans le bon ordre ", yellow: true },
  { text: "pour l'aider à échapper à son destin et revenir sain et sauf au village.", yellow: false },
];

const STORY2 = STORY2_PARTS.map(p => p.text).join('');

export default function Intro({ onDone }) {
  const [phase, setPhase] = useState('loading'); // 'loading' | 'story1' | 'story2'
  const [progress, setProgress] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  const currentStory = phase === 'story1' ? STORY1 : STORY2;
  const storyDone = charIndex >= currentStory.length;

  // ── Loading bar: fills over 3 seconds
  useEffect(() => {
    if (phase !== 'loading') return;
    const start = Date.now();
    const duration = 3000;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => setPhase('story1'), 300);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [phase]);

  // ── Typewriter with typing sound
  useEffect(() => {
    if (phase !== 'story1' && phase !== 'story2') return;
    if (charIndex >= currentStory.length) return;
    const t = setTimeout(() => {
      setDisplayed(currentStory.slice(0, charIndex + 1));
      setCharIndex(i => i + 1);
    }, 35);
    return () => clearTimeout(t);
  }, [phase, charIndex, currentStory]);

  // ── Go to story2
  const goToStory2 = () => {
    setDisplayed('');
    setCharIndex(0);
    setPhase('story2');
  };

  // ── Render story2 with yellow highlight
  const renderStory2 = () => {
    let remaining = displayed;
    return STORY2_PARTS.map((part, i) => {
      if (remaining.length === 0) return null;
      const chunk = remaining.slice(0, part.text.length);
      remaining = remaining.slice(part.text.length);
      return (
        <span key={i} style={{ color: part.yellow ? '#f5c518' : '#ffffff' }}>
          {chunk}
        </span>
      );
    });
  };

  return (
    <div style={{
      width: '100vw', height: '100vh', background: '#000',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>

      {/* ── LOADING SCREEN ── */}
      {phase === 'loading' && (
        <div style={{ textAlign: 'center', width: 420 }}>
          <div style={{
            fontFamily: "'Press Start 2P'", fontSize: 28, color: '#f5c518',
            textShadow: '0 0 20px rgba(245,197,24,.8), 3px 3px 0 #3a2a00',
            marginBottom: 40, letterSpacing: 2,
          }}>
            LOADING
          </div>

          <div style={{
            width: '100%', height: 18,
            background: 'rgba(255,255,255,0.1)',
            border: '2px solid rgba(245,197,24,0.5)',
            borderRadius: 10, overflow: 'hidden',
          }}>
            <div style={{
              width: `${progress}%`, height: '100%',
              background: 'linear-gradient(90deg, #f5c518, #ffdd00)',
              boxShadow: '0 0 10px rgba(245,197,24,0.8)',
              borderRadius: 10,
              transition: 'width 0.03s linear',
            }} />
          </div>

          <div style={{
            fontFamily: "'Press Start 2P'", fontSize: 10,
            color: '#f5c518', marginTop: 12, opacity: 0.7,
          }}>
            {Math.floor(progress)}%
          </div>
        </div>
      )}

      {/* ── STORY 1 SCREEN ── */}
      {phase === 'story1' && (
        <div style={{ maxWidth: 620, padding: '0 40px', textAlign: 'left' }}>
          <div style={{
            fontFamily: "'Determination Sans', monospace",
            fontSize: 18, color: '#ffffff',
            lineHeight: 2.2, letterSpacing: 1, minHeight: 160,
          }}>
            {displayed}
            {!storyDone && (
              <span style={{ animation: 'blink 0.7s step-end infinite' }}>▌</span>
            )}
          </div>

          {storyDone && (
            <button onClick={goToStory2} style={btnStyle}>▶ SUITE</button>
          )}
        </div>
      )}

      {/* ── STORY 2 SCREEN ── */}
      {phase === 'story2' && (
        <div style={{ maxWidth: 620, padding: '0 40px', textAlign: 'left' }}>
          <div style={{
            fontFamily: "'Determination Sans', monospace",
            fontSize: 18, lineHeight: 2.2, letterSpacing: 1, minHeight: 160,
          }}>
            {renderStory2()}
            {!storyDone && (
              <span style={{ color: '#fff', animation: 'blink 0.7s step-end infinite' }}>▌</span>
            )}
          </div>

          {storyDone && (
            <button onClick={onDone} style={btnStyle}>▶ COMMENCER</button>
          )}
        </div>
      )}

      <style>{`
        @font-face {
          font-family: 'Determination Sans';
          src: url('/fonts/determination.ttf') format('truetype');
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}

const btnStyle = {
  marginTop: 40,
  fontFamily: "'Press Start 2P'", fontSize: 11,
  color: '#f5c518', background: 'transparent',
  border: '2px solid #f5c518', borderRadius: 8,
  padding: '12px 28px', cursor: 'pointer', letterSpacing: 2,
  animation: 'blink 1.2s step-end infinite',
};