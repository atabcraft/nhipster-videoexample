import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IStream, Stream } from 'app/shared/model/stream.model';
import { StreamService } from './stream.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-stream-update',
  templateUrl: './stream-update.component.html'
})
export class StreamUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    blob: [],
    blobContentType: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected streamService: StreamService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stream }) => {
      this.updateForm(stream);
    });
  }

  updateForm(stream: IStream): void {
    this.editForm.patchValue({
      id: stream.id,
      name: stream.name,
      blob: stream.blob,
      blobContentType: stream.blobContentType
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('videoexampleApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const stream = this.createFromForm();
    if (stream.id !== undefined) {
      this.subscribeToSaveResponse(this.streamService.update(stream));
    } else {
      this.subscribeToSaveResponse(this.streamService.create(stream));
    }
  }

  private createFromForm(): IStream {
    return {
      ...new Stream(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      blobContentType: this.editForm.get(['blobContentType'])!.value,
      blob: this.editForm.get(['blob'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStream>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
