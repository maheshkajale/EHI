import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateUpdateComponent } from '../create-update/create-update.component';


export interface ContactElement {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  status: string
}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  title = '';
  showContactForm = true;
  contact: any;
  dataSource: any;
  constructor(public contactService: ContactsService, public dialog: MatDialog) {
    this.updateList();
  }
  ngOnInit(): void {
    this.title = 'Manage Contacts';
  }
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'edit', 'delete'];
  tableHeaders = [
    {id: 'id', label: 'Id'},
    {id: 'firstName', label: 'First Name'},
    {id: 'lastName', label: 'Last Name'},
    {id: 'email', label: 'Email'},
  ];
  
  openDialog(id = null): void {
    let data;
    if (id) {
      data = this.contactService.contacts.filter((el: ContactElement) => {
        return id === el.id;
      });
      data = {edit: data.pop()};
    } else {
      let id = 0;
      this.contactService.contacts.forEach((el: any) => {
        id = el.id > id ? el.id : id; 
      });
      data = {add: ++id};
    }
    const dialogRef = this.dialog.open(CreateUpdateComponent, {
      width: '350px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.add) {
        this.contactService.contacts.push(result.add);
        this.updateList();
      } else if (result && result.edit) {
        this.contactService.contacts.map((el: ContactElement) => {
          if (el.id === result.edit.id) {
            el = result.edit;
          }
        });
        this.updateList();
      }
    });
  }

  deleteContact(id: number) {
    this.contactService.contacts.map((el: ContactElement) => {
      if (el.id === id) {
        el.status = this.contactService.status[1];
      }
    });
    this.updateList();
  }

  updateList() {
    this.dataSource = this.contactService.contacts.filter((el: ContactElement) => {
      return el.status === this.contactService.status[0];
    });
    this.contactService.updateStorage();
  }
}