import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductService } from '@products/services/products.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-gender-page.component',
  imports: [ProductCard],
 templateUrl: './gender-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderPageComponent { 

  route = inject(ActivatedRoute);
  productsService = inject(ProductService);

  productsResource = rxResource({
    request:()=>({gender:this.gender()}),
    loader:({request})=>{
      return this.productsService.getProducts({
        gender:request.gender
      });
    }
  })
  gender = toSignal(
    this.route.params.pipe(
      map(({gender})=>gender)
    )
  )

}
