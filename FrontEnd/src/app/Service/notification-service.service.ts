import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }
  private baseUrl = 'https://localhost:5001/gateway/notification'


  SendNotification(body:any):Observable<any>{
    return this.http.post(`${this.baseUrl}`,body)
  }
  sendOtp(body:any):Observable<any>{
   return this.http.post(`${this.baseUrl}/otp`,body)
  }
}
