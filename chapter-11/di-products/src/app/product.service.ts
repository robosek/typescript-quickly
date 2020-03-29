import { Injectable } from '@angular/core';
import { Product } from './product'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProduct(): Product{
    return {
      id: 1,
      title: 'IPhone X',
      price: 10123123,
      description: "description"
    }
  }
}
