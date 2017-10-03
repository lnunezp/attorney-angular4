import { Component, OnInit } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UpdateClientServices, ListClientServices } from '../../../../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
// implementación de alert
import { AlertService } from '../../../../_services/index';

// validadores
import { EmailValidator } from '../../../../_validators/index';

@Component({
  selector: 'nga-update-client',
  templateUrl: 'update-client.component.html',
})
export class UpdateClientComponent implements OnInit {
  form: FormGroup;
  nombre: AbstractControl;
  apellido: AbstractControl;
  email: AbstractControl;
  mobile: AbstractControl;
  phone: AbstractControl;
  rut: AbstractControl;
  dv: AbstractControl;
  submitted: boolean = false;
  clientToken: string = null;
  dataClient: any;

  constructor(
    fb: FormBuilder,
    private updateClientService: UpdateClientServices,
    private listClientService: ListClientServices,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = fb.group({
      'nombre': [''],
      'apellido': [''],
      'email': [''],
      'mobile': [''],
      'phone': [''],
      'rut': [''],
      'dv': [''],
    });

    this.nombre = this.form.controls['nombre'];
    this.apellido = this.form.controls['apellido'];
    this.email = this.form.controls['email'];
    this.mobile = this.form.controls['mobile'];
    this.phone = this.form.controls['phone'];
    this.rut = this.form.controls['rut'];
    this.dv = this.form.controls['dv'];
  }

  ngOnInit() {
    this.clientToken = this.route.snapshot.params['token'];
    this.loadClientById(this.clientToken, 'tOKEN');
  }

  loadClientById(token: string, param: string) {
    this.listClientService.loadDataById(token, param)
    .then((dataClient) => {
      this.dataClient = dataClient.items;
    });
  }

  onSubmit(values: any): void {
    this.updateClientService.updateClient(this.clientToken, values.nombre,
      values.apellido, values.email, values.mobile, values.phone, values.rut, values.dv)
    .subscribe(
      data => {
        this.alertService.success('Elemento guardado exitosamente!');
      },
      error => {
          this.alertService.error(error);
      },
    );
  }
}
