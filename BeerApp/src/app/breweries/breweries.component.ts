import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.scss']
})
export class BreweriesComponent implements OnInit {
  data: any = [];
  unique: any = [];

  constructor(private http: HttpClient) {

  }

  getBreweries() {
    return this.http.get('api/locations/?key=659d5c6b8f3d2447f090119e48202fdb')
  }

  async getBreweriesData() {
    await this.getBreweries().toPromise().then(data => {
      this.data = data
      console.log(this.data.data)
    })
    this.removeDuplicates()
  }

  removeDuplicates() {
    const breweryNamesArray = this.data.data.map(item => item.brewery.name);
    this.unique = [...new Set(breweryNamesArray)]
    console.log(breweryNamesArray)
    console.log(this.unique);
  }

  ngOnInit() {
    this.getBreweries();
    this.getBreweriesData().then(r =>this.removeDuplicates());

  }
}
