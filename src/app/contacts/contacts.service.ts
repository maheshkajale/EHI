import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts: any;
  status = ['Active', 'Inactive'];
  constructor() {
    if(localStorage.contacts) {
      this.contacts = this.getContactsStorage();
    } else {
      this.contacts = [
        {
          id: 1,
          firstName: 'Mahesh',
          lastName: 'Kajale',
          email: 'xyz@gmail.com',
          phone: '1234567890',
          status: this.status[0]
        },
        {
          id: 2,
          firstName: 'm1',
          lastName: 'k1',
          email: 'xyz1@gmail.com',
          phone: '1234567890',
          status: this.status[1]
        },
        {
          id: 3,
          firstName: 'm2',
          lastName: 'k2',
          email: 'xyz2@gmail.com',
          phone: '1234567890',
          status: this.status[0]
        },
      ];
      this.updateStorage();
    }
  }

  getContactsStorage() {
    return JSON.parse(localStorage.contacts);
  }

  updateStorage() {
    localStorage.contacts = JSON.stringify(this.contacts);
  }
}
