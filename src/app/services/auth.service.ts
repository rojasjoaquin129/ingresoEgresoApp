import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  iniAuthListener() {
    this.auth.authState.subscribe(fUser => {
      console.log(fUser);
    })
  }
  constructor(public auth: AngularFireAuth,
    private firestore: AngularFirestore) { }

  private usuarios = this.firestore.collection<Usuario>('usuarios');
  crearUsuario(nombre: string, email: string, password: string) {

    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user?.uid) {
          const newUser = new Usuario(user.uid, nombre, email)
          console.log(newUser)
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
