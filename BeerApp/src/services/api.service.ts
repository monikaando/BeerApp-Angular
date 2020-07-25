import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Brewery} from "../app/models/brewery";
import {map} from "rxjs/operators";

interface ApiResponse {
  data: Array<Brewery>
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getBreweries(): Observable<any> {
    let breweries = [];
    return this.http.get('api/breweries?withLocations=Y&key=659d5c6b8f3d2447f090119e48202fdb').pipe(map((data: ApiResponse) => {
      breweries = data.data;
      return breweries;
    }))
  }

  getLocations(): Observable<any> {
    let locations = [];
    return this.http.get('api/locations/?key=659d5c6b8f3d2447f090119e48202fdb').pipe(map((data: ApiResponse) => {
      locations = data.data;
      return locations;
    }))
  }

  getBreweriesByCountry(selectedValue): Observable<any> {
    let breweriesByCountry = [];
    return this.http.get(`api/locations/?countryIsoCode=${selectedValue}&order=breweryName&key=659d5c6b8f3d2447f090119e48202fdb`).pipe(map((data: ApiResponse) => {
      breweriesByCountry = data.data;
      return breweriesByCountry;
    }))
  }

  searchBreweryByName(searchName): Observable<any> {
    let breweriesByName = [];
    return this.http.get(`api/search/?key=659d5c6b8f3d2447f090119e48202fdb&type=brewery&q=${searchName}`).pipe(map((data: ApiResponse) => {
      breweriesByName = data.data;
      return breweriesByName;
    }))
  }
}

