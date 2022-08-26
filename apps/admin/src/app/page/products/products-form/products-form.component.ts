import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, ProductsService } from '@my-company/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'my-company-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  isSubmitted = false;
  editMode = false;
  property;
  form: FormGroup;
  imageDisplay;
  currentId;
  categories = [];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private productService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
    this.checkEditMode();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    });
  }

  get productsForm() {
    return this.form.controls;
  }

  checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentId = params['id'];
      }
      this.productService.getProduct(params['id']).subscribe((product) => {
        this.productsForm['name'].setValue(product.name);
        this.productsForm['brand'].setValue(product.brand);
        this.productsForm['category'].setValue(product.category.id);
        this.productsForm['countInStock'].setValue(product.countInStock);
        this.productsForm['isFeatured'].setValue(product.isFeatured);
        this.productsForm['description'].setValue(product.description);
        this.productsForm['richDescription'].setValue(product.richDescription);
        this.productsForm['price'].setValue(product.price);
        this.imageDisplay = product.image;
        this.property = product.images;
        this.productsForm['image'].setValidators([]);
        this.productsForm['image'].updateValueAndValidity();
      });
    });
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const productFormData = new FormData();

    Object.keys(this.productsForm).map((key) => {
      productFormData.append(key, this.productsForm[key].value);
    });

    productFormData.append('images', this.property);

    if(this.editMode){
      this.updateProduct(productFormData);
    }
    else {
      this.addProduct(productFormData);
    }
  }
  goBack() {
    this.location.back();
  }

  addProduct(formData) {
    this.productService.addProduct(formData).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product has been created',
        });

        timer(2000).subscribe(() => {
          this.location.back();
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Falied to create product',
        });
      }
    );
  }

  updateProduct(productData){
    console.log(productData);
    this.productService.updateProduct(productData, this.currentId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product has been updated',
        });

        timer(2000).subscribe(() => {
          this.location.back();
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Falied to update the Product',
        });
      }
    );
  }
}
