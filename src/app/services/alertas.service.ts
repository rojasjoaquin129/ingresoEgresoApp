import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor() { }


  loading(title: string) {
    return Swal.fire({
      title,
      didOpen: () => {
        Swal.showLoading(null)
      }
    })
  }
  cerrar() {
    return Swal.close()
  }
  mensajeDeError(mensaje: string) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje,
      // footer: '<a href="">Why do I have this issue?</a>'
    })
  }
}
