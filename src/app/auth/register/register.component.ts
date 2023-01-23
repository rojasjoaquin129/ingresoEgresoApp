import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import { AlertasService } from '../../services/alertas.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registroForm: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
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

  }

  crearUsuario() {
    if (this.registroForm.invalid) { return; }
    this.alertService.loading('Espere por favor');
    const { nombre, correo, password } = this.registroForm.value
    this.authService.crearUsuario(nombre, correo, password).then(credeciales => {
      this.alertService.cerrar();
      this.router.navigate(['/']);
    }).catch(err => this.alertService.mensajeDeError(err.message).then(() => {
      this.registroForm.reset();
    }))
  }
}
