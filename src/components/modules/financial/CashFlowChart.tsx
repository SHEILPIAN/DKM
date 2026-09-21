'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Transaksi } from '@/types/dkm';
import { formatRupiah } from './AnalyticsCards';

interface CashFlowChartProps {
  transaksi: Transaksi[];
}

export const CashFlowChart: React.FC<CashFlowChartProps> = ({ transaksi }) => {
  // Rekapitulasi tren mingguan
  const chartData = [
    { name: 'Pekan 1 (1-7 Sep)', masuk: 10500000, keluar: 4000000 },
    { name: 'Pekan 2 (8-14 Sep)', masuk: 19000000, keluar: 4200000 },
    { name: 'Pekan 3 (15-21 Sep)', masuk: 17500000, keluar: 4950000 },
    { name: 'Pekan 4 (Estimasi)', masuk: 14000000, keluar: 3800000 },
  ];

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: '#ffffff',
            padding: '12px 16px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0',
          }}
        >
          <p style={{ fontWeight: 700, marginBottom: 6, fontSize: '0.85rem' }}>{label}</p>
          <p style={{ color: '#059669', fontSize: '0.8rem', fontWeight: 600 }}>
            Infaq Masuk: {formatRupiah(payload[0].value)}
          </p>
          <p style={{ color: '#e11d48', fontSize: '0.8rem', fontWeight: 600 }}>
            Pengeluaran: {formatRupiah(payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Arus Kas Masjid (Cash Flow)</h2>
          <p className="panel-subtitle">Perbandingan Infaq Masuk vs Keluar Periode September 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 8, fontSize: '0.75rem', fontWeight: 700 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#059669' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#059669' }}></span>
            Pemasukan (IN)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#e11d48' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#e11d48' }}></span>
            Pengeluaran (OUT)
          </span>
        </div>
      </div>

      <div style={{ width: '100%', height: 310 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v / 1000000}jt`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="masuk"
              stroke="#059669"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorIn)"
            />
            <Area
              type="monotone"
              dataKey="keluar"
              stroke="#e11d48"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorOut)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
