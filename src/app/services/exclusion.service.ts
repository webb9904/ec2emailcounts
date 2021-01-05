import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Exclusion } from '../models/exclusions';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ExclusionService {

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
  }

  form: FormGroup = this.formBuilder.group({
    Id: [null],
    Domain: ['', Validators.required],
    FullAddress: ['', [Validators.required, Validators.email]]
  });

  public getAllExclusions(): Observable<Exclusion[]> {
    return this.apiService.getRequest('getexclusionssummary');  
  }

  public insertExclusion(exclusion: Exclusion): void {
    const newExclusion = {
      Domain: exclusion.Domain,
      FullAddress: exclusion.FullAddress
    }

    this.apiService.postRequest('createexclusion', newExclusion).subscribe();
    this.form.reset();
  }

  public updateExclusion(exclusion: Exclusion): void {
    this.apiService.postRequest('updateexclusion', exclusion).subscribe();
    this.form.reset();
  }

  public deleteExclusion(id: number): void {
    this.apiService.deleteRequest('deleteexclusion', id).subscribe();
  }

  public populateForm(exclusion: Exclusion): void {
    this.form.setValue({
      Id: exclusion.Id,
      Domain: exclusion.Domain,
      FullAddress: exclusion.FullAddress
    });
  }
}
