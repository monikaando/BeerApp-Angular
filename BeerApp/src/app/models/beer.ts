import {BeerDetails} from './beerDetails';

export interface Beer {
  currentPage: number;
  numberOfPages: number;
  totalResults: number;
  brewery: BeerDetails;
}
