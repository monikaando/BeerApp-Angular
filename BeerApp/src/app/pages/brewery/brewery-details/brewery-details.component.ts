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
  uniqueBeersTypes: any = [];
  searchName = '';
  filterType = '';
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

  onNameChange(event: Event): void {
    this.searchBeersList = [];
    this.searchBeersByName();
  }

  searchBeersTypes(): void {
    this.beersList
      .filter((beer) => {
        return beer.style && beer.style.name.toLowerCase().includes(this.filterType.toLowerCase());
      })
      .map((beer) => {
        this.beersTypes.push(beer.style.name);
      });
    this.uniqueBeersTypes = [...new Set(this.beersTypes)];
    console.log('Unique beers', this.uniqueBeersTypes);
  }

  searchBeersByType(): void {
    this.beersList
      .filter((beer) => {
        return beer.style.name.includes(this.filterType);
      })
      .map((beer) => {
        this.searchBeersList.push(beer);
      });
  }

  onTypeChange(event: Event): void {
    this.searchBeersList = [];
    this.searchBeersByType();
  }

  clearInputFields(): void {
    this.searchName = '';
    this.filterType = '';
    this.searchBeersList = [];
    this.getBeersByBrewery();
  }
}
