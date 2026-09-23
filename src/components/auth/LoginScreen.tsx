'use client';

import React, { useState } from 'react';
import { User } from '@/types/dkm';
import { Lock, Mail, ChevronRight, Info } from 'lucide-react';
import { MOCK_USERS } from '@/lib/mockData';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (user) {
      onLogin(user);
    } else {
      setError('Email atau password salah!');
    }
  };

  const handleQuickLogin = (user: User) => {
    onLogin(user);
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/wallpaper-masjid.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
          pointerEvents: 'none',
        }}
      />

      <div style={{ padding: '60px 24px 24px', position: 'relative', zIndex: 2 }}>
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 40 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Logo" style={{ width: 80, height: 80, marginBottom: 16, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }} />
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: 1, textAlign: 'center' }}>
            MASLAM DKM
          </h1>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: 4 }}>
            Manajemen Sistem Layanan Masjid
          </p>
        </div>

        {/* Login Form */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: 24,
            padding: 24,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: 8, display: 'block', opacity: 0.9 }}>
                Email Akun
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jamaah@dkm.id"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: 'rgba(0,0,0,0.2)',
                    color: 'white',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: 8, display: 'block', opacity: 0.9 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: 'rgba(0,0,0,0.2)',
                    color: 'white',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                  required
                />
              </div>
            </div>

            {error && (
              <div style={{ fontSize: '0.75rem', color: '#fca5a5', textAlign: 'center', fontWeight: 600 }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '14px',
                borderRadius: 12,
                fontWeight: 800,
                fontSize: '0.95rem',
                marginTop: 8,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.4)',
              }}
            >
              <span>Masuk Aplikasi</span>
              <ChevronRight size={18} />
            </button>
          </form>
        </div>

        {/* Quick Login Shortcuts */}
        <div style={{ marginTop: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, opacity: 0.8 }}>
            <Info size={14} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Quick Login (Untuk Testing):</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MOCK_USERS.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => handleQuickLogin(u)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '12px 16px',
                  borderRadius: 12,
                  color: 'white',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{u.nama}</div>
                  <div style={{ fontSize: '0.65rem', opacity: 0.7, marginTop: 2 }}>{u.role}</div>
                </div>
                <ChevronRight size={16} opacity={0.5} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
