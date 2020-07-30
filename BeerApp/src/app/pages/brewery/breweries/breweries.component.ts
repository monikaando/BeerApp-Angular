import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../../services/api.service';
import {BreweryDetails} from '../../../models/breweryDetails';
import {UtilsService} from '../../../../services/utils.service';

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.scss']
})

export class BreweriesComponent implements OnInit {
  data: BreweryDetails;
  selectedBreweries: any = [];
  codes: any = [];
  selectedCode = 'All countries';
  breweriesByCountry: any = [];
  uniqueBrewByCountry: any = [];
  searchName = '';

  constructor(private apiService: ApiService,
              protected utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.getBreweries();
    this.getLocations();
  }

  getBreweries(): void {
    this.apiService.getBreweries().subscribe((response) => {
      this.data = response;
      this.selectedBreweries = this.data;
      console.log(this.selectedBreweries);
    });
  }

// Get all country codes for a dropdown list
  getLocations(): void {
    this.apiService.getLocations().subscribe((response) => {
      this.codes = response;
    });
  }

  getBreweriesByCountry(): void {
    this.apiService.getBreweriesByCountry(this.selectedCode).subscribe((response) => {
      this.breweriesByCountry = response;
      this.utilsService.uniqueByValueInBreweriesArray(response, 'name', this.uniqueBrewByCountry);
    });
  }

  onCountryChange(event: Event): void {
    this.searchName = '';
    this.uniqueBrewByCountry = [];
    this.getBreweriesByCountry();
  }

  searchBreweriesByName(): void {
    this.apiService.searchBreweryByName(this.searchName).subscribe((response) => {
      this.selectedBreweries = response;
    });
  }

  onNameChange(value): void {
    value = this.searchName.toLowerCase();
    this.uniqueBrewByCountry = [];
    this.searchBreweriesByName();
    this.selectedCode = 'All countries';
  }

  clearInputFields(): void {
    this.selectedCode = 'All countries';
    this.searchName = '';
    this.selectedBreweries = [];
    this.getBreweries();
  }
}
