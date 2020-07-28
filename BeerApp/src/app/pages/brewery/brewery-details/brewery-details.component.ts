import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../../services/api.service';

@Component({
  selector: 'app-breweries-details',
  templateUrl: './brewery-details.component.html',
  styleUrls: ['./brewery-details.component.scss']
})
export class BreweryDetailsComponent implements OnInit {
  breweryId: any = [];
  breweryDetails: any = [];
  beersList: any = [];
  searchBeersList: any = [];
  beersTypes: any = [];
  searchName = '';
  searchType = '';
  page = 1;
  loadingInProgress = true;

  constructor(private apiService: ApiService,
              private router: Router,
              public route: ActivatedRoute) {

    this.breweryId = this.route.snapshot.paramMap.get('breweryId'); // get id parameter
  }

  ngOnInit(): void {
    this.getBreweryById();
    this.getBeersByBrewery();
    this.loadingInProgress = false;
  }

  getBreweryById(): void {
    this.apiService.getBreweryById(this.breweryId).subscribe((response) => {
      this.breweryDetails = response;
      this.getBeersByBrewery();
    });
  }

  getBeersByBrewery(): void {
    this.apiService.getBeersByBrewery(this.breweryId).subscribe((response) => {
      this.beersList = response;
      this.searchBeersTypes();
    });
  }

  searchBeersByName(): void {
    this.beersList
      .filter((beer) => {
        return beer.name.toLowerCase().includes(this.searchName.toLowerCase());
      })
      .map((beer) => {
        this.searchBeersList.push(beer);
      });
  }

  onNameChange(value): void {
    this.searchBeersList = [];
    value = this.searchName;
    this.searchBeersByName();
  }

  searchBeersTypes(): void {
    this.beersList
      .map((beer) => {
        this.beersTypes.push(beer.style.name);
      });
  }

  searchBeersByType(): void {
    this.beersList
      .filter((beer) => {
        return beer.style !== undefined && beer.style !== null && beer.style.name.toLowerCase().includes(this.searchType.toLowerCase());
      })
      .map((beer) => {
        this.searchBeersList.push(beer);
      });
    console.log('searchBeersByType', this.searchBeersList);
  }

  onTypeChange(value): void {
    this.searchBeersList = [];
    value = this.searchType;
    this.searchBeersByType();
  }

  clearInputFields(): void {
    this.searchName = '';
    this.searchType = '';
    this.searchBeersList = [];
    this.getBeersByBrewery();
  }
}
