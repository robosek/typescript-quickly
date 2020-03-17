import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Product } from '../product'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  template: `
    <h1>Products</h1>
    <ul>
    <li *ngFor="let product of products$ | async">
    {{product.title }}: {{product.price | currency}} 1((CO17-1))
    </li>
    </ul>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  products$: Observable<Product[]>

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    this.products$ = this.httpClient.get<Product[]>("../data/products.json")
  }

}
