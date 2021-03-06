import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service'
import { Product } from '../product'

@Component({
  selector: 'di-product-page',
  template: `
    <div>
    <h1>Product details</h1>
    <h2>Title: {{product.title}}</h2>
    <h2>Description: {{product.description}}</h2>
    <h2>Price: \${{product.price}}</h2>
    <div>
  `,
  styles: []
})
export class ProductComponent {
  
  product: Product;

  constructor(productService: ProductService) { 
    this.product = productService.getProduct()
  }

}
