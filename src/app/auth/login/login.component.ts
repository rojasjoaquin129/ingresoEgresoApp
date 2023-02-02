import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { isLoading, stopLoading } from '../../shared/ui.actions';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup
  cargando: boolean = false;
  nameButton: string = 'Login';
  public loadingSubcription?: Subscription
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private alertService: AlertasService) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  get correo() {
    return this.loginForm.get('correo');
  }
  get password() {
    return this.loginForm.get('password');
  }


  ngOnInit(): void {
    this.loadingSubcription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading)
  }


  ngOnDestroy(): void {
    this.loadingSubcription?.unsubscribe();
  }
  login() {
    if (this.loginForm.invalid) { return; }
    this.store.dispatch(isLoading())
    // this.alertService.loading('Espere por favor');
    const { correo, password } = this.loginForm.value;
    this.loginForm.reset();
    this.nameButton = 'Espere...'
    this.authService.loginUsuario(correo, password).then(() => {
      //this.alertService.cerrar();
      this.store.dispatch(stopLoading())
      this.nameButton = 'Login'
      this.router.navigate(['/']);
    }).catch(err => this.alertService.mensajeDeError(err.message, 'error').then(() => {
      this.store.dispatch(stopLoading())
      this.loginForm.reset();
      this.nameButton = 'Login'
    }))
  }
}
