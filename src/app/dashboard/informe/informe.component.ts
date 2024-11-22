import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { decode } from '@googlemaps/polyline-codec';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import { AlertaSocial } from '../alerta-social/alerta-social.component';
import { alertasSociales1 } from './../../data.app';
import { InformeService } from './informe.service';

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2N1bXBpaSIsImEiOiJjbHhsbjFycm8wMjBoMmpwd3NvenpnMmgxIn0.sO-6U8_MXbVYmwWquibutA';

@Component({
  selector: 'app-informe',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './informe.component.html',
  styleUrl: './informe.component.css',
})
export default class InformeComponent {
  private destroyRef = inject(DestroyRef);
  private informeService = inject(InformeService);

  public alertasSociales = signal<AlertaSocial[]>(alertasSociales1);
  public selectedAlerta = signal<AlertaSocial | null>(null);
  searchDate: string = '';
  showModal = signal<boolean>(false);
  showImageModal = signal<boolean>(false);

  map?: Map;
  markers: Marker[] = [];

  constructor() {
    console.log('Constructor initialized');
    this.informeService.selectedAlerta$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((alerta) => {
        console.log('Selected alerta updated:', alerta);
        this.selectedAlerta.set(alerta);
        if (alerta) {
          setTimeout(() => {
            console.log('Calling initMap for alerta:', alerta);
            this.initMap();
          }, 100);
        }
      });

    this.informeService.showModal$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((show) => {
        this.showModal.set(show);
        if (!show) {
          this.cleanupMap();
        }
      });
  }

  showMapModal(alerta: AlertaSocial) {
    console.log('showMapModal called with:', alerta);
    console.log('Children:', alerta.children);
    this.informeService.setSelectedAlerta(alerta);
    this.informeService.setShowModal(true);
  }

  showImage(alerta: AlertaSocial) {
    this.selectedAlerta.set(alerta);
    this.showImageModal.set(true);
  }

  closeModal() {
    this.informeService.setShowModal(false);
    this.informeService.setSelectedAlerta(null);
    this.showImageModal.set(false);
    this.cleanupMap();
  }

  private cleanupMap() {
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];
    this.map?.remove();
  }

  private async initMap() {
    if (!this.selectedAlerta()) return;
    const alerta = this.selectedAlerta()!;

    this.map = new Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [alerta.longitude, alerta.latitude],
      zoom: 15,
    });

    await new Promise<void>((resolve) => {
      this.map!.on('load', () => resolve());
    });

    // Marcador principal
    this.addMarker(alerta, 'assets/denuncia-mismo-official.png', [
      alerta.longitude,
      alerta.latitude,
    ]);

    if (alerta.children?.length) {
      for (const child of alerta.children) {
        // Marcador hijo (primer nivel)
        this.addMarker(child, 'assets/denuncia-otros-official.png', [
          child.longitude,
          child.latitude,
        ]);

        try {
          const encodedPolyline = await this.informeService.getRoute(
            { latitude: alerta.latitude, longitude: alerta.longitude },
            { latitude: child.latitude, longitude: child.longitude }
          );

          await this.drawRoute(encodedPolyline, `route-${child.id}`, '#2563eb');

          if (child.children?.length) {
            for (const grandChild of child.children) {
              // Marcador nieto con nueva imagen
              this.addMarker(grandChild, 'assets/reporteComunitario.png', [
                grandChild.longitude,
                grandChild.latitude,
              ]);

              const grandChildPolyline = await this.informeService.getRoute(
                { latitude: child.latitude, longitude: child.longitude },
                {
                  latitude: grandChild.latitude,
                  longitude: grandChild.longitude,
                }
              );

              await this.drawRoute(
                grandChildPolyline,
                `route-${grandChild.id}`,
                '#10b981'
              );
            }
          }
        } catch (error) {
          console.error('Error dibujando ruta:', error);
        }
      }
    }

    const bounds = new mapboxgl.LngLatBounds();
    bounds.extend([alerta.longitude, alerta.latitude]);

    alerta.children?.forEach((child) => {
      bounds.extend([child.longitude, child.latitude]);
      child.children?.forEach((grandChild) => {
        bounds.extend([grandChild.longitude, grandChild.latitude]);
      });
    });

    this.map!.fitBounds(bounds, { padding: 50 });
  }

  private async drawRoute(
    encodedPolyline: string,
    routeId: string,
    color: string
  ) {
    const coordinates = this.decodePolyline(encodedPolyline);

    if (this.map!.getSource(routeId)) {
      this.map!.removeLayer(routeId);
      this.map!.removeSource(routeId);
    }

    this.map!.addSource(routeId, {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coordinates,
        },
      },
    });

    this.map!.addLayer({
      id: routeId,
      type: 'line',
      source: routeId,
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        visibility: 'visible',
      },
      paint: {
        'line-color': color,
        'line-width': ['interpolate', ['linear'], ['zoom'], 12, 3, 16, 6],
        'line-opacity': 0.8,
        'line-dasharray': [0.5, 1],
        'line-blur': 1,
      },
    });

    const animate = () => {
      const start = Date.now();

      const animateLine = () => {
        const phase = ((Date.now() - start) % 1000) / 1000;

        this.map!.setPaintProperty(routeId, 'line-dasharray', [
          0.5,
          1,
          phase * 4,
        ]);

        requestAnimationFrame(animateLine);
      };

      requestAnimationFrame(animateLine);
    };

    animate();
  }

  private addMarker(
    alerta: AlertaSocial,
    iconUrl: string,
    coordinates: [number, number]
  ) {
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.style.backgroundImage = `url(${iconUrl})`;
    el.style.width = '40px';
    el.style.height = '40px';
    el.style.backgroundSize = 'contain';
    el.style.backgroundRepeat = 'no-repeat';

    const marker = new Marker({ element: el })
      .setLngLat(coordinates)
      .addTo(this.map!);

    marker.getElement().addEventListener('click', () => {
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setLngLat(coordinates)
        .setHTML(
          `
            <div class="bg-white p-4 rounded-lg shadow-lg">
              <h3 class="text-lg font-bold mb-2">${alerta.title}</h3>
              <p class="mb-2">${alerta.description}</p>
              <p class="text-sm text-gray-600">Fecha: ${new Date(
                alerta.date
              ).toLocaleString()}</p>
              ${
                alerta.photoUrl
                  ? `<img src="${alerta.photoUrl}" alt="${alerta.title}" class="mt-2 max-w-[200px] rounded">`
                  : ''
              }
            </div>
          `
        )
        .addTo(this.map!);
    });

    this.markers.push(marker);
  }

  private decodePolyline(encoded: string): [number, number][] {
    const coords = decode(encoded);
    // Mapbox espera coordenadas en formato [longitude, latitude]
    return coords.map(([lat, lng]) => [lng, lat]);
  }

  ngOnDestroy() {
    this.cleanupMap();
  }
}
