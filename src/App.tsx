import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Sidebar } from './components/Sidebar';
import { TransitMap } from './components/TransitMap';
import type { PathResult } from './utils/routingEngine';
import voiceGuidance from './utils/voiceGuidance';
import { runRouteDiagnostics } from './utils/diagnostics';
import type { DiagnosticTestResult } from './utils/diagnostics';
import { 
  Settings, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  Wifi, 
  WifiOff, 
  X,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // --- Transit Routing States ---
  const [startCoords, setStartCoords] = useState<[number, number] | null>(null);
  const [endCoords, setEndCoords] = useState<[number, number] | null>(null);
  const [startName, setStartName] = useState<string>('');
  const [endName, setEndName] = useState<string>('');
  const [routeResult, setRouteResult] = useState<PathResult | null>(null);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(null);

  // --- Bus Simulator States ---
  const [isPlayingSimulation, setIsPlayingSimulation] = useState<boolean>(false);
  const [simulationProgress, setSimulationProgress] = useState<number>(0);

  // --- Theme & Configuration States ---
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState<string>('');
  const [isVoiceMuted, setIsVoiceMuted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'routes' | 'stops' | 'favorites'>('routes');
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // --- Network Connection States ---
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // --- Favorites List State (Persisted in LocalStorage) ---
  const [favorites, setFavorites] = useState<any[]>([]);

  // --- Diagnostics System States ---
  const [diagnosticResults, setDiagnosticResults] = useState<DiagnosticTestResult[] | null>(null);
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState<boolean>(false);

  // Load Saved Favorites and Theme Preferences on mount
  useEffect(() => {
    const savedFavs = localStorage.getItem('kollam_transit_favs');
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch (e) {
        console.error(e);
      }
    }

    const savedTheme = localStorage.getItem('kollam_transit_theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    const savedApiKey = localStorage.getItem('kollam_transit_gkey');
    if (savedApiKey) {
      setGoogleMapsApiKey(savedApiKey);
    }
  }, []);

  // Update HTML data-theme attribute on toggle
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('kollam_transit_theme', nextTheme);
  };

  // Save Google Maps key locally
  const handleSaveApiKey = (key: string) => {
    setGoogleMapsApiKey(key);
    localStorage.setItem('kollam_transit_gkey', key);
  };

  // Monitor Browser Connectivity changes
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  // Run the automated route testing diagnostics
  const handleRunDiagnostics = () => {
    setIsRunningDiagnostics(true);
    setDiagnosticResults(null);
    
    // Smooth 600ms latency to look highly premium and technical
    setTimeout(() => {
      const tests = runRouteDiagnostics();
      setDiagnosticResults(tests);
      setIsRunningDiagnostics(false);
      
      // If all tests passed, trigger a mini confetti burst to celebrate system integrity!
      const allPassed = tests.every(t => t.passed);
      if (allPassed) {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { x: 0.8, y: 0.2 },
          colors: ['#10B981', '#0EA5E9']
        });
      }
    }, 600);
  };

  // --- SIMULATION TICK TIMER ---
  useEffect(() => {
    let timer: number;
    if (isPlayingSimulation && routeResult) {
      timer = window.setInterval(() => {
        setSimulationProgress((prev) => {
          if (prev >= 100) {
            // Bus arrived at destination!
            setIsPlayingSimulation(false);
            
            // Celebration confetti burst!
            confetti({
              particleCount: 150,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#0EA5E9', '#6366F1', '#10B981', '#F59E0B']
            });

            // Localized voice announcement of arrival!
            voiceGuidance.speak("Congratulations! You have arrived at your destination stop.");
            
            return 100;
          }

          const nextProgress = prev + 1; // Increment progress fraction

          // Sync progress with steps in Sidebar directions list
          // Map progress directly to active step card highlights
          const numSteps = routeResult.steps.length;
          const currentStepIdx = Math.min(
            Math.floor((nextProgress / 100) * numSteps),
            numSteps - 1
          );
          setSelectedStepIndex(currentStepIdx);

          return nextProgress;
        });
      }, 180); // Speed: moves 1% every 180ms (~18 seconds total animation)
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlayingSimulation, routeResult]);

  return (
    <div className={`app-container ${theme}`}>
      {/* Offline Mode Warning Banner */}
      {!isOnline && (
        <div 
          className="glass-panel" 
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            padding: '10px 20px',
            border: '1px solid var(--color-warning)',
            background: 'rgba(245, 158, 11, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            borderRadius: '12px',
            boxShadow: '0 0 15px rgba(245, 158, 11, 0.2)'
          }}
        >
          <WifiOff size={16} style={{ color: 'var(--color-warning)' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
            Offline Mode: Intelligent client-side Dijkstra navigation active!
          </span>
        </div>
      )}

      {isOnline && (
        <div 
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            padding: '6px 12px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            background: 'rgba(16, 185, 129, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '20px',
            pointerEvents: 'none',
            fontSize: '0.72rem',
            fontWeight: 600,
            color: 'var(--color-success)',
            letterSpacing: '0.02em',
            textTransform: 'uppercase'
          }}
        >
          <Wifi size={12} /> Connected Live
        </div>
      )}

      {/* Unified Left Sidebar Column */}
      <Sidebar 
        startCoords={startCoords}
        setStartCoords={setStartCoords}
        startName={startName}
        setStartName={setStartName}
        endCoords={endCoords}
        setEndCoords={setEndCoords}
        endName={endName}
        setEndName={setEndName}
        routeResult={routeResult}
        setRouteResult={setRouteResult}
        selectedStepIndex={selectedStepIndex}
        setSelectedStepIndex={setSelectedStepIndex}
        isPlayingSimulation={isPlayingSimulation}
        setIsPlayingSimulation={setIsPlayingSimulation}
        simulationProgress={simulationProgress}
        setSimulationProgress={setSimulationProgress}
        favorites={favorites}
        setFavorites={setFavorites}
        isVoiceMuted={isVoiceMuted}
        setIsVoiceMuted={setIsVoiceMuted}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Floating Settings Button & panel */}
      <div className="settings-panel">
        <button 
          className="icon-button glass-panel" 
          onClick={() => {
            setShowSettings(!showSettings);
            // Clear test panel when reopening settings
            if (!showSettings) setDiagnosticResults(null);
          }}
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          title="Transit Settings"
        >
          <Settings size={20} />
        </button>

        {showSettings && (
          <div className="settings-overlay-box glass-panel" style={{ width: '360px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', width: '100%' }}>
              <h3 style={{ flex: 1 }}>Navigation Dashboard</h3>
              <button 
                onClick={() => {
                  setShowSettings(false);
                  setDiagnosticResults(null);
                }}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Toggle Theme Row */}
            <div className="setting-row">
              <label>UI Theme Skin</label>
              <button className="icon-button" onClick={toggleTheme} style={{ width: '36px', height: '36px' }}>
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>

            {/* Toggle Voice Row */}
            <div className="setting-row">
              <label>Voice Synthesizer</label>
              <button 
                className="icon-button" 
                onClick={() => {
                  const val = !isVoiceMuted;
                  setIsVoiceMuted(val);
                  voiceGuidance.setMute(val);
                }} 
                style={{ width: '36px', height: '36px' }}
              >
                {isVoiceMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>

            {/* Google Maps SDK Key Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 500 }}>Google Maps API Key</label>
              <input 
                type="password"
                placeholder="Paste key to activate Google SDK"
                value={googleMapsApiKey}
                onChange={(e) => handleSaveApiKey(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-light)',
                  padding: '10px',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                Defaulting to sleek Leaflet rendering maps. Type/paste standard keys to override.
              </span>
            </div>

            {/* Client-Side Diagnostics Automated Test Suite Section */}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>System Integrity Tests</span>
                <button 
                  onClick={handleRunDiagnostics}
                  disabled={isRunningDiagnostics}
                  className="btn-primary"
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    flex: 'none'
                  }}
                >
                  {isRunningDiagnostics ? "Testing..." : "Run Diagnostics"}
                </button>
              </div>

              {/* Diagnostics Test Log display */}
              {diagnosticResults && (
                <div style={{ 
                  background: 'rgba(0,0,0,0.2)', 
                  border: '1px solid var(--border-light)', 
                  borderRadius: '10px', 
                  padding: '10px', 
                  maxHeight: '200px', 
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {diagnosticResults.map(test => (
                    <div key={test.id} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.74rem' }}>
                      {test.passed ? (
                        <CheckCircle2 size={14} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }} />
                      ) : (
                        <XCircle size={14} style={{ color: 'var(--color-danger)', flexShrink: 0, marginTop: '2px' }} />
                      )}
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontWeight: 600, display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <span>{test.name}</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>({test.durationMs}ms)</span>
                        </div>
                        <span style={{ color: test.passed ? 'var(--text-muted)' : 'var(--color-danger)', fontSize: '0.68rem', marginTop: '2px' }}>
                          {test.message}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      <TransitMap 
        startCoords={startCoords}
        endCoords={endCoords}
        routeResult={routeResult}
        selectedStepIndex={selectedStepIndex}
        isPlayingSimulation={isPlayingSimulation}
        simulationProgress={simulationProgress}
        theme={theme}
      />
      <Analytics />
    </div>
  );
}
