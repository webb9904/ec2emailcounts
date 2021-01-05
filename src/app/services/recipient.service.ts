import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Recipient } from '../models/recipient';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipientService {

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
  }

  form: FormGroup = this.formBuilder.group({
    Id: [null],
    EmailAddress: ['', [Validators.required, Validators.email]],
    Department: ['', Validators.required] 
  });

  public getAllRecipients(): Observable<Recipient[]> {
    return this.apiService.getRequest('getrecipientssummary');  
  }

  public insertRecipient(recipient: Recipient): void {
    const newRecipient = {
      EmailAddress: recipient.EmailAddress,
      Department: recipient.Department
    }

    this.apiService.postRequest('createrecipient', newRecipient).subscribe();
    this.form.reset();
  }

  public updateRecipient(recipient: Recipient): void {
    this.apiService.postRequest('updaterecipient', recipient).subscribe();
    this.form.reset();
  }

  public deleteRecipient(id: number): void {
    this.apiService.deleteRequest('deleterecipient', id).subscribe();
  }

  public populateForm(recipient: Recipient): void {
    this.form.setValue({
      Id: recipient.Id,
      EmailAddress: recipient.EmailAddress,
      Department: recipient.Department
    });
  }
}
