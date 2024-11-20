import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-admi-summary',
  standalone: true,
  imports: [],
  templateUrl: './admi-summary.component.html',
  styleUrl: './admi-summary.component.css'
})
export class AdmiSummaryComponent implements OnInit {
  ngOnInit(): void {
   
    this.totalTutorBooking()
    this.totalElectricianBooking()
    this.totalPlumberBooking()
   
  }

  noOfPlumbers:any = ''
  noOfTutors: any = ''
  noOfElectricians: any = ''



  http = inject(HttpClient)

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
