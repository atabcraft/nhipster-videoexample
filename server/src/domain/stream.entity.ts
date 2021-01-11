/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Profile } from './profile.entity';

/**
 * A Stream.
 */
@Entity('stream')
export class Stream extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @Column({ type: 'bytea', name: 'blob', nullable: true })
    blob: Buffer;

    @Column({ name: 'blob_content_type', nullable: true })
    blobContentType: string;

    @ManyToMany(type => Profile)
    profiles: Profile[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
