import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: any = {};

  constructor(private http: HttpClient) {
    this.getBreweries();
    this.getBreweriesData()
  }

  getBreweries() {
    return this.http.get('api/locations/?key=659d5c6b8f3d2447f090119e48202fdb')
  }


  getBreweriesData(){
    this.getBreweries().subscribe(data=>{
      console.log(data);
      this.data=data;
      }
    )
  }
}
