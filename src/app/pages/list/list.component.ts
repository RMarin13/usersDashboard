import { Component, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  usersService = inject(UsersService);

  respObj: any = {};
  arrUsers: IUser[] = [];

  async ngOnInit() {
    try {
      const response = await this.usersService.getAll();
      this.respObj = response;
      this.arrUsers = this.respObj.results;
    } catch (error) {
      console.log(error);
    }
  }

  async goToPage(page: number) {
    try {
      const response = await this.usersService.getAll(page);
      this.respObj = response;
      this.arrUsers = this.respObj.results;
    } catch (error) {
      console.log(error);
    }
  }
}
