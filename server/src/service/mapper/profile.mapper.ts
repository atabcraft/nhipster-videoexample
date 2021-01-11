import { Profile } from '../../domain/profile.entity';
import { ProfileDTO } from '../dto/profile.dto';

/**
 * A Profile mapper object.
 */
export class ProfileMapper {
    static fromDTOtoEntity(entityDTO: ProfileDTO): Profile {
        if (!entityDTO) {
            return;
        }
        const entity = new Profile();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
          if( field === 'image'){
            entity[field] = Buffer.from(entityDTO[field], 'base64');
          } else {
            entity[field] = entityDTO[field];
          }
      });
        return entity;
    }

    static fromEntityToDTO(entity: Profile): ProfileDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new ProfileDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
          if( field === 'image'){
            entityDTO[field] = entity[field].toString('base64');
          } else {
            entityDTO[field] = entity[field];
          }
        });

        return entityDTO;
    }
}
