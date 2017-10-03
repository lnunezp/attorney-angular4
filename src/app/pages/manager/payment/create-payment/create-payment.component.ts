import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nga-create-payment',
  templateUrl: './create-payment.component.html',
})
export class CreatePaymentComponent implements OnInit {
  clientToken: string = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.clientToken = this.route.snapshot.params['token'];
  }
}
