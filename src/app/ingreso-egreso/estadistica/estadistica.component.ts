import { utf8Encode } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  ingreso: number = 0;
  egresos: number = 0;
  totalEgresos: number = 0;
  totalIngresos: number = 0;

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [

    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppStateWithIngreso>) { }

  ngOnInit(): void {
    this.store.select('IngresoEgreso').subscribe(({ items }) => this.generarEstadisticas(items))
  }

  generarEstadisticas(items: IngresoEgreso[]) {
    this.totalEgresos = 0;
    this.totalIngresos = 0;
    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += parseInt(item.monto);
        this.ingreso++;
      } else {
        this.totalEgresos += parseInt(item.monto);
        this.egresos++;
      }
    }
    this.doughnutChartData.datasets = [
      { data: [this.totalIngresos, this.totalEgresos] },
      // { data: [50, 150, 120] },
    ]
  }

}
