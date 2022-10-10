import { Roles } from './../../modelo/Roles';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import{ServiceService} from '../../Service/service.service'
import { Usuario } from 'src/app/modelo/Usuario';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  datos;
  estados;

  usuarios:Usuario[]= [];
  roles: Roles[] = [];
  constructor(private service:ServiceService, private router:Router) {
    this.estados = ['Activo', 'Inactivo'];
    this.service.getRoles().subscribe((data) => {
      this.datos = new Array(data.length - 1);
      for (let i = 0; i < data.length; i++) {
        this.datos[i] = data[i].rol;
      }
    });

    this.service.getUsuarios().subscribe(data=>{
      this.usuarios=data;
      for (let i = 0; i < this.usuarios.length; i++) {
        this.usuarios[i].rolview = this.datos[(this.usuarios[i].rol)-1];
        this.usuarios[i].estadoview= this.estados[this.usuarios[i].estado];
      }
    })
   }

  ngOnInit(){
    this.estados = ['Activo', 'Inactivo'];

    this.service.getRoles().subscribe((data) => {
      this.datos = new Array(data.length - 1);
      for (let i = 0; i < data.length; i++) {
        this.datos[i] = data[i].rol;
      }
    });

    this.service.getUsuarios().subscribe(data=>{
      this.usuarios=data;
      for (let i = 0; i < this.usuarios.length; i++) {
        this.usuarios[i].rolview = this.datos[(this.usuarios[i].rol)-1];
        this.usuarios[i].estadoview= this.estados[this.usuarios[i].estado];
      }
    })
  }

  Editar(usuario:Usuario):void{
    localStorage.setItem("cedula",usuario.cedula.toString());
    this.router.navigate(["edit"]);
  }

  Delete(usuario:Usuario){
    this.service.deleteUsuario(usuario)
    .subscribe(data=>{
      this.usuarios=this.usuarios.filter(p=>p!==usuario);
      alert('Usuario eliminado con Exito...!!!');
    })
  }

}
