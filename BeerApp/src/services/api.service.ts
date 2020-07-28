import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Brewery} from '../app/models/brewery';
import {UtilsService} from './utils.service';
import {Beer} from '../app/models/beer';

interface ApiResponse {
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
  getBreweries(): Observable<any> {
    let breweries = [];
    return this.http.get('api/breweries?withLocations=Y&key=659d5c6b8f3d2447f090119e48202fdb').pipe(map((data: ApiResponse) => {
      breweries = data.data;
      return breweries;
    }));
  }

  getLocations(): Observable<any> {
    let locations = [];
    return this.http.get('api/locations/?key=659d5c6b8f3d2447f090119e48202fdb').pipe(map((data: ApiResponse) => {
      locations = data.data
        .filter((brewery: Brewery) => {
          return brewery.countryIsoCode !== undefined && brewery.countryIsoCode !== null;
        })
        .map((brewery) => brewery.countryIsoCode);
      return this.utilsService.makeUnique(locations);
    }));
  }

  getBreweriesByCountry(selectedValue): Observable<any> {
    let breweriesByCountry = [];
    // tslint:disable-next-line:max-line-length
    return this.http.get(`api/locations/?countryIsoCode=${selectedValue}&order=breweryName&key=659d5c6b8f3d2447f090119e48202fdb`).pipe(map((data: ApiResponse) => {
      breweriesByCountry = data.data;
      return breweriesByCountry;
    }));
  }

  searchBreweryByName(searchName): Observable<any> {
    let breweriesByName = [];
    return this.http.get(`api/search/?key=659d5c6b8f3d2447f090119e48202fdb&type=brewery&q=${searchName}`).pipe(map((data: ApiResponse) => {
      breweriesByName = data.data;
      return breweriesByName;
    }));
  }

  getBreweryById(breweryId: string): Observable<any> {
    let breweriesById = [];
    return this.http.get(`api/brewery/${breweryId}/?key=659d5c6b8f3d2447f090119e48202fdb`).pipe(map((data: ApiResponse) => {
      breweriesById = data.data;
      return breweriesById;
    }));
  }

  // beers

  getBeersByBrewery(breweryId: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`api/brewery/${breweryId}/beers/?key=659d5c6b8f3d2447f090119e48202fdb`).pipe(map((response: ApiResponse) => response.data as Beer));
  }

  getRandomBeer(): Observable<any> {
    return this.http.get('api/beer/random/?key=659d5c6b8f3d2447f090119e48202fdb'
    ).pipe(map((response: ApiResponse) => response.data as Beer));
  }

  getBeersByName(page: number, name: string): Observable<any> {
    const beersByName = [];
    return this.http.get(`api/search/?key=659d5c6b8f3d2447f090119e48202fdb&p=${page}&type=beer&q=${name}`
    ).pipe(map((response: ApiResponse) => {
      beersByName.push(response);
      return beersByName;
    }));
  }

  getBeersByType(page: number, type: string): Observable<any> {
    const beersByType = [];
    return this.http.get(`api/search/?key=659d5c6b8f3d2447f090119e48202fdb&p=${page}&type=beer&q=${type}`
    ).pipe(map((response: ApiResponse) => {
      beersByType.push(response);
      return beersByType;
    }));
  }

  getBeersByCountry(page: number): Observable<any> {
    const beersByCountry = [];
    return this.http.get(`api/beers/?withBreweries=Y&key=659d5c6b8f3d2447f090119e48202fdb&p=${page}`
    ).pipe(map((response: ApiResponse) => {
      beersByCountry.push(response);
      return beersByCountry;
    }));
  }

  getBeerById(beerId: string): Observable<Beer> {
    return this.http.get(`api/beer/${beerId}/?withBreweries=Y&key=659d5c6b8f3d2447f090119e48202fdb`)
      .pipe(map((response: ApiResponse) => response.data as Beer));
  }
}


