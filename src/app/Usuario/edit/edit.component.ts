import { ServiceService } from './../../Service/service.service';
import { Roles } from './../../modelo/Roles';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  datos;
  estados;

  // Seleccionamos o iniciamos el valor '0' del <select>
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';

  opcionSeleccionadoEstado: string = '0';
  verSeleccionEstado: string = '';

  usuario: Usuario = new Usuario();
  roles: Roles[] = [];
  constructor(private router: Router, private service: ServiceService) {
    this.estados = ['Activo', 'Inactivo'];

    this.service.getRoles().subscribe((data) => {
      this.datos = new Array(data.length - 1);
      for (let i = 0; i < data.length; i++) {
        this.datos[i] = data[i].rol;
      }
    });
  }

  getIndexRol() {
    let index = 0;
    for (let i = 0; i < this.datos.length; i++) {
      if (this.datos[i] == this.verSeleccion) {
        index = i;
      }
    }
    return index;
  }
  getIndexEstado() {
    let index = 0;
    for (let i = 0; i < 5; i++) {
      if (this.estados[i] == this.verSeleccionEstado) {
        index = i;
      }
    }
    return index;
  }

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    // this.usuario.estado= this.getIndex()+1;
  }
  capturarestado() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccionEstado = this.opcionSeleccionadoEstado;
  }

  ngOnInit() {
    this.Editar();
  }

  Editar() {
    let cedula = localStorage.getItem('cedula' || '[]')!;
    this.service.getUsuariosCedula(+cedula).subscribe((data) => {
      this.usuario = data;
      this.opcionSeleccionado = this.datos[this.usuario.rol - 1];
      this.opcionSeleccionadoEstado = this.estados[this.usuario.estado - 1];
      this.capturar();
      this.capturarestado();
      console.log(this.datos[this.usuario.rol - 1]);
      console.log(this.usuario.primernombre.length);
    });
  }

  Actualizar(usuario: Usuario) {
    this.usuario.rol = this.getIndexRol() + 1;
    this.usuario.estado = this.getIndexEstado() + 1;
    console.log('rol', this.usuario.rol, 'estado', this.usuario.estado);

    if (
      this.usuario.cedula == 0 ||
      this.usuario.email.length == 0 ||
      this.usuario.estado == 0 ||
      this.usuario.nitempresa.length == 0 ||
      this.usuario.primerapellido.length == 0 ||
      this.usuario.segundoapellido.length == 0 ||
      this.usuario.primernombre.length == 0 ||
      this.usuario.segundonombre.length == 0 ||
      this.usuario.rol == 0
    ) {
      alert('Por favor llene todos los campos...!!!');
    }else if(this.usuario.cedula>999999999){
      alert('Numero de cedula demasiado grande');
    } else {
      this.service.updateUsuario(usuario).subscribe((data) => {
        this.usuario = data;
        alert('Se Actualizo con Exito...!!!');
        this.router.navigate(['listar']);
      });
    }
  }
}
