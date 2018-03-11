import days from 'days';

type ArtworkHours = {
  monday_open: string,
  monday_close: string,
  tuesday_open: string,
  tuesday_close: string,
  wednesday_open: string,
  wednesday_close: string,
  thursday_open: string,
  thursday_close: string,
  friday_open: string,
  friday_close: string,
  saturday_open: string,
  saturday_close: string,
  sunday_open: string,
  sunday_close: string,
}

type ArtworkData = {
  accentColor?: string,
  color?: string,
  location: string,
  id: number,
  title: string,
  creator?: string,
  credit?: string,
  description: string,
  discipline: string,
  objectid: string,
  year: number,
  hours: ArtworkHours,
  logo: string,
  logo_small: string,
  latitude: string,
  longitude: string,
  rangeCheck: boolean,
}

export default function transformArtwork(artwork: ArtworkData, currentDate = new Date()): any {
  let { hours } = artwork;
  let day = days[currentDate.getDay()];
  let currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:00`;
  let openingTimeToday = hours[`${day.toLowerCase()}_open`];
  let closingTimeToday = hours[`${day.toLowerCase()}_close`];

  let isOpeningLater = currentTime < openingTimeToday;

  let isOpen = (
    (currentTime > openingTimeToday) &&
    (currentTime < closingTimeToday || closingTimeToday === '00:00:00')
  ) || (
    (closingTimeToday < openingTimeToday) &&
    (currentTime > openingTimeToday)
  );

  return {
    accentColor: artwork.accentColor || '#000',
    location: artwork.location,
    closingTimeToday,
    color: artwork.color || '#fff',
    creator: artwork.creator || '',
    credit: artwork.credit || '',
    description: artwork.description,
    objectid: artwork.objectid,
    hours: artwork.hours,
    id: artwork.id,
    discipline: artwork.discipline,
    year: artwork.year,
    isOpen,
    isOpeningLater,
    latitude: parseFloat(artwork.latitude),
    logo: artwork.logo,
    longitude: parseFloat(artwork.longitude),
    title: artwork.title,
    openingTimeToday,
    smallLogo: artwork.logo_small,
    rangeCheck: artwork.rangeCheck,
  };
}
