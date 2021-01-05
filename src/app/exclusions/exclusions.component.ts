import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExclusionService } from '../services/exclusion.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-exclusions',
  templateUrl: './exclusions.component.html',
  styleUrls: ['./exclusions.component.css']
})
export class ExclusionsComponent implements OnInit {

  constructor(private exclusionService: ExclusionService,
    public dialogRef: MatDialogRef<ExclusionsComponent>, 
    private notificationService: NotificationService) {
    }

    form: FormGroup = this.exclusionService.form;

  ngOnInit(): void {
  }

  public onSubmit(): void {
    if (this.exclusionService.form.valid) {
      if (!this.exclusionService.form.get('Id').value) {
        this.exclusionService.insertExclusion(this.exclusionService.form.value);
        this.dialogRef.close();
        this.notificationService.success('Submitted Successfully');
      } else {
        this.exclusionService.updateExclusion(this.exclusionService.form.value);
        this.dialogRef.close();
        this.notificationService.success('Submitted Successfully');
      }
    }
  }
}
