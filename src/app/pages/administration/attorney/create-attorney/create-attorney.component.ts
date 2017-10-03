import { Component } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CreateAttorneyService } from '../../../../_services/index';
// implementación de alert
import { AlertService } from '../../../../_services/index';

@Component({
  selector: 'nga-create-attorney',
  templateUrl: './create-attorney.component.html',
})
export class CreateAttorneyComponent {
  form: FormGroup;
  nombre: AbstractControl;
  apellido: AbstractControl;
  rut: AbstractControl;
  dv: AbstractControl;
  submitted: boolean = false;

  constructor(
    fb: FormBuilder,
    private createAttorneyService: CreateAttorneyService,
    private alertService: AlertService,
  ) {
    this.form = fb.group({
      'nombre': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'apellido': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'rut': ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(8)])],
      'dv': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1)])],
    });

    this.nombre = this.form.controls['nombre'];
    this.apellido = this.form.controls['apellido'];
    this.rut = this.form.controls['rut'];
    this.dv = this.form.controls['dv'];
  }

  onSubmit(values: any): void {
    this.createAttorneyService.createAttorney(values.rut, values.dv, values.nombre, values.apellido )
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
