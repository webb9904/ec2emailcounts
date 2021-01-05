import { Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Recipient } from '../models/recipient';
import { RecipientsComponent } from '../recipients/recipients.component';
import { RecipientService } from '../services/recipient.service';

import { NotificationService } from '../services/notification.service';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-recipients-summary',
  templateUrl: './recipients-summary.component.html',
  styleUrls: ['./recipients-summary.component.css']
})
export class RecipientsSummaryComponent implements OnInit {
  displayedColumns: string[] = ['EmailAddress', 'Department', 'actions'];
  dataSource: MatTableDataSource<Recipient>;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  searchKey: string = '';

  constructor(private recipientService: RecipientService,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getAllRecipients();
  }

  public getAllRecipients(): void {
    this.recipientService.getAllRecipients()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data as Recipient[]);
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter = this.searchKey;
        this.changeDetectorRefs.detectChanges();
      });
  }

  public onSearchClear(): void {
    this.searchKey = "";
    this.applyFilter();
  }

  public applyFilter(): void {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  public onCreate(): void {
    this.recipientService.form.reset();
    this.dialogService.openDialog(RecipientsComponent)
    .afterClosed()
    .subscribe(() => {
      this.getAllRecipients();
      this.applyFilter();
    });
  }

  public onEdit(recipient: Recipient): void {
    this.recipientService.populateForm(recipient);
    this.dialogService.openDialog(RecipientsComponent)
    .afterClosed()
    .subscribe(() => {
      this.getAllRecipients();
      this.applyFilter();
    });
  }

  public onDelete(id: number): void {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this Recipient?')
      .afterClosed()
      .subscribe(result => {
        if(result) {
          this.recipientService.deleteRecipient(id);
          this.notificationService.warn('Deleted Successfully');
          this.dataSource.data.splice(this.dataSource.data.findIndex(x => x.Id == id), 1)
          this.applyFilter();
        }
      });
  }
}
