import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request-page',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './request-page.component.html',
  styleUrl: './request-page.component.css'
})
export class RequestPageComponent implements OnInit {
  ngOnInit(): void {
    this.getAllBookings()
    this.showCount()
    this.cdr.detectChanges()
  }
  userName: any
  constructor(private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    this.userName = localStorage.getItem('userName')
  }

  ngAfterViewInit() {

  }

  http = inject(HttpClient)
  BookingRequests: any

  getAllBookings() {
    this.http.get("https://localhost:7025/api/booking/Professional/" + this.userName).subscribe((res: any) => {
      console.log(res)
      if (res.isSuccessful) {
        this.BookingRequests = res.result
        console.log(this.BookingRequests)
        this.BookingRequests = [...this.BookingRequests].reverse();
        this.cdr.detectChanges()
      }
    })
  }

  responseObj: any = {
    responseId: 0,
    bookingId: 0,
    responseValue: false,
    responseMessage: ""
  }


  Confirm(id: any) {
    this.responseObj.bookingId = id
    console.log(this.responseObj.bookingId)
    this.responseObj.responseValue = true
    this.http.put("https://localhost:7025/api/booking/ServiceResponse", this.responseObj).subscribe((res: any) => {
      console.log(res)
      if (res.isSuccessful) {
        this.toastr.success("Confirmation Successfull")
        setTimeout(() => {
          this.BookingRequests = [];  // Clear previous bookings
          this.getAllBookings();      // Refetch the bookings
        }, 1000);

      }

    })
  }

  payment(id: any) {
    this.responseObj.bookingId = id
    console.log(this.responseObj.bookingId)
    this.responseObj.responseValue = true
    this.http.put("https://localhost:7025/api/booking/PaymentResponse", this.responseObj).subscribe((res: any) => {
      console.log(res)
      if (res.isSuccessful) {
        this.toastr.success("Confirmation Successfull")
        setTimeout(() => {
          this.BookingRequests = [];  // Clear previous bookings
          this.getAllBookings();      // Refetch the bookings
        }, 1000);

      }

    })
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

  bookingCount: any

  showCount() {
    this.http.get("https://localhost:7025/api/Summary/ProfessionalSummary/" + this.userName).subscribe((res: any) => {
      console.log(res)
      if (res.isSuccessful) {
        this.bookingCount = res.result.count
      }
    })
  }
}
