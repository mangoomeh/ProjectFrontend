import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public baseApiUrl: string = "https://localhost:44325"
  constructor() { }
}
