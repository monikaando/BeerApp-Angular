import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";


@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit {
  searchName: String = "";
  searchType: String = "";
  codes: any = [];
  selectedCode: String = "";
  randomBeer :any;
  selectedBeers: any = [];
  page: number = 1;
  loadingInProgress = true

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getLocations();
    this.getRandomBeer();

  }

  getRandomBeer() {
    this.apiService.getRandomBeer().subscribe((response) => {
      this.randomBeer = response;
      this.loadingInProgress = false;
      console.log('selectedBeers/Random beer: ', this.randomBeer)
    })

  }

  searchBeersByName() {
    this.apiService.getBeersByName(this.page, this.searchName).subscribe((response) => {
      console.log(response)
      this.selectedBeers = response
        .filter((beer) => {
          return beer.name.toLowerCase().includes(this.searchName.toLowerCase())
        })
        .map((beer) => {
          return beer
        })
    })
  }

  onNameChange(value) {
    value = this.searchName;
    this.searchBeersByName()
  }

  searchBeersByType() {
    this.apiService.getBeersByType(this.page, this.searchType).subscribe((response) => {
      console.log(response)
      this.selectedBeers = response
        .filter((beer) => {
          return beer.name.toLowerCase().includes(this.searchType.toLowerCase())
        })
        .map((beer) => {
          return beer
        })
      console.log('selectedBeers: ', this.selectedBeers)
    })
  }

  //Repetitive code:Refractor later!
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

  //end


  onTypeChange(value) {
    value = this.searchType;
    this.searchBeersByType()
  }

  getBeersByCountry() {
    this.apiService.getBeersByCountry(this.page).subscribe((response) => {
      console.log(response)
      this.selectedBeers = response

        .filter((beer) => {
          return beer.breweries[0].locations[0].countryIsoCode.toLowerCase().includes(this.selectedCode.toLowerCase())
        })
        .map((beer) => {
          return beer
        })
      console.log('selectedBeers Country: ', this.selectedBeers)
    })
  }

  onCountryChange(selectedValue: string) {
    console.log('selected value: ', selectedValue);
    this.searchName = "";
    this.searchType = "";
    this.selectedBeers = [];
    this.getBeersByCountry();

  }
}
