import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { tokenPassingInterceptor } from './interceptor/token-passing.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
  provideRouter(routes),
  provideHttpClient(withInterceptors([tokenPassingInterceptor])),
  provideToastr({
    timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true
  }),
  provideAnimations()]
};
