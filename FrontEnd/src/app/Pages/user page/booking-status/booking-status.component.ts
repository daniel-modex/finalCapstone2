import { CommonModule, DatePipe } from '@angular/common';

import { HttpBackend, HttpClient } from '@angular/common/http';

import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { RouterLink, RouterOutlet } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({

  selector: 'app-booking-status',

  standalone: true,

  imports: [RouterLink, RouterOutlet, DatePipe, CommonModule, FormsModule],

  templateUrl: './booking-status.component.html',

  styleUrl: './booking-status.component.css'

})

export class BookingStatusComponent implements OnInit {

  constructor(private toastr: ToastrService, private cdr: ChangeDetectorRef) {

  }

  ProfileName: any = ""

  http = inject(HttpClient)

  ngOnInit(): void {

    this.ProfileName = localStorage.getItem('userName')

    this.getBookingDetails(this.ProfileName)

  }

  onLogOut() {

    localStorage.clear()

  }

  isVisible: boolean = false
  uniqueProfessionalNames: any = []

  BookingDetails: any = []

 

  getBookingDetails(userName: string) {

    this.http.get("https://localhost:7025/api/booking/UserName/" + userName).subscribe((res: any) => {

      console.log(res)

      if (res.isSuccessful) {

        this.BookingDetails = res.result

        console.log(this.BookingDetails)

        this.extractUniqueNames(this.BookingDetails)

        this.BookingDetails = [...this.BookingDetails].reverse();

        this.cdr.detectChanges()

      }

    })

  }

  extractUniqueNames(BookingDetails: any[]) {

    const professionalNamesSet = new Set<string>();

    for (let i = 0; i < BookingDetails.length; i++) {

      professionalNamesSet.add(this.BookingDetails[i].professionalName);

    }

    this.uniqueProfessionalNames = Array.from(professionalNamesSet);

    console.log(this.uniqueProfessionalNames)

  }

  Submit() {
    if(this.reviewObj.userRating>5 || this.reviewObj.userRating<0){
      this.toastr.error("enter a rating between 1 to 5")
    }
    else{
      this.reviewObj.userName = this.ProfileName

    this.reviewObj.message = this.reviewmessage

    console.log(this.reviewObj)

    this.http.post("https://localhost:7057/api/User/Reviews/AddReview", this.reviewObj).subscribe((res: any) => {

      console.log(res)

      if (res.isSuccessful) {

        this.toastr.success("review successfully submitted")
        this.fetchUpdatedReviews();

        // Reset the review form
        this.reviewmessage = '';
        this.reviewObj.userRating = 0;

      }

    })
    }

    

  }

  fetchUpdatedReviews() {
    this.http.get("https://localhost:7057/api/User/Reviews/GetReviewsByName?username=" + this.reviewObj.professionalName)
      .subscribe((res: any) => {
        console.log(res);
  
        if (res.isSuccessful) {
          this.pastReviews = res.result.reverse(); // Update with the latest reviews
          console.log(this.pastReviews);
          this.cdr.detectChanges();
        }
      });
  }

  reviewObj: any = {

    id: 0,

    professionalName: "",

    userName: "",

    dateTime: "2024-11-18T04:33:22.899Z",

    message: "",

    userRating: 0

  }

  reviewmessage: any
  pastReviews:any

  Review(name: string) {
   
   
      this.reviewObj.professionalName = name
      this.http.get("https://localhost:7057/api/User/Reviews/GetReviewsByName?username="+name).subscribe((res:any)=>{
        console.log(res)
      this.pastReviews=res.result
      this.pastReviews=this.pastReviews.reverse()
      console.log(this.pastReviews)
      this.cdr.detectChanges()
      })

    setTimeout(() => {
      this.isVisible = true

      
    }, 1000);
    
    
   

  }

  responseObj: any = {

    responseId: 0,

    bookingId: 0,

    responseValue: false,

    responseMessage: ""

  }

  Delete(id: any) {

    this.responseObj.bookingId = id

    this.responseObj.responseValue = true

    this.http.put("https://localhost:7025/api/booking/CancelBooking", this.responseObj).subscribe((res: any) => {

      console.log(res)

      if (res.isSuccessful) {
        this.toastr.success("Cancellation Successfull")

        setTimeout(() => {

          window.location.reload()

        }, 1000);

      }

    })

  }

}

