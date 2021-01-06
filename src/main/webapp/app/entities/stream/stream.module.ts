import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VideoexampleSharedModule } from 'app/shared/shared.module';
import { StreamComponent } from './stream.component';
import { StreamDetailComponent } from './stream-detail.component';
import { StreamUpdateComponent } from './stream-update.component';
import { StreamDeleteDialogComponent } from './stream-delete-dialog.component';
import { streamRoute } from './stream.route';

@NgModule({
  imports: [VideoexampleSharedModule, RouterModule.forChild(streamRoute)],
  declarations: [StreamComponent, StreamDetailComponent, StreamUpdateComponent, StreamDeleteDialogComponent],
  entryComponents: [StreamDeleteDialogComponent]
})
export class VideoexampleStreamModule {}
