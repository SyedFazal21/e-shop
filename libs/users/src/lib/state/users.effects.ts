import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { catchError, concatMap, map, of } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { UsersService } from '../services/user.service';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';

@Injectable()
export class UsersEffects {
  buildUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.buildUserSession),
      concatMap(() => {
        if (this.localStorageService.isValidToken()) {
          const userId = this.localStorageService.getUserIdFromToken();
          if (userId) {
            return this.usersService.getUser(userId).pipe(
              map((user) => {
                return UsersActions.buildUserSuccess({ user: user });
              }),
              catchError(() => of(UsersActions.buildUserFailed()))
            );
          } else {
            return of(UsersActions.buildUserFailed());
          }
        } else {
          return of(UsersActions.buildUserFailed());
        }
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private localStorageService: LocalStorageService,
    private usersService: UsersService
  ) {}
}
