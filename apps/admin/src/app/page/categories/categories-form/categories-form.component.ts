import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@my-company/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'my-company-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  public isSubmitted = false;
  public editMode = false;
  private currentId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff', Validators.required],
    });

    this.checkEditMode();
  }

  goBack() {
    this.location.back();
  }

  checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentId = params['id'];
      }
      this.categoryService.getCategory(params['id']).subscribe((category) => {
        this.category['name'].setValue(category.name);
        this.category['icon'].setValue(category.icon);
        this.category['color'].setValue(category.color);
      });
    });
  }

  get category() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      name: this.category['name'].value,
      icon: this.category['icon'].value,
      color: this.category['color'].value,
    };

    if (this.editMode) {
      category.id = this.currentId;
      this.updateCategory(category);
    } else {
      this.createCategory(category);
    }
  }

  updateCategory(category: Category) {
    this.categoryService.updateCategory(category).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category has been updated',
        });

        timer(2000).subscribe(() => {
          this.location.back();
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Falied to update category',
        });
      }
    );
  }

  createCategory(category: Category) {
    this.categoryService.addCategory(category).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category has been created',
        });

        timer(2000).subscribe(() => {
          this.location.back();
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Falied to create category',
        });
      }
    );
  }
}
