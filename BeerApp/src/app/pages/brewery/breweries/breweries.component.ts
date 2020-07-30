import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../../services/api.service';
import {BreweryDetails} from '../../../models/breweryDetails';

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

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getBreweries();
    this.getLocations();
    console.log(this.selectedBreweries);
  }

  getBreweries(): void {
    this.apiService.getBreweries().subscribe((response) => {
      this.data = response;
      this.selectedBreweries = this.data;
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
      this.uniqueBreweriesByCountry(response);
    });
  }

  onCountryChange(event: Event): void {
    this.searchName = '';
    this.uniqueBrewByCountry = [];
    this.getBreweriesByCountry();
  }

  uniqueBreweriesByCountry(response): void {
    const uniqueObject = {};
    const data = response;
    for (const i in data) {
      if (data.hasOwnProperty(i)) {
        const objId = data[i].brewery['name'];
        uniqueObject[objId] = data[i];
      }
    }
    for (const i in uniqueObject) {
      this.uniqueBrewByCountry.push(uniqueObject[i]);
    }
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
