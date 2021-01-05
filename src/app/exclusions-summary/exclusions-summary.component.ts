import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Exclusion } from '../models/exclusions';
import { ExclusionService } from '../services/exclusion.service';

import { NotificationService } from '../services/notification.service';
import { DialogService } from '../services/dialog.service';
import { ExclusionsComponent } from '../exclusions/exclusions.component';

@Component({
  selector: 'app-exclusions-summary',
  templateUrl: './exclusions-summary.component.html',
  styleUrls: ['./exclusions-summary.component.css']
})
export class ExclusionsSummaryComponent implements OnInit {
  displayedColumns: string[] = ['Domain', 'FullAddress', 'actions'];
  dataSource: MatTableDataSource<Exclusion>;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  searchKey: string = '';

  constructor(private exclusionService: ExclusionService,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private changeDetectorRefs: ChangeDetectorRef) {
    }

  ngOnInit(): void {
    this.getAllExclusions();
  }

  public getAllExclusions(): void {
    this.exclusionService.getAllExclusions()
    .subscribe(data => {
      this.dataSource = new MatTableDataSource(data as Exclusion[]);
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filter = this.searchKey;
    });
    this.changeDetectorRefs.detectChanges();
  }

  public onSearchClear(): void {
    this.searchKey = "";
    this.applyFilter();
  }

  public applyFilter(): void {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  public getDomain(input: string): string {
    return input ? input : 'NULL';
  }

  public getFullAddress(input: string): string {
    return input ? input : 'NULL';
  }

  public onCreate(): void {
    this.exclusionService.form.reset();
    this.dialogService.openDialog(ExclusionsComponent)
    .afterClosed()
    .subscribe(() => {
      this.getAllExclusions();
      this.applyFilter();
    });
  }

  public onEdit(exclusion: Exclusion): void {
    this.exclusionService.populateForm(exclusion);
    this.dialogService.openDialog(ExclusionsComponent)
    .afterClosed()
    .subscribe(() => {
      // this.getAllExclusions();
      // this.applyFilter();
    });
  }

  public onDelete(id: number): void {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this Exclusion?')
      .afterClosed()
      .subscribe(result => {
        if(result) {
          this.exclusionService.deleteExclusion(id);
          this.notificationService.warn('Deleted Successfully');
          this.dataSource.data.splice(this.dataSource.data.findIndex(x => x.Id == id), 1)
          this.applyFilter();
        }
      });
  }

}
