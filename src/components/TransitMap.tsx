import { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { stopsData, routesData } from '../data/transitData';
import type { PathResult } from '../utils/routingEngine';

interface TransitMapProps {
  startCoords: [number, number] | null;
  endCoords: [number, number] | null;
  routeResult: PathResult | null;
  selectedStepIndex: number | null;
  isPlayingSimulation: boolean;
  simulationProgress: number;
  theme: 'dark' | 'light';
}

export function TransitMap({
  startCoords,
  endCoords,
  routeResult,
  selectedStepIndex,
  isPlayingSimulation,
  simulationProgress,
  theme
}: TransitMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  
  // Layers for markers and paths
  const stopsLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const pinsLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const pathsLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const busSimulatorMarkerRef = useRef<L.Marker | null>(null);

  // Keep track of our complete coordinate path for bus interpolation
  const [completePathCoords, setCompletePathCoords] = useState<Array<[number, number]>>([]);

  // --- EFFECT A: Initialize Leaflet Map ---
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center in Kollam city center (Chinnakada)
    const initialCenter: [number, number] = [8.8900, 76.5921];
    
    // Destroy map instance if it already exists
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
    }

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView(initialCenter, 12);

    leafletMapRef.current = map;

    // Re-add Zoom control at the bottom right
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);

    // Initialize overlays
    stopsLayerGroupRef.current = L.layerGroup().addTo(map);
    pinsLayerGroupRef.current = L.layerGroup().addTo(map);
    pathsLayerGroupRef.current = L.layerGroup().addTo(map);

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // --- EFFECT B: Apply Tile Skin depending on Theme ---
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;

    // Remove any active tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    // Pick ultra-premium cartography tiles
    let tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'; // premium light
    if (theme === 'dark') {
      tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'; // premium dark matter
    }

    L.tileLayer(tileUrl, {
      maxZoom: 19
    }).addTo(map);
  }, [theme]);

  // --- EFFECT C: Render Kollam Bus Stops Markers ---
  useEffect(() => {
    const map = leafletMapRef.current;
    const stopsGroup = stopsLayerGroupRef.current;
    if (!map || !stopsGroup) return;

    stopsGroup.clearLayers();

    stopsData.forEach((stop) => {
      const pinClass = stop.isTransferPoint ? 'stop-marker-pin transfer' : 'stop-marker-pin';
      
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="${pinClass}"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });

      const marker = L.marker([stop.lat, stop.lng], { icon: customIcon });
      
      // Local info popup
      const popupHtml = `
        <div style="color: white; background: #111827; padding: 10px; border-radius: 8px; font-family: sans-serif; border: 1px solid #1f2937;">
          <h4 style="margin: 0 0 4px 0; font-size: 0.9rem; color: #0EA5E9;">${stop.name}</h4>
          <span style="font-size: 0.72rem; color: #94A3B8; text-transform: uppercase; font-weight: bold;">
            ${stop.isTransferPoint ? '🚌 Major Hub / Transfer Point' : '🚏 Local Bus Stop'}
          </span>
          ${stop.localTips ? `<p style="margin: 6px 0 0 0; font-size: 0.75rem; color: #F1F5F9; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 6px;">💡 ${stop.localTips}</p>` : ''}
        </div>
      `;

      marker.bindPopup(popupHtml, { closeButton: false });
      marker.addTo(stopsGroup);
    });
  }, []);

  // --- EFFECT D: Draw Start / End Search Pins and Active Segment Markers ---
  useEffect(() => {
    const map = leafletMapRef.current;
    const pinsGroup = pinsLayerGroupRef.current;
    if (!map || !pinsGroup) return;

    pinsGroup.clearLayers();

    // Start coordinates pin
    if (startCoords) {
      const startIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="user-marker-pin"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });
      L.marker(startCoords, { icon: startIcon })
        .bindTooltip("Start", { permanent: false, direction: 'top' })
        .addTo(pinsGroup);
    }

    // End coordinates pin
    if (endCoords) {
      const endIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="user-marker-pin" style="background: #EF4444;"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });
      L.marker(endCoords, { icon: endIcon })
        .bindTooltip("Destination", { permanent: false, direction: 'top' })
        .addTo(pinsGroup);
    }

    // Adjust map viewport to cover both start and end pins if they exist
    if (startCoords && endCoords && !routeResult) {
      const bounds = L.latLngBounds([startCoords, endCoords]);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (startCoords && !endCoords) {
      map.setView(startCoords, 14);
    }
  }, [startCoords, endCoords, routeResult]);

  // --- EFFECT E: Draw Polylines for Calculated Route ---
  useEffect(() => {
    const map = leafletMapRef.current;
    const pathsGroup = pathsLayerGroupRef.current;
    if (!map || !pathsGroup || !routeResult) {
      // Clear paths if no active result
      if (pathsGroup) pathsGroup.clearLayers();
      setCompletePathCoords([]);
      return;
    }

    pathsGroup.clearLayers();

    const tempPathCoords: Array<[number, number]> = [];

    // Draw each step segment with custom colors and stroke arrays
    routeResult.steps.forEach((step, idx) => {
      // Find start and end coords for this step
      let startPt: [number, number] = [8.8876, 76.5896]; // fallbacks
      let endPt: [number, number] = [8.8856, 76.5921];

      // 1. Calculate step start coordinates
      if (idx === 0) {
        startPt = startCoords!;
      } else {
        const prevStep = routeResult.steps[idx - 1];
        if (prevStep.stopId === 'destination') {
          startPt = endCoords!;
        } else {
          const stop = stopsData.find(s => s.id === prevStep.stopId)!;
          startPt = [stop.lat, stop.lng];
        }
      }

      // 2. Calculate step end coordinates
      if (step.stopId === 'destination') {
        endPt = endCoords!;
      } else {
        const stop = stopsData.find(s => s.id === step.stopId)!;
        endPt = [stop.lat, stop.lng];
      }

      // Append coordinates to complete path array (used for simulation)
      if (tempPathCoords.length === 0) {
        tempPathCoords.push(startPt);
      }
      tempPathCoords.push(endPt);

      // Determine segment visual parameters
      let color = '#3B82F6'; // default blue
      let dashArray = undefined;
      let weight = 6;

      if (step.type === 'walk') {
        color = '#0EA5E9'; // Cyan dotted line for walking
        dashArray = '5, 8';
        weight = 4;
      } else if (step.type === 'taxi') {
        color = '#F59E0B'; // Amber dashed line for taxi
        dashArray = '10, 10';
        weight = 4;
      } else if (step.type === 'bus') {
        // Find route color
        const routeObj = routesData.find(r => r.id === step.routeId);
        color = routeObj ? routeObj.color : '#3B82F6';
        weight = 7;
      }

      // Highlight active clicked card segment
      const isSelected = selectedStepIndex === idx;
      if (isSelected) {
        // Draw an underlying glowing thick line if step is selected
        L.polyline([startPt, endPt], {
          color: color,
          weight: weight + 6,
          opacity: 0.3,
          lineCap: 'round'
        }).addTo(pathsGroup);
      }

      L.polyline([startPt, endPt], {
        color: color,
        weight: weight,
        opacity: isSelected ? 1.0 : 0.75,
        dashArray: dashArray,
        lineCap: 'round'
      }).addTo(pathsGroup);
    });

    setCompletePathCoords(tempPathCoords);

    // Zoom/Fit boundaries to encompass the entire route
    if (tempPathCoords.length > 0) {
      const bounds = L.latLngBounds(tempPathCoords);
      map.fitBounds(bounds, { padding: [80, 80] });
    }
  }, [routeResult, startCoords, endCoords, selectedStepIndex]);

  // --- EFFECT F: Handle Simulated Live Bus movement ---
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map || completePathCoords.length === 0 || !routeResult) {
      if (busSimulatorMarkerRef.current) {
        busSimulatorMarkerRef.current.remove();
        busSimulatorMarkerRef.current = null;
      }
      return;
    }

    // Initialize simulator marker if not present
    if (!busSimulatorMarkerRef.current) {
      const busIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="bus-marker-pin">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="5" y="4" width="14" height="16" rx="2" ry="2"/>
              <line x1="9" y1="18" x2="9" y2="18"/>
              <line x1="15" y1="18" x2="15" y2="18"/>
              <line x1="5" y1="8" x2="19" y2="8"/>
              <line x1="12" y1="4" x2="12" y2="8"/>
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      busSimulatorMarkerRef.current = L.marker(completePathCoords[0], { icon: busIcon }).addTo(map);
    }

    // Interpolate coordinate along the coordinates list
    // simulationProgress goes from 0 to 100
    const progressFraction = simulationProgress / 100;
    
    // Calculate position
    const numPoints = completePathCoords.length;
    const segmentIndex = Math.min(
      Math.floor(progressFraction * (numPoints - 1)),
      numPoints - 2
    );

    if (segmentIndex >= 0 && segmentIndex < numPoints - 1) {
      const p1 = completePathCoords[segmentIndex];
      const p2 = completePathCoords[segmentIndex + 1];

      // Calculate fraction inside this segment
      const numSegments = numPoints - 1;
      const segmentFraction = (progressFraction - (segmentIndex / numSegments)) * numSegments;

      const lat = p1[0] + (p2[0] - p1[0]) * segmentFraction;
      const lng = p1[1] + (p2[1] - p1[1]) * segmentFraction;

      const currentPosition: [number, number] = [lat, lng];
      
      // Update marker coordinates
      busSimulatorMarkerRef.current.setLatLng(currentPosition);

      // Dynamically pan map to follow the bus
      if (isPlayingSimulation) {
        map.setView(currentPosition, map.getZoom(), { animate: true });
      }


    }

    // Clean up marker on reset
    if (simulationProgress === 0 && busSimulatorMarkerRef.current) {
      busSimulatorMarkerRef.current.remove();
      busSimulatorMarkerRef.current = null;
    }
  }, [simulationProgress, completePathCoords, routeResult, isPlayingSimulation]);

  return (
    <div className="map-canvas-container">
      {/* HTML container where Leaflet initializes */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }}></div>
      
      {/* Subtle difference overlay to enhance dark theme maps */}
      {theme === 'dark' && <div className="map-dark-overlay"></div>}
    </div>
  );
}
