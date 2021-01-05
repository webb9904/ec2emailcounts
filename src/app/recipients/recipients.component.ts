import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../services/notification.service';
import { RecipientService } from '../services/recipient.service';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.css']
})
export class RecipientsComponent implements OnInit {

  constructor(private recipientService: RecipientService,
     public dialogRef: MatDialogRef<RecipientsComponent>, 
     private notificationService: NotificationService) {
  }

  form: FormGroup = this.recipientService.form;

  departments = [ // TODO update to http get call
    { id: 1, value: 'CM Acc Rec/Insolvency' },
    { id: 2, value: 'CM Collections' },
    { id: 3, value: 'Complaint Escalations' },
    { id: 4, value: 'Complaints' },
    { id: 5, value: 'Contact' },
    { id: 6, value: 'COT/Trace' },
    { id: 7, value: 'Direct Admin' },
    { id: 8, value: 'Direct Sales' },
    { id: 9, value: 'Enterprise Billing' },
    { id: 10, value: 'Escalated Debts' },
    { id: 11, value: 'Ledger' },
    { id: 12, value: 'N/A' },
    { id: 13, value: 'On/Off Boarding' },
    { id: 14, value: 'Operations Team Leaders' },
    { id: 15, value: 'Renewals' },
    { id: 16, value: 'Smart Metering' },
    { id: 17, value: 'Support' },
    { id: 18, value: 'Workflow' }
  ]

  ngOnInit(): void {
  }

  public onSubmit(): void {
    if (this.recipientService.form.valid) {
      if (!this.recipientService.form.get('Id').value) {
        this.recipientService.insertRecipient(this.recipientService.form.value);
        this.dialogRef.close();
        this.notificationService.success('Submitted Successfully');
      } else {
        this.recipientService.updateRecipient(this.recipientService.form.value);
        this.dialogRef.close();
        this.notificationService.success('Submitted Successfully');
      }
    }
  }
}
