import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {UtilsService} from './utils.service';
import {BeerDetails} from '../app/models/beerDetails';
import {BreweryDetails} from '../app/models/breweryDetails';
import {environment} from '../environments/environment';

interface ApiResponse {
  numberOfPages: number;
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
    return this.http.get(`api/breweries?withLocations=Y&key=${environment.KEY}`)
      .pipe(map((response: ApiResponse) => response.data as BreweryDetails));
  }

  getLocations(): Observable<any> {
    let locations = [];
    return this.http.get(`api/locations/?key=${environment.KEY}`).pipe(map((response: ApiResponse) => {
      locations = response.data
        .filter((brewery: BreweryDetails) => {
          return brewery.countryIsoCode !== undefined && brewery.countryIsoCode !== null;
        })
        .map((brewery) => brewery.countryIsoCode);
      return this.utilsService.makeUnique(locations);
    }));
  }

  getBreweriesByCountry(selectedValue: string): Observable<BreweryDetails> {
    return this.http.get(`api/locations/?countryIsoCode=${selectedValue}&order=breweryName&key=${environment.KEY}`)
      .pipe(map((response: ApiResponse) => response.data as BreweryDetails));
  }

  searchBreweryByName(searchName: string): Observable<BreweryDetails> {
    return this.http.get(`api/search/?key=${environment.KEY}&type=brewery&q=${searchName}`)
      .pipe(map((response: ApiResponse) => response.data as BreweryDetails));
  }

  getBreweryById(breweryId: string): Observable<ApiResponse> {
    return this.http.get(`api/brewery/${breweryId}/?key=${environment.KEY}`)
      .pipe(map((response: ApiResponse) => response.data as ApiResponse));
  }

  // beers
  getBeersByBrewery(breweryId: string): Observable<BeerDetails> {
    return this.http.get(`api/brewery/${breweryId}/beers/?key=${environment.KEY}`)
      .pipe(map((response: ApiResponse) => response.data as BeerDetails));
  }

  getRandomBeer(): Observable<BeerDetails> {
    return this.http.get(`api/beer/random/?key=${environment.KEY}`)
      .pipe(map((response: ApiResponse) => response.data as BeerDetails));
  }

  getBeersByName(page: number, name: string): Observable<ApiResponse> {
    return this.http.get(`api/search/?key=${environment.KEY}&p=${page}&type=beer&q=${name}`)
      .pipe(map((response: ApiResponse) => response as ApiResponse));
  }

  getBeersTypes(): Observable<any> {
    return this.http.get(`api/styles?key=${environment.KEY}`)
      .pipe(map((response: ApiResponse) => response.data));
  }

  getBeersByType(styleId: number): Observable<ApiResponse> {
    return this.http.get(`api/beers?styleId=${styleId}&key=${environment.KEY}`)
      .pipe(map((response: ApiResponse) => response as ApiResponse));
  }

  getBeersByCountry(page: number): Observable<ApiResponse> {
    return this.http.get(`api/beers/?withBreweries=Y&key=${environment.KEY}&p=${page}`)
      .pipe(map((response: ApiResponse) => response as ApiResponse));
  }

  getBeerById(beerId: string): Observable<BeerDetails> {
    return this.http.get(`api/beer/${beerId}/?withBreweries=Y&key=${environment.KEY}`)
      .pipe(map((response: ApiResponse) => response.data as BeerDetails));
  }
}
