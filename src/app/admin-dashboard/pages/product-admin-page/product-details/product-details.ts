import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils.forms-utils';
import { FormErrorLabel } from '@shared/components/form-error-label/form-error-label';
import { ProductService } from '@products/services/products.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'product-details',
  imports: [ProductCarousel,ReactiveFormsModule,FormErrorLabel],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit{ 
  product = input.required<Product>();
  
  router = inject(Router);
  fb= inject(FormBuilder)
  productService = inject(ProductService);
  wasSaved = signal(false);

  productForm = this.fb.group({
    title: ['',Validators.required],
    description:['',Validators.required],
    slug:['',[Validators.required,Validators.pattern(FormUtils.slugPattern)]],
    price:[0,[Validators.required,Validators.min(0)]],
    stock:[0,[Validators.required,Validators.min(0)]],
    sizes:[['']],
    images:[[]],
    tags:[''],
    gender :['men',[Validators.required,Validators.pattern(/men|women|kid|unisex/)]],

  })

  sizes = ['XS','S','M','L','Xl','XXL']

  ngOnInit(): void {
    this.setFormValue(this.product());
  }
  
  setFormValue(formLike:Partial<Product>){
      this.productForm.reset(this.product() as any )
      this.productForm.patchValue({tags:formLike.tags?.join(',')})
      // this.productForm.patchValue(formLike as any)
    }
    onSizeclicked(size:string){
      const currentSizes = this.productForm.value.sizes ?? [];

      if(currentSizes.includes(size)){
        currentSizes.splice(currentSizes.indexOf(size),1)
      }else{
        currentSizes.push(size);
      }
      this.productForm.patchValue({sizes:currentSizes});
    }
  async onSubmit(){
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();
    if(!isValid) return;
    const formValue = this.productForm.value;
    const productLike:Partial<Product>={
      ...(formValue as any),
      tags:formValue.tags
      ?.toLowerCase()
      .split(',')
      .map(tag => tag.trim()) ?? [],
    }
    if(this.product().id === 'new'){
      //Crear Producto
      const product = await firstValueFrom(this.productService.cretedProduct(productLike));
      
      this.router.navigate(['/admin/products',product.id])
      this.wasSaved.set(true)
    
    }else{
      await firstValueFrom(this.productService.updateProduct(this.product().id,productLike));

          console.log('Producto actualizado!!');
  
    }
    this.wasSaved.set(true);
    setTimeout(()=>{
      this.wasSaved.set(false);
    },3000)
  }
}
