import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';

export type tiposIngreso = 'ingreso' | 'egreso';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})

export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: tiposIngreso
  cargando: boolean = false;
  public loadingSubcription?: Subscription
  constructor(private fb: FormBuilder, private ingresoEgresoService: IngresoEgresoService, private store: Store<AppState>) {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    })
    this.tipo = 'ingreso';
  }

  get descripcion() {
    return this.ingresoForm.get('descripcion');
  }
  get monto() {
    return this.ingresoForm.get('monto');
  }

  ngOnInit(): void {
    this.loadingSubcription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading)
  }
  ngOnDestroy(): void {
    this.loadingSubcription?.unsubscribe();
  }
  guardar() {

    if (this.ingresoForm.invalid) { return; }
    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso);
    this.ingresoForm.reset();

  }
  changeTipo() {
    this.tipo = this.tipo === 'ingreso' ? 'egreso' : 'ingreso';
  }
}
