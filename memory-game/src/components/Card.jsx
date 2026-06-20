import React from 'react';

export default function Card({ state, onClick, floorEmoji, isHero, isExit }) {
  const base = {
    width: '100%',
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: state === 'idle' ? 'pointer' : 'default',
    fontSize: '1.4rem',
    border: '2px solid',
    borderRadius: 2,
    transition: 'all 0.15s',
    position: 'relative',
    userSelect: 'none',
    imageRendering: 'pixelated',
  };

  const styles = {
    idle: {
      background: '#1a1a2e',
      borderColor: isHero ? '#4fc3f7' : isExit ? '#f5c842' : '#2d3561',
    },
    path: {
      background: '#1e3a10',
      borderColor: '#f5c842',
      boxShadow: '0 0 0 2px #f5c842 inset',
      animation: 'pathPulse 0.7s ease-in-out infinite',
    },
    good: {
      background: '#1a3a1a',
      borderColor: '#4caf50',
    },
    bad: {
      background: '#3a1a1a',
      borderColor: '#e74c3c',
    },
    hover: {
      background: '#22223a',
      borderColor: '#2d3561',
    },
  };

  const content = {
    idle: isHero ? '🧑‍🦱' : isExit ? '🚪' : floorEmoji,
    path: isHero ? '🧑‍🦱' : isExit ? '🚪' : floorEmoji,
    good: '✅',
    bad: '❌',
  };

  return (
    <div
      style={{ ...base, ...(styles[state] || styles.idle) }}
      onClick={state === 'idle' ? onClick : undefined}
    >
      {content[state] ?? content.idle}
    </div>
  );
}
