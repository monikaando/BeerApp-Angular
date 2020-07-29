import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {UtilsService} from './utils.service';
import {BeerDetails} from '../app/models/beerDetails';
import {BreweryDetails} from '../app/models/breweryDetails';

interface ApiResponse {
  currentPage: number;
  numberOfPages: number;
  totalResults: number;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    protected http: HttpClient,
    protected utilsService: UtilsService,
  ) {
  }

// breweries
  getBreweries(): Observable<BreweryDetails> {
    return this.http.get('api/breweries?withLocations=Y&key=659d5c6b8f3d2447f090119e48202fdb')
      .pipe(map((response: ApiResponse) => response.data as BreweryDetails));
  }

  getLocations(): Observable<any> {
    let locations = [];
    return this.http.get('api/locations/?key=659d5c6b8f3d2447f090119e48202fdb').pipe(map((data: ApiResponse) => {
      locations = data.data
        .filter((brewery: BreweryDetails) => {
          return brewery.countryIsoCode !== undefined && brewery.countryIsoCode !== null;
        })
        .map((brewery) => brewery.countryIsoCode);
      return this.utilsService.makeUnique(locations);
    }));
  }

  getBreweriesByCountry(selectedValue: string): Observable<BreweryDetails> {
    return this.http.get(`api/locations/?countryIsoCode=${selectedValue}&order=breweryName&key=659d5c6b8f3d2447f090119e48202fdb`)
      .pipe(map((response: ApiResponse) => response.data as BreweryDetails));
  }

  searchBreweryByName(searchName: string): Observable<BreweryDetails> {
    return this.http.get(`api/search/?key=659d5c6b8f3d2447f090119e48202fdb&type=brewery&q=${searchName}`)
      .pipe(map((response: ApiResponse) => response.data as BreweryDetails));
  }

  getBreweryById(breweryId: string): Observable<ApiResponse> {
    return this.http.get(`api/brewery/${breweryId}/?key=659d5c6b8f3d2447f090119e48202fdb`)
      .pipe(map((response: ApiResponse) => response.data as ApiResponse));
  }

  // beers
  getBeersByBrewery(breweryId: string): Observable<BeerDetails> {
    return this.http.get(`api/brewery/${breweryId}/beers/?key=659d5c6b8f3d2447f090119e48202fdb`)
      .pipe(map((response: ApiResponse) => response.data as BeerDetails));
  }

  getRandomBeer(): Observable<BeerDetails> {
    return this.http.get('api/beer/random/?key=659d5c6b8f3d2447f090119e48202fdb')
      .pipe(map((response: ApiResponse) => response.data as BeerDetails));
  }

  getBeersByName(page: number, name: string): Observable<ApiResponse> {
    return this.http.get(`api/search/?key=659d5c6b8f3d2447f090119e48202fdb&p=${page}&type=beer&q=${name}`)
      .pipe(map((response: ApiResponse) => response as ApiResponse));
  }

  getBeersByType(page: number, type: string): Observable<ApiResponse> {
    return this.http.get(`api/search/?key=659d5c6b8f3d2447f090119e48202fdb&p=${page}&type=beer&q=${type}`)
      .pipe(map((response: ApiResponse) => response as ApiResponse));
  }

  getBeersByCountry(page: number): Observable<ApiResponse> {
    return this.http.get(`api/beers/?withBreweries=Y&key=659d5c6b8f3d2447f090119e48202fdb&p=${page}`)
      .pipe(map((response: ApiResponse) => response as ApiResponse));
  }

  getBeerById(beerId: string): Observable<BeerDetails> {
    return this.http.get(`api/beer/${beerId}/?withBreweries=Y&key=659d5c6b8f3d2447f090119e48202fdb`)
      .pipe(map((response: ApiResponse) => response.data as BeerDetails));
  }
}
