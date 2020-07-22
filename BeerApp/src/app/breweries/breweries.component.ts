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
  codes: any = [];
  breweryId: any=[];
  selectedCode = 'All countries'

  constructor(private http: HttpClient) {
  }

  getBreweries() {
    return this.http.get('api/locations/?key=659d5c6b8f3d2447f090119e48202fdb')
  }

  initialisation(r) {
    this.countryCodes(r);
    this.uniqueBreweries(r)
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
    }
    console.log('UniqueData: ', this.uniqueData);
    console.log('UniqueData length: ', this.uniqueData.length);
  }

  ngOnInit() {
    this.getBreweriesData()
      .then(r => this.initialisation(r))
  }
}
