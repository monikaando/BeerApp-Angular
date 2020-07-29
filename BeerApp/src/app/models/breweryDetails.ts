interface Image {
  squareMedium: string;
}

interface Location {
  countryIsoCode: string;
}

export interface BreweryDetails {
  id: number;
  name: string;
  description: string;
  established: number;
  images: Image;
  website: string;
  countryIsoCode: string;
  locations: Array<Location>;
}
