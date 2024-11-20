import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)

  const user = localStorage.getItem('userName');
  const userRole = localStorage.getItem('role');
  const requestedUrl = route.url.join('/');

  if (!user || user==='EmptyUser') {
    router.navigateByUrl('register')
    return false
  }

  if (requestedUrl.includes('admin') && userRole !== 'admin' && userRole === 'user') {
    // If the user is not an admin and tries to access the admin dashboard
    router.navigate(['/user']); // Redirect to user dashboard
    return false;
  }

  if (requestedUrl.includes('admin') && userRole !== 'admin' && userRole === 'provider') {
    // If the user is not an admin and tries to access the admin dashboard
    router.navigate(['/professionals']); // Redirect to user dashboard
    return false;
  }

  if (requestedUrl.includes('professionals') && userRole !== 'provider' && userRole === 'admin') {
    // If the user is not an admin and tries to access the admin dashboard
    router.navigate(['/admin']); // Redirect to user dashboard
    return false;
  }

  if (requestedUrl.includes('professionals') && userRole !== 'provider' && userRole === 'user') {
    // If the user is not an admin and tries to access the admin dashboard
    router.navigate(['/user']); // Redirect to user dashboard
    return false;
  }

  if (requestedUrl.includes('user') && userRole !== 'user' && userRole === 'provider') {
    // If the user is not an admin and tries to access the admin dashboard
    router.navigate(['/professionals']); // Redirect to user dashboard
    return false;
  }

  if (requestedUrl.includes('user') && userRole !== 'user' && userRole === 'admin') {
    // If the user is not an admin and tries to access the admin dashboard
    router.navigate(['/admin']); // Redirect to user dashboard
    return false;
  }
  return true;
};
