import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStream } from 'app/shared/model/stream.model';
import { StreamService } from './stream.service';

@Component({
  templateUrl: './stream-delete-dialog.component.html'
})
export class StreamDeleteDialogComponent {
  stream?: IStream;

  constructor(protected streamService: StreamService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.streamService.delete(id).subscribe(() => {
      this.eventManager.broadcast('streamListModification');
      this.activeModal.close();
    });
  }
}
