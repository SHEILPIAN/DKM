'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone,
  Download,
  CheckCircle2,
  X,
  ExternalLink,
  Layers,
  Sparkles,
  QrCode,
  Share2,
} from 'lucide-react';

interface AndroidAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidAppModal: React.FC<AndroidAppModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'pwa' | 'apk'>('pwa');

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        'Untuk memasang di HP Android:\n1. Buka browser Chrome di HP Anda\n2. Tekan menu titik tiga (⋮) di pojok kanan atas\n3. Pilih "Tambahkan ke Layar Utama" / "Install Aplikasi"\n\nAplikasi DKM AL-Muhajirin akan otomatis terpasang dengan logo resmi!'
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-card"
        style={{ maxWidth: 560 }}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="modal-header" style={{ background: 'var(--primary-gradient)', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: '#ffffff',
                padding: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Logo AL-Muhajirin"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>
                Aplikasi HP Android DKM
              </h3>
              <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                AL-Muhajirin - Kayuringin Jaya Bekasi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Tab Switcher */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <button
              type="button"
              onClick={() => setActiveTab('pwa')}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 12,
                border: '1.5px solid',
                borderColor: activeTab === 'pwa' ? 'var(--primary)' : '#e2e8f0',
                background: activeTab === 'pwa' ? 'var(--primary-light)' : '#ffffff',
                color: activeTab === 'pwa' ? 'var(--primary-dark)' : '#64748b',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                cursor: 'pointer',
              }}
            >
              <Smartphone size={16} />
              <span>Pasang Langsung di HP (PWA)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('apk')}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 12,
                border: '1.5px solid',
                borderColor: activeTab === 'apk' ? 'var(--primary)' : '#e2e8f0',
                background: activeTab === 'apk' ? 'var(--primary-light)' : '#ffffff',
                color: activeTab === 'apk' ? 'var(--primary-dark)' : '#64748b',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                cursor: 'pointer',
              }}
            >
              <Layers size={16} />
              <span>Native Android APK (Capacitor)</span>
            </button>
          </div>

          {activeTab === 'pwa' ? (
            <div>
              <div
                style={{
                  background: '#f0fdf4',
                  borderRadius: 16,
                  border: '1px solid #bbf7d0',
                  padding: '16px',
                  marginBottom: 18,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                }}
              >
                <Sparkles size={24} style={{ color: '#059669', flexShrink: 0, marginTop: 2 }} />
                <div style={{ fontSize: '0.85rem', color: '#166534', lineHeight: 1.5 }}>
                  <strong>Aplikasi Siap Pasang di Layar HP Android Anda!</strong>
                  <p style={{ marginTop: 4 }}>
                    Sistem ini telah mendukung <em>Progressive Web App (PWA)</em> resmi dengan logo AL-Muhajirin.
                    Saat dipasang, aplikasi berjalan mandiri (full screen) tanpa browser bar.
                  </p>
                </div>
              </div>

              {/* Steps Guide */}
              <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.8, marginBottom: 20 }}>
                <div style={{ fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>
                  Langkah Pemasangan di HP Android:
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                    1
                  </span>
                  <span>Buka alamat web sistem ini di browser HP Android Anda (Google Chrome / Samsung Internet).</span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                    2
                  </span>
                  <span>Tekan tombol <strong>&ldquo;Pasang Aplikasi&rdquo;</strong> di bawah ini, atau menu titik tiga (⋮) Chrome.</span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                    3
                  </span>
                  <span>Pilih <strong>&ldquo;Tambahkan ke Layar Utama&rdquo;</strong> atau <strong>&ldquo;Install Aplikasi&rdquo;</strong>. Ikon MAM akan muncul di menu HP Anda!</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleInstallPWA}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.95rem' }}
              >
                <Download size={18} />
                <span>{isInstalled ? 'Aplikasi Sudah Terpasang' : 'Pasang Aplikasi di HP Android Ini'}</span>
              </button>
            </div>
          ) : (
            <div>
              <div
                style={{
                  background: '#f8fafc',
                  borderRadius: 16,
                  border: '1px solid #cbd5e1',
                  padding: '16px',
                  marginBottom: 18,
                  fontSize: '0.85rem',
                  color: '#334155',
                }}
              >
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
                  📱 Proyek Native Android (Capacitor) Sudah Dibuat:
                </div>
                <p style={{ lineHeight: 1.6 }}>
                  Folder native Android telah berhasil di-generate di folder <code>/android</code> dengan package name <code>org.almuhajirin.dkm</code> dan seluruh icon aplikasi telah diganti dengan logo resmi AL-Muhajirin.
                </p>
              </div>

              <div style={{ fontSize: '0.82rem', marginBottom: 20 }}>
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
                  Cara Build Menjadi File APK (.apk):
                </div>
                <div style={{ background: '#0f172a', color: '#38bdf8', padding: '14px 16px', borderRadius: 12, fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: 1.8, overflowX: 'auto' }}>
                  <div># 1. Buka proyek native di Android Studio:</div>
                  <div style={{ color: '#f8fafc' }}>npx cap open android</div>
                  <div style={{ marginTop: 6 }}># 2. Atau build APK langsung dengan Gradle:</div>
                  <div style={{ color: '#f8fafc' }}>cd android &amp;&amp; gradlew.bat assembleDebug</div>
                  <div style={{ marginTop: 6 }}># Output APK akan berada di:</div>
                  <div style={{ color: '#a7f3d0' }}>android/app/build/outputs/apk/debug/app-debug.apk</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText('npx cap open android');
                  alert('Perintah "npx cap open android" disalin ke clipboard!');
                }}
                className="btn-outline"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Salin Perintah Android Studio
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
