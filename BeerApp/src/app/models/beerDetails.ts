import {BreweryDetails} from './breweryDetails';

interface Labels {
  icon: string;
  medium: string;
  large: string;
  contentAwareIcon: string;
  contentAwareMedium: string;
}

interface Style {
  name: string;
  description: string;
  ibuMin: string;
  ibuMax: string;
}

export interface BeerDetails {
  id: string;
  name: string;
  abv: string;
  labels: Labels;
  style: Style;
  breweries: BreweryDetails;
}
