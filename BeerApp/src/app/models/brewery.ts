import {BreweryDetails} from './breweryDetails';

export interface Brewery {
  currentPage: number;
  numberOfPages: number;
  totalResults: number;
  brewery: BreweryDetails;
}
