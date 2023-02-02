import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription, map } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSu$: Subscription | null = null
  ingresoSu$: Subscription | null = null
  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.userSu$ = this.store.select('auth')
      .pipe(
        map(user => user.user),
        filter(auth => auth !== null)
      )
      .subscribe(user => {
        this.ingresoSu$ = this.ingresoEgresoService.initIngresoEgresosListener(user?.uid).subscribe(ingresos => {
          this.store.dispatch(setItems({ items: ingresos }))
        })
      });
  }

  ngOnDestroy(): void {
    this.userSu$?.unsubscribe();
    this.ingresoSu$?.unsubscribe();
  }
}
