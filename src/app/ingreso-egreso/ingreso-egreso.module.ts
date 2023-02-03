import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoEgresoComponent as IngressEgressComponent } from './ingreso-egreso.component';
import { EstadisticaComponent as EssayisticComponent } from './estadistica/estadistica.component';
import { DetalleComponent as DetailedComponent } from './detalle/detalle.component';
import { OrdenIngresoPipe as OrderIngressPipe } from '../pipes/ordenIngreso.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard.routing.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    IngressEgressComponent,
    EssayisticComponent,
    DetailedComponent,
    OrderIngressPipe,

  ]
})
export class IngresoEgresoModule { }
