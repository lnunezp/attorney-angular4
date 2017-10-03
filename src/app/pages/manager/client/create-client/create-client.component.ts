import { Component } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CreateClientServices } from '../../../../_services/index';

// implementación de alert
import { AlertService } from '../../../../_services/index';

// validadores
import { EmailValidator } from '../../../../_validators/index';

@Component({
  selector: 'nga-create-client',
  templateUrl: 'create-client.component.html',
})
export class CreateClientComponent {
  form: FormGroup;
  nombre: AbstractControl;
  apellido: AbstractControl;
  email: AbstractControl;
  mobile: AbstractControl;
  phone: AbstractControl;
  rut: AbstractControl;
  dv: AbstractControl;
  submitted: boolean = false;

  constructor(
    fb: FormBuilder,
    private createClientService: CreateClientServices,
    private alertService: AlertService,
  ) {
    this.form = fb.group({
      'nombre': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'apellido': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'mobile': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'phone': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'rut': ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(8)])],
      'dv': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1)])],
    });

    this.nombre = this.form.controls['nombre'];
    this.apellido = this.form.controls['apellido'];
    this.email = this.form.controls['email'];
    this.mobile = this.form.controls['mobile'];
    this.phone = this.form.controls['phone'];
    this.rut = this.form.controls['rut'];
    this.dv = this.form.controls['dv'];
  }

  onSubmit(values: any): void {
    this.createClientService.createClient(values.nombre,
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
