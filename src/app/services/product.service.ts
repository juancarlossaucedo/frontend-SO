import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'usuarios';
  }

  getListProducts(): Observable<Usuario[]> {
   return this.http.get<Usuario[]>(`${this.myAppUrl}${this.myApiUrl}/listar`); // Actualiza la URL para listar
  }

  deleteProduct(id: number): Observable<void> {
    console.log(id);
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/eliminar/${id}`); // Actualiza la URL para eliminar
  }

  saveProduct(usuario: Usuario): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}/guardar`, usuario); // Actualiza la URL para crear
  }

  getProduct(id: number): Observable<Usuario> {
    console.log(id);
    return this.http.get<Usuario>(`${this.myAppUrl}${this.myApiUrl}/editar/${id}`); // Actualiza la URL para editar
  }

  updateProduct(id: number, usuario: any): Observable<any> {
    console.log(usuario);
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/editar/${id}`, usuario); // Actualiza la URL para editar
}


}
