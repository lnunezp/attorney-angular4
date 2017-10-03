import { Component, OnInit } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CreateCaseService } from '../../../../_services/index';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { ListClientServices, ListAttorneyService } from '../../../../_services/index';

// implementación de alert
import { AlertService } from '../../../../_services/index';

@Component({
  selector: 'nga-create-case',
  templateUrl: 'create-case.component.html',
})
export class CreateCaseComponent implements OnInit {
  form: FormGroup;
  descripcion: AbstractControl;
  monto: AbstractControl;
  abogtoken: AbstractControl;
  submitted: boolean = false;
  clientToken: string = null;
  attorToken: AbstractControl = null;
  data: any;
  dataAttorney: any;

  constructor(
    fb: FormBuilder,
    private createCaseService: CreateCaseService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private listClientServices: ListClientServices,
    private listAttorneyService: ListAttorneyService,
  ) {
    this.form = fb.group({
      'descripcion': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'monto': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'attorToken': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.descripcion = this.form.controls['descripcion'];
    this.monto = this.form.controls['monto'];
    this.attorToken = this.form.controls['attorToken'];
  }

  ngOnInit() {
    this.clientToken = this.route.snapshot.params['token'];
    this.loadDataClient(this.clientToken, 'tOKEN');
    this.loadDataAttorney();
  }

  loadDataClient(id: string, param: string) {
    this.listClientServices.loadDataById(id, param)
    .then((data) => {
      this.data = data.items;
    });
  }

  loadDataAttorney() {
    this.listAttorneyService.loadData()
    .then((data) => {
      this.dataAttorney = data.items;
    });
  }

  onSubmit(values: any): void {
    this.createCaseService.createCase(values.descripcion, values.monto, this.clientToken, values.attorToken)
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
