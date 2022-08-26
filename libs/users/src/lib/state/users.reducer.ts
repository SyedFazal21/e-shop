import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../models/user';

import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
  user: User;
  isAuthenticated: boolean;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const usersAdapter: EntityAdapter<UsersEntity> =
  createEntityAdapter<UsersEntity>();

export const initialUsersState: UsersState = {
  // set initial required properties
  user: null,
  isAuthenticated: false,
};

const userReducer = createReducer(
  initialUsersState,
  on(UsersActions.buildUserSession, (state) => ({...state })),
  on(UsersActions.buildUserSuccess, (state, action) => ({...state,
    user: action.user,
    isAuthenticated: true
  })),
  on(UsersActions.buildUserFailed, (state, action) => ({...state,
    user: null,
    isAuthenticated: false
  }))
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return userReducer(state, action);
}
