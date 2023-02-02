import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { map, take, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertasService } from './alertas.service';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  private getUsuarios$: Subscription | null = null;
  //private IngresosEgresos = this.firestore.collection<IngresoEgreso>('IngresoEgreso');
  //private user: Usuario;
  constructor(private firestore: AngularFirestore,
    private store: Store<AppState>,
    private alertasService: AlertasService) {

  }

  crearIngresoEgreso(ingreso: IngresoEgreso) {
    this.store.dispatch(isLoading());
    this.getUsuarios$ = this.store.select('auth').pipe(map(user => user.user)).subscribe(user => {
      delete ingreso.uid;
      return this.firestore.doc(`${user?.uid}/ingresos-egresos`)
        .collection('Items')
        .add({ ...ingreso }).then(() => {
          this.alertasService.mensajeDeError(ingreso.descripcion, 'success')
          this.store.dispatch(stopLoading());
          this.getUsuarios$?.unsubscribe();
        })
        .catch(err => {
          this.store.dispatch(stopLoading());
          this.alertasService.mensajeDeError(err.message, 'error')
          this.getUsuarios$?.unsubscribe();
        })

    });
  }

  initIngresoEgresosListener(uid?: string) {
    return this.firestore.collection(`${uid}/ingresos-egresos/Items`).snapshotChanges()
      .pipe(
        map(snapshot =>
          snapshot.map(doc => ({
            ...doc.payload.doc.data() as any,
            uid: doc.payload.doc.id,
          }))
        )
      )
  }

  borrarIngresoEgreso(uidItem: string) {

    this.store.select('auth').pipe(map(user => user.user)).subscribe(user => {

      this.firestore.doc(`${user?.uid}/ingresos-egresos/Items/${uidItem}`).delete().then(() => {
        this.alertasService.mensajeDeError('Borrado', 'warning')
      })
        .catch(err => {
          this.alertasService.mensajeDeError(err.message, 'error')
        })
    });
  }

}
