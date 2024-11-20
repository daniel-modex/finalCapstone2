import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserApiService } from '../../../Service/user.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prof-details',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './prof-details.component.html',
  styleUrl: './prof-details.component.css'
})
export class ProfDetailsComponent implements OnInit {
  ngOnInit(): void {
    this.getProviders()
    this.totalTutorBooking()
    this.totalElectricianBooking()
    this.totalPlumberBooking()
  }
  constructor(private toastr:ToastrService){}
  APIServices = inject(UserApiService)
  http = inject(HttpClient)

  ProfessionalList: any
  confirmRes: any = {
    id: "",
    rating: "",
    status: false
  }

  noOfPlumbers: any = 0
  noOfTutors: any = 0
  noOfElectricians: any = 0

  confirm(item: any) {
    this.confirmRes.id = item.id
    this.confirmRes.rating=item.rating
    this.confirmRes.status = true
    this.http.put("https://localhost:7057/api/Services/ConfirmService", this.confirmRes).subscribe((res: any) => {
      if (res.isSuccessful) {
        console.log(res)
        this.toastr.success("Successfully Confirmed Service Provider")
        window.location.reload()
      }
    })
  }

  getProviders() {
    this.APIServices.getProfessionals().subscribe((res: any) => {
      console.log(res.result)
      this.ProfessionalList = res.result;
    })
  }

  totalTutorBooking() {
    this.http.get("https://localhost:7025/api/Summary/ServiceSummary/Tutor").subscribe((res: any) => {
      console.log(res)
      if (res.isSuccessful) {
        console.log(res.result.count)
        this.noOfTutors = res.result.count

      }
    })




  }

  totalElectricianBooking() {
    this.http.get("https://localhost:7025/api/Summary/ServiceSummary/Electrician").subscribe((res: any) => {
      if (res.isSuccessful) {
        this.noOfElectricians = res.result.count

      }
    })
  }

  totalPlumberBooking() {
    this.http.get("https://localhost:7025/api/Summary/ServiceSummary/Plumber").subscribe((res: any) => {
      if (res.isSuccessful) {
        this.noOfPlumbers = res.result.count

      }
    })
  }

}
