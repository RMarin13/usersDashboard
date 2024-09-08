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
}
