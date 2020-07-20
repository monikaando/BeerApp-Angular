import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.scss']
})
export class BreweriesComponent implements OnInit {
  data: any={};
  constructor(private http: HttpClient) {
    this.getBreweries();
    this.getBreweriesData();
  }
  getBreweries() {
    return this.http.get('api/locations/?key=659d5c6b8f3d2447f090119e48202fdb')
  }

  getBreweriesData(){
    this.getBreweries().subscribe(data=>{
        console.log(data);
        this.data =data
      }
    )
  }
  ngOnInit(): void {
  }

}
