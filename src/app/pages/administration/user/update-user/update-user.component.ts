import { Component, OnInit } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UpdateUserService, ListUserServices } from '../../../../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
// implementación de alert
import { AlertService } from '../../../../_services/index';
// validadores
import { EmailValidator, EqualPasswordValidator } from '../../../../_validators/index';

@Component({
  selector: 'nga-update-user',
  templateUrl: './update-user.component.html',
})
export class UpdateUserComponent implements OnInit {
  form: FormGroup;
  nombre: AbstractControl;
  apellido: AbstractControl;
  nombreUsuario: AbstractControl;
  password: AbstractControl;
  repeatPassword: AbstractControl;
  passwords: FormGroup;
  mail: AbstractControl;
  submitted: boolean = false;
  dataUser: any;
  userToken: string = null;

  constructor(
    fb: FormBuilder,
    private updateUserService: UpdateUserService,
    private listUserServices: ListUserServices,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = fb.group({
      'nombre': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'apellido': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'nombreUsuario': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      }, { validator: EqualPasswordValidator.validate('password', 'repeatPassword') } ),
      'mail': ['', Validators.compose([Validators.required, EmailValidator.validate])],
    });

    this.nombre = this.form.controls['nombre'];
    this.apellido = this.form.controls['apellido'];
    this.nombreUsuario = this.form.controls['nombreUsuario'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
    this.mail = this.form.controls['mail'];
  }

  ngOnInit() {
    this.userToken = this.route.snapshot.params['token'];
    this.loadUserById(this.userToken, 'tOKEN');
  }

  loadUserById(token: string, param: string) {
    this.listUserServices.loadDataById(token, param)
    .then((dataUser) => {
      this.dataUser = dataUser.items;
    });
  }

  onSubmit(values: any): void {
    this.updateUserService.updateUser(this.userToken, values.nombreUsuario,
      values.nombre, values.apellido, values.passwords.password, values.mail)
      .subscribe(
        data => {
          this.alertService.success('Elemento actualizado exitosamente!');
        },
        error => {
          this.alertService.error(error);
        },
      );
    }

}
