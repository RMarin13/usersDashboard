import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() myUser?: IUser;
  usersService = inject(UsersService);

 async delete(id: string | undefined) {
    let erase = confirm(
      `Do you want to permanently delete ${this.myUser?.first_name} ${this.myUser?.last_name} from our database?`
    );
    if (erase) {
      try {
        const response = await this.usersService.deleteById(id);
        alert(
          `${this.myUser?.first_name} ${this.myUser?.last_name} was successfully deleted from the database`
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
}
