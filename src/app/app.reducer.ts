import { ActionReducerMap } from '@ngrx/store'
import * as reducer from './shared/ui.reducer'
import * as auth from './auth/auth.reducer'


export interface AppState {
  ui: reducer.State,
  auth: auth.State
}
export const appReducers: ActionReducerMap<AppState> = {
  ui: reducer.uiReducer,
  auth: auth.authReducer,
}
