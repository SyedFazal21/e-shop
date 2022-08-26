import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
  currentUser$ = this.store.pipe(select(UsersSelectors.getUser));
  isAuthenticated$ = this.store.pipe(select(UsersSelectors.getIsUserAuth));
  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  buildUserSession() {
    this.store.dispatch(UsersActions.buildUserSession());
  }
}
