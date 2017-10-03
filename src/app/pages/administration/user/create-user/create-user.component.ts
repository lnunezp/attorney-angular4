import { Component } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CreateUserServices } from '../../../../_services/index';

// implementación de alert
import { AlertService } from '../../../../_services/index';

// validadores
import { EmailValidator, EqualPasswordValidator } from '../../../../_validators/index';

@Component({
  selector: 'nga-create-user',
  templateUrl: './create-user.component.html',
})
export class CreateUserComponent {
  form: FormGroup;
  nombre: AbstractControl;
  apellido: AbstractControl;
  nombreUsuario: AbstractControl;
  password: AbstractControl;
  repeatPassword: AbstractControl;
  passwords: FormGroup;
  mail: AbstractControl;
  submitted: boolean = false;

  constructor(
    fb: FormBuilder,
    private createUserService: CreateUserServices,
    private alertService: AlertService,
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

    onSubmit(values: any): void {
      this.createUserService.createUser(values.nombreUsuario,
        values.nombre, values.apellido, values.passwords.password, values.mail)
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
