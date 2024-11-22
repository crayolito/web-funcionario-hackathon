import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import mapboxgl, { LngLat, Map, Marker } from 'mapbox-gl';
import { AlertaSocialService } from './alerta-social.service';

export interface AlertaSocial {
  id: string;
  title: string;
  description: string;
  photoUrl: string;
  longitude: number;
  latitude: number;
  date: string;
  parent_id: string | null;
  children: AlertaSocial[];
}

// Si prefieres separar la estructura hijo para mayor claridad:
export interface AlertaSocialChild {
  id: string;
  title: string;
  description: string;
  photoUrl: string;
  longitude: number;
  latitude: number;
  date: string;
  parent_id: string;
}

// Para crear nuevas alertas (sin id y children):
export interface CreateAlertaSocial {
  title: string;
  description: string;
  photoUrl: string;
  longitude: number;
  latitude: number;
  date: string;
  parent_id?: string | null;
}

// Para actualizar alertas (todos los campos opcionales):
export interface UpdateAlertaSocial {
  title?: string;
  description?: string;
  photoUrl?: string;
  longitude?: number;
  latitude?: number;
  date?: string;
  parent_id?: string | null;
}

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2N1bXBpaSIsImEiOiJjbHhsbjFycm8wMjBoMmpwd3NvenpnMmgxIn0.sO-6U8_MXbVYmwWquibutA';

@Component({
  selector: 'app-alerta-social',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './alerta-social.component.html',
  styleUrl: './alerta-social.component.css',
})
export default class AlertaSocialComponent {
  // Signals
  public alertasSociales = signal<AlertaSocial[]>([]);
  public alertaActual = signal<AlertaSocial | null>(null);
  public latitude = signal<number>(0);
  public longitude = signal<number>(0);
  public imageEmpresa = signal<string>('assets/subir-imagen.png');
  public estadoImagen = signal<boolean>(false);
  public estadoForm = signal<boolean>(false);

  // Mapbox properties
  @ViewChild('map') divMap!: ElementRef;
  public map?: Map;
  private currentMarker?: Marker;
  public currentLngLat: LngLat = new LngLat(
    -63.18215133936172, // longitud Santa Cruz
    -17.783253855301936 // latitud Santa Cruz
  );

  // Form
  public alertaSocialForm: FormGroup;
  private formBuilder = inject(FormBuilder);
  private alertaSocialService = inject(AlertaSocialService);

  constructor() {
    this.alertaSocialForm = this.formBuilder.group({
      title: [''],
      description: [''],
      parent_id: [''],
      coordenadas: [''],
    });
  }

  ngOnInit(): void {
    this.cargarAlertasSociales();
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initializeMap(): void {
    if (!this.divMap) return;

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentLngLat,
      zoom: 13,
    });

    this.marcadorMiUbicacion(this.currentLngLat);
  }

  private marcadorMiUbicacion(lngLat: LngLat): void {
    if (this.currentMarker) {
      this.currentMarker.remove();
    }

    this.latitude.set(lngLat.lat);
    this.longitude.set(lngLat.lng);

    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(assets/denuncia-mismo-official.png)';
    el.style.width = '45px'; // Aumentado de 30px a 45px
    el.style.height = '45px'; // Aumentado de 30px a 45px
    el.style.backgroundSize = 'cover';
    el.style.cursor = 'pointer';
    // Agregar sombra y efecto de hover
    el.style.filter = 'drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.3))';
    el.style.transition = 'transform 0.3s ease';

    // Agregar efecto hover
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.1)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'scale(1)';
    });

    this.currentMarker = new Marker({
      element: el,
      draggable: true,
      anchor: 'bottom', // El punto de anclaje será la parte inferior del marcador
    })
      .setLngLat(lngLat)
      .addTo(this.map!);

    this.setupMarkerEvents(this.currentMarker);

    // Hacer flyTo al crear el marcador
    this.map?.flyTo({
      center: lngLat,
      zoom: 17, // Aumentado de 15 a 17 para un acercamiento mayor
      duration: 1000, // Duración de la animación en milisegundos
      essential: true,
      padding: { top: 50, bottom: 50, left: 50, right: 50 },
    });
  }

  private setupMarkerEvents(marker: Marker): void {
    marker.on('dragend', () => {
      const newPos = marker.getLngLat();
      this.latitude.set(newPos.lat);
      this.longitude.set(newPos.lng);
      this.map?.flyTo({
        center: newPos,
        zoom: 17, // Aumentado de 15 a 17
        duration: 1000,
        essential: true,
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
      });
    });
  }

  cargarAlertasSociales(): void {
    this.alertaSocialService.getAlertasSociales().subscribe({
      next: (alertas: AlertaSocial[]) => {
        this.alertasSociales.set(alertas);
        console.log('Alertas cargadas:', alertas);
      },
      error: (error) => console.error('Error al cargar alertas:', error),
    });
  }

  createAlertaSocial(): void {
    const nuevaAlerta: CreateAlertaSocial = {
      title: this.alertaSocialForm.get('title')?.value,
      description: this.alertaSocialForm.get('description')?.value,
      photoUrl: this.imageEmpresa(),
      longitude: this.longitude(),
      latitude: this.latitude(),
      date: new Date().toISOString(),
      parent_id: this.alertaSocialForm.get('parent_id')?.value || null,
    };

    this.alertaSocialService.createAlertaSocial(nuevaAlerta).subscribe({
      next: () => {
        this.cargarAlertasSociales();
        this.limpiarFormulario();
      },
      error: (error) => console.error('Error al crear alerta:', error),
    });
  }

  updateAlertaSocial(): void {
    if (!this.alertaActual()) return;

    const alertaActualizada = {
      title: this.alertaSocialForm.get('title')?.value,
      description: this.alertaSocialForm.get('description')?.value,
      photoUrl: this.imageEmpresa(),
      longitude: this.longitude(),
      latitude: this.latitude(),
      parent_id: this.alertaSocialForm.get('parent_id')?.value,
    };

    this.alertaSocialService
      .updateAlertaSocial(this.alertaActual()!.id, alertaActualizada)
      .subscribe({
        next: () => {
          this.cargarAlertasSociales();
          this.limpiarFormulario();
        },
        error: (error) => console.error('Error al actualizar alerta:', error),
      });
  }

  eliminarAlertaSocial(id: string): void {
    if (confirm('¿Está seguro de eliminar esta alerta?')) {
      this.alertaSocialService.deleteAlertaSocial(id).subscribe({
        next: () => this.cargarAlertasSociales(),
        error: (error) => console.error('Error al eliminar alerta:', error),
      });
    }
  }

  editarAlertaSocial(alerta: AlertaSocial): void {
    this.alertaActual.set(alerta);
    this.alertaSocialForm.patchValue({
      title: alerta.title,
      description: alerta.description,
      parent_id: alerta.parent_id,
    });
    this.latitude.set(alerta.latitude);
    this.longitude.set(alerta.longitude);
    this.imageEmpresa.set(alerta.photoUrl);
    this.estadoImagen.set(true);
    this.estadoForm.set(true);

    // Actualizar mapa con mejor zoom y animación
    const alertaLngLat = new LngLat(alerta.longitude, alerta.latitude);
    this.map?.flyTo({
      center: alertaLngLat,
      zoom: 17, // Aumentado de 15 a 17
      duration: 1000,
      essential: true,
      padding: { top: 50, bottom: 50, left: 50, right: 50 },
    });
    this.marcadorMiUbicacion(alertaLngLat);
  }

  responderAlerta(alerta: AlertaSocial): void {
    this.limpiarFormulario();
    this.alertaSocialForm.patchValue({
      parent_id: alerta.id,
    });
    this.estadoForm.set(true);
  }

  OnChangedEstadoForm(): void {
    this.estadoForm.set(!this.estadoForm());
    if (!this.estadoForm()) {
      this.limpiarFormulario();
    }
  }

  seleccionarImagen(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.alertaSocialService.uploadToCloudinary(file).subscribe({
        next: (response: any) => {
          this.imageEmpresa.set(response.secure_url);
          this.estadoImagen.set(true);
        },
        error: (e: any) => console.error('Error al subir imagen:', e),
      });
    }
  }

  private limpiarFormulario(): void {
    this.alertaSocialForm.reset();
    this.alertaActual.set(null);
    this.imageEmpresa.set('assets/subir-imagen.png');
    this.estadoImagen.set(false);
  }
}
