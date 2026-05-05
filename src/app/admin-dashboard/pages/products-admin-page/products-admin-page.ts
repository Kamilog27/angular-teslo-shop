import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductTable } from "@products/components/product-table/product-table";
import { ProductService } from '@products/services/products.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { Pagination } from "@shared/components/pagination/pagination";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, Pagination, RouterLink],
  templateUrl: './products-admin-page.html',
  styleUrl: './products-admin-page.css',
})
export class ProductsAdminPage { 

  productService = inject(ProductService);
  paginationService = inject(PaginationService)

  productsPerPage = signal(10);

   productsResource = rxResource({
    request:()=>({
      page:this.paginationService.currentPage()-1,
      limit:this.productsPerPage()
    }),
    loader:({request})=>{
      return this.productService.getProducts({
        offset:request.page * 9,
        limit:request.limit
      });
    }
  })
}
