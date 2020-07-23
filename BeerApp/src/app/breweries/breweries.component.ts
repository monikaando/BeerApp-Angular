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
  uniqueDataBrewery: any = []; //unique this.data.data.brewery
  breweryId: any=[];
  codes: any = [];
  selectedCode = 'All countries';
  brewByCountry: any = [];
  uniqueBrewByCountry: any =[];
  searchName: string;

  constructor(private http: HttpClient) {
  }

  getBreweries() {
    return this.http.get('api/locations/?key=659d5c6b8f3d2447f090119e48202fdb')
  }

  getBreweriesByCountry() {
    return this.http.get(`api/locations/?countryIsoCode=${this.selectedCode}&order=breweryName&key=659d5c6b8f3d2447f090119e48202fdb`)
  }
  searchCountryByName() {
     return this.http.get(`api/search/?key=659d5c6b8f3d2447f090119e48202fdb&type=brewery&q=${this.searchName}`)
}
  initialisation(r) {
    this.countryCodes(r);
    this.uniqueBreweries(r);
    this.uniqueDataBrewery.sort(this.alphabeticalOrder("name"))  //alphabetical order

    console.log('data', this.data)
    console.log('uniqueData', this.uniqueData)
    console.log('uniqueDataBrewery', this.uniqueDataBrewery)
    console.log('codes', this. codes)
    console.log('selectedCode', this.selectedCode)
    console.log('brewByCountry:', this.brewByCountry)
    console.log('uniqueBrewByCountry:', this.uniqueBrewByCountry)
  }
  showCountries(res) {
    this.uniqueBrewByCountry = [];
    this.uniqueBreweriesByCountry(res)
  }
  async getBreweriesData() {
    await this.getBreweries().toPromise()
      .then(result => {
        this.data = result
      })
    return await this.getBreweries().toPromise();
  }

  async getBreweriesCountryData() {
    await this.getBreweriesByCountry().toPromise()
      .then(result => {
        this.brewByCountry = result
      })
    return await this.getBreweriesByCountry().toPromise();
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

//alphabetical order
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
    this.getBreweriesCountryData()
      .then(res=>this.showCountries(res))
  }

  ngOnInit() {
    this.getBreweriesData()
      .then(r => this.initialisation(r))

  }

}
