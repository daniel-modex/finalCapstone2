import { Component, OnInit, inject } from '@angular/core';
import {UserApiService } from '../../../Service/user.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-list-user-details',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './admin-list-user-details.component.html',
  styleUrl: './admin-list-user-details.component.css'
})
export class AdminListUserDetailsComponent implements OnInit {
  APIService = inject(UserApiService);
  UserList:any[]=[];
  ngOnInit(): void {
    this.loadProfessionals();
  }
  constructor(private toastr:ToastrService){}
  loadProfessionals(){
    this.APIService.getUsers().subscribe((res:any) =>{
      console.log(res.result)
      this.UserList=res.result;
    })
  }

  
DeleteDetail: any = {
  "id": 0,
  "name": "",
  "domain": "",
  "email": "",
}
http = inject(HttpClient)
  onDelete(id:any) {
    this.APIService.deleteUser(id).subscribe((res: any) => {
      
      this.toastr.success("User record successfully Deleted!");
      window.location.reload()
    })
  }
}