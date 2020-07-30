import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../../services/api.service';
import {UtilsService} from '../../../../services/utils.service';

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
              public route: ActivatedRoute,
              protected utilsService: UtilsService,) {
    // get id parameter
    this.breweryId = this.route.snapshot.paramMap.get('breweryId');
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
      this.getBeersTypes();
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

  getBeersTypes(): void {
    this.beersList
      .filter((beer) => {
        return beer.style !== undefined && beer.style !== null && beer.style.name.toLowerCase().includes(this.filterType.toLowerCase());
      })
      .map((beer) => {
        this.beersTypes.push(beer.style.name);
      });
    this.uniqueBeersTypes = this.utilsService.makeUnique(this.beersTypes);
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
