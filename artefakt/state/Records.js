import { Record, List } from 'immutable';

export const ArtworksState = Record({
  all: new List(),
  nearby: new List(),
  favorited: new List(),
});

export const Artwork = Record({
  id: '',
  accentColor: '#000',
  location: '',
  closingTimeToday: '',
  color: '#fff',
  creator: '',
  credit: '',
  description: '',
  discipline: '',
  objectid: '',
  year: 0,
  hours: [],
  isOpen: false,
  isOpeningLater: '',
  latitude: 0,
  logo: '',
  longitude: 0,
  title: '',
  openingTimeToday: '',
  smallLogo: '',
  distance: null,
  direction: null,
  rangeCheck: false,
});

export const User = Record({
  id: null,
  authToken: null,
  name: null,
  isGuest: null,
});
