import { createReducer, on } from '@ngrx/store';
import * as ingresoEgresoAccion from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AppState } from '../app.reducer';


export interface State {
  items: IngresoEgreso[];
};
export interface AppStateWithIngreso extends AppState {
  IngresoEgreso: State
}

const initialState: State = {
  items: []
};

export const ingresoEgresoReducer = createReducer(
  initialState,
  on(ingresoEgresoAccion.setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(ingresoEgresoAccion.unSetItems, (state) => ({ ...state, items: [] }),
  ),
);
