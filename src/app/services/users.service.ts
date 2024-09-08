import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'https://peticiones.online/api/users';
  private http = inject(HttpClient);

  getAll(page: number = 1): Promise<IUser[]> {
    return firstValueFrom(
      this.http.get<IUser[]>(`${this.baseUrl}?page=${page}`)
    );
  }

  getById(id: string): Promise<IUser> {
    return firstValueFrom(this.http.get<IUser>(`${this.baseUrl}/${id}`));
  }
}
