import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresoSub$: Subscription | null = null;
  constructor(
    private store: Store<AppStateWithIngreso>,
    private ingresoEgreso: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresoSub$ = this.store.select('IngresoEgreso').subscribe(({ items }) => {
      this.ingresosEgresos = items
    })
  }
  borrar(uid: any) {
    this.ingresoEgreso.borrarIngresoEgreso(uid);
  }
  ngOnDestroy(): void {
    this.ingresoSub$?.unsubscribe();
  }
}
