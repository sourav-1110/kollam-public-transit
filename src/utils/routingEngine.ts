import { stopsData, routesData } from '../data/transitData';
import type { Stop, Route } from '../data/transitData';

export interface RouteEdge {
  toStopId: string;
  routeId: string;
  travelTime: number;
  direction: 'forward' | 'backward';
}

export interface PathStep {
  stopId: string;
  stopName: string;
  routeId: string | null;
  routeName: string | null;
  type: 'bus' | 'walk' | 'taxi';
  durationMins: number;
  distanceKm: number;
  fare: number;
}

export interface PathResult {
  steps: PathStep[];
  totalTime: number;
  totalDistance: number;
  totalFare: number;
  transfers: number;
  instructions: string[];
}

/**
 * Calculates geographical distance between two points using the Haversine formula.
 */
export function calculateHaversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Finds the nearest stop to a given coordinate.
 */
export function findNearestStop(lat: number, lng: number): { stop: Stop; distanceKm: number } {
  let nearestStop = stopsData[0];
  let minDistance = calculateHaversineDistance(lat, lng, nearestStop.lat, nearestStop.lng);

  for (let i = 1; i < stopsData.length; i++) {
    const stop = stopsData[i];
    const dist = calculateHaversineDistance(lat, lng, stop.lat, stop.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearestStop = stop;
    }
  }

  return { stop: nearestStop, distanceKm: minDistance };
}

/**
 * Builds a bidirectional adjacency list representation of the transit network.
 */
export function buildGraph(): Map<string, RouteEdge[]> {
  const graph = new Map<string, RouteEdge[]>();

  // Initialize stop nodes
  stopsData.forEach((stop) => {
    graph.set(stop.id, []);
  });

  // Load routes and build edges
  routesData.forEach((route) => {
    const stopsOnRoute = [...route.stops].sort((a, b) => a.stopOrder - b.stopOrder);

    for (let i = 0; i < stopsOnRoute.length - 1; i++) {
      const current = stopsOnRoute[i];
      const next = stopsOnRoute[i + 1];

      // Forward directed edge (e.g. Kollam -> Kottarakkara)
      const forwardEdges = graph.get(current.stopId) || [];
      forwardEdges.push({
        toStopId: next.stopId,
        routeId: route.id,
        travelTime: next.timeFromPreviousMins,
        direction: 'forward',
      });
      graph.set(current.stopId, forwardEdges);

      // Backward directed edge (e.g. Kottarakkara -> Kollam)
      const backwardEdges = graph.get(next.stopId) || [];
      backwardEdges.push({
        toStopId: current.stopId,
        routeId: route.id,
        travelTime: next.timeFromPreviousMins, // assume symmetric travel times
        direction: 'backward',
      });
      graph.set(next.stopId, backwardEdges);
    }
  });

  return graph;
}

/**
 * Priority Queue state interface for Dijkstra search
 */
interface DijkstraState {
  stopId: string;
  cost: number; // travel time in minutes
  prevRouteId: string | null;
  path: Array<{ stopId: string; routeId: string | null }>;
  transfers: number;
}

/**
 * Runs Dijkstra's algorithm between two stops, accounting for transfer penalties.
 */
export function findShortestTransitPath(
  startStopId: string,
  endStopId: string
): { path: Array<{ stopId: string; routeId: string | null }>; time: number; transfers: number } | null {
  if (startStopId === endStopId) {
    return {
      path: [{ stopId: startStopId, routeId: null }],
      time: 0,
      transfers: 0,
    };
  }

  const graph = buildGraph();
  const TRANSFER_PENALTY = 15; // 15-minute wait penalty for changing buses

  const pq: DijkstraState[] = [
    {
      stopId: startStopId,
      cost: 0,
      prevRouteId: null,
      path: [{ stopId: startStopId, routeId: null }],
      transfers: 0,
    },
  ];

  const visited = new Map<string, number>(); // Stores best cost to reach stopId

  while (pq.length > 0) {
    // Sort to extract minimum cost state (standard array-based PQ since Kollam graph is small)
    pq.sort((a, b) => a.cost - b.cost);
    const current = pq.shift()!;

    if (current.stopId === endStopId) {
      return {
        path: current.path,
        time: current.cost,
        transfers: current.transfers,
      };
    }

    if (visited.has(current.stopId) && visited.get(current.stopId)! <= current.cost) {
      continue;
    }
    visited.set(current.stopId, current.cost);

    const edges = graph.get(current.stopId) || [];
    for (const edge of edges) {
      const isTransfer = current.prevRouteId !== null && current.prevRouteId !== edge.routeId;
      const transferCost = isTransfer ? TRANSFER_PENALTY : 0;
      const newCost = current.cost + edge.travelTime + transferCost;

      pq.push({
        stopId: edge.toStopId,
        cost: newCost,
        prevRouteId: edge.routeId,
        path: [...current.path, { stopId: edge.toStopId, routeId: edge.routeId }],
        transfers: current.transfers + (isTransfer ? 1 : 0),
      });
    }
  }

  return null; // No route found
}

/**
 * Calculates travel parameters and builds step details from a coordinate-to-coordinate request.
 */
export function calculateRoute(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number
): PathResult | null {
  // 1. Detect nearest stops
  const startStopResult = findNearestStop(startLat, startLng);
  const endStopResult = findNearestStop(endLat, endLng);

  const startStop = startStopResult.stop;
  const endStop = endStopResult.stop;

  const startToStopDist = startStopResult.distanceKm;
  const stopToEndDist = endStopResult.distanceKm;

  // Let's check if they are the exact same nearest stop and the coordinates are close
  const coordinateDistance = calculateHaversineDistance(startLat, startLng, endLat, endLng);
  if (coordinateDistance < 0.5) {
    // Very close, just suggest walking the whole way
    const walkTime = Math.round(coordinateDistance * 12); // walking at 5 km/h is ~12 mins/km
    const step: PathStep = {
      stopId: 'destination',
      stopName: 'Destination',
      routeId: null,
      routeName: null,
      type: 'walk',
      durationMins: walkTime,
      distanceKm: coordinateDistance,
      fare: 0,
    };
    return {
      steps: [step],
      totalTime: walkTime,
      totalDistance: coordinateDistance,
      totalFare: 0,
      transfers: 0,
      instructions: [`Walk directly to your destination (${Math.round(coordinateDistance * 1000)}m, ~${walkTime} mins).`],
    };
  }

  // 2. Perform Dijkstra transit search between selected stops
  const transitPath = findShortestTransitPath(startStop.id, endStop.id);
  if (!transitPath) {
    // If no bus path exists, suggest a direct Auto/Taxi ride
    const taxiTime = Math.round(coordinateDistance * 2); // taxi at 30km/h is 2 mins/km
    const taxiFare = Math.max(30, Math.round(coordinateDistance * 18)); // Rs 18/km, min Rs 30
    const step: PathStep = {
      stopId: 'destination',
      stopName: 'Destination',
      routeId: null,
      routeName: null,
      type: 'taxi',
      durationMins: taxiTime,
      distanceKm: coordinateDistance,
      fare: taxiFare,
    };
    return {
      steps: [step],
      totalTime: taxiTime,
      totalDistance: coordinateDistance,
      totalFare: taxiFare,
      transfers: 0,
      instructions: [
        `No direct or connecting bus routes available between these stops.`,
        `Take an auto/taxi directly to destination (${coordinateDistance.toFixed(1)} km, ~${taxiTime} mins, est. ₹${taxiFare}).`
      ],
    };
  }

  const steps: PathStep[] = [];
  const instructions: string[] = [];
  let currentTotalTime = 0;
  let currentTotalDistance = 0;
  let currentTotalFare = 0;

  // -- Step A: Walk or take taxi to the first stop --
  if (startToStopDist > 0.05) {
    const isWalk = startToStopDist <= 1.0;
    const speed = isWalk ? 5 : 30; // 5 km/h walking, 30 km/h auto
    const type = isWalk ? 'walk' : ('taxi' as const);
    const duration = Math.round(startToStopDist * (60 / speed));
    const fare = isWalk ? 0 : Math.max(30, Math.round(startToStopDist * 18));

    steps.push({
      stopId: startStop.id,
      stopName: startStop.name,
      routeId: null,
      routeName: null,
      type,
      durationMins: duration,
      distanceKm: startToStopDist,
      fare,
    });

    currentTotalTime += duration;
    currentTotalDistance += startToStopDist;
    currentTotalFare += fare;

    if (isWalk) {
      instructions.push(`Walk to "${startStop.name}" (${Math.round(startToStopDist * 1000)}m, ~${duration} mins)`);
    } else {
      instructions.push(`Take auto/taxi to "${startStop.name}" (${startToStopDist.toFixed(1)} km, ~${duration} mins, est. ₹${fare})`);
    }
  }

  // -- Step B: Transit path --
  const path = transitPath.path;
  const stopsCache = new Map<string, Stop>();
  stopsData.forEach((s) => stopsCache.set(s.id, s));

  const routesCache = new Map<string, Route>();
  routesData.forEach((r) => routesCache.set(r.id, r));

  if (path.length > 1) {
    let currentRouteId = path[1].routeId!;
    let currentRoute = routesCache.get(currentRouteId)!;
    let boardStopId = path[0].stopId;
    let transitStopsCount = 0;
    let transitSegmentTime = 0;

    for (let i = 1; i < path.length; i++) {
      const currentHop = path[i];

      // Get travel time from previous stop
      const routeInfo = routesCache.get(currentHop.routeId!)!;
      const rStop = routeInfo.stops.find((rs) => rs.stopId === currentHop.stopId)!;
      const travelMins = rStop ? rStop.timeFromPreviousMins : 10; // fallback

      transitSegmentTime += travelMins;
      transitStopsCount++;

      // If the route changed OR this is the final stop in transit path
      const isRouteChanged = i < path.length - 1 && path[i + 1].routeId !== currentRouteId;
      const isFinalTransitStop = i === path.length - 1;

      if (isRouteChanged || isFinalTransitStop) {
        // We are getting off at this stop (currentHop.stopId)
        const boardStopName = stopsCache.get(boardStopId)!.name;
        const getOffStopName = stopsCache.get(currentHop.stopId)!.name;
        const stopDistance = calculateHaversineDistance(
          stopsCache.get(boardStopId)!.lat,
          stopsCache.get(boardStopId)!.lng,
          stopsCache.get(currentHop.stopId)!.lat,
          stopsCache.get(currentHop.stopId)!.lng
        );
        const segmentFare = transitStopsCount * currentRoute.farePerStop;

        steps.push({
          stopId: currentHop.stopId,
          stopName: getOffStopName,
          routeId: currentRoute.id,
          routeName: currentRoute.name,
          type: 'bus',
          durationMins: transitSegmentTime,
          distanceKm: stopDistance,
          fare: segmentFare,
        });

        currentTotalTime += transitSegmentTime;
        currentTotalDistance += stopDistance;
        currentTotalFare += segmentFare;

        instructions.push(
          `At "${boardStopName}", board bus "${currentRoute.name}" (${transitStopsCount} stops, ~${transitSegmentTime} mins, ₹${segmentFare})`
        );
        instructions.push(`Get down at "${getOffStopName}"`);

        // If transfer is happening
        if (isRouteChanged) {
          instructions.push(`Transfer Alert: Wait for next connecting bus (Est. wait time: ${routesCache.get(path[i+1].routeId!)?.averageWaitTimeMins || 15} mins)`);
          
          // Add transfer time to total travel time (Dijkstra already accounts for it)
          const nextRouteId = path[i + 1].routeId!;
          currentRouteId = nextRouteId;
          currentRoute = routesCache.get(nextRouteId)!;
          boardStopId = currentHop.stopId;
          transitStopsCount = 0;
          transitSegmentTime = 0;
        }
      }
    }
  }

  // -- Step C: Final leg to destination --
  if (stopToEndDist > 0.05) {
    const isWalk = stopToEndDist <= 1.0;
    const speed = isWalk ? 5 : 30;
    const type = isWalk ? 'walk' : ('taxi' as const);
    const duration = Math.round(stopToEndDist * (60 / speed));
    const fare = isWalk ? 0 : Math.max(30, Math.round(stopToEndDist * 18));

    steps.push({
      stopId: 'destination',
      stopName: 'Destination',
      routeId: null,
      routeName: null,
      type,
      durationMins: duration,
      distanceKm: stopToEndDist,
      fare,
    });

    currentTotalTime += duration;
    currentTotalDistance += stopToEndDist;
    currentTotalFare += fare;

    if (isWalk) {
      instructions.push(`Walk from "${endStop.name}" to your destination (${Math.round(stopToEndDist * 1000)}m, ~${duration} mins)`);
    } else {
      instructions.push(`Take auto/taxi from "${endStop.name}" to destination (${stopToEndDist.toFixed(1)} km, ~${duration} mins, est. ₹${fare})`);
    }
  }

  // Add simulated wait times for transfers to total time
  const totalWaitTime = transitPath.transfers * 15;
  const totalJourneyTime = currentTotalTime + totalWaitTime;

  instructions.push(`Arrive at your destination! Total journey: ${totalJourneyTime} mins, ₹${currentTotalFare}`);

  return {
    steps,
    totalTime: totalJourneyTime,
    totalDistance: currentTotalDistance,
    totalFare: currentTotalFare,
    transfers: transitPath.transfers,
    instructions,
  };
}
