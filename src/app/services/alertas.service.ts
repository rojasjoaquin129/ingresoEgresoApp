import { Injectable } from '@angular/core';
import { type } from 'os';
import Swal from 'sweetalert2';
export type tipoIcono = 'warning' | 'success' | 'error';
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
  mensajeDeError(mensaje: string, icono: tipoIcono) {
    return Swal.fire({
      icon: icono,
      title: 'Oops...',
      text: mensaje,
      // footer: '<a href="">Why do I have this issue?</a>'
    })
  }

}
