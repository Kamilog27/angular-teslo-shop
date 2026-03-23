import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductService } from '@products/services/products.service';
import { map } from 'rxjs';
import { Pagination } from "@shared/components/pagination/pagination";
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-gender-page.component',
  imports: [ProductCard, Pagination],
 templateUrl: './gender-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderPageComponent { 

  route = inject(ActivatedRoute);
  productsService = inject(ProductService);
  paginationService = inject(PaginationService);
  productsResource = rxResource({
    request:()=>({gender:this.gender(),page:this.paginationService.currentPage()-1}),
    loader:({request})=>{
      return this.productsService.getProducts({
        gender:request.gender,
        offset:request.page*9
      });
    }
  })
  gender = toSignal(
    this.route.params.pipe(
      map(({gender})=>gender)
    )
  )

}
