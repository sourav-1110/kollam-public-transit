export interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  isTransferPoint: boolean;
  localTips?: string;
}

export interface Route {
  id: string;
  name: string;
  type: 'bus' | 'taxi' | 'walk';
  color: string;
  stops: RouteStop[];
  farePerStop: number;
  averageWaitTimeMins: number;
}

export interface RouteStop {
  stopId: string;
  stopOrder: number;
  timeFromPreviousMins: number;
}

export const stopsData: Stop[] = [
  {
    id: 'stop-ksrtc',
    name: 'Kollam KSRTC Bus Stand',
    lat: 8.8876,
    lng: 76.5896,
    isTransferPoint: true,
    localTips: 'Major KSRTC depot. Board from Platform 3 for Kottarakkara, Platform 1 for Punalur. Dynamic announcements are active.'
  },
  {
    id: 'stop-chinnakada',
    name: 'Chinnakada Clock Tower',
    lat: 8.8856,
    lng: 76.5921,
    isTransferPoint: true,
    localTips: 'Located at the heart of Kollam. Highly busy junction. Watch out for private and KSRTC buses heading in all directions.'
  },
  {
    id: 'stop-kadappakada',
    name: 'Kadappakada Junction',
    lat: 8.8860,
    lng: 76.6062,
    isTransferPoint: false,
    localTips: 'Near the Sports Club. Easy boarding point for bypass-bound buses.'
  },
  {
    id: 'stop-ayathil',
    name: 'Ayathil Bypass Stop',
    lat: 8.8814,
    lng: 76.6212,
    isTransferPoint: false,
    localTips: 'Ideal pickup point for long-distance bypass riders on the NH-66 bypass.'
  },
  {
    id: 'stop-kallumthazham',
    name: 'Kallumthazham',
    lat: 8.9034,
    lng: 76.6271,
    isTransferPoint: true,
    localTips: 'Key junction connecting the city center to the bypass roads. Safe pedestrian crossing is available.'
  },
  {
    id: 'stop-kundara',
    name: 'Kundara Bus Stop',
    lat: 8.9567,
    lng: 76.6747,
    isTransferPoint: true,
    localTips: 'Industrial area stop. Excellent junction to catch connecting private shuttle buses to local villages.'
  },
  {
    id: 'stop-kottarakkara',
    name: 'Kottarakkara KSRTC Stand',
    lat: 9.0022,
    lng: 76.7770,
    isTransferPoint: true,
    localTips: 'Massive central hub. Excellent budget refreshments inside. Route boards are written in Malayalam and English.'
  },
  {
    id: 'stop-punalur',
    name: 'Punalur Bus Stand',
    lat: 9.0182,
    lng: 76.9298,
    isTransferPoint: true,
    localTips: 'Gateway to the eastern mountains. Located close to the historical Punalur Suspension Bridge.'
  },
  {
    id: 'stop-chathannoor',
    name: 'Chathannoor Stand',
    lat: 8.8488,
    lng: 76.7214,
    isTransferPoint: true,
    localTips: 'A key southern town hub. Board private buses to interior routes from the western side.'
  },
  {
    id: 'stop-paripally',
    name: 'Paripally Junction',
    lat: 8.8105,
    lng: 76.7628,
    isTransferPoint: true,
    localTips: 'Kollam district border stop. Switch here for buses heading towards Trivandrum district.'
  },
  {
    id: 'stop-chavara',
    name: 'Chavara Bus Stop',
    lat: 8.9744,
    lng: 76.5389,
    isTransferPoint: false,
    localTips: 'Industrial town on the NH-66 highway. Board buses heading north to Alappuzha/Ernakulam.'
  },
  {
    id: 'stop-karunagappally',
    name: 'Karunagappally Stand',
    lat: 9.0634,
    lng: 76.5367,
    isTransferPoint: true,
    localTips: 'Northern railway-connected terminal stand. Switch here for local coastal shuttle services.'
  },
  {
    id: 'stop-anchal',
    name: 'Anchal Town Junction',
    lat: 8.9324,
    lng: 76.9034,
    isTransferPoint: false,
    localTips: 'Major junction for eastern forest ranges and Ayoor-Punalur travelers.'
  },
  {
    id: 'stop-pathanapuram',
    name: 'Pathanapuram Junction',
    lat: 9.0858,
    lng: 76.8624,
    isTransferPoint: false,
    localTips: 'Bustling junction connecting Pathanamthitta district to eastern Kollam routes.'
  }
];

export const routesData: Route[] = [
  {
    id: 'route-klm-ktk-fp',
    name: 'Kollam - Kottarakkara (Fast Passenger)',
    type: 'bus',
    color: '#3B82F6', // Vivid Blue
    farePerStop: 12,
    averageWaitTimeMins: 12,
    stops: [
      { stopId: 'stop-ksrtc', stopOrder: 1, timeFromPreviousMins: 0 },
      { stopId: 'stop-chinnakada', stopOrder: 2, timeFromPreviousMins: 5 },
      { stopId: 'stop-kadappakada', stopOrder: 3, timeFromPreviousMins: 5 },
      { stopId: 'stop-kallumthazham', stopOrder: 4, timeFromPreviousMins: 8 },
      { stopId: 'stop-kundara', stopOrder: 5, timeFromPreviousMins: 15 },
      { stopId: 'stop-kottarakkara', stopOrder: 6, timeFromPreviousMins: 20 }
    ]
  },
  {
    id: 'route-klm-pnl-ord',
    name: 'Kollam - Punalur (Ordinary)',
    type: 'bus',
    color: '#06B6D4', // Cyan
    farePerStop: 8,
    averageWaitTimeMins: 20,
    stops: [
      { stopId: 'stop-ksrtc', stopOrder: 1, timeFromPreviousMins: 0 },
      { stopId: 'stop-chinnakada', stopOrder: 2, timeFromPreviousMins: 6 },
      { stopId: 'stop-kundara', stopOrder: 3, timeFromPreviousMins: 24 },
      { stopId: 'stop-kottarakkara', stopOrder: 4, timeFromPreviousMins: 18 },
      { stopId: 'stop-punalur', stopOrder: 5, timeFromPreviousMins: 25 }
    ]
  },
  {
    id: 'route-klm-kar-exp',
    name: 'Kollam - Karunagappally (NH-66 Express)',
    type: 'bus',
    color: '#8B5CF6', // Purple
    farePerStop: 15,
    averageWaitTimeMins: 15,
    stops: [
      { stopId: 'stop-ksrtc', stopOrder: 1, timeFromPreviousMins: 0 },
      { stopId: 'stop-chinnakada', stopOrder: 2, timeFromPreviousMins: 4 },
      { stopId: 'stop-chavara', stopOrder: 3, timeFromPreviousMins: 18 },
      { stopId: 'stop-karunagappally', stopOrder: 4, timeFromPreviousMins: 15 }
    ]
  },
  {
    id: 'route-klm-par-exp',
    name: 'Kollam - Paripally (South Express)',
    type: 'bus',
    color: '#EC4899', // Pink
    farePerStop: 14,
    averageWaitTimeMins: 15,
    stops: [
      { stopId: 'stop-ksrtc', stopOrder: 1, timeFromPreviousMins: 0 },
      { stopId: 'stop-chinnakada', stopOrder: 2, timeFromPreviousMins: 5 },
      { stopId: 'stop-ayathil', stopOrder: 3, timeFromPreviousMins: 10 },
      { stopId: 'stop-chathannoor', stopOrder: 4, timeFromPreviousMins: 20 },
      { stopId: 'stop-paripally', stopOrder: 5, timeFromPreviousMins: 12 }
    ]
  },
  {
    id: 'route-ktk-anc-pnl',
    name: 'Kottarakkara - Anchal - Punalur (Ordinary)',
    type: 'bus',
    color: '#10B981', // Emerald
    farePerStop: 8,
    averageWaitTimeMins: 25,
    stops: [
      { stopId: 'stop-kottarakkara', stopOrder: 1, timeFromPreviousMins: 0 },
      { stopId: 'stop-anchal', stopOrder: 2, timeFromPreviousMins: 25 },
      { stopId: 'stop-punalur', stopOrder: 3, timeFromPreviousMins: 15 }
    ]
  },
  {
    id: 'route-ktk-pat-pnl',
    name: 'Kottarakkara - Pathanapuram - Punalur (Ordinary)',
    type: 'bus',
    color: '#F59E0B', // Amber
    farePerStop: 9,
    averageWaitTimeMins: 30,
    stops: [
      { stopId: 'stop-kottarakkara', stopOrder: 1, timeFromPreviousMins: 0 },
      { stopId: 'stop-pathanapuram', stopOrder: 2, timeFromPreviousMins: 22 },
      { stopId: 'stop-punalur', stopOrder: 3, timeFromPreviousMins: 18 }
    ]
  },
  {
    id: 'route-cht-klm-link',
    name: 'Chathannoor - Kundara - Kottarakkara (Shuttle)',
    type: 'bus',
    color: '#EF4444', // Rose Red
    farePerStop: 10,
    averageWaitTimeMins: 20,
    stops: [
      { stopId: 'stop-chathannoor', stopOrder: 1, timeFromPreviousMins: 0 },
      { stopId: 'stop-kundara', stopOrder: 2, timeFromPreviousMins: 20 },
      { stopId: 'stop-kottarakkara', stopOrder: 3, timeFromPreviousMins: 18 }
    ]
  }
];
