import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from '../web/rest/profile.controller';
import { ProfileRepository } from '../repository/profile.repository';
import { ProfileService } from '../service/profile.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProfileRepository])],
    controllers: [ProfileController],
    providers: [ProfileService],
    exports: [ProfileService],
})
export class ProfileModule {}
