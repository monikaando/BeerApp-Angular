import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.scss']
})
export class BreweriesComponent implements OnInit {
  data: any = [];
  uniqueNames: any = [];
  codes: any = [];
  selectedCode='All countries'

  constructor(private http: HttpClient) {
    this.ngAfterViewInit()
  }

  getBreweries() {
    return this.http.get('api/locations/?key=659d5c6b8f3d2447f090119e48202fdb')
  }

  async getBreweriesData() {
    await this.getBreweries().toPromise()
      .then(result => {
        this.data = result
      })
    return await this.getBreweries().toPromise();
  }
  countryCodes(r){
    const codesArray = r.data.map(item => item.countryIsoCode);
    this.codes = [...new Set(codesArray)]
  }
  uniqueCountryNames(r) {
    const breweryNamesArray = r.data.map(item => item.brewery.name);
    this.uniqueNames = [...new Set(breweryNamesArray)]
  }
  ngOnInit() {
    this.getBreweriesData()
      .then(r => this.countryCodes(r))
  }
  ngAfterViewInit(){
    this.getBreweriesData()
      .then(r => this.uniqueCountryNames(r))
  }
}
// r=this.data - >result of getBreweriesData()
