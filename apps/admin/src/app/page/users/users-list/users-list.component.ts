import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@my-company/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'my-company-users-list',
  templateUrl: './users-list.component.html',
  styles: [],
})
export class UsersListComponent implements OnInit {
  users = [];
  endSubs$: Subject<any> = new Subject();

  constructor(
    private userService: UsersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(false);
    this.endSubs$.complete();
  }

  getUsers() {
    this.userService.getUsers()
    .pipe(takeUntil(this.endSubs$))
    .subscribe((users) => (this.users = users));
  }

  deleteUser(userId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(userId).subscribe(
          () => {
            this.getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User has been Deleted',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Falied to Delete the user',
            });
          }
        );
      },
    });
  }

  updateUser(userId) {
    this.route.navigateByUrl(`users/form/${userId}`);
  }
}
