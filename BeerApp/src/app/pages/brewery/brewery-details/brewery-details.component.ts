import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../../services/api.service";

@Component({
  selector: 'app-breweries-details',
  templateUrl: './brewery-details.component.html',
  styleUrls: ['./brewery-details.component.scss']
})
export class BreweryDetailsComponent implements OnInit {
  breweryId: any = [];
  breweryDetails: any = [];
  beersList: any = [];
  beersListByName: any = [];
  loadingInProgress = true;
  searchName: String = "";
  searchType: String = "";
  page = 1;

  constructor(private apiService: ApiService,
              private router: Router,
              public route: ActivatedRoute) {

    this.breweryId = this.route.snapshot.paramMap.get('breweryId'); //get id parameter
  }

  ngOnInit() {
    this.getBreweryById()
    this.loadingInProgress = false;
    console.log('beersListByName', this.beersListByName)
  }

  getBreweryById() {
    this.apiService.getBreweryById(this.breweryId).subscribe((response) => {
      this.breweryDetails = response
      this.getBeersByBrewery();
      console.log('breweryDetails ', this.breweryDetails)
    })
  }

  getBeersByBrewery() {
    this.apiService.getBeersByBrewery(this.breweryId).subscribe((response) => {
      this.beersList = response;
    })
  }

  searchBeersByName() {
    this.beersList
      .filter((beer) => {
        return beer.name.toLowerCase().includes(this.searchName.toLowerCase())
      })
      .map((beer) => {
        this.beersListByName.push(beer)
      })
  }

  onNameChange(value) {
    this.beersListByName = [];

    value = this.searchName
    this.searchBeersByName();
  }

  searchBeersByType() { debugger
    this.beersList
      .filter((beer) => {
        return beer.style !== undefined && beer.style !== null && beer.style.name.toLowerCase().includes(this.searchType.toLowerCase())
      })
      .map((beer) => {
        this.beersListByName.push(beer)
      })
  }

  onTypeChange(value) {
    this.beersListByName = [];
    value = this.searchType
    this.searchBeersByType();
  }

  clearInputFields() {
    this.searchName = "";
    this.searchType ="";
    this.beersListByName = [];
    this.getBeersByBrewery()
  }
}
