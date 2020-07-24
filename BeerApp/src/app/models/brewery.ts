interface Image {
  squareMedium: String,
}

interface Location {
  countryIsoCode: String,
}

export interface Brewery {
  id: number,
  name: string,
  description: string,
  established: number,
  images: Image,
  website: string,
  locations: Array<Location>
}
