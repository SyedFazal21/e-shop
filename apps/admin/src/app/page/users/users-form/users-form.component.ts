import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@my-company/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import * as CountriesLib from 'i18n-iso-countries';

declare const require;

@Component({
  selector: 'my-company-users-form',
  templateUrl: './users-form.component.html',
  styles: [],
})
export class UsersFormComponent implements OnInit {
  form: FormGroup;
  editMode = false;
  isSubmitted = false;
  currentId;
  countries = []

  constructor(private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
    this.getCountries();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
    });
  }

  getCountries(){
    CountriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(CountriesLib.getNames("en", {select: "official"})).map(
      entry => {
        return {
          id: entry[0],
          name: entry[1]
        }
      }
    )
  }

  get user() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const user: User = {
      name: this.user['name'].value,
      password: this.user['password'].value,
      email: this.user['email'].value,
      phone: this.user['phone'].value,
      isAdmin: this.user['isAdmin'].value,
      street: this.user['street'].value,
      apartment: this.user['apartment'].value,
      zip: this.user['zip'].value,
      city: this.user['city'].value,
      country: this.user['country'].value,
    };

    if (this.editMode) {
      user.id = this.currentId;
      this.updateUser(user);
    } else {
      this.createUser(user);
    }
  }

  checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentId = params['id'];
      }
      this.usersService.getUser(params['id']).subscribe((user) => {
        this.user['name'].setValue(user.name);
        this.user['password'].setValue(user.password);
        this.user['email'].setValue(user.email);
        this.user['phone'].setValue(user.phone);
        this.user['isAdmin'].setValue(user.isAdmin);
        this.user['street'].setValue(user.street);
        this.user['apartment'].setValue(user.apartment);
        this.user['zip'].setValue(user.zip);
        this.user['city'].setValue(user.city);
        this.user['country'].setValue(user.country);

        this.user['password'].setValidators([]);
        this.user['password'].updateValueAndValidity();
      });
    });
  }

  updateUser(user){
    this.usersService.updateUser(user).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User has been updated',
        });

        timer(2000).subscribe(() => {
          this.location.back();
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Falied to update user',
        });
      }
    );
  }

  createUser(user){
    this.usersService.addUser(user).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User has been created',
        });

        timer(2000).subscribe(() => {
          this.location.back();
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Falied to create user',
        });
      }
    );
  }

  goBack() {}
}
