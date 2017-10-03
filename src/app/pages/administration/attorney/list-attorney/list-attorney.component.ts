import { Component, OnInit } from '@angular/core';
import { ListAttorneyService, AlertService, DeleteAttorneyService } from '../../../../_services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'nga-list-attorney',
  templateUrl: './list-attorney.component.html',
  styleUrls: ['./list-attorney.component.scss'],
})
export class ListAttorneyComponent implements OnInit {
  data: any;
  dataDel: any;
  filterQuery = '';
  rowsOnPage = 10;
  sortBy = 'nombres';
  sortOrder = 'asc';

  constructor(
    private listAttorneyServices: ListAttorneyService,
    private deleteAttorneyServices: DeleteAttorneyService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.listAttorneyServices.loadData()
    .then((data) => {
      this.data = data.items;
    });
  }

  toInit(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
      return a.nombres.length;
  }

  deleteById(id: string) {
    debugger;
    this.deleteAttorneyServices.deleteById(id)
    .subscribe(
      data => {
        this.alertService.success('Elemento eliminado correctamente!');
        this.loadData();
      },
      error => {
        this.alertService.error(error);
      },
    );
  }

}
