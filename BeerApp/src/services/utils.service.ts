import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  makeUnique(array: any[]): any[] {
    return [...new Set(array)];
  }

}
