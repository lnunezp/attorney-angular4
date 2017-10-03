import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services/index';
import { UserDataStorage } from '../../_models/index';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStoreService } from '../../_helpers/index';

@Component({

  selector: 'nga-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})

export class LoginComponent implements OnInit {
   form: FormGroup;
   userName: AbstractControl;
   password: AbstractControl;
   submitted: boolean = false;
   returnUrl: string;
   private credentials = {
     user: '',
     password: '',
   };

  constructor(fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private userStoreService: UserStoreService,
  ) {

    this.form = fb.group({
      'userName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    });

    this.userName = this.form.controls['userName'];
    this.password = this.form.controls['password'];

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit() {
    // this.authenticationService.logout();
    this.userStoreService.logOut();
  }

  onSubmit(values: UserDataStorage): void {
    this.submitted = true;

    if (this.form.valid) {
      // your code goes here
      this.credentials.user = values.userName;
      this.credentials.password = values.password;

      this.authenticationService.postSesion$(this.credentials).subscribe();
    }
  }
}
