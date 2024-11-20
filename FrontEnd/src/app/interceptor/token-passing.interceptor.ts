import { HttpInterceptorFn } from '@angular/common/http';

export const tokenPassingInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token')

  const reqClone = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })
  return next(reqClone);
};
