import { ListUserServices, DeleteUserService, AlertService } from '../../../../_services/index';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'nga-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.scss'],
})
export class ListUserComponent implements OnInit {
    data: any;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'nombreUsuario';
    sortOrder = 'asc';

    constructor(
      private listUserServices: ListUserServices,
      private deleteUserServices: DeleteUserService,
      private alertService: AlertService,
    ) { }

    ngOnInit() {
      this.loadData();
    }

    loadData() {
      this.listUserServices.loadData()
        .then((data) => {
            this.data = data;
        });
    }

    toInt(num: string) {
        return +num;
    }

    sortByWordLength = (a: any) => {
        return a.nombreUsuario.length;
    }

    deleteById(id: string) {
      this.deleteUserServices.deleteById(id)
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
