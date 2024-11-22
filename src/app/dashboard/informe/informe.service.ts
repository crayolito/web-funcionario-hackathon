import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import { AlertaSocial } from '../alerta-social/alerta-social.component';

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface RouteResponse {
  routes: {
    polyline: {
      encodedPolyline: string;
    };
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class InformeService {
  private selectedAlertaSource = new BehaviorSubject<AlertaSocial | null>(null);
  selectedAlerta$ = this.selectedAlertaSource.asObservable();

  constructor(private http: HttpClient) {}

  private showModalSource = new BehaviorSubject<boolean>(false);
  showModal$ = this.showModalSource.asObservable();

  setSelectedAlerta(alerta: AlertaSocial | null) {
    this.selectedAlertaSource.next(alerta);
  }

  setShowModal(show: boolean) {
    this.showModalSource.next(show);
  }

  async getRoute(origin: LatLng, destination: LatLng): Promise<string> {
    console.log('getRoute called with:', { origin, destination });
    const requestBody = {
      origin: {
        location: {
          latLng: {
            latitude: origin.latitude,
            longitude: origin.longitude,
          },
        },
      },
      destination: {
        location: {
          latLng: {
            latitude: destination.latitude,
            longitude: destination.longitude,
          },
        },
      },
      travelMode: 'DRIVE',
      routingPreference: 'TRAFFIC_UNAWARE',
      computeAlternativeRoutes: false,
      routeModifiers: {
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false,
        avoidIndoor: false,
      },
    };

    try {
      console.log('Requesting route with:', requestBody);
      const response = await firstValueFrom(
        this.http.post<RouteResponse>(
          'https://routes.googleapis.com/directions/v2:computeRoutes',
          requestBody,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': 'AIzaSyDYq6w1N7meIbXFGd56FrrfoGN4c7U-r2g',
              'X-Goog-FieldMask':
                'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
              Origin: 'http://localhost:4200',
            },
          }
        )
      );
      console.log(
        'Route response:',
        response.routes[0].polyline.encodedPolyline
      );
      return response.routes[0].polyline.encodedPolyline;
    } catch (error) {
      console.error('Detailed route error:', error);
      throw error;
    }
  }
}
