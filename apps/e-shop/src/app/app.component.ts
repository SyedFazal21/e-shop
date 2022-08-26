import { Component, OnInit } from '@angular/core';
import { UsersService } from '@my-company/users';

@Component({
  selector: 'my-company-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'e-shop';

  constructor(private usersService: UsersService){
  }

  ngOnInit(): void {
    this.usersService.initAppSession();
  }
}
