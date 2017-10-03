import { Component, OnInit } from '@angular/core';
import { ListClientServices, DeleteClientServices, AlertService } from '../../../../_services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'nga-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss'],
})
export class ListClientComponent implements OnInit {
  data: any;
  dataDel: any;
  filterQuery = '';
  rowsOnPage = 10;
  sortBy = 'nombres';
  sortOrder = 'asc';
 
  constructor(
    private listClientServices: ListClientServices,
    private deleteClientServices: DeleteClientServices,
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.listClientServices.loadData()
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

  createClient() {
    this.router.navigate(['createClient']);
  }

  deleteById(id: string) {
    this.deleteClientServices.deleteById(id)
    .subscribe(
      data => {
        this.alertService.success('Elemento eliminado exitosamente!');
      },
      error => {
        this.alertService.error(error);
      },
    );
  }
}
