/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Stream } from './stream.entity';

import { User } from './user.entity';

/**
 * A Profile.
 */
@Entity('profile')
export class Profile extends BaseEntity {
    @Column({ type: 'blob', name: 'image' })
    image: any;

    @Column({ name: 'image_content_type' })
    imageContentType: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    @ManyToMany(type => Stream)
    @JoinTable({
        name: 'profile_streams',
        joinColumn: { name: 'profile_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'streams_id', referencedColumnName: 'id' },
    })
    streams: Stream[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
