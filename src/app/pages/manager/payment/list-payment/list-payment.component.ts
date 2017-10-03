import { Component, Input, OnChanges } from '@angular/core';
import {
  ListPaymentService,
  ListCaseService,
  CreatePaymentService,
  DeletePaymentServices,
} from '../../../../_services/index';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../../_services/index';
import { ListCaseComponent } from '../../case/list-case/list-case.component';

@Component({
  selector: 'nga-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss'],
})
export class ListPaymentComponent implements OnChanges {
  @Input() paymentTokenParam;
  @Input() clientToken;
  data: any;
  dataCase: any;
  filterQuery = '';
  rowsOnPage = 10;
  sortBy = 'nombres';
  sortOrder = 'asc';
  form: FormGroup;
  comprobante: AbstractControl;
  monto: AbstractControl;
  submitted: boolean = false;

  constructor(
    private listPaymentServices: ListPaymentService,
    private listCaseService: ListCaseService,
    private createPaymentService: CreatePaymentService,
    private router: Router,
    private alertService: AlertService,
    private listCaseComponent: ListCaseComponent,
    private deletePaymentService: DeletePaymentServices,
    fb: FormBuilder,
  ) {
    this.form = fb.group({
      'comprobante': [''],
      'monto': [''],
    });
    this.comprobante = this.form.controls['comprobante'];
    this.monto = this.form.controls['monto'];
  }

  ngOnChanges() {
    if (this.paymentTokenParam !== null) {
      this.loadPaymentById(this.paymentTokenParam, 'cASETOKEN');
      this.loadCaseById(this.paymentTokenParam, 'tOKEN');
    }
  }

  loadPaymentById(token: string, param: string) {
    this.listPaymentServices.loadDataById(token, param)
    .then((data) => {
      this.data = data.items;
    });
  }

  loadCaseById(token: string, param: string) {
    this.listCaseService.loadDataById(token, param)
    .then((dataCase) => {
      this.dataCase = dataCase.items;
    });
  }

  deleteById(id: string) {
    this.deletePaymentService.deleteById(id)
    .subscribe(
      data => {
        this.listCaseComponent.loadCaseById(this.clientToken, 'cLIETOKEN');
        this.loadPaymentById(this.paymentTokenParam, 'cASETOKEN');
        this.alertService.success('Elemento eliminado exitosamente!');
      },
      error => {
        this.alertService.error(error);
      },
    );
  }

  onSubmit(values: any): void {
    this.createPaymentService.createPayment(this.paymentTokenParam, values.comprobante, values.monto)
    .subscribe(
      data => {
        this.listCaseComponent.loadCaseById(this.clientToken, 'cLIETOKEN');
        this.loadPaymentById(this.paymentTokenParam, 'cASETOKEN');
        this.alertService.success('Elemento creado exitosamente!');
      },
      error => {
        this.alertService.error(error);
      },
    );
  }
}
