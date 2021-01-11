import { Stream } from '../../domain/stream.entity';
import { StreamDTO } from '../dto/stream.dto';

/**
 * A Stream mapper object.
 */
export class StreamMapper {
    static fromDTOtoEntity(entityDTO: StreamDTO): Stream {
        if (!entityDTO) {
            return;
        }
        const entity = new Stream();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            if( field === 'blob'){
                entity[field] = Buffer.from(entityDTO[field], 'base64');
            } else {
                entity[field] = entityDTO[field];
            }
        });
        return entity;
    }

    static fromEntityToDTO(entity: Stream): StreamDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new StreamDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            if( field === 'blob'){
                entityDTO[field] = entity[field].toString('base64');
            } else {
                entityDTO[field] = entity[field];
            }

        });

        return entityDTO;
    }
}
