import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductService } from '@products/services/products.service';
// import { ProductCard } from '../../../products/components/product-card/product-card';
@Component({
  selector: 'app-home-page.component',
  imports: [ProductCard],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

  productsService = inject(ProductService);

  productsResource = rxResource({
    request:()=>({}),
    loader:({request})=>{
      return this.productsService.getProducts({});
    }
  })

}
