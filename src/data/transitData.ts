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
  },
  { id: 'stop-andamukkam', name: 'Andamukkam', lat: 8.8835678, lng: 76.5892251, isTransferPoint: false },
  { id: 'stop-ksrtc-junction', name: 'KSRTC Junction', lat: 8.8910371, lng: 76.5851373, isTransferPoint: false },
  { id: 'stop-pallimukku', name: 'Pallimukku', lat: 8.8763884, lng: 76.6243287, isTransferPoint: false },
  { id: 'stop-kilikollur', name: 'Kilikollur', lat: 8.9181293, lng: 76.632618, isTransferPoint: false },
  { id: 'stop-kavanad', name: 'Kavanad', lat: 8.9214035, lng: 76.5587568, isTransferPoint: false },
  { id: 'stop-sakthikulangara', name: 'Sakthikulangara', lat: 8.929425, lng: 76.5487542, isTransferPoint: false },
  { id: 'stop-neendakara', name: 'Neendakara', lat: 8.9428812, lng: 76.538628, isTransferPoint: false },
  { id: 'stop-uliyakovil', name: 'Uliyakovil', lat: 8.9050085, lng: 76.6065619, isTransferPoint: false },
  { id: 'stop-thirumullavaram', name: 'Thirumullavaram', lat: 8.8949436, lng: 76.5544252, isTransferPoint: false },
  { id: 'stop-beach-road', name: 'Beach Road', lat: 8.881166, lng: 76.5918686, isTransferPoint: false },
  { id: 'stop-kochupilamoodu', name: 'Kochupilamoodu', lat: 8.808036, lng: 76.562034, isTransferPoint: false },
  { id: 'stop-cantonment', name: 'Cantonment', lat: 8.8814202, lng: 76.5993037, isTransferPoint: false },
  { id: 'stop-asramam', name: 'Asramam', lat: 8.8938761, lng: 76.5909495, isTransferPoint: false },
  { id: 'stop-collectorate', name: 'Collectorate', lat: 8.8933338, lng: 76.5747237, isTransferPoint: false },
  { id: 'stop-mangad', name: 'Mangad', lat: 8.9186428, lng: 76.6214073, isTransferPoint: false },
  { id: 'stop-mevaram', name: 'Mevaram', lat: 8.8685217, lng: 76.6445271, isTransferPoint: false },
  { id: 'stop-polayathode', name: 'Polayathode', lat: 8.859896, lng: 76.601100, isTransferPoint: false },
  { id: 'stop-koottikada', name: 'Koottikada', lat: 8.8511825, lng: 76.6385017, isTransferPoint: false },
  { id: 'stop-kureepuzha', name: 'Kureepuzha', lat: 8.9218643, lng: 76.5743288, isTransferPoint: false },
  { id: 'stop-anchalummoodu', name: 'Anchalummoodu', lat: 8.9327781, lng: 76.6053262, isTransferPoint: false },
  { id: 'stop-perumon', name: 'Perumon', lat: 8.9552826, lng: 76.61437, isTransferPoint: false },
  { id: 'stop-panayam', name: 'Panayam', lat: 8.962758, lng: 76.6189148, isTransferPoint: false },
  { id: 'stop-mulavana', name: 'Mulavana', lat: 9.0026586, lng: 76.6803331, isTransferPoint: false },
  { id: 'stop-thrikkadavoor', name: 'Thrikkadavoor', lat: 8.9205959, lng: 76.5943123, isTransferPoint: false },
  { id: 'stop-thrikkaruva', name: 'Thrikkaruva', lat: 8.9462468, lng: 76.598201, isTransferPoint: false },
  { id: 'stop-umayanalloor', name: 'Umayanalloor', lat: 8.8653319, lng: 76.654443, isTransferPoint: false },
  { id: 'stop-perinad', name: 'Perinad', lat: 8.9484647, lng: 76.6208854, isTransferPoint: false },
  { id: 'stop-mayyanad', name: 'Mayyanad', lat: 8.8395937, lng: 76.6459316, isTransferPoint: false },
  { id: 'stop-kottiyam', name: 'Kottiyam', lat: 8.86607, lng: 76.6709251, isTransferPoint: false },
  { id: 'stop-kundara-east', name: 'Kundara East', lat: 8.9694635, lng: 76.6909916, isTransferPoint: false },
  { id: 'stop-elampalloor', name: 'Elampalloor', lat: 8.9560073, lng: 76.6709397, isTransferPoint: false },
  { id: 'stop-pallimon', name: 'Pallimon', lat: 8.9006168, lng: 76.7164298, isTransferPoint: false },
  { id: 'stop-vellimon', name: 'Vellimon', lat: 8.9517395, lng: 76.6523877, isTransferPoint: false },
  { id: 'stop-perumpuzha', name: 'Perumpuzha', lat: 8.9387887, lng: 76.6793056, isTransferPoint: false },
  { id: 'stop-koivila', name: 'Koivila', lat: 8.9962866, lng: 76.5783371, isTransferPoint: false },
  { id: 'stop-thazhuthala', name: 'Thazhuthala', lat: 8.882931, lng: 76.6715694, isTransferPoint: false },
  { id: 'stop-thazhava', name: 'Thazhava', lat: 9.0964987, lng: 76.5530468, isTransferPoint: false },
  { id: 'stop-ochira', name: 'Ochira', lat: 9.1318373, lng: 76.5251596, isTransferPoint: false },
  { id: 'stop-clappana', name: 'Clappana', lat: 9.100677, lng: 76.4943052, isTransferPoint: false },
  { id: 'stop-oachira-temple', name: 'Oachira Temple', lat: 9.1351742, lng: 76.5087397, isTransferPoint: false },
  { id: 'stop-alumkadavu', name: 'Alumkadavu', lat: 9.0579739, lng: 76.5063408, isTransferPoint: false },
  { id: 'stop-azheekal', name: 'Azheekal', lat: 9.1213252, lng: 76.4697267, isTransferPoint: false },
  { id: 'stop-thevalakkara', name: 'Thevalakkara', lat: 8.9976716, lng: 76.5782434, isTransferPoint: false },
  { id: 'stop-mynagappally', name: 'Mynagappally', lat: 9.039542, lng: 76.5840215, isTransferPoint: false },
  { id: 'stop-panmana', name: 'Panmana', lat: 9.0082147, lng: 76.5425181, isTransferPoint: false },
  { id: 'stop-chavara-south', name: 'Chavara South', lat: 8.9727594, lng: 76.5704327, isTransferPoint: false },
  { id: 'stop-sankaramangalam', name: 'Sankaramangalam', lat: 8.9939254, lng: 76.5328777, isTransferPoint: false },
  { id: 'stop-kovilthottam', name: 'Kovilthottam', lat: 8.9952828, lng: 76.5231626, isTransferPoint: false },
  { id: 'stop-vallikavu', name: 'Vallikavu', lat: 9.0935236, lng: 76.4937112, isTransferPoint: false },
  { id: 'stop-kulasekharapuram', name: 'Kulasekharapuram', lat: 9.0912416, lng: 76.5160835, isTransferPoint: false },
  { id: 'stop-alappad', name: 'Alappad', lat: 9.0626871, lng: 76.4988405, isTransferPoint: false },
  { id: 'stop-cheriazheekal', name: 'Cheriazheekal', lat: 9.0511866, lng: 76.5030446, isTransferPoint: false },
  { id: 'stop-thodiyoor', name: 'Thodiyoor', lat: 9.0750768, lng: 76.5754692, isTransferPoint: false },
  { id: 'stop-lalaji-junction', name: 'Lalaji Junction', lat: 8.828987, lng: 76.517169, isTransferPoint: false },
  { id: 'stop-paravur', name: 'Paravur', lat: 8.8098891, lng: 76.6715303, isTransferPoint: false },
  { id: 'stop-poothakkulam', name: 'Poothakkulam', lat: 8.8042689, lng: 76.6979204, isTransferPoint: false },
  { id: 'stop-nedungolam', name: 'Nedungolam', lat: 8.8392307, lng: 76.6863439, isTransferPoint: false },
  { id: 'stop-kottankulangara', name: 'Kottankulangara', lat: 8.9798454, lng: 76.5347208, isTransferPoint: false },
  { id: 'stop-edava-naduvil', name: 'Edava Naduvil', lat: 8.952414, lng: 76.635863, isTransferPoint: false },
  { id: 'stop-pozhikara', name: 'Pozhikara', lat: 8.8120875, lng: 76.6497734, isTransferPoint: false },
  { id: 'stop-kappil', name: 'Kappil', lat: 8.7874109, lng: 76.6689645, isTransferPoint: false },
  { id: 'stop-meenad', name: 'Meenad', lat: 8.8520505, lng: 76.7050294, isTransferPoint: false },
  { id: 'stop-puttingal', name: 'Puttingal', lat: 8.8126863, lng: 76.6644109, isTransferPoint: false },
  { id: 'stop-pulamon', name: 'Pulamon', lat: 9.0048046, lng: 76.7828434, isTransferPoint: false },
  { id: 'stop-chengamanad', name: 'Chengamanad', lat: 8.853470, lng: 76.559620, isTransferPoint: false },
  { id: 'stop-mylom', name: 'Mylom', lat: 9.0291587, lng: 76.7839481, isTransferPoint: false },
  { id: 'stop-ezhukone', name: 'Ezhukone', lat: 8.97952, lng: 76.7153297, isTransferPoint: false },
  { id: 'stop-valakom', name: 'Valakom', lat: 8.9544212, lng: 76.8428376, isTransferPoint: false },
  { id: 'stop-pavithreswaram', name: 'Pavithreswaram', lat: 9.0306243, lng: 76.6895029, isTransferPoint: false },
  { id: 'stop-nilamel', name: 'Nilamel', lat: 8.8234714, lng: 76.8823652, isTransferPoint: false },
  { id: 'stop-chadayamangalam', name: 'Chadayamangalam', lat: 8.8719144, lng: 76.8691239, isTransferPoint: false },
  { id: 'stop-kadakkal', name: 'Kadakkal', lat: 8.827868, lng: 76.9165107, isTransferPoint: false },
  { id: 'stop-jatayupara', name: 'Jatayupara', lat: 8.8749172, lng: 76.8692752, isTransferPoint: false },
  { id: 'stop-ayoor', name: 'Ayoor', lat: 8.8978612, lng: 76.8601206, isTransferPoint: false },
  { id: 'stop-yeroor', name: 'Yeroor', lat: 8.935959, lng: 76.9456082, isTransferPoint: false },
  { id: 'stop-karavaloor', name: 'Karavaloor', lat: 8.9807724, lng: 76.9250357, isTransferPoint: false },
  { id: 'stop-thenmala', name: 'Thenmala', lat: 8.9652655, lng: 77.0699638, isTransferPoint: false },
  { id: 'stop-aryankavu', name: 'Aryankavu', lat: 8.9811615, lng: 77.1528919, isTransferPoint: false },
  { id: 'stop-edamon', name: 'Edamon', lat: 9.0030806, lng: 76.9825555, isTransferPoint: false },
  { id: 'stop-piravanthur', name: 'Piravanthur', lat: 9.0627963, lng: 76.9039816, isTransferPoint: false },
  { id: 'stop-pattazhy', name: 'Pattazhy', lat: 9.0803412, lng: 76.7961666, isTransferPoint: false },
  { id: 'stop-vilakkupara', name: 'Vilakkupara', lat: 8.9498432, lng: 76.9983964, isTransferPoint: false },
  { id: 'stop-kunnicode', name: 'Kunnicode', lat: 9.0170759, lng: 76.8543337, isTransferPoint: false },
  { id: 'stop-kulathupuzha', name: 'Kulathupuzha', lat: 8.9065347, lng: 77.0564917, isTransferPoint: false },
  { id: 'stop-manjappara', name: 'Manjappara', lat: 8.8859636, lng: 76.8821825, isTransferPoint: false },
  { id: 'stop-alanchery', name: 'Alanchery', lat: 8.865221, lng: 76.516287, isTransferPoint: false },
  { id: 'stop-vilakudy', name: 'Vilakudy', lat: 9.0306388, lng: 76.8690005, isTransferPoint: false },
  { id: 'stop-elampal', name: 'Elampal', lat: 9.0258788, lng: 76.8831172, isTransferPoint: false },
  { id: 'stop-sasthamcotta', name: 'Sasthamcotta', lat: 9.0506075, lng: 76.6277467, isTransferPoint: false },
  { id: 'stop-bharanikavu', name: 'Bharanikavu', lat: 9.0596893, lng: 76.6373503, isTransferPoint: false },
  { id: 'stop-sooranad', name: 'Sooranad', lat: 9.1040599, lng: 76.6332878, isTransferPoint: false },
  { id: 'stop-west-kallada', name: 'West Kallada', lat: 9.0114387, lng: 76.6066872, isTransferPoint: false },
  { id: 'stop-east-kallada', name: 'East Kallada', lat: 9.0081093, lng: 76.652996, isTransferPoint: false },
  { id: 'stop-poruvazhy', name: 'Poruvazhy', lat: 9.0726261, lng: 76.6555, isTransferPoint: false },
  { id: 'stop-kunnathur', name: 'Kunnathur', lat: 9.070971, lng: 76.6502558, isTransferPoint: false },
  { id: 'stop-manampuzha', name: 'Manampuzha', lat: 9.0714353, lng: 76.6869811, isTransferPoint: false },
  { id: 'stop-vazhayilmukku', name: 'Vazhayilmukku', lat: 8.9781236, lng: 76.5461243, isTransferPoint: false },
  { id: 'stop-mukkadamukku', name: 'Mukkadamukku', lat: 8.9784651, lng: 76.5436009, isTransferPoint: false },
  { id: 'stop-nedumoncavu', name: 'Nedumoncavu', lat: 8.9295626, lng: 76.7166955, isTransferPoint: false },
  { id: 'stop-chittumala', name: 'Chittumala', lat: 9.0103524, lng: 76.6668418, isTransferPoint: false },
  { id: 'stop-kumbalam', name: 'Kumbalam', lat: 8.9906954, lng: 76.6616148, isTransferPoint: false },
  { id: 'stop-mammoottilkadavu', name: 'Mammoottilkadavu', lat: 8.844613, lng: 76.512778, isTransferPoint: false },
  { id: 'stop-kanjiracode', name: 'Kanjiracode', lat: 8.9703081, lng: 76.670006, isTransferPoint: false },
  { id: 'stop-pravachambalam', name: 'Pravachambalam', lat: 8.973504, lng: 76.630177, isTransferPoint: false },
  { id: 'stop-thalachira', name: 'Thalachira', lat: 8.982498, lng: 76.8466489, isTransferPoint: false },
  { id: 'stop-mailakkadu', name: 'Mailakkadu', lat: 8.914345, lng: 76.647755, isTransferPoint: false },
  { id: 'stop-paravoor-kavala', name: 'Paravoor Kavala', lat: 8.806991, lng: 76.492565, isTransferPoint: false },
  { id: 'stop-kaithacode', name: 'Kaithacode', lat: 9.0026586, lng: 76.6803331, isTransferPoint: false },
  { id: 'stop-ambalathumkala', name: 'Ambalathumkala', lat: 8.9869462, lng: 76.7343377, isTransferPoint: false },
  { id: 'stop-vayyankala', name: 'Vayyankala', lat: 8.948151, lng: 76.689750, isTransferPoint: false },
  { id: 'stop-kuzhimathicadu', name: 'Kuzhimathicadu', lat: 8.9581248, lng: 76.7060979, isTransferPoint: false },
  { id: 'stop-melila', name: 'Melila', lat: 9.0107868, lng: 76.8518536, isTransferPoint: false },
  { id: 'stop-cherupoika', name: 'Cherupoika', lat: 9.0294723, lng: 76.6838891, isTransferPoint: false },
  { id: 'stop-thamarakudy', name: 'Thamarakudy', lat: 9.0486897, lng: 76.7973804, isTransferPoint: false },
  { id: 'stop-naduvil', name: 'Naduvil', lat: 9.0625469, lng: 76.5979498, isTransferPoint: false },
  { id: 'stop-kaithode', name: 'Kaithode', lat: 8.828792, lng: 76.8576341, isTransferPoint: false },
  { id: 'stop-kura', name: 'Kura', lat: 9.0327472, lng: 76.818251, isTransferPoint: false },
  { id: 'stop-panavely', name: 'Panavely', lat: 8.9731198, lng: 76.8245157, isTransferPoint: false },
  { id: 'stop-ottackal', name: 'Ottackal', lat: 8.9760118, lng: 77.0382372, isTransferPoint: false },
  { id: 'stop-alimukku', name: 'Alimukku', lat: 9.0567185, lng: 76.9130905, isTransferPoint: false }
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
