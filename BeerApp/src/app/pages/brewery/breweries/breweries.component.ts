import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {Brewery} from "../../../models/brewery";

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.scss']
})

export class BreweriesComponent implements OnInit {
  data: Array<Brewery>;
  selectedBreweries: Array<Brewery>
  codes: any = [];
  selectedCode = 'All countries';
  breweriesByCountry: any = [];
  uniqueBrewByCountry: any = [];
  searchName: String = "";

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getBreweries()
    this.getLocations()
  }

  getBreweries() {
    this.apiService.getBreweries().subscribe((response) => {
      this.data = response
      this.selectedBreweries = this.data
    })
  }

  getLocations() {  //Get all country codes for a dropdown list
    this.apiService.getLocations().subscribe((response) => {
      this.codes = response
        .filter((brewery) => {
          return brewery.countryIsoCode !== undefined && brewery.countryIsoCode !== null
        })
        .map((brewery) => {
          return brewery.countryIsoCode
        })

      console.log('codes/all country codes: ', this.codes)
      this.countryCodes(response)
      console.log('codes/unique country codes: ', this.codes)
    })
  }

  countryCodes(response) {
    const codesArray = response.map(item => item.countryIsoCode);
    this.codes = [...new Set(codesArray)]
  }

  getBreweriesByCountry() {
    this.apiService.getBreweriesByCountry(this.selectedCode).subscribe((response) => {
      this.breweriesByCountry = response
      console.log('breweriesByCountry/all breweries by country: ', this.uniqueBrewByCountry)
      this.uniqueBreweriesByCountry(response);
    })
  }

  onChangeCountry(selectedValue: string) {
    console.log('selected value: ', selectedValue)
    this.searchName = ''
    this.uniqueBrewByCountry = [];
    this.getBreweriesByCountry()
  }

  uniqueBreweriesByCountry(response) {
    let uniqueObject = {};
    let data = response
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

  searchBreweriesByName() {
    this.apiService.searchBreweryByName(this.searchName).subscribe((response) => {
      this.selectedBreweries = response
      console.log('selectedBreweries/search by name: ', this.selectedBreweries)

    })
  }

  onNameChange(value) {
    value = this.searchName.toLowerCase();
    this.uniqueBrewByCountry = [];
    this.searchBreweriesByName()
  }


}
