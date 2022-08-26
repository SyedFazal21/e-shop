import { Component, OnInit } from '@angular/core';
import { AuthService } from '@my-company/users';

@Component({
  selector: 'my-company-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

}
