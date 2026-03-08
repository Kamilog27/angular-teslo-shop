import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/products.service';
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";

@Component({
  selector: 'app-product-page.component',
  imports: [ProductCarousel],
  templateUrl: './product-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent {

  activatedRouted = inject(ActivatedRoute);
  productService = inject(ProductService);

  productIdSlug : string = this.activatedRouted.snapshot.params['idSlug'];


  productResource = rxResource({
    request:()=>({idSlug:this.productIdSlug}),
    loader:({request})=>{
      return this.productService.getProductByIdSlug(request.idSlug)
    }
  })

 }
