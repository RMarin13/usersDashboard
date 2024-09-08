import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  usersService = inject(UsersService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  userForm: FormGroup;
  function: string = 'Create';

  constructor() {
    this.userForm = new FormGroup(
      {
        first_name: new FormControl(null, []),
        last_name: new FormControl(null, []),
        email: new FormControl(null, []),
        image: new FormControl(null, []),
      },
      []
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        this.function = 'Update';
        const user: IUser = await this.usersService.getById(params.id);
        this.userForm = new FormGroup(
          {
            _id: new FormControl(user._id, []),
            first_name: new FormControl(user.first_name, []),
            last_name: new FormControl(user.last_name, []),
            email: new FormControl(user.email, []),
            image: new FormControl(user.image, []),
          },
          []
        );
      }
    });
  }

  async getDataForm() {
    console.log(this.userForm.value);

    if (this.userForm.value._id) {
      try {
        const response: IUser = await this.usersService.update(
          this.userForm.value
        );
        alert('User Updated Succesfully');
        this.router.navigate(['/home', 'users']);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response: IUser = await this.usersService.insert(
          this.userForm.value
        );
        alert('User Created Succesfully');
        this.router.navigate(['/home', 'users']);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
