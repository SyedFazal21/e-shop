import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';


export const buildUserSession = createAction('[Users] Build users session');

export const buildUserSuccess = createAction(
  '[Users] Build users session success',
  props<{ user: User }>()
);

export const buildUserFailed = createAction('[Users] Build users session failed');
