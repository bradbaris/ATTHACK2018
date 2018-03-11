import transformArtwork from '../transformArtwork';

describe('hours', () => {
  it('correctly calculates when open', () => {
    const openDateTime = new Date("Fri Oct 21 2016 15:55:00 GMT-0700 (PDT)");
    const artwork = transformArtwork(exampleArtwork, openDateTime);
    expect(artwork.isOpen).toBe(true);
  });

  it('correctly calculates when closed', () => {
    const closedDateTime = new Date("Fri Oct 21 2016 23:55:00 GMT-0700 (PDT)");
    const artwork = transformArtwork(exampleArtwork, closedDateTime);
    expect(artwork.isOpen).toBe(false);
  });
});

const exampleArtwork = {
  "id": 3,
  "type": "artwork",
  "title": "Generic Artwork",
  "location": "Laniakea Supercluster",
  "creator": "The Unknown One",
  "credit": "Funded by the Intergalactic Administration",
  "objectid": "9999.99.99",
  "discipline": "Tesseract",
  "year": 3000,
  "latitude": 100.0000,
  "longitude": -100.0000,
  "description": "No record exists.",
  "logo": "https://nomadspaceship.com/artifact/images/19300101.jpg",
  "logo_150": "https://nomadspaceship.com/artifact/images/thumbs/19300101.jpg",
  "logo_small": "https://nomadspaceship.com/artifact/images/thumbs/19300101.jpg",
  "logo_full": "https://nomadspaceship.com/artifact/images/19300101.jpg",
  "banner": "https://nomadspaceship.com/artifact/images/19300101.jpg",
  "banner_thumb": "https://nomadspaceship.com/artifact/images/19300101.jpg",
  "banner_medium": "https://nomadspaceship.com/artifact/images/19300101.jpg",
  "hours": { timezone: "Pacific/Honolulu", artwork_id:1, monday_open: "05:00:00", monday_close: "10:00:00", tuesday_open: "05:00:00", tuesday_close: "10:00:00", wednesday_open: "05:00:00", wednesday_close: "10:00:00", thursday_open: "05:00:00", thursday_close: "10:00:00", friday_open: "05:00:00", friday_close: "10:00:00", saturday_open: "05:00:00", saturday_close: "10:00:00", sunday_open: "05:00:00", sunday_close: "10:00:00", created_at: "-2018-03-10 00:00:00", updated_at: "-2018-03-10 06:00:00", status: "open" },
  "color": "#ffb82b",
  "accentColor": "#425470",
  "created_at": "-2018-03-09 20:00:00",
  "updated_at": "-2018-03-10 60:00:00",
  "hours":{
    "timezone":"Pacific/Honolulu",
    "artwork_id":1001,
    "monday_open":"11:00:00",
    "monday_close":"23:00:00",
    "tuesday_open":"11:00:00",
    "tuesday_close":"23:00:00",
    "wednesday_open":"11:00:00",
    "wednesday_close":"23:00:00",
    "thursday_open":"11:00:00",
    "thursday_close":"23:00:00",
    "friday_open":"11:00:00",
    "friday_close":"23:00:00",
    "saturday_open":"11:00:00",
    "saturday_close":"23:00:00",
    "sunday_open":"11:00:00",
    "sunday_close":"23:00:00",
    "created_at": "-2018-03-09 20:00:00",
    "updated_at": "-2018-03-10 60:00:00",
    "status":"open"
  },
}
