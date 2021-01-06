import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStream } from 'app/shared/model/stream.model';

type EntityResponseType = HttpResponse<IStream>;
type EntityArrayResponseType = HttpResponse<IStream[]>;

@Injectable({ providedIn: 'root' })
export class StreamService {
  public resourceUrl = SERVER_API_URL + 'api/streams';

  constructor(protected http: HttpClient) {}

  create(stream: IStream): Observable<EntityResponseType> {
    return this.http.post<IStream>(this.resourceUrl, stream, { observe: 'response' });
  }

  update(stream: IStream): Observable<EntityResponseType> {
    return this.http.put<IStream>(this.resourceUrl, stream, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStream>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStream[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
