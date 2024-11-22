import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import mapboxgl, { LngLat, Map, Marker } from 'mapbox-gl';
import { catchError, of, retry } from 'rxjs';
import { alertasSantaCruz } from '../../data.app';
import {
  Alerta,
  ContactoEmergencia,
  Coordenadas,
  PerfilService,
  Vigencia,
} from './perfil.service';
mapboxgl.accessToken =
  'pk.eyJ1Ijoic2N1bXBpaSIsImEiOiJjbHhsbjFycm8wMjBoMmpwd3NvenpnMmgxIn0.sO-6U8_MXbVYmwWquibutA';

export interface AlertaCreate {
  nivelAlerta: string;
  tipoEvento: string;
  descripcion: string;
  zonasAfectadas: string[];
  vigencia: Vigencia;
  recomendaciones: string[];
  institucionEmisora: string;
  coordenadas: Coordenadas;
  contactosEmergencia: ContactoEmergencia[];
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export default class PerfilComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  public alertas = signal<Alerta[]>([]);
  public alerta = signal<Alerta | null>(null);

  // READ : DEPENDENCY INJECTION
  public formBuilder = inject(FormBuilder);
  public perfilService = inject(PerfilService);

  // READ : MAPBOX PROPERTIES
  @ViewChild('map') divMap!: ElementRef;
  public map?: Map;
  private currentMarker?: Marker;
  public currentLngLat: LngLat = new LngLat(
    -63.18215133936172, // longitud de Santa Cruz
    -17.783253855301936 // latitud de Santa Cruz
  );
  public latitude = signal<number>(0);
  public longitude = signal<number>(0);

  // READ : IMAGE PROPERTIES
  public imageEmpresa = signal<string>('assets/subir-imagen.png');
  public estadoImagen = signal<boolean>(false);

  // READ : FORM PROPERTIES
  public estadoForm = signal<boolean>(false);
  public emergenciaForm: FormGroup = this.formBuilder.group({
    nivelAlerta: [''],
    tipoEvento: [''],
    descripcion: [''],
    zonasAfectadas: [''],
    vigencia: [''],
    recomendaciones: [''],
    institucionEmisora: [''],
    coordenadas: [''],
    contacto: [''],
  });
  // READ : DROPDOWN 1 - NIVEL ALERTA
  public isOpenInput1 = signal<boolean>(false);
  public selectedAlert1 = signal<string>('');
  public alerts = [
    'VERDE (monitoreo)',
    'AMARILLA (precaución)',
    'NARANJA (peligro)',
    'ROJA (emergencia)',
  ];

  // READ : DROPDOWN 2 - TIPO EVENTO
  public isOpenInput2 = signal<boolean>(false);
  public selectedEvent = signal<string>('');
  public eventos = [
    'INUNDACIÓN',
    'VIENTOS FUERTES',
    'LLUVIA INTENSA',
    'DESLIZAMIENTO',
    'INCENDIO FORESTAL',
    'SEQUÍA',
    'TORMENTA ELÉCTRICA',
    'GRANIZADA',
    'ONDA CALOR',
  ];

  // Secretaria Departamental de Seguridad Ciudadana de Santa Cruz
  // Secretaria DPTAL. de Seguridad Ciudadana SCZ.

  // LOGIC : LIFECYCLE HOOKS
  ngOnInit(): void {
    this.getAlertas();
  }

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  // LOGIC : MAP METHODS
  private initializeMap(): void {
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: this.currentLngLat!,
      zoom: 17,
    });
    // this.myLocation();
  }

  OnChangedEstadoForm(): void {
    this.estadoForm.set(!this.estadoForm());
  }

  getAlertas(): void {
    this.perfilService
      .getAlertas()
      .pipe(
        retry(3), // Reintenta 3 veces antes de fallar
        catchError((error) => {
          if (error.status === 0) {
            this.alertas.set(alertasSantaCruz);
            console.log('Error de conexión:', error);
          }
          return of([]);
        })
      )
      .subscribe({
        next: (alertasDelServidor: Alerta[]) => {
          // Combinar alertas del servidor con las estáticas
          const todasLasAlertas = [...alertasDelServidor, ...alertasSantaCruz];

          // Ordenar por fecha de inicio de vigencia (más recientes primero)
          const alertasOrdenadas = todasLasAlertas.sort((a, b) => {
            return (
              new Date(b.vigencia.fechaInicio).getTime() -
              new Date(a.vigencia.fechaInicio).getTime()
            );
          });

          this.alertas.set(alertasOrdenadas);
          console.log('Alertas combinadas cargadas:', this.alertas());
          // this.alertas.set(alertas);
          // console.log('Alertas cargadas:', this.alertas());
        },
        error: (error) => {
          console.error('Error detallado:', error);
          this.alertas.set(alertasSantaCruz);
        },
      });
  }

  createAlerta(): void {
    const nuevaAlerta: AlertaCreate = {
      nivelAlerta: this.emergenciaForm.get('nivelAlerta')?.value || '',
      tipoEvento: this.emergenciaForm.get('tipoEvento')?.value || '',
      descripcion: this.emergenciaForm.get('descripcion')?.value || '',
      zonasAfectadas: [this.emergenciaForm.get('zonasAfectadas')?.value || ''],
      vigencia: {
        fechaInicio: new Date().toISOString(),
        fechaFin: new Date(Date.now() + 86400000).toISOString(),
      },
      recomendaciones: [
        this.emergenciaForm.get('recomendaciones')?.value || '',
      ],
      institucionEmisora:
        this.emergenciaForm.get('institucionEmisora')?.value || '',
      coordenadas: {
        latitude: this.latitude(),
        longitude: this.longitude(),
        radio: 5000,
      },
      contactosEmergencia: [
        {
          institucion:
            this.emergenciaForm.get('institucionEmisora')?.value || '',
          telefono: this.emergenciaForm.get('contacto')?.value || '',
          direccion: '',
        },
      ],
    };

    this.perfilService.createAlerta(nuevaAlerta).subscribe({
      next: (response) => {
        console.log('Alerta creada exitosamente:', response);
        this.getAlertas();
      },
      error: (error) => {
        console.error('Error al crear la alerta:', error);
      },
    });
  }

  updateAlerta(): void {
    const idAlerta = this.alerta()?.id;
    // Crear objeto con datos actualizados
    const alertaActualizada: AlertaCreate = {
      nivelAlerta: this.emergenciaForm.get('nivelAlerta')?.value || '',
      tipoEvento: this.emergenciaForm.get('tipoEvento')?.value || '',
      descripcion: this.emergenciaForm.get('descripcion')?.value || '',
      zonasAfectadas: [this.emergenciaForm.get('zonasAfectadas')?.value || ''],
      vigencia: {
        fechaInicio: new Date().toISOString(),
        fechaFin: new Date(Date.now() + 86400000).toISOString(),
      },
      recomendaciones: [
        this.emergenciaForm.get('recomendaciones')?.value || '',
      ],
      institucionEmisora:
        this.emergenciaForm.get('institucionEmisora')?.value || '',
      coordenadas: {
        latitude: this.latitude(),
        longitude: this.longitude(),
        radio: 5000,
      },
      contactosEmergencia: [
        {
          institucion:
            this.emergenciaForm.get('institucionEmisora')?.value || '',
          telefono: this.emergenciaForm.get('contacto')?.value || '',
          direccion: '',
        },
      ],
    };

    // Llamar al servicio con ID y datos
    this.perfilService.updateAlerta(alertaActualizada, idAlerta!).subscribe({
      next: (response) => {
        console.log('Alerta actualizada exitosamente:', response);
        this.getAlertas(); // Recargar lista
      },
      error: (error) => {
        console.error('Error al actualizar la alerta:', error);
      },
    });
  }

  eliminarAlerta(idAlerta: String): void {
    // Confirmar antes de eliminar
    this.perfilService.deleteAlerta(idAlerta!).subscribe({
      next: () => {
        console.log('Alerta eliminada exitosamente');
        this.getAlertas(); // Recargar la lista después de eliminar
      },
      error: (error) => {
        console.error('Error al eliminar la alerta:', error);
      },
    });
  }

  // Modifica la función editarAlertaCustom
  editarAlertaCustom(alerta: Alerta): void {
    this.alerta.set(alerta);
    this.emergenciaForm.patchValue({
      nivelAlerta: alerta.nivelAlerta,
      tipoEvento: alerta.tipoEvento,
      descripcion: alerta.descripcion,
      zonasAfectadas: alerta.zonasAfectadas.join(', '),
      recomendaciones: alerta.recomendaciones.join(', '),
      institucionEmisora: alerta.institucionEmisora,
      contacto: alerta.contactosEmergencia[0].telefono,
    });

    // Actualizar coordenadas y mover el mapa y marcador
    this.latitude.set(alerta.coordenadas.latitude);
    this.longitude.set(alerta.coordenadas.longitude);

    // Crear LngLat con las coordenadas de la alerta
    const alertaLngLat = new LngLat(
      alerta.coordenadas.longitude,
      alerta.coordenadas.latitude
    );

    // Mover el mapa a la ubicación de la alerta
    this.map?.flyTo({
      center: alertaLngLat,
      zoom: 15.5,
      duration: 2000, // duración de la animación en milisegundos
    });

    // Crear nuevo marcador en la ubicación de la alerta
    this.marcadorMiUbicacion(alertaLngLat);

    this.estadoForm.set(true);
  }

  // myLocation() {
  //   if (!this.map) return;
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const lngLat = new LngLat(
  //       position.coords.longitude,
  //       position.coords.latitude
  //     );
  //     this.marcadorMiUbicacion(lngLat);
  //     this.map?.flyTo({
  //       zoom: 15.5,
  //       center: lngLat,
  //     });
  //   });
  // }

  // Modifica la función marcadorMiUbicacion
  marcadorMiUbicacion(lngLat: LngLat): Marker {
    // Eliminar marcador anterior si existe
    if (this.currentMarker) {
      this.currentMarker.remove();
    }

    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(assets/logo-official-SCZ.png)';
    el.style.width = '50px';
    el.style.height = '50px';
    el.style.backgroundSize = 'cover';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.filter = 'drop-shadow(0 5px 5px rgba(0, 0, 0, 0.5))';

    this.latitude.set(lngLat.lat);
    this.longitude.set(lngLat.lng);

    const marker = new Marker({
      element: el,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map!);

    // Guardar referencia al marcador actual
    this.currentMarker = marker;

    this.setupMarkerEvents(marker);

    return marker;
  }

  // Modifica setupMarkerEvents para incluir actualización del mapa
  private setupMarkerEvents(marker: Marker): void {
    marker.on('dragstart', () => {
      console.log('Iniciando arrastre del marcador');
    });

    marker.on('drag', () => {
      // Actualizar el mapa mientras se arrastra
      const newPos = marker.getLngLat();
      this.map?.setCenter(newPos);
    });

    marker.on('dragend', () => {
      const newPos = marker.getLngLat();
      this.latitude.set(newPos.lat);
      this.longitude.set(newPos.lng);
      console.log('Arrastre finalizado');
      console.log('Nuevas coordenadas:', {
        latitud: this.latitude(),
        longitud: this.longitude(),
        posicionMarker: newPos,
      });

      // Centrar el mapa en la nueva posición
      this.map?.flyTo({
        center: newPos,
        zoom: 15.5,
        duration: 1000,
      });
    });
  }

  // LOGIC : DROPDOWN METHODS
  toggleDropdown1() {
    this.isOpenInput1.set(!this.isOpenInput1());
  }

  selectAlert1(alert: string) {
    try {
      // Actualizar el signal
      this.selectedAlert1.set(alert);

      // Actualizar el FormControl específico
      this.emergenciaForm.get('nivelAlerta')?.setValue(alert);

      // Cerrar el dropdown
      this.isOpenInput1.set(false);

      // Log detallado
      console.log('Alerta seleccionada:', {
        alerta: alert,
        formValue: this.emergenciaForm.get('nivelAlerta')?.value,
      });
    } catch (error) {
      console.error('Error al seleccionar alerta:', error);
    }
  }

  toggleDropdown2() {
    this.isOpenInput2.set(!this.isOpenInput2());
  }

  selectEvent(evento: string) {
    try {
      // Actualizar el signal
      this.selectedEvent.set(evento);

      // Actualizar el FormControl
      this.emergenciaForm.get('tipoEvento')?.setValue(evento);

      // Cerrar el dropdown
      this.isOpenInput2.set(false);

      // Log más detallado
      console.log('Evento seleccionado:', {
        evento: evento,
        formValue: this.emergenciaForm.get('tipoEvento')?.value,
      });
    } catch (error) {
      console.error('Error al seleccionar evento:', error);
    }
  }

  getColorClass(alert: string): string {
    switch (alert) {
      case 'VERDE (monitoreo)':
        return 'bg-green-500';
      case 'AMARILLA (precaución)':
        return 'bg-yellow-500';
      case 'NARANJA (peligro)':
        return 'bg-orange-500';
      case 'ROJA (emergencia)':
        return 'bg-red-500';
      default:
        return '';
    }
  }

  // LOGIC : IMAGE METHODS
  seleccionarImagen(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.perfilService.uploadToCloudinary(file).subscribe({
        next: (response: any) => {
          this.imageEmpresa.set(response.secure_url);
          this.estadoImagen.set(true);
        },
        error: (e: any) => console.log(e),
      });
    }
  }

  // También podrías añadir un método para actualizar el marcador independientemente
  public actualizarMarcador(lat: number, lng: number): void {
    const newLngLat = new LngLat(lng, lat);
    this.marcadorMiUbicacion(newLngLat);

    this.map?.flyTo({
      center: newLngLat,
      zoom: 15.5,
      duration: 2000,
    });
  }
}
