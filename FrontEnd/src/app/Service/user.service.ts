import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private baseUrl='https://localhost:5001/gateway/users'

  constructor(private http: HttpClient) { }

  getUsers():Observable<any>
  {
    return this.http.get(`${this.baseUrl}`);
  }

  postUser(body:any):Observable<any>{
return this.http.post(`${this.baseUrl}`,body)
}

putUser(body:any):Observable<any>{
  return this.http.put(`${this.baseUrl}`,body)
}

deleteUser(id:any):Observable<any>{
  return this.http.delete(`${this.baseUrl}/`+id)
}

getUserById(id:any):Observable<any>{
  return this.http.get(`${this.baseUrl}/`+id)
}

getUserByUserName(name:any):Observable<any>{
  return this.http.get(`${this.baseUrl}/ByUserName/`+name)
}


  getProfessionals()
  {
    return this.http.get("https://localhost:7057/api/Services/GetAllProfessionals");
  }

  confirmProfessionals(confirmres:any){
   return this.http.put("https://localhost:7057/api/Services/ConfirmService",confirmres)
  }

}
