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
  {
    id: 'stop-andamukkam',
    name: 'Andamukkam',
    lat: 8.883568,
    lng: 76.589225,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-ksrtc-junction',
    name: 'KSRTC Junction',
    lat: 8.891037,
    lng: 76.585137,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-pallimukku',
    name: 'Pallimukku',
    lat: 8.876388,
    lng: 76.624329,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kilikollur',
    name: 'Kilikollur',
    lat: 8.918129,
    lng: 76.632618,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kavanad',
    name: 'Kavanad',
    lat: 8.888065,
    lng: 76.607344,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-sakthikulangara',
    name: 'Sakthikulangara',
    lat: 8.896460,
    lng: 76.623800,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-neendakara',
    name: 'Neendakara',
    lat: 8.896060,
    lng: 76.593100,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-uliyakovil',
    name: 'Uliyakovil',
    lat: 8.905008,
    lng: 76.606562,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-thirumullavaram',
    name: 'Thirumullavaram',
    lat: 8.883745,
    lng: 76.611213,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-beach-road',
    name: 'Beach Road',
    lat: 8.881166,
    lng: 76.591869,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kochupilamoodu',
    name: 'Kochupilamoodu',
    lat: 8.880587,
    lng: 76.617003,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-cantonment',
    name: 'Cantonment',
    lat: 8.881420,
    lng: 76.599304,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-asramam',
    name: 'Asramam',
    lat: 8.893876,
    lng: 76.590949,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-collectorate',
    name: 'Collectorate',
    lat: 8.894749,
    lng: 76.585438,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-mangad',
    name: 'Mangad',
    lat: 8.918643,
    lng: 76.621407,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-mevaram',
    name: 'Mevaram',
    lat: 8.868522,
    lng: 76.644527,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-polayathode',
    name: 'Polayathode',
    lat: 8.859896,
    lng: 76.601100,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-koottikada',
    name: 'Koottikada',
    lat: 8.851183,
    lng: 76.638502,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kureepuzha',
    name: 'Kureepuzha',
    lat: 8.891055,
    lng: 76.588813,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-anchalummoodu',
    name: 'Anchalummoodu',
    lat: 8.932778,
    lng: 76.605326,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-perumon',
    name: 'Perumon',
    lat: 8.955283,
    lng: 76.614370,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-panayam',
    name: 'Panayam',
    lat: 8.962758,
    lng: 76.618915,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-mulavana',
    name: 'Mulavana',
    lat: 9.002659,
    lng: 76.680333,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-thrikkadavoor',
    name: 'Thrikkadavoor',
    lat: 8.920596,
    lng: 76.594312,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-thrikkaruva',
    name: 'Thrikkaruva',
    lat: 8.946247,
    lng: 76.598201,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-umayanalloor',
    name: 'Umayanalloor',
    lat: 8.865332,
    lng: 76.654443,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-perinad',
    name: 'Perinad',
    lat: 8.948465,
    lng: 76.620885,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-mayyanad',
    name: 'Mayyanad',
    lat: 8.839594,
    lng: 76.645932,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kottiyam',
    name: 'Kottiyam',
    lat: 8.866070,
    lng: 76.670925,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kundara-east',
    name: 'Kundara East',
    lat: 8.969463,
    lng: 76.690992,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-elampalloor',
    name: 'Elampalloor',
    lat: 8.956007,
    lng: 76.670940,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-pallimon',
    name: 'Pallimon',
    lat: 8.900617,
    lng: 76.716430,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-vellimon',
    name: 'Vellimon',
    lat: 8.951740,
    lng: 76.652388,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-perumpuzha',
    name: 'Perumpuzha',
    lat: 8.938789,
    lng: 76.679306,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-koivila',
    name: 'Koivila',
    lat: 8.996287,
    lng: 76.578337,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-thazhuthala',
    name: 'Thazhuthala',
    lat: 8.882931,
    lng: 76.671569,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-thazhava',
    name: 'Thazhava',
    lat: 9.096499,
    lng: 76.553047,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-ochira',
    name: 'Ochira',
    lat: 9.131837,
    lng: 76.525160,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-clappana',
    name: 'Clappana',
    lat: 9.100677,
    lng: 76.494305,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-oachira-temple',
    name: 'Oachira Temple',
    lat: 9.135174,
    lng: 76.508740,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-alumkadavu',
    name: 'Alumkadavu',
    lat: 9.057974,
    lng: 76.506341,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-azheekal',
    name: 'Azheekal',
    lat: 9.060626,
    lng: 76.495967,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-thevalakkara',
    name: 'Thevalakkara',
    lat: 8.997672,
    lng: 76.578243,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-mynagappally',
    name: 'Mynagappally',
    lat: 9.039542,
    lng: 76.584022,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-panmana',
    name: 'Panmana',
    lat: 9.008215,
    lng: 76.542518,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-chavara-south',
    name: 'Chavara South',
    lat: 8.972759,
    lng: 76.570433,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-sankaramangalam',
    name: 'Sankaramangalam',
    lat: 8.993925,
    lng: 76.532878,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kovilthottam',
    name: 'Kovilthottam',
    lat: 8.995283,
    lng: 76.523163,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-vallikavu',
    name: 'Vallikavu',
    lat: 9.093524,
    lng: 76.493711,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kulasekharapuram',
    name: 'Kulasekharapuram',
    lat: 9.091242,
    lng: 76.516083,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-alappad',
    name: 'Alappad',
    lat: 9.062687,
    lng: 76.498841,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-cheriazheekal',
    name: 'Cheriazheekal',
    lat: 9.051187,
    lng: 76.503045,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-thodiyoor',
    name: 'Thodiyoor',
    lat: 9.075077,
    lng: 76.575469,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-lalaji-junction',
    name: 'Lalaji Junction',
    lat: 8.828987,
    lng: 76.517169,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-paravur',
    name: 'Paravur',
    lat: 8.809889,
    lng: 76.671530,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-poothakkulam',
    name: 'Poothakkulam',
    lat: 8.804269,
    lng: 76.697920,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-nedungolam',
    name: 'Nedungolam',
    lat: 8.839231,
    lng: 76.686344,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kottankulangara',
    name: 'Kottankulangara',
    lat: 8.805695,
    lng: 76.690223,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-edava-naduvil',
    name: 'Edava Naduvil',
    lat: 8.819349,
    lng: 76.697887,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-pozhikara',
    name: 'Pozhikara',
    lat: 8.815748,
    lng: 76.666339,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kappil',
    name: 'Kappil',
    lat: 8.787411,
    lng: 76.668965,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-meenad',
    name: 'Meenad',
    lat: 8.852051,
    lng: 76.705029,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-puttingal',
    name: 'Puttingal',
    lat: 8.812686,
    lng: 76.664411,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-pulamon',
    name: 'Pulamon',
    lat: 9.004805,
    lng: 76.782843,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-chengamanad',
    name: 'Chengamanad',
    lat: 8.993469,
    lng: 76.723299,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-mylom',
    name: 'Mylom',
    lat: 9.029159,
    lng: 76.783948,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-ezhukone',
    name: 'Ezhukone',
    lat: 8.979520,
    lng: 76.715330,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-valakom',
    name: 'Valakom',
    lat: 8.954421,
    lng: 76.842838,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-pavithreswaram',
    name: 'Pavithreswaram',
    lat: 9.007123,
    lng: 76.720545,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-nilamel',
    name: 'Nilamel',
    lat: 8.823471,
    lng: 76.882365,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-chadayamangalam',
    name: 'Chadayamangalam',
    lat: 8.871914,
    lng: 76.869124,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kadakkal',
    name: 'Kadakkal',
    lat: 8.827868,
    lng: 76.916511,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-jatayupara',
    name: 'Jatayupara',
    lat: 8.874917,
    lng: 76.869275,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-ayoor',
    name: 'Ayoor',
    lat: 8.897861,
    lng: 76.860121,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-yeroor',
    name: 'Yeroor',
    lat: 8.935959,
    lng: 76.945608,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-karavaloor',
    name: 'Karavaloor',
    lat: 8.980772,
    lng: 76.925036,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-thenmala',
    name: 'Thenmala',
    lat: 8.965265,
    lng: 77.069964,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-aryankavu',
    name: 'Aryankavu',
    lat: 8.981162,
    lng: 77.152892,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-edamon',
    name: 'Edamon',
    lat: 9.003081,
    lng: 76.982556,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-piravanthur',
    name: 'Piravanthur',
    lat: 9.062796,
    lng: 76.903982,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-pattazhy',
    name: 'Pattazhy',
    lat: 9.008618,
    lng: 76.887205,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-vilakkupara',
    name: 'Vilakkupara',
    lat: 8.949843,
    lng: 76.998396,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kunnicode',
    name: 'Kunnicode',
    lat: 9.017076,
    lng: 76.854334,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kulathupuzha',
    name: 'Kulathupuzha',
    lat: 8.906535,
    lng: 77.056492,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-manjappara',
    name: 'Manjappara',
    lat: 8.885964,
    lng: 76.882182,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-alanchery',
    name: 'Alanchery',
    lat: 9.013172,
    lng: 76.872811,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-vilakudy',
    name: 'Vilakudy',
    lat: 9.030639,
    lng: 76.869000,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-elampal',
    name: 'Elampal',
    lat: 9.025879,
    lng: 76.883117,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-sasthamcotta',
    name: 'Sasthamcotta',
    lat: 9.050607,
    lng: 76.627747,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-bharanikavu',
    name: 'Bharanikavu',
    lat: 9.059689,
    lng: 76.637350,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-sooranad',
    name: 'Sooranad',
    lat: 9.104060,
    lng: 76.633288,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-west-kallada',
    name: 'West Kallada',
    lat: 9.011439,
    lng: 76.606687,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-east-kallada',
    name: 'East Kallada',
    lat: 9.008109,
    lng: 76.652996,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-poruvazhy',
    name: 'Poruvazhy',
    lat: 9.072626,
    lng: 76.655500,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kunnathur',
    name: 'Kunnathur',
    lat: 9.070971,
    lng: 76.650256,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-manampuzha',
    name: 'Manampuzha',
    lat: 9.071435,
    lng: 76.686981,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-vazhayilmukku',
    name: 'Vazhayilmukku',
    lat: 8.942802,
    lng: 76.599754,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-mukkadamukku',
    name: 'Mukkadamukku',
    lat: 8.948032,
    lng: 76.593825,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-nedumoncavu',
    name: 'Nedumoncavu',
    lat: 8.929563,
    lng: 76.716696,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-chittumala',
    name: 'Chittumala',
    lat: 9.010352,
    lng: 76.666842,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kumbalam',
    name: 'Kumbalam',
    lat: 8.990695,
    lng: 76.661615,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-mammoottilkadavu',
    name: 'Mammoottilkadavu',
    lat: 8.951417,
    lng: 76.611336,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kanjiracode',
    name: 'Kanjiracode',
    lat: 8.970308,
    lng: 76.670006,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-pravachambalam',
    name: 'Pravachambalam',
    lat: 8.973504,
    lng: 76.630177,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-thalachira',
    name: 'Thalachira',
    lat: 8.982498,
    lng: 76.846649,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-mailakkadu',
    name: 'Mailakkadu',
    lat: 8.914345,
    lng: 76.647755,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-paravoor-kavala',
    name: 'Paravoor Kavala',
    lat: 8.955501,
    lng: 76.605682,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kaithacode',
    name: 'Kaithacode',
    lat: 9.002659,
    lng: 76.680333,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-ambalathumkala',
    name: 'Ambalathumkala',
    lat: 8.986946,
    lng: 76.734338,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-vayyankala',
    name: 'Vayyankala',
    lat: 8.948151,
    lng: 76.689750,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kuzhimathicadu',
    name: 'Kuzhimathicadu',
    lat: 8.958125,
    lng: 76.706098,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-melila',
    name: 'Melila',
    lat: 9.010787,
    lng: 76.851854,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-cherupoika',
    name: 'Cherupoika',
    lat: 9.029472,
    lng: 76.683889,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-thamarakudy',
    name: 'Thamarakudy',
    lat: 9.048690,
    lng: 76.797380,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-naduvil',
    name: 'Naduvil',
    lat: 8.816223,
    lng: 76.695669,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kaithode',
    name: 'Kaithode',
    lat: 8.828792,
    lng: 76.857634,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-kura',
    name: 'Kura',
    lat: 9.032747,
    lng: 76.818251,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-panavely',
    name: 'Panavely',
    lat: 8.973120,
    lng: 76.824516,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-ottackal',
    name: 'Ottackal',
    lat: 8.976012,
    lng: 77.038237,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
  },
  {
    id: 'stop-alimukku',
    name: 'Alimukku',
    lat: 9.056719,
    lng: 76.913090,
    isTransferPoint: false,
    localTips: 'Minor bus stop.'
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
