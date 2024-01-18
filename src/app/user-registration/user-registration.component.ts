import { Component } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  user: User = new User();
  users: User[] = [];
  serialNumber: number = 1;
  editingIndex: number = -1; 

  onSubmit() {
    if (this.editingIndex === -1) {
      if (this.user.id === undefined) {
        this.user.id = this.serialNumber; 
        this.users.push(Object.assign({}, this.user));
        this.incrementSerialNumber();
      } else {
        const index = this.users.findIndex(u => u.id === this.user.id);
        this.users[index] = Object.assign({}, this.user);
      }
    } else {
      
      this.users[this.editingIndex] = Object.assign({}, this.user);
      this.editingIndex = -1; 
    }
    this.user = new User(); 
  }

  editUser(index: number) {
    this.user = Object.assign({}, this.users[index]);
    this.editingIndex = index; 
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    if (this.users.length === 0) {
      this.serialNumber = 1; 
    }
  }

  private incrementSerialNumber() {
    this.serialNumber++;
  }
}
