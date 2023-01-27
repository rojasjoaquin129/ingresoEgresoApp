import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>) { }

  private usuarios = this.firestore.collection<Usuario>('usuarios');
  private getUsuarios$: Subscription | null = null;
  iniAuthListener() {

    this.auth.authState.subscribe(fUser => {
      if (fUser) {
        this.getUsuarios$ = this.usuarios.doc(fUser.uid).valueChanges().subscribe(usuario => {
          if (usuario) {
            this.store.dispatch(authActions.setUser({ user: usuario }))
          }
        })
      } else {
        this.getUsuarios$?.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
      }

    })
  }

  crearUsuario(nombre: string, email: string, password: string) {

    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user?.uid) {
          const newUser = new Usuario(user.uid, nombre, email)
          this.usuarios.doc(user.uid).set({ ...newUser })
        }
      })
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logOut() {
    return this.auth.signOut();
  }
  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }
}
