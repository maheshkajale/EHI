import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ContactsService } from '../contacts.service';

export interface ContactElement {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  status: string
}

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss']
})
export class CreateUpdateComponent implements OnInit {


  currentContact: ContactElement = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: ''
  };
  formTitle = 'New Contact';
  editMode = false;
  constructor(
    public dialogRef: MatDialogRef<CreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contactService: ContactsService) {}
    
    ngOnInit(): void {
      if (this.data && this.data.add) {
        this.currentContact.id = this.data.add;
        this.editMode = false;
      } else if (this.data && this.data.edit) {
        this.currentContact = this.data.edit;
        this.editMode = true;
      }
    }
  onNoClick(): void {
    this.dialogRef.close();
  }

  saveContact(): boolean {
    if (!this.currentContact.firstName || !this.currentContact.email) {
      return false;
    }
    if (!this.editMode) {
      this.currentContact.status = this.contactService.status[0];
      this.dialogRef.close({add: this.currentContact});
    } else {
      this.dialogRef.close({edit: this.currentContact});
    }
    return true;
  }

}
