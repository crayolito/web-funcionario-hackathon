import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { alertasSociales1 } from '../../data.app';
import {
  AlertaSocial,
  CreateAlertaSocial,
  UpdateAlertaSocial,
} from './alerta-social.component';

@Injectable({
  providedIn: 'root',
})
export class AlertaSocialService {
  private readonly baseUrl =
    'https://hackatonuagrm-113f661f3afc.herokuapp.com/api';
  private http = inject(HttpClient);

  getAlertasSociales(): Observable<AlertaSocial[]> {
    return this.http
      .get<AlertaSocial[]>(`${this.baseUrl}/complaints`)
      .pipe(map((backendAlertas) => [...alertasSociales1, ...backendAlertas]));
  }

  createAlertaSocial(alerta: CreateAlertaSocial): Observable<AlertaSocial> {
    return this.http.post<AlertaSocial>(this.baseUrl, alerta);
  }

  updateAlertaSocial(
    id: string,
    alerta: UpdateAlertaSocial
  ): Observable<AlertaSocial> {
    return this.http.put<AlertaSocial>(
      `${this.baseUrl}/complaints/${id}`,
      alerta
    );
  }

  deleteAlertaSocial(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/complaints/${id}`);
  }

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

  private transformToTree(items: AlertaSocial[]): AlertaSocial[] {
    // Crear un mapa para acceso rápido por ID
    const itemMap = new Map<string, AlertaSocial>();

    // Primera pasada: crear el mapa
    items.forEach((item) => {
      // Asegurarse de que children sea un array
      const newItem = {
        ...item,
        children: [],
      };
      itemMap.set(item.id, newItem);
    });

    // Segunda pasada: construir la estructura de árbol
    const roots: AlertaSocial[] = [];

    itemMap.forEach((item) => {
      if (item.parent_id === null) {
        // Es un nodo raíz
        roots.push(item);
      } else {
        // Es un hijo
        const parent = itemMap.get(item.parent_id);
        if (parent) {
          // Solo agregar si no existe ya
          if (!parent.children.some((child) => child.id === item.id)) {
            parent.children.push(item);
          }
        }
      }
    });

    return roots;
  }
}
