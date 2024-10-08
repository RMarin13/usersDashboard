import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { ActivatedRoute, Router } from '@angular/router';

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
        first_name: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[^\d]+$/),
        ]),
        last_name: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[^\d]+$/),
        ]),
        email: new FormControl(null, [
          Validators.required,
          Validators.pattern(
            /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
          ),
        ]),
        image: new FormControl(null, [
          Validators.required,
          Validators.pattern(
            /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
          ),
        ]),
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
            first_name: new FormControl(user.first_name, [
              Validators.required,
              Validators.minLength(2),
              Validators.pattern(/^[^\d]+$/),
            ]),
            last_name: new FormControl(user.last_name, [
              Validators.required,
              Validators.minLength(2),
              Validators.pattern(/^[^\d]+$/),
            ]),
            email: new FormControl(user.email, [
              Validators.required,
              Validators.pattern(
                /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
              ),
            ]),
            image: new FormControl(user.image, [
              Validators.required,
              Validators.pattern(
                /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
              ),
            ]),
          },
          []
        );
      }
    });
  }

  checkControl(formControlName: string, validator: string) {
    return (
      this.userForm.get(formControlName)?.hasError(validator) &&
      this.userForm.get(formControlName)?.touched
    );
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
