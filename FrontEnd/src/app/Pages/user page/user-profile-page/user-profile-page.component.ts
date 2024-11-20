import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserApiService } from '../../../Service/user.service';


@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [RouterLink,RouterOutlet,FormsModule],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css'
})
export class UserProfilePageComponent implements OnInit {
  userName:any = ""
  ProfileName:any =""
  ngOnInit(): void {
    this.ProfileName = localStorage.getItem('userName')
    this.userName = localStorage.getItem('userName')
    this.getDetails(this.userName)
    console.log(this.userName)
  }
  constructor(private toastr:ToastrService,private userApiService:UserApiService){}
  
  // updateObj: any = {
  //   "id: 0,
  // "name": "string",
  // "email": "string",
  // "phone": "string",
  // "gender": "string",
  // "address": "string",
  // "dob": "2024-11-19",
  // "profilePic": "string",
  // "userName": "string",
  // "city": "string"
  // }
  UserObj: any = {
    id: 0,
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    city: "",
    dob: "",
    profilePic: "",
    userName: "",
    // password:"",
    role: ""
  }

  http = inject(HttpClient)

  getDetails(name: string) {
    this.userApiService.getUserByUserName(name).subscribe((res: any) => {
      console.log(res)
      if(res.isSuccessful){
        this.UserObj=res.result
        console.log(this.UserObj)
      }
    })
  }

  onSubmit() {
  this.userApiService.putUser(this.UserObj).subscribe((res:any)=>{
    console.log(res)
    if (res.isSuccessful) {
      this.toastr.success("Successfully updated details")
    }
  })
  }
  onLogOut(){
    localStorage.clear()
  }
}
