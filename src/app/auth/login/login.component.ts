import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
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
  }

  login() {
    if (this.loginForm.invalid) { return; }
    this.alertService.loading('Espere por favor');
    const { correo, password } = this.loginForm.value;
    this.authService.loginUsuario(correo, password).then(() => {
      this.alertService.cerrar();
      this.router.navigate(['/']);
    }).catch(err => this.alertService.mensajeDeError(err.message).then(() => {
      this.loginForm.reset();
    }))
  }
}
