import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductService } from '@products/services/products.service';
import { Pagination } from "@shared/components/pagination/pagination";
import { PaginationService } from '@shared/components/pagination/pagination.service';

// import { ProductCard } from '../../../products/components/product-card/product-card';
@Component({
  selector: 'app-home-page.component',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

  productsService = inject(ProductService);
  paginationService = inject(PaginationService)

  
  // activatedRoute = inject(ActivatedRoute);

  // currentPage =  toSignal(this.activatedRoute.queryParamMap.pipe(
  //   map(params=>(params.get('page')?+params.get('page')!:1)),
  //   map(page=>(isNaN(page)?1:page) )
  // ),  {
  //   initialValue:1
  // }
  // )

  productsResource = rxResource({
    request:()=>({page:this.paginationService.currentPage()-1}),
    loader:({request})=>{
      return this.productsService.getProducts({
        offset:request.page * 9,
      });
    }
  })

}
