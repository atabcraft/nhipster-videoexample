import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { StreamDTO } from '../service/dto/stream.dto';
import { StreamMapper } from '../service/mapper/stream.mapper';
import { StreamRepository } from '../repository/stream.repository';

const relationshipNames = [];

@Injectable()
export class StreamService {
    logger = new Logger('StreamService');

    constructor(@InjectRepository(StreamRepository) private streamRepository: StreamRepository) {}

    async findById(id: string): Promise<StreamDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.streamRepository.findOne(id, options);
        return StreamMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<StreamDTO>): Promise<StreamDTO | undefined> {
        const result = await this.streamRepository.findOne(options);
        return StreamMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<StreamDTO>): Promise<[StreamDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.streamRepository.findAndCount(options);
        const streamDTO: StreamDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(stream => streamDTO.push(StreamMapper.fromEntityToDTO(stream)));
            resultList[0] = streamDTO;
        }
        return resultList;
    }

    async save(streamDTO: StreamDTO): Promise<StreamDTO | undefined> {
        const entity = StreamMapper.fromDTOtoEntity(streamDTO);
        const result = await this.streamRepository.save(entity);
        return StreamMapper.fromEntityToDTO(result);
    }

    async update(streamDTO: StreamDTO): Promise<StreamDTO | undefined> {
        const entity = StreamMapper.fromDTOtoEntity(streamDTO);
        const result = await this.streamRepository.save(entity);
        return StreamMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.streamRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
