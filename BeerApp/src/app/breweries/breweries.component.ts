import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.scss']
})

export class BreweriesComponent implements OnInit {
  data: any = []; //this.data.data
  uniqueData: any = []; //unique this.data.data
  uniqueDataBrewery: any = []; //unique this.data.data.brewery for remove  duplicates by name
  codes: any = []; //country codes
  selectedCode = 'All countries';
  brewByCountry: any = [];
  uniqueBrewByCountry: any = [];
  searchByBreweryName = '';
  searchResult: any = [];

  constructor(private http: HttpClient) {
  }

  async getBreweries() {
    const request = this.http.get('api/locations/?key=659d5c6b8f3d2447f090119e48202fdb')
    return await request.toPromise()
  }

  getBreweriesByCountry() {
    return this.http.get(`api/locations/?countryIsoCode=${this.selectedCode}&order=breweryName&key=659d5c6b8f3d2447f090119e48202fdb`)
  }

  searchBreweryByName() {
    return this.http.get(`api/search/?key=659d5c6b8f3d2447f090119e48202fdb&type=brewery&q=${this.searchByBreweryName}`)
  }

  initialisation(r) {
    this.data = r
    this.countryCodes(r);
    this.uniqueBreweries(r);
    this.uniqueDataBrewery.sort(this.alphabeticalOrder("name"))
  }

  showCountries(res) {
    this.uniqueBrewByCountry = [];
    this.uniqueBreweriesByCountry(res)
  }

  async getBreweriesCountryData() {
    return await this.getBreweriesByCountry().toPromise()
      .then(result => {
        this.brewByCountry = result
        return result
      })
  }

  async getBreweriesByName() {
    return await this.searchBreweryByName().toPromise()
      .then(result => {
        this.searchResult = result
        return result
      })
  }

  countryCodes(r) {
    const codesArray = r.data.map(item => item.countryIsoCode);
    this.codes = [...new Set(codesArray)]
  }

  uniqueBreweries(r) {
    let uniqueObject = {};
    let data = r.data
    for (let i in data) {
      if (data.hasOwnProperty(i)) {
        const objId = data[i]['breweryId'];
        uniqueObject[objId] = data[i];
      }
    }
    for (let i in uniqueObject) {
      this.uniqueData.push(uniqueObject[i]);
      this.uniqueDataBrewery.push(uniqueObject[i].brewery);
    }
  }

  uniqueBreweriesByCountry(res) {
    let uniqueObject = {};
    let data = res.data
    for (let i in data) {
      if (data.hasOwnProperty(i)) {
        const objId = data[i].brewery['name'];
        uniqueObject[objId] = data[i];
      }
    }
    for (let i in uniqueObject) {
      this.uniqueBrewByCountry.push(uniqueObject[i]);
    }
  }

  alphabeticalOrder(property) {
    let sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    }
  }

  filterSelectedCountry(selectedValue: string) {
    console.log('selected value: ', selectedValue)
    console.log('uniqueBrewByCountry: ', this.uniqueBrewByCountry)
    this.searchByBreweryName = ''
    this.getBreweriesCountryData()
      .then(res => this.showCountries(res))
  }

  onNameChange(value) {
    value = this.searchByBreweryName.toLowerCase();
    this.uniqueDataBrewery = [];
    this.uniqueBrewByCountry = [];
    this.getBreweriesByName()
      .then(r => console.log('searchResult.data', this.searchResult.data))
  }

  ngOnInit() {
    this.getBreweries()
      .then(r => this.initialisation(r))
  }
}
