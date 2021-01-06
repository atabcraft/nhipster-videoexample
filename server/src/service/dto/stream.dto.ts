/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { ProfileDTO } from './profile.dto';

/**
 * A Stream DTO object.
 */
export class StreamDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ description: 'blob field', required: false })
    blob: any;

    blobContentType: string;

    @ApiModelProperty({ type: ProfileDTO, isArray: true, description: 'profiles relationship' })
    profiles: ProfileDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
