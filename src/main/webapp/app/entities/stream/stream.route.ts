import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IStream, Stream } from 'app/shared/model/stream.model';
import { StreamService } from './stream.service';
import { StreamComponent } from './stream.component';
import { StreamDetailComponent } from './stream-detail.component';
import { StreamUpdateComponent } from './stream-update.component';

@Injectable({ providedIn: 'root' })
export class StreamResolve implements Resolve<IStream> {
  constructor(private service: StreamService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStream> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((stream: HttpResponse<Stream>) => {
          if (stream.body) {
            return of(stream.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Stream());
  }
}

export const streamRoute: Routes = [
  {
    path: '',
    component: StreamComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'videoexampleApp.stream.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StreamDetailComponent,
    resolve: {
      stream: StreamResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'videoexampleApp.stream.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StreamUpdateComponent,
    resolve: {
      stream: StreamResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'videoexampleApp.stream.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StreamUpdateComponent,
    resolve: {
      stream: StreamResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'videoexampleApp.stream.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
