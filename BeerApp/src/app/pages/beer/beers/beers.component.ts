import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../../services/api.service";

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit {
  searchName: String = "";
  selectedBeersNames: any = [];
  page: number = 1


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

  }

searchBeersByName() {
  this.apiService.getBeersByName(this.page,this.searchName).subscribe((response) => {
    console.log(response)
    this.selectedBeersNames = response

      .filter((beer) => {
        return beer.name.toLowerCase().includes(this.searchName)
      })
      .map((beer) => {
        return beer
      })
    console.log('selectedBeersNames: ', this.selectedBeersNames)

  })
}
  onNameChange(value) {
    value = this.searchName.toLowerCase();
    this.searchBeersByName()
  }


}
