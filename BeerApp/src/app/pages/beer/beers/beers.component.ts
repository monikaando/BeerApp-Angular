import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../../services/api.service';
import {Beer} from '../../../models/beer';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit {
  searchName = '';
  searchType = '';
  beersTypes: any = [];
  uniqueBeersTypes: any = [];
  codes: any = [];
  selectedCode = '';
  randomBeer: any;
  randomBeerById = '';
  selectedBeers: any = [];
  page = 1;
  numberOfPages = 0;
  loadingInProgress = true;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getLocations();
    this.getRandomBeer();
  }

  getRandomBeer(): void {
    this.apiService.getRandomBeer().subscribe((response) => {
      this.randomBeer = response;
      this.randomBeerById = response.id;
      this.loadingInProgress = false;
      this.searchName = '';
      this.searchType = '';
      this.selectedBeers = [];
      this.apiService.getBeerById(this.randomBeerById).subscribe((resp) => {
        this.randomBeer = resp;
      });
    });
  }

  searchBeersByName(): void {
    this.apiService.getBeersByName(this.page, this.searchName).subscribe((response) => {
      console.log(response);
      this.searchType = '';
      this.numberOfPages = response.numberOfPages;
      if (response.data){
      this.selectedBeers = response.data
        .filter((beer) => {
          return beer.name.toLowerCase().includes(this.searchName.toLowerCase());
        });
      }
    });
  }

  onNameChange(value: string): void {
    // this.value = this.searchName;
    this.searchType = '';
    this.page = 1;
    this.numberOfPages = 0;
    this.searchBeersByName();
  }

  // searchBeersTypes(): void {
  //   this.beersTypes
  //     .filter((beer) => {
  //       return beer.style && beer.style.name.toLowerCase().includes(this.searchType.toLowerCase());
  //     })
  //     .map((beer) => {
  //       this.beersTypes.push(beer.style.name);
  //     });
  //   this.uniqueBeersTypes = [...new Set(this.beersTypes)];
  //   console.log('Unique beers', this.uniqueBeersTypes);
  // }

  searchBeersByType(): void {
    this.apiService.getBeersByType(this.page, this.searchType).subscribe((response) => {
      this.searchName = '';
      this.numberOfPages = response.numberOfPages;
      if (response.data){
      this.selectedBeers = response.data
        .filter((beer) => {
          return beer.style !== undefined && beer.style !== null && beer.style.name.toLowerCase()
            .includes(this.searchType.toLowerCase());
        });
      }
    });
  }

  onTypeChange(value): void {
    this.searchName = '';
    this.page = 1;
    this.numberOfPages = 0;
    value = this.searchType;
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
      console.log(response);
      this.numberOfPages = response.numberOfPages;
      this.selectedBeers = response.data
        .filter((beer) => {
          return beer.breweries[0].locations[0].countryIsoCode.toLowerCase().includes(this.selectedCode.toLowerCase());
        });
      this.loadingInProgress = false;
    });
  }

  onCountryChange(event: Event): void {
    this.searchName = '';
    this.searchType = '';
    this.selectedBeers = [];
    this.page = 1;
    this.numberOfPages = 0;
    this.getBeersByCountry();

  }

  clearInputFields(): void {
    this.getRandomBeer();
    this.searchName = '';
    this.searchType = '';
    this.selectedBeers = [];
    this.selectedCode = '';
    this.page = 1;
    this.numberOfPages = 0;
  }

  getNextPage(): void {
    this.page += 1;
    if (this.searchName.length > 0) {
      this.searchBeersByName();
    } else if (this.searchType.length > 0) {
      (
        this.searchBeersByType()
      );
    } else if (this.selectedCode) {
      this.getBeersByCountry();
    }
    this.selectedBeers = [];
    this.randomBeer = [];
    console.log('pages', this.page);
    console.log('numberOfPages', this.numberOfPages);
  }
}
