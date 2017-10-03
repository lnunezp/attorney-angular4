import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ListCaseService, ListClientServices, DeleteCaseService } from '../../../../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../_services/index';

@Component({
  selector: 'nga-list-case',
  templateUrl: './list-case.component.html',
  styleUrls: ['./list-case.component.scss'],
})
export class ListCaseComponent implements OnInit, OnChanges {
  data: any;
  dataClient: any;
  filterQuery = '';
  rowsOnPage = 10;
  sortBy = 'nombres';
  sortOrder = 'asc';
  paymentToken: string = null;
  @Input() tokenClient: string;

  constructor(
    private listCaseService: ListCaseService,
    private listClientService: ListClientServices,
    private deleteCaseService: DeleteCaseService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.loadCaseById(this.tokenClient, 'cLIETOKEN');
    this.loadClientById(this.tokenClient, 'tOKEN');
  }

  ngOnChanges() {
    this.loadCaseById(this.tokenClient, 'cLIETOKEN');
  }

  loadCaseById(token: string, param: string) {
    this.listCaseService.loadDataById(token, param)
    .then((data) => {
      this.data = data.items;
    });
  }

  loadClientById(token: string, param: string) {
    this.listClientService.loadDataById(token, param)
    .then((dataClient) => {
      this.dataClient = dataClient.items;
    });
  }

  loadPayment(token: string) {
    this.paymentToken = token;
  }

  deleteById(id: string) {
    this.deleteCaseService.deleteById(id)
    .subscribe(
      data => {
        this.alertService.success('Elemento eliminado exitosamente!');
        this.loadCaseById(this.tokenClient, 'cLIETOKEN');
      },
      error => {
        this.alertService.error(error);
      },
    );
  }
}
