import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { BASE, HOURS, TIME_MULTIPLIERS, REGIONS } from '../data/threatData';
import { T } from '../i18n/translations';

export default function TimelineChart({ lang, filters }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);
  const t = T[lang];

  useEffect(() => {
    if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; }

    const tm = TIME_MULTIPLIERS[filters.time] ?? 1;
    const rm = REGIONS[filters.region]?.multiplier ?? 1;
    const m  = tm * rm;

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: HOURS,
        datasets: [
          {
            label:           t.tlDetect,
            data:            BASE.detected.map(v => Math.round(v * m)),
            borderColor:     '#dc267f',
            backgroundColor: 'rgba(220,38,127,0.12)',
            borderWidth:     2,
            pointRadius:     3,
            fill:            true,
            tension:         0.35,
          },
          {
            label:           t.tlBlocked,
            data:            BASE.blocked.map(v => Math.round(v * m * 0.79)),
            borderColor:     '#00FF99',
            backgroundColor: 'rgba(0,255,153,0.08)',
            borderWidth:     2,
            pointRadius:     3,
            fill:            true,
            tension:         0.35,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#C8E8FF', font: { size: 11 }, padding: 12 } },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          x: {
            title: { display: false },
            grid:  { color: 'rgba(0,210,255,0.06)' },
            ticks: { color: '#8BB8D4', font: { size: 9 }, maxTicksLimit: 12 },
          },
          y: {
            title: { display: true, text: t.tlYAxis, color: '#8BB8D4', font: { size: 10 } },
            grid:  { color: 'rgba(0,210,255,0.06)' },
            ticks: { color: '#8BB8D4', font: { size: 9 } },
          },
        },
      },
    });

    return () => { if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; } };
  }, [lang, filters]);

  return (
    <div style={{ position: 'relative', height: '180px', padding: '6px 8px 4px' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}