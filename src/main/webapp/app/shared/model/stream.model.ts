import { IProfile } from 'app/shared/model/profile.model';

export interface IStream {
  id?: number;
  name?: string;
  blobContentType?: string;
  blob?: any;
  profiles?: IProfile[];
}

export class Stream implements IStream {
  constructor(public id?: number, public name?: string, public blobContentType?: string, public blob?: any, public profiles?: IProfile[]) {}
}
