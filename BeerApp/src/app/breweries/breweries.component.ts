import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.scss']
})
export class BreweriesComponent implements OnInit {
  data: any = [];
  uniqueData: any = [];
  uniqueDataBrewery: any = [];
  codes: any = [];
  breweryId: any = [];
  selectedCode = 'All countries'

  constructor(private http: HttpClient) {
  }

  getBreweries() {
    return this.http.get('api/locations/?key=659d5c6b8f3d2447f090119e48202fdb')
  }

  initialisation(r) {
    this.countryCodes(r);
    console.log('codes',this.codes)
    console.log('data:', this.data)
    this.uniqueBreweries(r);
    this.uniqueDataBrewery.sort(this.dynamicSort("name"))
    console.log(this.uniqueData)

  }

  async getBreweriesData() {
    await this.getBreweries().toPromise()
      .then(result => {
        this.data = result
      })
    return await this.getBreweries().toPromise();
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
    console.log('UniqueData: ', this.uniqueData);
    console.log('uniqueDataBrewery: ', this.uniqueDataBrewery);
  }

  dynamicSort(property) {
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

  ngOnInit() {
    this.getBreweriesData()
      .then(r => this.initialisation(r))
  }
}
