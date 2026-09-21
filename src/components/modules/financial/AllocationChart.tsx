'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { KategoriKas } from '@/types/dkm';
import { formatRupiah } from './AnalyticsCards';

interface AllocationChartProps {
  kategoriKas: KategoriKas[];
}

export const AllocationChart: React.FC<AllocationChartProps> = ({ kategoriKas }) => {
  const data = kategoriKas.map((k) => ({
    name: k.nama.split('&')[0].trim(),
    fullName: k.nama,
    value: k.saldo,
    color: k.color || '#10b981',
    percent: k.alokasiPersen || 25,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div
          style={{
            background: '#ffffff',
            padding: '10px 14px',
            borderRadius: '10px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
            border: '1px solid #e2e8f0',
          }}
        >
          <p style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>{item.fullName}</p>
          <p style={{ color: item.color, fontWeight: 700, fontSize: '0.9rem' }}>
            {formatRupiah(item.value)}
          </p>
          <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Porsi Kas: ~{item.percent}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Alokasi Kas Masjid</h2>
          <p className="panel-subtitle">Sebaran dana per pos anggaran DKM</p>
        </div>
      </div>

      <div style={{ width: '100%', height: 220, position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>TOTAL POS</span>
          <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>
            {kategoriKas.length}
          </p>
        </div>
      </div>

      {/* Legend list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
        {data.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.78rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  backgroundColor: item.color,
                }}
              />
              <span style={{ color: '#334155', fontWeight: 600 }}>{item.name}</span>
            </div>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>{formatRupiah(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
