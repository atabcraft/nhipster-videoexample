import { IUser } from 'app/core/user/user.model';
import { IStream } from 'app/shared/model/stream.model';

export interface IProfile {
  id?: number;
  imageContentType?: string;
  image?: any;
  user?: IUser;
  streams?: IStream[];
}

export class Profile implements IProfile {
  constructor(public id?: number, public imageContentType?: string, public image?: any, public user?: IUser, public streams?: IStream[]) {}
}
