<template>
  <div class="hello">
   <h1>Products</h1>
   <ul>
     <li v-for="product in products" 
         v-bind:key="product.key"
         v-bind:class="{selected: product === selectedProduct}"
         @click="onSelect(product)">
         {{product.title}}
     </li>
   </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Product } from '../product'

@Component
export default class HelloWorld extends Vue {
  products: Product[] = []
  selectedProduct: Product | null = null

  created(){
    fetch("/products.json")
    .then(response => response.json())
    .then(json => {
      this.products = json
      console.log(json)
      },
      error => {
        console.log("Error during parsing", error)
      }
    )
  }

   onSelect(product: Product) {
    this.selectedProduct = product
  } 
}

 

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  display: flex;
  flex-direction: column;
}
  ul {
    text-align: left;
    display: inline-block;
    align-self: start;
  }
 
  .selected {
    background-color: lightblue
  }
</style>
