import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import 'datatables.net-buttons-dt';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import {
  ContribuyenteService,
  ConstanciaSituacionFiscalService,
  RegimenFiscalService,
  ActividadEconomicaService,
  DescargaMasivaService
} from '../../../../services';
import { Config } from 'datatables.net';
import { ADTSettings } from 'angular-datatables/src/models/settings';



@Component({
  selector: 'app-contribuyentes',
  templateUrl: './contribuyentes.component.html',
  styleUrls: ['./contribuyentes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContribuyentesComponent implements OnInit, OnDestroy {
  n: number = 0;
  s: number = 0;
  a: number = 0;
  r: number = 0;
  contribuyentes: any;
  solicitudes:any;
  lstRegimen: any;
  lstActividad: any;
  contribuyente: any = new Contribuyente;
  contribuyenteSelect: Contribuyente = new Contribuyente;
  cantClientes: number = 0;
  cantActividades: number = 0;
  cantRegimen: number = 0;
  cantSolicitudes: number = 0;
  tituloModal: string = '';
  base64Certificado: string = '';
  base64Key: string = '';
  ContrasenaSat: string = '';
  ContrasenaSatC: string = '';
  FileCSF: any;
  FechaInicio: any;
  FechaFin: any;
  labelCer: string = 'Selecciona archivo .cer';
  labelKey: string = 'Selecciona archivo .key';
  labelCSF: string = 'Selecciona archivo .pdf';
  respDescargaMasiva: any;
  dtOptions: Config = {};
  // dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();

  //modales
  @ViewChild("modalNuevoContribuyente", { static: false })
  modalNuevoContribuyente: any;

  @ViewChild("modalDetalleContribuyente", { static: false })
  modalDetalleContribuyente: any;

  @ViewChild("modalCSF", { static: false })
  modalCSF: any;

  config = {
    animated: false,
    backdrop: 'static'
  };

  constructor(
    private _cdr: ChangeDetectorRef,
    private _clienteService: ContribuyenteService,
    private _csfService: ConstanciaSituacionFiscalService,
    private _actividadService: ActividadEconomicaService,
    private _regimenService: RegimenFiscalService,
    private _descargaXMLService: DescargaMasivaService,
    private localeService: BsLocaleService,
  ) {
    this.localeService.use('es');
  }

  async ngOnInit(): Promise<any> {
    
    await this.obtenerAllContribuyentes();    
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  async obtenerAllContribuyentes() {
    this.dtTrigger.next(this.dtOptions);
    await this._clienteService.obtenerAllContribuyentes()
      .subscribe({
        next: response => {
          this.contribuyentes = response;
          setTimeout(()=>{
          $('#dtC').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            language:{ url: 'https://cdn.datatables.net/plug-ins/2.0.5/i18n/es-MX.json'},
            processing: true,
            lengthMenu:[5,10,25],
            dom: 'Bfrtip',
            buttons: [
              'columnsToggle',
              'colvis',
              'copy',
              {
                extend: 'csv',
                text: 'CSV export',
                fieldSeparator: ',',
                exportOptions: [1, 2, 3]
              },
              'excel',
              {
                text: 'Some button',
                key: '1',
                action: function (e, dt, node, config) {
                  alert('Button activated');
                }
              }
            ]
          });},1);
          this._cdr.detectChanges();
        },
        error: err => {
          console.log(err);
        }
      });      
  }

  abrirModalNuevoContribuyente() {
    this.tituloModal = 'Registro de Datos Fiscales';
    this.modalNuevoContribuyente.show();
  }

  async mostrarDetalleContribuyente(id: number) {
    // this.contribuyenteSelect = this.contribuyentes.find((c: { idContribuyente: number; }) => c.idContribuyente == id);

    await this._clienteService.obtenerContribuyenteId(id)
      .subscribe({
        next: async response => {
          this.contribuyente = response;
          this.contribuyenteSelect = this.contribuyente;

          //consulta listado de Regimen Fiscal
          await this._regimenService.obtenerContribuyenteRegimenFiscalId(id)
            .subscribe({
              next: res => {
                this.lstRegimen = res;
                this._cdr.detectChanges();
              },
              error: error => {
                console.log(error);
              }
            });

          //consulta listado de Actividad Economica
          await this._actividadService.obtenerContribuyenteActividadEconomica(id)
            .subscribe({
              next: resp => {
                this.lstActividad = resp;
                this._cdr.detectChanges();
              },
              error: fail => {
                console.log(fail);
              }
            });

          this._cdr.detectChanges();
          this.cambiarVista('display:none', 'display:block', 1);
        },
        error: err => {
          console.log(err);
        }
      });
  }

  descargaMasiva(contribuyente: any) {
    this.contribuyente = contribuyente;
    this.obtenerSolicitudesContribuyente(this.contribuyente.idContribuyente);
    this.cambiarVista('display:none', 'display:block', 2);
  }

  abrirModalCargaCSF(id: string) {
    this.tituloModal = 'Constancia de Situación Fiscal';
    this.modalCSF.show();
  }

  handleFileInputCertificado(event: any) {
    let cerFile = event.target.files[0];
    let nameFile = cerFile.name;
    if (nameFile.substring(nameFile.length - 3, nameFile.length) == 'cer') {
      this.convertFile(event.target.files[0]).subscribe(base64 => {
        this.base64Certificado = base64;
        this.labelCer = nameFile;
        this._cdr.detectChanges();
      });
    } else {
      Swal.fire('Validación de .CER', 'Favor de elegir archivo con extención .cer', 'warning');
      this.labelCer = 'Selecciona archivo .cer';
    }
  }

  handleFileInputKey(event: any) {
    let keyFile = event.target.files[0];
    let nameFile = keyFile.name;
    if (nameFile.substring(nameFile.length - 3, nameFile.length) == 'key') {
      this.convertFile(event.target.files[0]).subscribe(base64 => {
        this.base64Key = base64;
        this.labelKey = nameFile;
        this._cdr.detectChanges();
      });
    } else {
      Swal.fire('Validación de .KEY', 'Favor de elegir archivo con extención .key', 'warning');
      this.labelKey = 'Selecciona archivo .key';
    }
  }

  handleFileInputCSF(event: any) {
    this.FileCSF = event.target.files[0];
    let nameFile = this.FileCSF.name;
    if (nameFile.substring(nameFile.length - 3, nameFile.length) != 'pdf') {
      Swal.fire('Validación de Formato .pdf', 'Favor de elegir archivo con extención .pdf', 'warning');
      this.labelCSF = 'Selecciona archivo .pdf';
    } else {
      this.labelCSF = nameFile;
      this._cdr.detectChanges();
    }
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target?.result?.toString() ? event.target.result.toString() : ""));
    return result;
  }

  guardarContribuyente() {
    const formData: FormData = new FormData();

    // Validaciones de campos obligatorios
    if (this.base64Certificado.trim() == '') {
      Swal.fire('Campo Requerido', 'Favor de seleccionar el archivo .cer', 'warning');
      return;
    }

    if (this.base64Key.trim() == '') {
      Swal.fire('Campo Requerido', 'Favor de seleccionar el archivo .key', 'warning');
      return;
    }

    if (this.ContrasenaSat.trim() == '' || this.ContrasenaSatC.trim() == '') {
      Swal.fire('Campo Requerido', 'Favor de introducir la contraseña', 'warning');
      return;
    }

    if (this.ContrasenaSat != this.ContrasenaSatC) {
      Swal.fire('Validación de Contraseña', 'Las contraseñas no coinciden', 'warning');
      return;
    }

    if (!this.FileCSF) {
      Swal.fire('Campo Requerido', 'Favor de agregar Constancia de Situación Fiscal', 'warning');
      return;
    }

    if (this.FileCSF) {
      formData.append('CSF', this.FileCSF);
      formData.append('CertBase', this.base64Certificado);
      formData.append('KeyBase', this.base64Key);
      formData.append('ContraseñaSat', this.ContrasenaSat);
    }

    this._clienteService.crearContribuyente(formData).subscribe({
      next: response => {
        Swal.fire('Carga Completa de Archivos', 'Razón Social: ' + response.razonSocial, 'success');
        this.modalNuevoContribuyente.hide();
        this.obtenerAllContribuyentes();
      },
      error: err => {
        this.modalNuevoContribuyente.hide();
        Swal.fire('Error en la carga de Archivos', err.error.detail, 'error');
        this._cdr.detectChanges();
      }
    });

    this._cdr.detectChanges();
  }

  guardarCSF() {
    const formData: FormData = new FormData();
    let respuesta: any;

    if (this.FileCSF) {
      formData.append('CSF', this.FileCSF);
      formData.append('AltText', "AltText");
      formData.append('Description', "Descripción");
      formData.append('IdContribuyente', '2');
    }

    this._csfService.cargarCSF(formData).subscribe({
      next: response => {
        console.log("---" + response);
        respuesta = response;
      },
      error: err => {
        console.log("error: " + err);
        respuesta = err;
      }
    });

    console.log(respuesta);
    this.modalCSF.hide();
  }

  confirmarEliminacion(contribuyente: any) {
    Swal.fire({
      title: "¿Esta seguro de eliminar al Contribuyente?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarContribuyente(contribuyente);
      }
    });
  }

  eliminarContribuyente(contribuyente: any) {
    this._clienteService.eliminarContribuyente(contribuyente.idContribuyente).subscribe({
      next: response => {
        Swal.fire('Contribuyente Eliminado', 'Razón Social: ' + contribuyente.razonSocial, 'success');
        // this.modalNuevoContribuyente.hide();
        this.obtenerAllContribuyentes();
      },
      error: err => {
        this.modalNuevoContribuyente.hide();
        Swal.fire('Error al eliminar Contribuyente', err.error.detail, 'error');
        this._cdr.detectChanges();
      }
    })
  }

  cambiarVista(tbPrincipal: string, datosContribuyente: string, op: number) {
    if (op == 1) {
      document.getElementById("tbPrincipal")?.setAttribute('style', tbPrincipal);
      document.getElementById("datosContribuyente")?.setAttribute('style', datosContribuyente);
    } else {
      document.getElementById("tbPrincipal")?.setAttribute('style', tbPrincipal);
      document.getElementById("descargaMasiva")?.setAttribute('style', datosContribuyente);
    }
  }

  async descargarXML() {
    if (this.FechaInicio == null){
      Swal.fire('Campo Requerido', 'Favor de ingresar una Fecha Inicio', 'warning');
      return;
    }
    if (this.FechaFin == null){
      Swal.fire('Campo Requerido', 'Favor de ingresar una Fecha Fin', 'warning');
      return;
    }
    if(this.FechaFin < this.FechaInicio){
      Swal.fire('La Fecha Inicio es mayor a la Fecha Final ', 'Favor de verificar el rango de fechas', 'warning');
      return;
    }

    let fi = `${this.FechaInicio.getFullYear()}-${('0'+(this.FechaInicio.getMonth()+1)).slice(-2)}-${('0'+(this.FechaInicio.getDate())).slice(-2)}`;
    let ff = `${this.FechaFin.getFullYear()}-${('0'+(this.FechaFin.getMonth()+1)).slice(-2)}-${('0'+(this.FechaFin.getDate())).slice(-2)}`;
    await this._descargaXMLService.descargaMasivaXML(this.contribuyente.idContribuyente,
      fi,
      ff)
      .subscribe({
        next: res => {
          this.respDescargaMasiva = res;
          this.obtenerSolicitudesContribuyente(this.contribuyente.idContribuyente);
          this._cdr.detectChanges();
        },
        error: error => {
          console.log(error);
        }
      });
  }

  async obtenerSolicitudesContribuyente(idContribuyente: number) {
    await this._descargaXMLService.solicitudesContribuyente(idContribuyente)
      .subscribe({
        next: response => {
          this.solicitudes = response;
          this.cantSolicitudes = this.solicitudes.length;
          this._cdr.detectChanges();
        },
        error: err => {
          console.log(err);
        }
      });
  }

  async validarSolicitud(idSoicitud: number, idContribuyente: number) {
    await this._descargaXMLService.validarSolicitud(idSoicitud,idContribuyente)
      .subscribe({
        next: response => {
          this.respDescargaMasiva = response;
          this._cdr.detectChanges();
        },
        error: err => {
          console.log(err);
        }
      });
  }

}

export class Contribuyente {
  idContribuyente: number = 0;
  rfc: string = '';
  razonSocial: string = '';
  nombre: string = '';
  primerApellido: string = '';
  segundoApellido: string = '';
  regimenCapital: string = '';
  curp: string = '';
  certBytes: string = '';
  certBase: string = '';
  plainBase: string = '';
  serialNumber: string = '';
  certificateNumber: string = '';
  validFrom: Date | undefined;
  validTo: Date | undefined;
  isFiel: boolean = false;
  isValid: boolean = false;
  fechaIncialVigencia: Date | undefined;
  fechaFinalVigencia: Date | undefined;
  pemCertificado: string = '';
  contraseñaSat: string = '';
  keyBytes: string = '';
  keyBase: string = '';
  pemPrivateKey: string = '';
  credencialBase: string = '';
  dataToSign: string = '';
  signedBytes: string = '';
  originalDataBytes: string = '';
  isValidPfx: boolean = false;
  pfxBytes: string = '';
  pfxBase64: string = '';
  telefono: string = '';
  email: string = '';
  idDomicilioFiscal: number = 0;
  tipoContribuyente: TipoContribuyente = new TipoContribuyente;
  domicilioFiscal: DomicilioFiscal = new DomicilioFiscal;
}

export class DomicilioFiscal {
  idDomicilioFiscal: number = 0;
  tipoVialidad: string = '';
  nombreVialidad: string = '';
  numeroExterior: string = '';
  numeroInterior: string = '';
  nombreColonia: string = '';
  nombreLocalidad: string = '';
  nombreMunicipio: string = '';
  nombreEntidadFederativa: string = '';
  entreCalle: string = '';
  yCalle: string = '';
  cp: string = '';
}

export class RegimenFiscal {
  idRegimenFiscal: number = 0;
  codigoRegimenFiscal: number = 0;
  descripcion: string = '';
  idTipoContribuyente: string = '';
  fechaInicioVigencia: Date | undefined;
  fechaFinVigencia: Date | undefined;
}

export class ActividadEconomica {
  clave: number = 0;
  descripcion: string = '';
  actividadesIncluye: string = '';
  fechaInicioVigencia: Date | undefined;
  fechaFinVigencia: Date | undefined;
}

export class TipoContribuyente {
  idTipoContribuyente: number = 0;
  descripcion: string = '';
}