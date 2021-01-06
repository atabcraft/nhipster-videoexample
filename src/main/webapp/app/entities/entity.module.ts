import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.VideoexampleProfileModule)
      },
      {
        path: 'stream',
        loadChildren: () => import('./stream/stream.module').then(m => m.VideoexampleStreamModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class VideoexampleEntityModule {}
