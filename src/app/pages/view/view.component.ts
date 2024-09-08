import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent {
  user?: IUser;
  activatedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.id;
      this.user = await this.usersService.getById(id);
      console.log(this.user);
    });
  }

  async delete(id: string | undefined) {
    let erase = confirm(`Do you want to permanently delete ${this.user?.first_name} ${this.user?.last_name} from our database?`);
    if (erase) {
try {
  const response = await this.usersService.deleteById(id)
  alert(`${this.user?.first_name} ${this.user?.last_name} was successfully deleted from the database`)
 
} catch(error){console.log(error)}
    }
  }
}
