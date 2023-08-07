import {Component, OnInit} from '@angular/core';
import {EmpiriuService} from "../services/empiriu.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  formGroup: FormGroup;

  constructor(private service: EmpiriuService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  login() {
    this.email = this.formGroup.value.email;
    this.password = this.formGroup.value.password;
    this.service.logIn(this.email, this.password)
  }
}
