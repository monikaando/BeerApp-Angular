import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../../services/api.service';
import {BeerDetails} from '../../../models/beerDetails';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit {
  searchName: string;
  selectedType: any = [];
  selectedCode: string;
  randomBeerById: string;
  randomBeer: BeerDetails;
  selectedBeers: BeerDetails[];
  selectedBeersByType: any = [];
  beersTypes: any = [];
  codes: any = [];
  page = 1;
  numberOfPages = 0;
  loadingInProgress = true;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getBeersTypes();
    this.getLocations();
    this.getRandomBeer();
  }

  getRandomBeer(): void {
    this.apiService.getRandomBeer().subscribe((response) => {
      this.randomBeer = response;
      this.randomBeerById = response.id;
      this.loadingInProgress = false;
      this.searchName = null;
      this.selectedType = null;
      this.selectedBeers = [];
      this.apiService.getBeerById(this.randomBeerById).subscribe((resp) => {
        this.randomBeer = resp;
      });
    });
  }

  searchBeersByName(): void {
    this.apiService.getBeersByName(this.page, this.searchName).subscribe((response) => {
      this.selectedType = null;
      this.numberOfPages = response.numberOfPages;
      if (response.data) {
        this.selectedBeers = response.data
          .filter((beer) => {
            return beer.name.toLowerCase().includes(this.searchName.toLowerCase());
          });
      }
    });
  }

  onNameChange(): void {
    this.selectedType = null;
    this.selectedCode = null;
    this.page = 1;
    this.numberOfPages = 0;
    this.searchBeersByName();
  }

  getBeersTypes(): void {
    this.apiService.getBeersTypes().subscribe((response) => {
      response
        .map((beer) => {
          this.beersTypes.push(beer);
        });
    });
  }

  searchBeersByType(): void {
    this.apiService.getBeersByType(this.selectedType.id).subscribe((response) => {
      this.searchName = null;
      this.selectedBeers = response.data;
      this.selectedBeersByType = response;
    });
  }

  onTypeChange(): void {
    this.searchName = null;
    this.selectedBeers = [];
    this.page = 1;
    this.numberOfPages = 0;
    this.searchBeersByType();
  }

// Get all country codes for a dropdown list
  getLocations(): void {
    this.apiService.getLocations().subscribe((response) => {
      this.codes = response;
    });
  }

  getBeersByCountry(): void {
    this.apiService.getBeersByCountry(this.page).subscribe((response) => {
      this.numberOfPages = response.numberOfPages;
      this.selectedBeers = response.data
        .filter((beer) => {
          return beer.breweries[0].locations[0].countryIsoCode.toLowerCase().includes(this.selectedCode.toLowerCase());
        });
      this.loadingInProgress = false;
    });
  }

  onCountryChange(): void {
    this.searchName = null;
    this.selectedType = null;
    this.selectedBeers = null;
    this.page = 1;
    this.numberOfPages = 0;
    this.getBeersByCountry();
  }

  clearInputFields(): void {
    this.getRandomBeer();
    this.searchName = null;
    this.selectedType = null;
    this.selectedBeers = null;
    this.selectedCode = null;
    this.selectedType = null;
    this.page = 1;
    this.numberOfPages = 0;
  }

  getNextPage(): void {
    this.page += 1;
    if (this.searchName && this.searchName.length > 0) {
      this.searchBeersByName();
    } else if (this.selectedCode) {
      this.getBeersByCountry();
    }
    this.selectedBeers = null;
    this.randomBeer = null;
  }
  // getPreviousPage(): void {
  //   this.page -= 1;
  //   if (this.searchName.length > 0) {
  //     this.searchBeersByName();
  //   } else if (this.selectedCode) {
  //     this.getBeersByCountry();
  //   }
  //   this.selectedBeers = null;
  //   this.randomBeer = null;
  // }
}
