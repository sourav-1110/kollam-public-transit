import { 
  calculateHaversineDistance, 
  findNearestStop, 
  findShortestTransitPath, 
  calculateRoute 
} from './routingEngine';

export interface DiagnosticTestResult {
  id: string;
  name: string;
  passed: boolean;
  message: string;
  durationMs: number;
}

/**
 * Runs a suite of automated client-side route diagnostics tests.
 */
export function runRouteDiagnostics(): DiagnosticTestResult[] {
  const results: DiagnosticTestResult[] = [];

  const runTest = (name: string, id: string, fn: () => string) => {
    const start = performance.now();
    try {
      const msg = fn();
      const duration = performance.now() - start;
      results.push({
        id,
        name,
        passed: true,
        message: msg,
        durationMs: parseFloat(duration.toFixed(2))
      });
    } catch (e: any) {
      const duration = performance.now() - start;
      results.push({
        id,
        name,
        passed: false,
        message: e?.message || "Test failed with unexpected error.",
        durationMs: parseFloat(duration.toFixed(2))
      });
    }
  };

  // --- TEST 1: Haversine Distance ---
  runTest(
    "Haversine Geographical Math Accuracy",
    "test-haversine",
    () => {
      // Kollam KSRTC to Chinnakada Clock Tower is roughly 350 meters (0.35 km)
      const dist = calculateHaversineDistance(8.8876, 76.5896, 8.8856, 76.5921);
      if (dist < 0.2 || dist > 0.5) {
        throw new Error(`Expected distance between KSRTC and Chinnakada to be ~0.35km, got ${dist.toFixed(3)}km`);
      }
      return `Success: Correctly computed distance as ${dist.toFixed(3)} km.`;
    }
  );

  // --- TEST 2: Nearest Stop Finder ---
  runTest(
    "Nearest Transit Stop Resolution",
    "test-nearest-stop",
    () => {
      // Coordinates right next to Chinnakada (8.8856, 76.5921)
      const result = findNearestStop(8.8855, 76.5920);
      if (result.stop.id !== 'stop-chinnakada') {
        throw new Error(`Expected nearest stop to be 'stop-chinnakada', got '${result.stop.id}'`);
      }
      return `Success: Nearest stop resolved to "${result.stop.name}" (${(result.distanceKm * 1000).toFixed(0)}m away).`;
    }
  );

  // --- TEST 3: Dijkstra Direct Route Path ---
  runTest(
    "Dijkstra Direct Route Pathfinding (0 Transfers)",
    "test-dijkstra-direct",
    () => {
      // Kollam KSRTC to Kadappakada (same route: Kollam - Kottarakkara Fast Passenger)
      const path = findShortestTransitPath('stop-ksrtc', 'stop-kadappakada');
      if (!path) {
        throw new Error("Direct path not found.");
      }
      if (path.transfers !== 0) {
        throw new Error(`Expected 0 transfers for a direct route, got ${path.transfers}`);
      }
      return `Success: Found direct path with 0 transfers, duration: ${path.time} mins.`;
    }
  );

  // --- TEST 4: Dijkstra Multi-hop Route Path ---
  runTest(
    "Dijkstra Connecting Route Pathfinding (1+ Transfers)",
    "test-dijkstra-transfer",
    () => {
      // Chathannoor to Punalur (must transfer since no direct route connects Chathannoor to Punalur)
      const path = findShortestTransitPath('stop-chathannoor', 'stop-punalur');
      if (!path) {
        throw new Error("Connecting path not found.");
      }
      if (path.transfers < 1) {
        throw new Error(`Expected at least 1 transfer, got ${path.transfers}`);
      }
      return `Success: Solved path via transfer stand in ${path.time} mins with ${path.transfers} transfers.`;
    }
  );

  // --- TEST 5: Walking Modal Recommendation ---
  runTest(
    "Walk Mode Threshold Calculation",
    "test-walk-modal",
    () => {
      // Point very close to Kollam KSRTC (200m away)
      const route = calculateRoute(8.8876, 76.5896, 8.8890, 76.5896);
      if (!route) {
        throw new Error("Route not computed.");
      }
      const hasWalkStep = route.steps.some(step => step.type === 'walk');
      if (!hasWalkStep) {
        throw new Error("Expected a walking step segment for short coordinates distance, got none.");
      }
      return `Success: Walk segment correctly triggered (~${route.totalTime} mins total travel time).`;
    }
  );

  // --- TEST 6: Auto/Taxi Modal Recommendation ---
  runTest(
    "Auto-Taxi Mode Threshold Calculation",
    "test-taxi-modal",
    () => {
      // Point 3km away from Kollam KSRTC (towards the ocean/bypass)
      const route = calculateRoute(8.8876, 76.5896, 8.8600, 76.5800);
      if (!route) {
        throw new Error("Route not computed.");
      }
      const hasTaxiStep = route.steps.some(step => step.type === 'taxi');
      if (!hasTaxiStep) {
        throw new Error("Expected a taxi step segment for medium distance coordinates, got none.");
      }
      return `Success: Auto/Taxi recommendation triggered, estimated fare: ₹${route.totalFare}.`;
    }
  );

  return results;
}
