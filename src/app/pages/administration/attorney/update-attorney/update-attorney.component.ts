import { Component, OnInit } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UpdateAttorneyService, ListAttorneyService } from '../../../../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
// implementación de alert
import { AlertService } from '../../../../_services/index';

// validadores
import { EmailValidator, EqualPasswordValidator } from '../../../../_validators/index';

@Component({
  selector: 'nga-update-attorney',
  templateUrl: './update-attorney.component.html',
})
export class UpdateAttorneyComponent implements OnInit {
  form: FormGroup;
  nombre: AbstractControl;
  apellido: AbstractControl;
  rut: AbstractControl;
  dv: AbstractControl;
  submitted: boolean = false;
  dataAttorney: any;
  attorneyToken: string = null;

  constructor(
    fb: FormBuilder,
    private updateAttorneyService: UpdateAttorneyService,
    private listAttorneyServices: ListAttorneyService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
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

  ngOnInit() {
    this.attorneyToken = this.route.snapshot.params['token'];
    this.loadAttorneyById(this.attorneyToken, 'tOKEN');
  }

  loadAttorneyById(token: string, param: string) {
    this.listAttorneyServices.loadDataById(token, param)
    .then((dataAttorney) => {
      this.dataAttorney = dataAttorney.items;
    });
  }

  onSubmit(values: any): void {
    this.updateAttorneyService.updateAttorney(this.attorneyToken, values.rut, values.dv, values.nombre, values.apellido)
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
