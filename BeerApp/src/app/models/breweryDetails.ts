interface Image {
  squareMedium: String,
}

interface Location {
  countryIsoCode: String,
}

export interface BreweryDetails {
  id: number,
  name: string,
  description: string,
  established: number,
  images: Image,
  website: string,
  locations: Array<Location>
}
