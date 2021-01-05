import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiService } from '../services/api.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../shared/app-date-adapter';

@Component({
  selector: 'app-counts',
  templateUrl: './counts.component.html',
  styleUrls: ['./counts.component.css', '../shared/form-styles.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class CountsComponent implements OnInit {

  public form: FormGroup;
  public count: number;
  public submitted: boolean;

  constructor(private fb: FormBuilder, 
    private apiService: ApiService) {
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      sentDateTime: [null, Validators.required],
    });
  }

  submit(): void {
    this.submitted = false;
    const date = moment(this.form.get('sentDateTime').value).format('YYYY-MM-DD');
    this.apiService.getRequest('getcounts/' + date) // TODO Create Count service
    .subscribe((response) => {
      this.count = response;
      this.submitted = true;
    });
  }
}
