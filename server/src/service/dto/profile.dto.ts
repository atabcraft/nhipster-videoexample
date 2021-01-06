/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { StreamDTO } from './stream.dto';

import { UserDTO } from './user.dto';

/**
 * A Profile DTO object.
 */
export class ProfileDTO extends BaseDTO {
    @ApiModelProperty({ description: 'image field' })
    image: any;

    imageContentType: string;

    @ApiModelProperty({ type: UserDTO, description: 'user relationship' })
    user: UserDTO;

    @ApiModelProperty({ type: StreamDTO, isArray: true, description: 'streams relationship' })
    streams: StreamDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
