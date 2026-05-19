import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  MapPin, 
  Map, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  Search, 
  Star, 
  Trash2, 
  Info,
  ChevronLeft,
  Grid
} from 'lucide-react';
import { stopsData } from '../data/transitData';
import type { Stop } from '../data/transitData';
import { calculateRoute } from '../utils/routingEngine';
import type { PathResult } from '../utils/routingEngine';
import voiceGuidance from '../utils/voiceGuidance';

interface SidebarProps {
  startCoords: [number, number] | null;
  setStartCoords: (coords: [number, number] | null) => void;
  startName: string;
  setStartName: (name: string) => void;
  endCoords: [number, number] | null;
  setEndCoords: (coords: [number, number] | null) => void;
  endName: string;
  setEndName: (name: string) => void;
  routeResult: PathResult | null;
  setRouteResult: (result: PathResult | null) => void;
  
  selectedStepIndex: number | null;
  setSelectedStepIndex: (index: number | null) => void;
  
  isPlayingSimulation: boolean;
  setIsPlayingSimulation: (playing: boolean) => void;
  simulationProgress: number;
  setSimulationProgress: (progress: number) => void;
  
  favorites: Array<{ id: string; name: string; startName: string; endName: string; startCoords: [number, number]; endCoords: [number, number] }>;
  setFavorites: React.Dispatch<React.SetStateAction<any[]>>;
  
  isVoiceMuted: boolean;
  setIsVoiceMuted: (muted: boolean) => void;
  
  activeTab: 'routes' | 'stops' | 'favorites';
  setActiveTab: (tab: 'routes' | 'stops' | 'favorites') => void;
}

export function Sidebar({
  startCoords,
  setStartCoords,
  startName,
  setStartName,
  endCoords,
  setEndCoords,
  endName,
  setEndName,
  routeResult,
  setRouteResult,
  selectedStepIndex,
  setSelectedStepIndex,
  isPlayingSimulation,
  setIsPlayingSimulation,
  simulationProgress,
  setSimulationProgress,
  favorites,
  setFavorites,
  isVoiceMuted,
  setIsVoiceMuted,
  activeTab,
  setActiveTab
}: SidebarProps) {
  // Input search strings
  const [sourceSearch, setSourceSearch] = useState(startName);
  const [destSearch, setDestSearch] = useState(endName);
  
  // Suggestion list visibility
  const [sourceSuggestions, setSourceSuggestions] = useState<Stop[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<Stop[]>([]);
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  // General Stop search (Stops list tab)
  const [generalStopSearch, setGeneralStopSearch] = useState('');

  // Handle typing inside Source field
  const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSourceSearch(val);
    setStartName(val);
    if (val.trim().length > 0) {
      const filtered = stopsData.filter(stop => 
        stop.name.toLowerCase().includes(val.toLowerCase())
      );
      setSourceSuggestions(filtered);
      setShowSourceDropdown(true);
    } else {
      setSourceSuggestions([]);
      setShowSourceDropdown(false);
      setStartCoords(null);
    }
  };

  // Handle typing inside Destination field
  const handleDestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDestSearch(val);
    setEndName(val);
    if (val.trim().length > 0) {
      const filtered = stopsData.filter(stop => 
        stop.name.toLowerCase().includes(val.toLowerCase())
      );
      setDestSuggestions(filtered);
      setShowDestDropdown(true);
    } else {
      setDestSuggestions([]);
      setShowDestDropdown(false);
      setEndCoords(null);
    }
  };

  // Select a source stop suggestion
  const selectSourceStop = (stop: Stop) => {
    setSourceSearch(stop.name);
    setStartName(stop.name);
    setStartCoords([stop.lat, stop.lng]);
    setShowSourceDropdown(false);
  };

  // Select a destination stop suggestion
  const selectDestStop = (stop: Stop) => {
    setDestSearch(stop.name);
    setEndName(stop.name);
    setEndCoords([stop.lat, stop.lng]);
    setShowDestDropdown(false);
  };

  // Trigger search navigation calculation
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startCoords && endCoords) {
      const res = calculateRoute(startCoords[0], startCoords[1], endCoords[0], endCoords[1]);
      setRouteResult(res);
      setSelectedStepIndex(0);
      setIsPlayingSimulation(false);
      setSimulationProgress(0);
    } else {
      alert("Please select valid stops from the dropdown lists.");
    }
  };

  // Geolocation lookup for Current Location
  const handleGpsSource = () => {
    setSourceSearch("Locating GPS...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          
          // Verify if inside or near Kollam bounds (approximate Kollam coordinates 8.8 to 9.1 lat, 76.5 to 77.0 lng)
          // For demo convenience, let's pick a mock GPS point near Chinnakada if GPS gives a standard foreign location,
          // but if it is in Kerala we use the real one. Let's make it a smart helper.
          const isNearKollam = lat >= 8.5 && lat <= 9.3 && lng >= 76.2 && lng <= 77.2;
          const finalLat = isNearKollam ? lat : 8.8850;
          const finalLng = isNearKollam ? lng : 76.5910;
          
          setStartCoords([finalLat, finalLng]);
          const resolvedName = isNearKollam ? "Current GPS Location" : "My Location (Clock Tower Mock)";
          setSourceSearch(resolvedName);
          setStartName(resolvedName);
        },
        () => {
          alert("GPS unavailable or permission denied. Mock location applied.");
          // Fallback to Chinnakada coordinates
          setStartCoords([8.8850, 76.5910]);
          setSourceSearch("My Location (Chinnakada)");
          setStartName("My Location (Chinnakada)");
        }
      );
    } else {
      alert("Browser does not support geolocation.");
    }
  };

  // Quick swap source and destination
  const handleSwap = () => {
    const tempCoords = startCoords;
    const tempName = startName;
    const tempSearch = sourceSearch;

    setStartCoords(endCoords);
    setStartName(endName);
    setSourceSearch(destSearch);

    setEndCoords(tempCoords);
    setEndName(tempName);
    setDestSearch(tempSearch);

    if (routeResult) {
      setRouteResult(null);
    }
  };

  // Reset and go back to Search inputs from directions list
  const handleGoBack = () => {
    setRouteResult(null);
    setSelectedStepIndex(null);
    setIsPlayingSimulation(false);
    setSimulationProgress(0);
    voiceGuidance.stop();
  };

  // Speak a specific step instruction aloud
  const handleSpeakStep = (text: string, index: number) => {
    setSelectedStepIndex(index);
    voiceGuidance.speak(text);
  };

  // Voice mute toggle
  const toggleMute = () => {
    const newMuted = !isVoiceMuted;
    setIsVoiceMuted(newMuted);
    voiceGuidance.setMute(newMuted);
  };

  // Save current route as a Favorite
  const handleSaveFavorite = () => {
    if (!startCoords || !endCoords) return;
    const favName = `${startName.split(' ')[0]} ➔ ${endName.split(' ')[0]}`;
    
    // Check if already exists
    const exists = favorites.some(fav => 
      fav.startCoords[0] === startCoords[0] && 
      fav.startCoords[1] === startCoords[1] &&
      fav.endCoords[0] === endCoords[0] &&
      fav.endCoords[1] === endCoords[1]
    );

    if (exists) {
      alert("This route is already in your favorites.");
      return;
    }

    const newFav = {
      id: `fav-${Date.now()}`,
      name: favName,
      startName,
      endName,
      startCoords,
      endCoords
    };

    const updated = [...favorites, newFav];
    setFavorites(updated);
    localStorage.setItem('kollam_transit_favs', JSON.stringify(updated));
  };

  // Delete a favorite route
  const handleDeleteFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = favorites.filter(fav => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem('kollam_transit_favs', JSON.stringify(updated));
  };

  // Load a favorite route and calculate path
  const handleLoadFavorite = (fav: any) => {
    setStartCoords(fav.startCoords);
    setStartName(fav.startName);
    setSourceSearch(fav.startName);
    
    setEndCoords(fav.endCoords);
    setEndName(fav.endName);
    setDestSearch(fav.endName);

    setActiveTab('routes');

    const res = calculateRoute(fav.startCoords[0], fav.startCoords[1], fav.endCoords[0], fav.endCoords[1]);
    setRouteResult(res);
    setSelectedStepIndex(0);
    setIsPlayingSimulation(false);
    setSimulationProgress(0);
  };

  // Synchronize typing with local state when props change
  useEffect(() => {
    setSourceSearch(startName);
  }, [startName]);

  useEffect(() => {
    setDestSearch(endName);
  }, [endName]);

  return (
    <div className="sidebar glass-panel">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="brand">
          <div className="brand-icon">
            <Navigation size={18} fill="white" />
          </div>
          <div>
            <h1>KollamTransit</h1>
          </div>
        </div>
        <button 
          className="icon-button"
          onClick={toggleMute}
          title={isVoiceMuted ? "Unmute Voice Announcements" : "Mute Voice Announcements"}
        >
          {isVoiceMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* Navigation Tabs (only shown when not showing detailed directions) */}
      {!routeResult && (
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'routes' ? 'active' : ''}`}
            onClick={() => setActiveTab('routes')}
          >
            <Map size={15} /> Routes
          </button>
          <button 
            className={`tab-btn ${activeTab === 'stops' ? 'active' : ''}`}
            onClick={() => setActiveTab('stops')}
          >
            <Info size={15} /> Stops
          </button>
          <button 
            className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <Star size={15} /> Saved
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="sidebar-content">
        {/* --- TABS: ROUTING SEARCH PANEL --- */}
        {activeTab === 'routes' && !routeResult && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <form onSubmit={handleSearchSubmit} className="search-container" style={{ padding: 0, borderBottom: 'none' }}>
              
              {/* Source Input */}
              <div className="search-field">
                <label>Starting Location</label>
                <div className="input-wrapper">
                  <MapPin className="input-icon-left" size={18} />
                  <input 
                    type="text" 
                    placeholder="Enter stop or current location" 
                    value={sourceSearch}
                    onChange={handleSourceChange}
                    onFocus={() => {
                      setShowSourceDropdown(true);
                      setShowDestDropdown(false);
                    }}
                  />
                  <button type="button" className="gps-button" onClick={handleGpsSource} title="Use My Location">
                    <Grid size={15} />
                  </button>
                  
                  {/* Dropdown Suggestions */}
                  {showSourceDropdown && sourceSuggestions.length > 0 && (
                    <div className="suggestions-dropdown">
                      {sourceSuggestions.map(stop => (
                        <div key={stop.id} className="suggestion-item" onClick={() => selectSourceStop(stop)}>
                          <MapPin className="suggestion-icon" size={16} />
                          <div className="suggestion-info">
                            <span className="suggestion-title">{stop.name}</span>
                            <span className="suggestion-subtitle">{stop.isTransferPoint ? "KSRTC / Major Hub" : "Minor Bus Stop"}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Swap Button inside styling */}
              <div style={{ display: 'flex', justifyContent: 'center', margin: '-6px 0' }}>
                <button 
                  type="button" 
                  className="icon-button" 
                  onClick={handleSwap} 
                  style={{ transform: 'rotate(90deg)', width: '32px', height: '32px' }}
                  title="Swap Directions"
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              {/* Destination Input */}
              <div className="search-field">
                <label>Destination Location</label>
                <div className="input-wrapper">
                  <MapPin className="input-icon-left" size={18} style={{ color: '#EF4444' }} />
                  <input 
                    type="text" 
                    placeholder="Enter destination stop" 
                    value={destSearch}
                    onChange={handleDestChange}
                    onFocus={() => {
                      setShowDestDropdown(true);
                      setShowSourceDropdown(false);
                    }}
                  />
                  
                  {/* Dropdown Suggestions */}
                  {showDestDropdown && destSuggestions.length > 0 && (
                    <div className="suggestions-dropdown">
                      {destSuggestions.map(stop => (
                        <div key={stop.id} className="suggestion-item" onClick={() => selectDestStop(stop)}>
                          <MapPin className="suggestion-icon" size={16} />
                          <div className="suggestion-info">
                            <span className="suggestion-title">{stop.name}</span>
                            <span className="suggestion-subtitle">{stop.isTransferPoint ? "KSRTC / Major Hub" : "Minor Bus Stop"}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="search-actions" style={{ marginTop: '10px' }}>
                <button type="submit" className="btn-primary">
                  <Search size={18} /> Find Smart Route
                </button>
              </div>
            </form>

            {/* Quick Demo Help Text */}
            <div className="glass-panel" style={{ padding: '14px', borderRadius: '12px', fontSize: '0.82rem', lineHeight: '1.4', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <Info size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--text-main)' }}>Kollam Local Routing Tips:</strong>
                  <ul style={{ marginLeft: '14px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <li>Select a stop from the autocomplete dropdown list.</li>
                    <li>Try <span style={{ color: 'var(--color-primary)', cursor: 'pointer' }} onClick={() => {
                      selectSourceStop(stopsData[0]); // Kollam KSRTC
                      selectDestStop(stopsData[7]);   // Punalur
                    }}>Kollam KSRTC Stand ➔ Punalur Bus Stand</span> to see multi-route Dijkstra paths.</li>
                    <li>Or try <span style={{ color: 'var(--color-primary)', cursor: 'pointer' }} onClick={() => {
                      selectSourceStop(stopsData[8]); // Chathannoor
                      selectDestStop(stopsData[6]);   // Kottarakkara
                    }}>Chathannoor ➔ Kottarakkara</span> for direct shuttle services!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TABS: DETAILED ROUTE DIRECTIONS RESULTS PANEL --- */}
        {routeResult && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Navigation back and save */}
            <div className="directions-header">
              <button className="back-button" onClick={handleGoBack}>
                <ChevronLeft size={16} /> Edit Search
              </button>
              <button 
                className="icon-button" 
                onClick={handleSaveFavorite} 
                title="Add to Favorites"
                style={{ width: '30px', height: '30px' }}
              >
                <Star size={14} fill="var(--color-warning)" stroke="var(--color-warning)" />
              </button>
            </div>

            {/* Journey Stats overview */}
            <div className="journey-overview-card">
              <div className="overview-stat">
                <h4>{routeResult.totalTime}</h4>
                <p>Mins</p>
              </div>
              <div style={{ width: '1px', background: 'var(--border-light)' }}></div>
              <div className="overview-stat">
                <h4>{routeResult.totalDistance.toFixed(1)}</h4>
                <p>Km</p>
              </div>
              <div style={{ width: '1px', background: 'var(--border-light)' }}></div>
              <div className="overview-stat">
                <h4>₹{routeResult.totalFare}</h4>
                <p>Est Fare</p>
              </div>
            </div>

            {/* Simulated Live Bus Movement Tracker */}
            <div className="simulator-panel">
              <div className="sim-header">
                <span className="sim-status">
                  <span className="pulse-dot"></span> Live Bus Simulator
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {isPlayingSimulation ? "Simulating GPS Track..." : "Idle"}
                </span>
              </div>
              
              <div className="sim-controls">
                <button 
                  className="sim-btn" 
                  onClick={() => setIsPlayingSimulation(!isPlayingSimulation)}
                >
                  {isPlayingSimulation ? (
                    <>
                      <Pause size={14} /> Pause
                    </>
                  ) : (
                    <>
                      <Play size={14} /> Play Simulation
                    </>
                  )}
                </button>
                <button 
                  className="sim-btn" 
                  onClick={() => {
                    setIsPlayingSimulation(false);
                    setSimulationProgress(0);
                    setSelectedStepIndex(0);
                  }}
                  style={{ flex: 0, minWidth: '40px' }}
                  title="Reset Tracker"
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              {/* Progress bar */}
              <div className="sim-progress-bar-container">
                <div 
                  className="sim-progress-bar" 
                  style={{ width: `${simulationProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Step-by-Step Directions */}
            <h3 className="results-header" style={{ marginBottom: 0 }}>Step-By-Step Guidance</h3>
            
            <div className="timeline-container">
              <div className="timeline-line"></div>
              
              {routeResult.steps.map((step, index) => {
                const stopDetails = stopsData.find(s => s.id === step.stopId);
                const localTips = stopDetails?.localTips;

                return (
                  <div 
                    key={index} 
                    className={`step-card step-card-item ${step.type} ${selectedStepIndex === index ? 'active' : ''}`}
                    onClick={() => setSelectedStepIndex(index)}
                  >
                    <div className="step-marker"></div>
                    
                    <div className="step-card-header">
                      <span className={`step-type-pill ${step.type}`}>
                        {step.type === 'bus' && '🚌 Bus'}
                        {step.type === 'walk' && '🚶 Walk'}
                        {step.type === 'taxi' && '🚕 Auto/Taxi'}
                      </span>
                      <span className="step-duration">
                        {step.durationMins} mins ({step.distanceKm.toFixed(1)} km)
                      </span>
                    </div>

                    <p className="step-desc">
                      {step.type === 'walk' && `Walk ${Math.round(step.distanceKm * 1000)}m to "${step.stopName}"`}
                      {step.type === 'taxi' && `Take Auto/Taxi to "${step.stopName}" (Fare: ~₹${step.fare})`}
                      {step.type === 'bus' && `Board bus "${step.routeName}" and stay on for ${step.durationMins} mins. Get down at "${step.stopName}"`}
                    </p>

                    {/* Local tip announcement */}
                    {localTips && selectedStepIndex === index && (
                      <div className="step-tips">
                        <strong style={{ fontSize: '0.72rem' }}>💡 Kollam Local Tip: </strong>
                        {localTips}
                      </div>
                    )}

                    <div className="step-actions">
                      <button 
                        className="step-action-btn speak-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          let talkText = "";
                          if (step.type === 'walk') {
                            talkText = `Walk ${Math.round(step.distanceKm * 1000)} meters to ${step.stopName}`;
                          } else if (step.type === 'taxi') {
                            talkText = `Take an auto or taxi to ${step.stopName}`;
                          } else if (step.type === 'bus') {
                            talkText = `Board the bus ${step.routeName} and travel to ${step.stopName}`;
                          }
                          handleSpeakStep(talkText, index);
                        }}
                      >
                        <Volume2 size={12} /> Read Step
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- TABS: STOPS INFORMATION LISTING --- */}
        {activeTab === 'stops' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="stop-search-box">
              <Search size={16} className="suggestion-icon" />
              <input 
                type="text" 
                placeholder="Search Kollam bus stands..." 
                value={generalStopSearch}
                onChange={(e) => setGeneralStopSearch(e.target.value)}
              />
            </div>

            <h3 className="results-header">District Bus Stops & Hubs</h3>
            
            <div className="stops-list">
              {stopsData
                .filter(stop => stop.name.toLowerCase().includes(generalStopSearch.toLowerCase()))
                .map(stop => (
                  <div key={stop.id} className="stop-list-item">
                    <div className="stop-list-info">
                      <span className="stop-list-name">{stop.name}</span>
                      <span className="stop-list-coords">Coords: {stop.lat.toFixed(4)}, {stop.lng.toFixed(4)}</span>
                      {stop.localTips && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                          "{stop.localTips.substring(0, 50)}..."
                        </p>
                      )}
                    </div>
                    <div className="stop-list-actions">
                      <button 
                        className="icon-button"
                        onClick={() => {
                          setStartCoords([stop.lat, stop.lng]);
                          setStartName(stop.name);
                          setSourceSearch(stop.name);
                          setActiveTab('routes');
                        }}
                        title="Set as Start"
                        style={{ width: '30px', height: '30px', fontSize: '0.7rem' }}
                      >
                        S
                      </button>
                      <button 
                        className="icon-button"
                        onClick={() => {
                          setEndCoords([stop.lat, stop.lng]);
                          setEndName(stop.name);
                          setDestSearch(stop.name);
                          setActiveTab('routes');
                        }}
                        title="Set as Destination"
                        style={{ width: '30px', height: '30px', fontSize: '0.7rem' }}
                      >
                        D
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* --- TABS: FAVORITE ROUTES CACHE LISTING --- */}
        {activeTab === 'favorites' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 className="results-header">My Favorite Journeys</h3>
            
            {favorites.length === 0 ? (
              <div className="empty-state">
                <Star className="empty-state-icon" />
                <p>No saved routes yet.</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Search for a route first, then click the star button to save it for quick access!
                </span>
              </div>
            ) : (
              <div className="favorites-list">
                {favorites.map(fav => (
                  <div 
                    key={fav.id} 
                    className="favorite-item"
                    onClick={() => handleLoadFavorite(fav)}
                  >
                    <div className="favorite-info">
                      <span className="favorite-title">{fav.name}</span>
                      <span className="favorite-route-desc">
                        From: {fav.startName.split(' ')[0]} ➔ {fav.endName.split(' ')[0]}
                      </span>
                    </div>
                    <button 
                      className="fav-delete-btn"
                      onClick={(e) => handleDeleteFavorite(fav.id, e)}
                      title="Remove Favorite"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
