import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { BASE, HOURS, TIME_MULTIPLIERS, REGIONS } from '../data/threatData';
import { T } from '../i18n/translations';

export default function HourlyChart({ lang, filters }) {
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
      type: 'bar',
      data: {
        labels: HOURS,
        datasets: [
          {
            label:           t.hrDetect,
            data:            BASE.detected.map(v => Math.round(v * m)),
            backgroundColor: 'rgba(220,38,127,0.55)',
            borderColor:     '#dc267f',
            borderWidth:     1,
            borderRadius:    3,
          },
          {
            label:           t.hrBlocked,
            data:            BASE.blocked.map(v => Math.round(v * m * 0.79)),
            backgroundColor: 'rgba(0,255,153,0.45)',
            borderColor:     '#00FF99',
            borderWidth:     1,
            borderRadius:    3,
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
            title: { display: true, text: t.hrXAxis, color: '#8BB8D4', font: { size: 10 } },
            grid:  { display: false },
            ticks: { color: '#8BB8D4', font: { size: 9 }, maxTicksLimit: 12 },
          },
          y: {
            title: { display: true, text: t.hrYAxis, color: '#8BB8D4', font: { size: 10 } },
            grid:  { color: 'rgba(0,210,255,0.06)' },
            ticks: { color: '#8BB8D4', font: { size: 9 } },
          },
        },
      },
    });

    return () => { if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; } };
  }, [lang, filters]);

  return (
    <div style={{ position: 'relative', height: '200px', padding: '6px 8px 4px' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}