import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProfileDTO } from '../service/dto/profile.dto';
import { ProfileMapper } from '../service/mapper/profile.mapper';
import { ProfileRepository } from '../repository/profile.repository';

const relationshipNames = [];
relationshipNames.push('streams');

@Injectable()
export class ProfileService {
    logger = new Logger('ProfileService');

    constructor(@InjectRepository(ProfileRepository) private profileRepository: ProfileRepository) {}

    async findById(id: string): Promise<ProfileDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.profileRepository.findOne(id, options);
        return ProfileMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<ProfileDTO>): Promise<ProfileDTO | undefined> {
        const result = await this.profileRepository.findOne(options);
        return ProfileMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ProfileDTO>): Promise<[ProfileDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.profileRepository.findAndCount(options);
        const profileDTO: ProfileDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(profile => profileDTO.push(ProfileMapper.fromEntityToDTO(profile)));
            resultList[0] = profileDTO;
        }
        return resultList;
    }

    async save(profileDTO: ProfileDTO): Promise<ProfileDTO | undefined> {
        const entity = ProfileMapper.fromDTOtoEntity(profileDTO);
        const result = await this.profileRepository.save(entity);
        return ProfileMapper.fromEntityToDTO(result);
    }

    async update(profileDTO: ProfileDTO): Promise<ProfileDTO | undefined> {
        const entity = ProfileMapper.fromDTOtoEntity(profileDTO);
        const result = await this.profileRepository.save(entity);
        return ProfileMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.profileRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
