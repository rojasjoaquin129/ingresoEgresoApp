import { createReducer, on } from '@ngrx/store';
import * as ingresoEgresoAccion from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export interface State {
  items: IngresoEgreso[];
};

const initialState: State = {
  items: []
};

export const ingresoEgresoReducer = createReducer(
  initialState,
  on(ingresoEgresoAccion.setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(ingresoEgresoAccion.unSetItems, (state) => ({ ...state, items: [] }),
  ),
);
