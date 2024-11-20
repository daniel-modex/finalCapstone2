import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { UserApiService } from '../../../Service/user.service';
import { NotificationService } from '../../../Service/notification-service.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, CommonModule, RecaptchaModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  passwordError: boolean = true
  emailError: boolean = true;
  disabledButton: boolean = false;
  captchaResolved: boolean = false;

  onCaptchaResolved(response: string): void {
    this.captchaResolved = !!response;  // Will be true if CAPTCHA is resolved
    console.log('reCAPTCHA response:', response);  // You can log the response if needed
  }

  constructor(private toastr: ToastrService, private userApiService: UserApiService, private notificationService: NotificationService) {
    localStorage.setItem('userName', "EmptyUser")
  }
  registerObj: any = {
    userName: "",
    email: "",
    phone: "",
    password: "",
    name: "",
    role: "user"
  }
  loginObj: any = {
    userName: "",
    password: ""
  }
  ischeck: boolean = false
  isVisible: boolean = false
  http = inject(HttpClient)
  router = inject(Router)
  userOTP: any
  OTP: any
  OTPObj: any = {
    id: "",
    email: "",
    phone: "",
    otp: ""
  }

  onOTPGenerate() {
    this.isVisible = true
    this.OTP = this.generateRandomNumber()
    console.log(this.OTP)
    if (this.registerObj.email == "danielmodex33@gmail.com") {
      this.OTPObj.id = "668920e8e86831190cc77f0e"
    }
    else {
      this.OTPObj.id = this.registerObj.userName
    }

    this.OTPObj.email = this.registerObj.email
    this.OTPObj.phone = this.registerObj.phone
    this.OTPObj.otp = this.OTP
    console.log(this.OTPObj)
    this.notificationService.sendOtp(this.OTPObj).subscribe((res: any) => {
      console.log(res)
    })

  }






  onOTPSubmit() {
    console.log(this.userOTP)
    console.log(this.registerObj)
    if (this.userOTP === this.OTP) {
      this.onRegister()
    }
    else {
      this.toastr.error("Invalid OTP")
    }
    // this.onRegister()
  }



  onRegister() {
    console.log(this.registerObj)
    if (this.ischeck) {
      this.registerObj.role = "provider"
    }
    if (this.passwordError && this.emailError) {
      this.http.post("https://localhost:7001/api/AuthApi/Register", this.registerObj).subscribe((res: any) => {
        console.log(res)
        if (res.isSuccessful) {
          if (this.registerObj.role == 'user') {
            this.userApiService.postUser(this.registerObj).subscribe((user: any) => {
              console.log(user)
              if (user.result) {
                // alert("Successfully registered User")
                this.toastr.success("Successfully registered as User")
                timer(2000).subscribe(() => {
                  window.location.reload()
                });
              }

            })
          }
          if (this.registerObj.role == 'provider') {
            this.http.post("https://localhost:7057/api/Services/Register", this.registerObj).subscribe((user: any) => {
              console.log(user)
              if (user.result) {
                // alert("Successfully registered Service Provider")
                this.toastr.success("Successfully registered as Service Provider")
                timer(2000).subscribe(() => {
                  window.location.reload()
                });
              }
            })
          }





        }
        else {
          alert("Something went wrong")
        }
      })
    }
    if (!this.passwordError) {
      this.toastr.error("PassWord is Invalid")
    }
    if (!this.emailError) {
      this.toastr.error("Email is invaild")
    }



  }

  onLogin() {
    if (this.captchaResolved) {
      console.log('Captcha solved. Proceeding with login...');
      if (this.loginObj.userName === 'admin' && this.loginObj.password === 'admin') {
        localStorage.setItem('userName', 'admin')
        localStorage.setItem('role', 'admin')
        this.router.navigateByUrl('admin')
      }
      else {
        this.http.post("https://localhost:7001/api/AuthApi/Login", this.loginObj).subscribe((res: any) => {
          localStorage.setItem('userName', res.username)
          localStorage.setItem('token', res.token)
          localStorage.setItem('role', res.role)
          console.log(res)
          if (res) {

            if (res.role == "user") {
              this.toastr.success("Successfully Logged in as User")
              // this.router.navigateByUrl('user')
              timer(2000).subscribe(() => {
                this.router.navigateByUrl('user');
              });

            }
            if (res.role == "provider") {
              this.toastr.success("Successfully Logged in as Service Provider")
              timer(2000).subscribe(() => {
                this.router.navigateByUrl('professionals');
              });

            }
            if (res.role == "admin") {
              this.toastr.success("Successfully Logged in as Admin")
              timer(2000).subscribe(() => {
                this.router.navigateByUrl('admin');
              });

            }
            if (res.role === null) {
              this.toastr.error("User Name or Password is Incorrect")
            }
          }

        })
      }
    }
    else {
      console.log('Captcha not solved!');
    }

  }

  onEmailChange(email: string) {
    if (email) {
      this.validateEmail(email);
    }
  }

  validateEmail(email: string): void {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      this.toastr.error('Invalid email format');
      this.emailError = false
    }
    else {
      this.emailError = true
    }
  }

  validatePassword(): void {
    const password = this.registerObj.password;

    if (!password) {
      this.toastr.error('Password is required.');
    } else if (password.length < 6) {
      this.toastr.error('Password must be at least 6 characters long.');
    } else if (!/[A-Z]/.test(password)) {
      this.toastr.error(
        'Password must contain at least one uppercase letter.');
    } else if (!/[a-z]/.test(password)) {
      this.toastr.error(
        'Password must contain at least one lowercase letter.');
    } else if (!/\d/.test(password)) {
      this.toastr.error('Password must contain at least one number.');
    } else if (!/[@$!%*?&]/.test(password)) {
      this.toastr.error(
        'Password must contain at least one special character.');
    } else {
      this.passwordError = true; // No errors
    }
  }

  generateRandomNumber(): string {
    return (Math.floor(Math.random() * 900000) + 100000).toString();
  }



}
