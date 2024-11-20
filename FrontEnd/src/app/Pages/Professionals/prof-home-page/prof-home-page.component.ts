import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProfProfilePageComponent } from "../prof-profile-page/prof-profile-page.component";
import { RequestPageComponent } from "../request-page/request-page.component";

@Component({
  selector: 'app-prof-home-page',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ProfProfilePageComponent, RequestPageComponent],
  templateUrl: './prof-home-page.component.html',
  styleUrl: './prof-home-page.component.css'
})
export class ProfHomePageComponent implements OnInit {
profileName:any
  router = inject(Router)
ngOnInit(): void {
  this.profileName = localStorage.getItem('userName')
}


onLogOut(){
  localStorage.clear()
  this.router.navigateByUrl('register')
}
}
