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

  deleteById(id: string | undefined): Promise<IUser> {
    return firstValueFrom(this.http.delete<IUser>(`${this.baseUrl}/${id}`));
  }

  insert(body: IUser): Promise<IUser> {
    return firstValueFrom(this.http.post<IUser>(this.baseUrl, body));
  }

  update(body: IUser): Promise<IUser> {
    let id = body._id; //sin estas líneas no me funcionó
    delete body._id; //también fue necesario eliminar el ._id
    return firstValueFrom(this.http.put<IUser>(`${this.baseUrl}/${id}`, body));
  }
}
