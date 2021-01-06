import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { VideoexampleTestModule } from '../../../test.module';
import { StreamUpdateComponent } from 'app/entities/stream/stream-update.component';
import { StreamService } from 'app/entities/stream/stream.service';
import { Stream } from 'app/shared/model/stream.model';

describe('Component Tests', () => {
  describe('Stream Management Update Component', () => {
    let comp: StreamUpdateComponent;
    let fixture: ComponentFixture<StreamUpdateComponent>;
    let service: StreamService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VideoexampleTestModule],
        declarations: [StreamUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(StreamUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StreamUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StreamService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Stream(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Stream();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
