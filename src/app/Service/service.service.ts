import { Roles } from './../modelo/Roles';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './../modelo/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  Url = 'http://localhost:8080/usuarios';
  UrlRoles='http://localhost:8080/roles';

  getUsuarios() {
    return this.http.get<Usuario[]>(this.Url);
  }

  getUsuariosCedula(cedula:number){
    return this.http.get<Usuario>(this.Url+"/"+cedula)
  }

  updateUsuario(usuario:Usuario){
    return this.http.put<Usuario>(this.Url+"/"+usuario.cedula,usuario);
  }
  deleteUsuario (usuario:Usuario){
    return this.http.delete<Usuario>(this.Url+"/"+usuario.cedula,);
  }

  getRoles(){
    return this.http.get<Roles[]>(this.UrlRoles);
  }

  createUsuario(usuario:Usuario){
  return this.http.post<Usuario>(this.Url,usuario);
  }
}
