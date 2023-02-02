import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import { AlertasService } from '../../services/alertas.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { stopLoading, isLoading } from '../../shared/ui.actions';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registroForm: FormGroup;
  cargando: boolean = false;
  nameButton: string = 'Login';
  public loadingSubcription?: Subscription
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
    private alertService: AlertasService) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get nombre() {
    return this.registroForm.get('nombre');
  }
  get correo() {
    return this.registroForm.get('correo');
  }
  get password() {
    return this.registroForm.get('password');
  }

  ngOnInit(): void {
    this.loadingSubcription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading)
  }
  ngOnDestroy(): void {
    this.loadingSubcription?.unsubscribe();
  }
  crearUsuario() {
    if (this.registroForm.invalid) { return; }
    //this.alertService.loading('Espere por favor');
    this.store.dispatch(isLoading())
    const { nombre, correo, password } = this.registroForm.value
    this.registroForm.reset();
    this.nameButton = 'Espere...'
    this.authService.crearUsuario(nombre, correo, password).then(credeciales => {
      //  this.alertService.cerrar();
      this.store.dispatch(stopLoading())
      this.router.navigate(['/']);
      this.nameButton = 'Login'
    }).catch(err => this.alertService.mensajeDeError(err.message, 'error').then(() => {
      this.store.dispatch(stopLoading())
      this.registroForm.reset();
      this.nameButton = 'Login'
    }))
  }
}
