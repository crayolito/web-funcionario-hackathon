import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertaCreate } from './perfil.component';

export interface ContactoEmergencia {
  institucion: string;
  telefono: string;
  direccion: string;
}

export interface Vigencia {
  fechaInicio: string;
  fechaFin: string;
}

export interface Coordenadas {
  latitude: number;
  longitude: number;
  radio: number;
}

export interface Alerta {
  id: string;
  nivelAlerta: string;
  tipoEvento: string;
  descripcion: string;
  zonasAfectadas: string[];
  recomendaciones: string[];
  institucionEmisora: string;
  contactosEmergencia: ContactoEmergencia[];
  vigencia: Vigencia;
  coordenadas: Coordenadas;
}

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private readonly API_URL =
    'https://hackatonuagrm-113f661f3afc.herokuapp.com/api';
  public http = inject(HttpClient);

  constructor() {}

  uploadToCloudinary(file: any): Observable<any> {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'fqw7ooma');
    data.append('cloud_name', 'da9xsfose');
    return this.http.post(
      `https://api.cloudinary.com/v1_1/da9xsfose/image/upload`,
      data
    );
  }

  getAlertas(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(`${this.API_URL}/alerts`);
  }

  createAlerta(alerta: AlertaCreate): Observable<Alerta> {
    return this.http.post<Alerta>(`${this.API_URL}/alerts`, alerta);
  }

  updateAlerta(alerta: AlertaCreate, idAlerta: String): Observable<Alerta> {
    return this.http.patch<Alerta>(
      `${this.API_URL}/alerts/${idAlerta}`,
      alerta
    );
  }

  deleteAlerta(idAlerta: String): Observable<any> {
    return this.http.delete(`${this.API_URL}/alerts/${idAlerta}`);
  }
}
