import { Alerta } from './dashboard/alerta-gubernamental/perfil.service';
import { AlertaSocial } from './dashboard/alerta-social/alerta-social.component';

export const alertasSantaCruz: Alerta[] = [
  {
    id: 'SCZ-2024-001',
    nivelAlerta: 'ROJA (emergencia)',
    tipoEvento: 'LLUVIA INTENSA',
    descripcion:
      'Lluvias torrenciales en la ciudad de Santa Cruz y alrededores. Acumulados superiores a 150mm en 24 horas. Sistema de drenaje colapsado en zonas del Plan 3000, Villa Primero de Mayo y Pampa de la Isla. Desborde de canales de drenaje.',
    zonasAfectadas: [
      'Plan 3000',
      'Villa Primero de Mayo',
      'Pampa de la Isla',
      'Urbarí',
      'Los Lotes',
    ],
    recomendaciones: [
      'Evitar cruzar calles inundadas',
      'No transitar por canales de drenaje',
      'Proteger documentos importantes',
      'Mantener limpio el sistema de drenaje domiciliario',
      'Estar atento a avisos de evacuación',
    ],
    institucionEmisora: 'SENAMHI Santa Cruz',
    contactosEmergencia: [
      {
        institucion: 'COED Santa Cruz',
        telefono: '3-3636590',
        direccion: 'Av. Omar Chávez Ortiz, 3er anillo interno',
      },
      {
        institucion: 'Bomberos Santa Cruz',
        telefono: '3-3490110',
        direccion: 'Calle Independencia #230',
      },
    ],
    vigencia: {
      fechaInicio: '2024-01-22T06:00:00',
      fechaFin: '2024-01-24T18:00:00',
    },
    coordenadas: {
      latitude: -17.7863,
      longitude: -63.1812,
      radio: 25.0,
    },
  },
  {
    id: 'SCZ-2024-002',
    nivelAlerta: 'NARANJA (peligro)',
    tipoEvento: 'VIENTOS FUERTES',
    descripcion:
      'Vientos intensos del norte con ráfagas superiores a 80 km/h. Alto riesgo de caída de árboles y estructuras precarias. Afectación prevista en la zona norte y este de la ciudad.',
    zonasAfectadas: [
      'Parque Industrial',
      'Cambodromo',
      'Guapilo',
      'Villa Sanchez',
      'Equipetrol Norte',
    ],
    recomendaciones: [
      'Asegurar techos y estructuras ligeras',
      'Evitar estacionar bajo árboles',
      'Mantener distancia de cables eléctricos',
      'Retirar objetos que puedan ser proyectados por el viento',
      'Permanecer en lugares seguros durante las ráfagas más intensas',
    ],
    institucionEmisora: 'SENAMHI Santa Cruz',
    contactosEmergencia: [
      {
        institucion: 'Dirección de Gestión de Riesgos',
        telefono: '3-3333333',
        direccion: 'Av. Irala #567, Santa Cruz',
      },
    ],
    vigencia: {
      fechaInicio: '2024-01-23T12:00:00',
      fechaFin: '2024-01-24T23:59:59',
    },
    coordenadas: {
      latitude: -17.7647,
      longitude: -63.1961,
      radio: 20.0,
    },
  },
  {
    id: 'SCZ-2024-003',
    nivelAlerta: 'AMARILLA (precaución)',
    tipoEvento: 'ONDA CALOR',
    descripcion:
      'Ola de calor intensa con temperaturas máximas superiores a 38°C y sensación térmica de hasta 45°C. Alta radiación UV y humedad relativa superior al 80%.',
    zonasAfectadas: [
      'Centro de la ciudad',
      'Casco Viejo',
      'Equipetrol',
      'Las Palmas',
      'Sirari',
    ],
    recomendaciones: [
      'Hidratarse constantemente',
      'Evitar exposición al sol entre 10:00 y 16:00',
      'Usar protector solar y ropa ligera',
      'Especial atención a niños y adultos mayores',
      'Mantener ambientes ventilados',
    ],
    institucionEmisora: 'SENAMHI Santa Cruz',
    contactosEmergencia: [
      {
        institucion: 'Hospital San Juan de Dios',
        telefono: '3-3464888',
        direccion: 'Av. Santos Dumont, Santa Cruz',
      },
    ],
    vigencia: {
      fechaInicio: '2024-01-24T00:00:00',
      fechaFin: '2024-01-26T23:59:59',
    },
    coordenadas: {
      latitude: -17.7833,
      longitude: -63.1822,
      radio: 15.0,
    },
  },
  {
    id: 'SCZ-2024-004',
    nivelAlerta: 'VERDE (monitoreo)',
    tipoEvento: 'TORMENTA ELÉCTRICA',
    descripcion:
      'Sistema convectivo aproximándose desde el norte. Probabilidad de tormentas eléctricas dispersas con actividad moderada. Posibles precipitaciones entre 20-40mm.',
    zonasAfectadas: [
      'Satélite Norte',
      'Villa Warnes',
      'Doble Vía La Guardia',
      'Av. Virgen de Cotoca',
      'Urbanización El Remanso',
    ],
    recomendaciones: [
      'Mantenerse informado sobre la evolución del sistema',
      'Tener lista linterna y radio a pilas',
      'Evitar usar aparatos eléctricos durante la tormenta',
      'Desconectar electrodomésticos sensibles',
      'No refugiarse bajo árboles',
    ],
    institucionEmisora: 'SENAMHI Santa Cruz',
    contactosEmergencia: [
      {
        institucion: 'Defensa Civil Santa Cruz',
        telefono: '3-3548000',
        direccion: 'Av. Busch esq. Venezuela',
      },
    ],
    vigencia: {
      fechaInicio: '2024-01-25T15:00:00',
      fechaFin: '2024-01-26T03:00:00',
    },
    coordenadas: {
      latitude: -17.7516,
      longitude: -63.1744,
      radio: 30.0,
    },
  },

  {
    id: 'SCZ-2024-008',
    nivelAlerta: 'ROJA (emergencia)',
    tipoEvento: 'INUNDACIÓN',
    descripcion:
      'Desborde del río Piraí en la zona norte tras 72 horas de lluvias intensas. Nivel del río 3.5 metros por encima de lo normal. Afectación severa en zonas ribereñas y barrios aledaños. Sistema de drenaje colapsado.',
    zonasAfectadas: [
      'Urbarí',
      'Villa 1ro de Mayo',
      'Los Lotes',
      'Juan Pablo II',
      '16 de Julio',
    ],
    recomendaciones: [
      'Evacuar inmediatamente zonas ribereñas',
      'No intentar cruzar el río o zonas inundadas',
      'Seguir rutas de evacuación señalizadas',
      'Acudir a albergues temporales habilitados',
      'Mantener documentos importantes en lugar seguro',
    ],
    institucionEmisora: 'SEARPI',
    contactosEmergencia: [
      {
        institucion: 'SEARPI Emergencias',
        telefono: '3-3523698',
        direccion: 'Av. Santos Dumont 7mo anillo',
      },
      {
        institucion: 'Defensa Civil SCZ',
        telefono: '3-3548000',
        direccion: 'Av. Busch esq. Venezuela',
      },
    ],
    vigencia: {
      fechaInicio: '2024-01-22T06:00:00',
      fechaFin: '2024-01-25T18:00:00',
    },
    coordenadas: {
      latitude: -17.7539,
      longitude: -63.1811,
      radio: 15.0,
    },
  },
  {
    id: 'SCZ-2024-009',
    nivelAlerta: 'NARANJA (peligro)',
    tipoEvento: 'VIENTOS FUERTES',
    descripcion:
      'Ingreso de frente frío con vientos superiores a 85 km/h. Alto riesgo de caída de árboles y daños en infraestructura. Surades intenso afectando principalmente zona sur y este de la ciudad.',
    zonasAfectadas: [
      'Parque Industrial',
      'Pampa de la Isla',
      'Plan 3000',
      'Villa Olímpica',
      'El Trompillo',
    ],
    recomendaciones: [
      'Asegurar techos y estructuras ligeras',
      'Mantener distancia de cables eléctricos y árboles',
      'Evitar circular en motocicletas',
      'Retirar objetos que puedan ser proyectados',
      'Estar atento a avisos de la Gobernación',
    ],
    institucionEmisora: 'SENAMHI Santa Cruz',
    contactosEmergencia: [
      {
        institucion: 'COE Santa Cruz',
        telefono: '3-3636590',
        direccion: 'Av. Omar Chávez Ortiz',
      },
    ],
    vigencia: {
      fechaInicio: '2024-01-23T15:00:00',
      fechaFin: '2024-01-24T23:59:59',
    },
    coordenadas: {
      latitude: -17.8156,
      longitude: -63.1644,
      radio: 25.0,
    },
  },
  {
    id: 'SCZ-2024-010',
    nivelAlerta: 'NARANJA (peligro)',
    tipoEvento: 'LLUVIA INTENSA',
    descripcion:
      'Sistema convectivo severo sobre la ciudad. Previsión de precipitaciones superiores a 100mm en 12 horas. Riesgo de anegamiento en zonas bajas y saturación de sistemas de drenaje.',
    zonasAfectadas: [
      'Centro de la ciudad',
      'Equipetrol',
      'Barrio Sirari',
      'Las Palmas',
      'Guapilo',
    ],
    recomendaciones: [
      'Evitar zonas propensas a anegamiento',
      'No arrojar basura a los canales de drenaje',
      'Mantener limpio el sistema de drenaje domiciliario',
      'Tener preparado kit de emergencia',
      'Seguir indicaciones de autoridades locales',
    ],
    institucionEmisora: 'SENAMHI Santa Cruz',
    contactosEmergencia: [
      {
        institucion: 'Bomberos Voluntarios',
        telefono: '3-3490110',
        direccion: 'Calle Independencia #230',
      },
    ],
    vigencia: {
      fechaInicio: '2024-01-24T12:00:00',
      fechaFin: '2024-01-25T12:00:00',
    },
    coordenadas: {
      latitude: -17.7833,
      longitude: -63.1822,
      radio: 20.0,
    },
  },
  {
    id: 'SCZ-2024-011',
    nivelAlerta: 'AMARILLA (precaución)',
    tipoEvento: 'ONDA CALOR',
    descripcion:
      'Temperatura máxima prevista de 39°C con sensación térmica de 45°C. Índice UV extremadamente alto. Humedad relativa superior al 85% agravando la sensación térmica.',
    zonasAfectadas: [
      'Casco Viejo',
      'Equipetrol Norte',
      'Santos Dumont',
      'Hamacas',
      'Urbanización Cotoca',
    ],
    recomendaciones: [
      'Hidratarse frecuentemente',
      'Evitar exposición solar entre 10:00 y 16:00',
      'Usar protector solar y ropa ligera',
      'Cuidado especial con niños y adultos mayores',
      'No realizar actividades físicas intensas al aire libre',
    ],
    institucionEmisora: 'SENAMHI Santa Cruz',
    contactosEmergencia: [
      {
        institucion: 'Hospital Japonés',
        telefono: '3-3463555',
        direccion: 'Av. Santos Dumont y 3er Anillo',
      },
    ],
    vigencia: {
      fechaInicio: '2024-01-24T00:00:00',
      fechaFin: '2024-01-26T23:59:59',
    },
    coordenadas: {
      latitude: -17.7785,
      longitude: -63.1823,
      radio: 18.0,
    },
  },
  {
    id: 'SCZ-2024-012',
    nivelAlerta: 'VERDE (monitoreo)',
    tipoEvento: 'TORMENTA ELÉCTRICA',
    descripcion:
      'Formación de células convectivas al norte de la ciudad. Probabilidad de tormentas eléctricas aisladas con actividad moderada en las próximas horas.',
    zonasAfectadas: [
      'Satélite Norte',
      'Radial 13',
      'Carretera al Norte',
      'Warnes',
      'Montero',
    ],
    recomendaciones: [
      'Mantenerse informado sobre la evolución',
      'Preparar linterna y radio con baterías',
      'Evitar uso de aparatos eléctricos durante tormenta',
      'No refugiarse bajo árboles',
      'Asegurar objetos que puedan ser arrastrados por el viento',
    ],
    institucionEmisora: 'SENAMHI Santa Cruz',
    contactosEmergencia: [
      {
        institucion: 'Dirección de Gestión de Riesgos',
        telefono: '3-3333333',
        direccion: 'Av. Irala #567',
      },
    ],
    vigencia: {
      fechaInicio: '2024-01-24T14:00:00',
      fechaFin: '2024-01-25T02:00:00',
    },
    coordenadas: {
      latitude: -17.7367,
      longitude: -63.1758,
      radio: 35.0,
    },
  },
  {
    id: 'SCZ-2024-013',
    nivelAlerta: 'ROJA (emergencia)',
    tipoEvento: 'INCENDIO FORESTAL',
    descripcion:
      'Incendio forestal de gran magnitud en la zona del Urubó. Más de 500 hectáreas afectadas. Condiciones de viento y sequedad favorecen la propagación. Humo afectando zonas residenciales.',
    zonasAfectadas: [
      'Urubó',
      'Colinas del Urubó',
      'Puerto Tahuichi',
      'Nueva Jerusalén',
      'Santa Cruz la Vieja',
    ],
    recomendaciones: [
      'Evacuar zonas en riesgo inmediato',
      'Cerrar puertas y ventanas por el humo',
      'Personas con problemas respiratorios deben extremar precauciones',
      'Seguir rutas de evacuación establecidas',
      'Reportar nuevos focos de incendio',
    ],
    institucionEmisora: 'Gobernación de Santa Cruz',
    contactosEmergencia: [
      {
        institucion: 'Bomberos Forestales',
        telefono: '3-3343232',
        direccion: 'Av. Busch #500',
      },
    ],
    vigencia: {
      fechaInicio: '2024-01-23T10:00:00',
      fechaFin: '2024-01-26T23:59:59',
    },
    coordenadas: {
      latitude: -17.7156,
      longitude: -63.2544,
      radio: 40.0,
    },
  },
  {
    id: 'SCZ-2023-101',
    nivelAlerta: 'ROJA (emergencia)',
    tipoEvento: 'INUNDACIÓN',
    descripcion:
      'Inundaciones masivas en el Plan 3000 y Villa Primero de Mayo tras lluvias récord de 200mm en 24 horas. Colapso total del sistema de drenaje y desborde de canales principales.',
    zonasAfectadas: [
      'Plan 3000',
      'Villa Primero de Mayo',
      'Barrio Cortez',
      'Los Chacos',
      'Pampa de la Isla',
    ],
    recomendaciones: [
      'Evacuar hacia zonas altas',
      'No beber agua sin hervir',
      'Evitar contacto con agua estancada',
      'Reportar personas desaparecidas',
      'Acudir a centros de ayuda establecidos',
    ],
    institucionEmisora: 'SEARPI',
    contactosEmergencia: [
      {
        institucion: 'Cruz Roja Santa Cruz',
        telefono: '3-3369090',
        direccion: 'Calle Independencia #394',
      },
    ],
    vigencia: {
      fechaInicio: '2023-12-15T00:00:00',
      fechaFin: '2023-12-20T23:59:59',
    },
    coordenadas: {
      latitude: -17.8159,
      longitude: -63.1486,
      radio: 20.0,
    },
  },
  {
    id: 'SCZ-2023-102',
    nivelAlerta: 'NARANJA (peligro)',
    tipoEvento: 'VIENTOS FUERTES',
    descripcion:
      'Surada intensa con ráfagas superiores a 90 km/h. Caída de más de 50 árboles en la ciudad. Daños en tendido eléctrico y estructuras precarias.',
    zonasAfectadas: [
      'Segundo Anillo',
      'Tercer Anillo',
      'Equipetrol',
      'Sirari',
      'Urbarí',
    ],
    recomendaciones: [
      'Permanecer en lugares seguros',
      'Alejarse de estructuras inestables',
      'Reportar caída de postes o cables',
      'Asegurar objetos que puedan ser proyectados',
      'Evitar estacionarse bajo árboles',
    ],
    institucionEmisora: 'SENAMHI Santa Cruz',
    contactosEmergencia: [
      {
        institucion: 'CRE Emergencias',
        telefono: '3-3351223',
        direccion: 'Av. Santos Dumont #601',
      },
    ],
    vigencia: {
      fechaInicio: '2023-11-28T12:00:00',
      fechaFin: '2023-11-30T12:00:00',
    },
    coordenadas: {
      latitude: -17.7833,
      longitude: -63.1822,
      radio: 25.0,
    },
  },
  {
    id: 'SCZ-2023-103',
    nivelAlerta: 'ROJA (emergencia)',
    tipoEvento: 'SEQUÍA',
    descripcion:
      'Sequía severa afectando el área metropolitana. 40 días sin precipitaciones significativas. Crisis en el suministro de agua en zonas periurbanas.',
    zonasAfectadas: [
      'Plan 4000',
      'Villa Paraíso',
      '6 de Agosto',
      'Nueva Esperanza',
      'Los Chacos',
    ],
    recomendaciones: [
      'Racionar el consumo de agua',
      'Reportar fugas de agua',
      'Almacenar agua de forma segura',
      'Priorizar uso para consumo humano',
      'Estar atento a cronograma de distribución',
    ],
    institucionEmisora: 'SAGUAPAC',
    contactosEmergencia: [
      {
        institucion: 'SAGUAPAC',
        telefono: '3-3121212',
        direccion: 'Av. Irala #461',
      },
    ],
    vigencia: {
      fechaInicio: '2023-10-01T00:00:00',
      fechaFin: '2023-11-15T23:59:59',
    },
    coordenadas: {
      latitude: -17.7892,
      longitude: -63.1975,
      radio: 30.0,
    },
  },
];

// alertas-sociales-data-1.ts
export const alertasSociales1: AlertaSocial[] = [
  {
    id: 'AS021',
    title: 'Emergencia por temporal en Av. Virgen de Cotoca',
    description: 'Inundación severa afecta múltiples zonas del Plan 3000',
    photoUrl:
      'https://i.pinimg.com/736x/12/32/49/123249ff48d3f2914921550c74dde7e6.jpg',
    longitude: -63.19123360425093,
    latitude: -17.797955129830036,
    date: '2024-03-22T18:00:00',
    parent_id: null,
    children: [
      {
        id: 'AS021-1',
        title: 'Evacuación preventiva',
        description: 'Bomberos evacuan 15 familias del sector norte',
        photoUrl: '/images/evacuacion-plan3000.jpg',
        longitude: -63.17583763782762,
        latitude: -17.790086463506096,
        date: '2024-03-22T18:30:00',
        parent_id: 'AS021',
        children: [
          {
            id: 'AS021-1-1',
            title: 'Refugio temporal A',
            description: 'Habilitado en Unidad Educativa Plan 3000',
            photoUrl: '/images/evacuacion-plan3000.jpg',
            longitude: -63.164664650906154,
            latitude: -17.79084220366726,
            date: '2024-03-22T18:45:00',
            parent_id: 'AS021-1',
            children: [],
          },
          {
            id: 'AS021-1-2',
            title: 'Refugio temporal B',
            description: 'Habilitado en Polideportivo',
            photoUrl: '/images/evacuacion-plan3000.jpg',
            longitude: -63.1695812036279,
            latitude: -17.7828385647389,
            date: '2024-03-22T19:00:00',
            parent_id: 'AS021-1',
            children: [],
          },
        ],
      },
      {
        id: 'AS021-2',
        title: 'Colapso de alcantarillado',
        description: 'Sistema de drenaje sobrepasado en la rotonda del Plan',
        photoUrl: '/images/alcantarillado.jpg',
        longitude: -63.19092252677221,
        latitude: -17.786789617005017,
        date: '2024-03-22T19:15:00',
        parent_id: 'AS021',
        children: [
          {
            id: 'AS021-2-1',
            title: 'Punto crítico alcantarilla A',
            description: 'Colapso total en esquina mercado',
            photoUrl: '/images/alcantarillado.jpg',
            longitude: -63.19881392916621,
            latitude: -17.78921451072142,
            date: '2024-03-22T19:30:00',
            parent_id: 'AS021-2',
            children: [],
          },
          {
            id: 'AS021-2-2',
            title: 'Punto crítico alcantarilla B',
            description: 'Desborde en canal principal',
            photoUrl: '/images/alcantarillado.jpg',
            longitude: -63.189323182655755,
            latitude: -17.777943275925548,
            date: '2024-03-22T19:45:00',
            parent_id: 'AS021-2',
            children: [],
          },
        ],
      },
      {
        id: 'AS021-3',
        title: 'Corte de energía preventivo',
        description: 'CRE suspende servicio en zonas afectadas',
        photoUrl: '/images/corte-energia-plan.jpg',
        longitude: -63.20278357920932,
        latitude: -17.7911276240175,
        date: '2024-03-22T20:00:00',
        parent_id: 'AS021',
        children: [
          {
            id: 'AS021-3-1',
            title: 'Subestación norte afectada',
            description: 'Mantenimiento preventivo',
            photoUrl: '/images/corte-energia-plan.jpg',
            longitude: -63.209661476148305,
            latitude: -17.797658661670326,
            date: '2024-03-22T20:15:00',
            parent_id: 'AS021-3',
            children: [],
          },
          {
            id: 'AS021-3-2',
            title: 'Subestación sur afectada',
            description: 'Corte programado',
            photoUrl: '/images/corte-energia-plan.jpg',
            longitude: -63.20935521305971,
            latitude: -17.7864819503358,
            date: '2024-03-22T20:30:00',
            parent_id: 'AS021-3',
            children: [],
          },
        ],
      },
      {
        id: 'AS021-4',
        title: 'Centro de auxilio temporal',
        description: 'Habilitado módulo 110 para damnificados',
        photoUrl: '/images/centro-auxilio.jpg',
        longitude: -63.20141833556884,
        latitude: -17.801731618790242,
        date: '2024-03-22T20:45:00',
        parent_id: 'AS021',
        children: [],
      },
      {
        id: 'AS021-5',
        title: 'Reporte de daños inicial',
        description: '50 viviendas afectadas, 3 derrumbes parciales',
        photoUrl: '/images/danos-temporal.jpg',
        longitude: -63.18493972573202,
        latitude: -17.806065515025608,
        date: '2024-03-22T21:30:00',
        parent_id: 'AS021',
        children: [
          {
            id: 'AS021-4-1',
            title: 'Punto de distribución agua',
            description: 'Cisterna municipal',
            photoUrl: '/images/danos-temporal.jpg',
            longitude: -63.18667716807921,
            latitude: -17.81121518294396,
            date: '2024-03-22T21:00:00',
            parent_id: 'AS021-4',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 'AS001',
    title: 'Corte de energía en Villa 1ro de Mayo',
    description:
      'Apagón total en el sector norte de la Villa, afectando aproximadamente 200 familias',
    photoUrl:
      'https://i.pinimg.com/736x/12/32/49/123249ff48d3f2914921550c74dde7e6.jpg',
    longitude: -63.19123360425093,
    latitude: -17.797955129830036,
    date: '2024-03-22T18:00:00',
    parent_id: null,
    children: [
      {
        id: 'AS021-1',
        title: 'Evacuación preventiva',
        description: 'Bomberos evacuan 15 familias del sector norte',
        photoUrl:
          'https://i.pinimg.com/736x/03/f4/c6/03f4c66151a1fb39305d2060b39e7074.jpg',
        longitude: -63.180455656523556,
        latitude: -17.809709144309686,
        date: '2024-03-22T18:30:00',
        parent_id: 'AS021',
        children: [],
      },
      {
        id: 'AS021-2',
        title: 'Colapso de alcantarillado',
        description: 'Sistema de drenaje sobrepasado en la rotonda del Plan',
        photoUrl:
          'https://i.pinimg.com/736x/23/6a/cb/236acbc8165b3956e66ca1d0d32dc8b4.jpg',
        longitude: -63.200625866096516,
        latitude: -17.804642589068724,
        date: '2024-03-22T19:15:00',
        parent_id: 'AS021',
        children: [],
      },

      {
        id: 'AS021-3',
        title: 'Corte de energía preventivo',
        description: 'CRE suspende servicio en zonas afectadas',
        photoUrl:
          'https://i.pinimg.com/736x/60/9a/9e/609a9edc4716f89c8b69c302a54816f8.jpg',
        longitude: -63.19287596539905,
        latitude: -17.793867837614506,
        date: '2024-03-22T20:00:00',
        parent_id: 'AS021',
        children: [],
      },

      {
        id: 'AS021-4',
        title: 'Centro de auxilio temporal',
        description: 'Habilitado módulo 110 para damnificados',
        photoUrl:
          'https://i.pinimg.com/736x/6f/bd/46/6fbd46a95ce43b2ff7636a732030eff0.jpg',
        longitude: -63.16846391830134,
        latitude: -17.776056187346445,
        date: '2024-03-22T20:45:00',
        parent_id: 'AS021',
        children: [],
      },

      {
        id: 'AS021-5',
        title: 'Reporte de daños inicial',
        description: '50 viviendas afectadas, 3 derrumbes parciales',
        photoUrl:
          'https://i.pinimg.com/736x/d0/13/f9/d013f925ff0a56d4fd6efbfd327c1b7c.jpg',
        longitude: -63.15305127971825,
        latitude: -17.774501023470638,
        date: '2024-03-22T21:30:00',
        parent_id: 'AS021',
        children: [],
      },
    ],
  },

  {
    id: 'AS001',
    title: 'Corte de energía en Villa 1ro de Mayo',
    description:
      'Apagón total en el sector norte de la Villa, afectando aproximadamente 200 familias',
    photoUrl:
      'https://i.pinimg.com/736x/88/d5/74/88d57460096bd56c4c82ee542c660551.jpg',
    longitude: -63.1841750101243,
    latitude: -17.7634634386115,
    date: '2024-03-22T14:30:00',
    parent_id: null,
    children: [
      {
        id: 'AS001-1',
        title: 'Actualización: Corte de energía',
        description:
          'Equipos técnicos trabajando en la zona. Tiempo estimado de resolución: 3 horas',
        photoUrl:
          'https://i.pinimg.com/736x/a1/44/4f/a1444fde6af9bf6394792b427c1bff95.jpg',
        longitude: -63.186693706589196,
        latitude: -17.77184041370982,
        date: '2024-03-22T15:45:00',
        parent_id: 'AS001',
        children: [],
      },
    ],
  },

  {
    id: 'AS002',
    title: 'Inundación en Barrio El Trompillo',
    description:
      'Calles principales bloqueadas por acumulación de agua tras fuerte lluvia',
    photoUrl:
      'https://i.pinimg.com/736x/20/23/67/202367c47143d6fdfc605c7c06259089.jpg',
    longitude: -63.18581368036891,
    latitude: -17.779758185676403,
    date: '2024-03-22T16:00:00',
    parent_id: null,
    children: [],
  },
  {
    id: 'AS003',
    title: 'Accidente vial en Av. Cristo Redentor',
    description:
      'Colisión múltiple cerca del 4to anillo. Se requiere presencia policial',
    photoUrl:
      'https://i.pinimg.com/736x/b9/80/4b/b9804bcd37f4c3a3fc2eccd502ef56c0.jpg',
    longitude: -63.15927529735877,
    latitude: -17.781238552315635,
    date: '2024-03-22T08:15:00',
    parent_id: null,
    children: [],
  },

  {
    id: 'AS004',
    title: 'Manifestación en Plan 3000',
    description: 'Bloqueo pacífico por mejoras en el servicio de agua potable',
    photoUrl:
      'https://i.pinimg.com/736x/5b/05/31/5b0531ec03690ca3c8300cd505ef54c3.jpg',
    longitude: -63.21110950820569,
    latitude: -17.779748589050975,
    date: '2024-03-22T10:30:00',
    parent_id: null,
    children: [],
  },

  {
    id: 'AS005',
    title: 'Incendio en mercado La Ramada',
    description: 'Fuego controlado en sector de verduras. Bomberos en el lugar',
    photoUrl:
      'https://i.pinimg.com/736x/64/38/0f/64380fef4efafe9a77218a1b97db1fd5.jpg',
    longitude: -63.176294946820924,
    latitude: -17.770392645844616,
    date: '2024-03-22T12:45:00',
    parent_id: null,
    children: [],
  },

  {
    id: 'AS006',
    title: 'Deslizamiento en Urbarí',
    description: 'Desprendimiento de tierra afecta viviendas cercanas al río',
    photoUrl:
      'https://i.pinimg.com/736x/64/38/0f/64380fef4efafe9a77218a1b97db1fd5.jpg',
    longitude: -63.16208370054853,
    latitude: -17.769532653004422,
    date: '2024-03-22T13:20:00',
    parent_id: null,
    children: [],
  },

  {
    id: 'AS007',
    title: 'Fuga de gas en Equipetrol',
    description: 'Evacuación preventiva de restaurantes en la zona',
    photoUrl:
      'https://i.pinimg.com/736x/a8/4d/af/a84daf3dbad9ced02bde204f67369a10.jpg',
    longitude: -63.15591230688397,
    latitude: -17.77086948275323,
    date: '2024-03-22T19:15:00',
    parent_id: null,
    children: [],
  },

  {
    id: 'AS008',
    title: 'Corte de agua en Los Pozos',
    description: 'Mantenimiento programado en red principal',
    photoUrl:
      'https://i.pinimg.com/736x/b0/b9/ce/b0b9ce751ece7ce81ec33e7a0171bb9f.jpg',
    longitude: -63.20659621225132,
    latitude: -17.780680913774447,
    date: '2024-03-22T07:30:00',
    parent_id: null,
    children: [],
  },

  {
    id: 'AS009',
    title: 'Árbol caído en 2do Anillo',
    description: 'Bloqueo parcial de vía, necesaria intervención municipal',
    photoUrl:
      'https://i.pinimg.com/736x/3e/a6/29/3ea629f70eb6da5b8a7005d816d12157.jpg',
    longitude: -63.194347757495535,
    latitude: -17.76998916531015,
    date: '2024-03-22T11:45:00',
    parent_id: null,
    children: [],
  },

  {
    id: 'AS010',
    title: 'Obra vial en Av. Banzer',
    description: 'Desvío obligatorio por reparación de pavimento',
    photoUrl:
      'https://i.pinimg.com/736x/77/65/3c/77653c298b05402dc83bd6a6d85b8379.jpg',
    longitude: -63.1791405273319,
    latitude: -17.797471272903614,
    date: '2024-03-22T09:00:00',
    parent_id: null,
    children: [],
  },

  {
    id: 'AS011',
    title: 'Protesta vecinal en Pampa de la Isla',
    description: 'Vecinos reclaman por falta de alumbrado público',
    photoUrl:
      'https://i.pinimg.com/control2/736x/ac/c8/b2/acc8b28bfc8cd7bf88d114a4bf1e3a21.jpg',
    longitude: -63.16439726294217,
    latitude: -17.77009963080081,
    date: '2024-03-22T16:30:00',
    parent_id: null,
    children: [],
  },

  {
    id: 'AS012',
    title: 'Semáforo averiado en Santos Dumont',
    description:
      'Intersección peligrosa requiere presencia de agentes de tránsito',
    photoUrl:
      'https://i.pinimg.com/736x/c9/ea/75/c9ea75f84bad6cfae95528886f39ad37.jpg',
    longitude: -63.17261616721347,
    latitude: -17.792641868409003,
    date: '2024-03-22T08:45:00',
    parent_id: null,
    children: [],
  },

  {
    id: 'AS013',
    title: 'Derrame de combustible Av. Grigotá',
    description: 'Superficie resbaladiza cerca del mercado Mutualista',
    photoUrl:
      'https://i.pinimg.com/236x/11/19/bb/1119bb9f632d5850978fde1fd81832d4.jpg',
    longitude: -63.14978067334799,
    latitude: -17.76681999516982,
    date: '2024-03-22T14:15:00',
    parent_id: null,
    children: [],
  },

  {
    id: 'AS014',
    title: 'Rotura de tubería en Cañoto',
    description: 'Pérdida de agua potable afecta presión en la zona',
    photoUrl:
      'https://i.pinimg.com/736x/d5/61/d9/d561d9c262a9ea09219e04226caae135.jpg',
    longitude: -63.197680941153486,
    latitude: -17.77880767105988,
    date: '2024-03-22T11:20:00',
    parent_id: null,
    children: [],
  },

  {
    id: 'AS015',
    title: 'Construcción irregular en El Paraíso',
    description: 'Vecinos denuncian obras sin permiso municipal',
    photoUrl:
      'https://i.pinimg.com/736x/c1/08/08/c1080825feca42b9cf134b63f0d0f312.jpg',
    longitude: -63.184359828479344,
    latitude: -17.77763644525695,
    date: '2024-03-22T13:45:00',
    parent_id: null,
    children: [],
  },

  {
    id: 'AS016',
    title: 'Contaminación sonora en Equipetrol Norte',
    description: 'Quejas por ruidos excesivos de local nocturno',
    photoUrl:
      'https://i.pinimg.com/736x/60/19/48/601948dc59aa12d0d10494ae9471a0e0.jpg',
    longitude: -63.15736384853037,
    latitude: -17.767238315144585,
    date: '2024-03-22T23:30:00',
    parent_id: null,
    children: [],
  },

  {
    id: 'AS017',
    title: 'Mascota extraviada en Sirari',
    description: 'Se busca perro labrador dorado con collar rojo',
    photoUrl:
      'https://i.pinimg.com/736x/94/6b/f1/946bf1fbc5d52004da6ce2f1d5bc130f.jpg',
    longitude: -63.12761455352592,
    latitude: -17.827170245622575,
    date: '2024-03-22T17:15:00',
    parent_id: null,
    children: [],
  },

  {
    id: 'AS018',
    title: 'Venta ambulante irregular en la Monseñor',
    description: 'Obstrucción de aceras por vendedores no autorizados',
    photoUrl:
      'https://i.pinimg.com/736x/6c/8a/ff/6c8affa490da591b5c551a78cb17d7bf.jpg',
    longitude: -63.089048533230546,
    latitude: -17.804339195320708,
    date: '2024-03-22T10:45:00',
    parent_id: null,
    children: [],
  },

  {
    id: 'AS019',
    title: 'Basura acumulada en Las Palmas',
    description: 'Contenedores desbordados requieren atención urgente',
    photoUrl:
      'https://i.pinimg.com/736x/86/66/d6/8666d6a25d4ec970beefbaed2680da5c.jpg',
    longitude: -63.16884514055407,
    latitude: -17.810013851876153,
    date: '2024-03-22T09:30:00',
    parent_id: null,
    children: [],
  },
  {
    id: 'AS020',
    title: 'Cables caídos en Av. Alemania',
    description: 'Riesgo eléctrico por postes dañados tras temporal',
    photoUrl:
      'https://i.pinimg.com/736x/65/b9/10/65b910b8afd4bc795c636980554fc7ca.jpg',
    longitude: -63.20357599538057,
    latitude: -17.780022569487603,
    date: '2024-03-22T15:00:00',
    parent_id: null,
    children: [],
  },
];
