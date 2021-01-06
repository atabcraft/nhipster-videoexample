import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamController } from '../web/rest/stream.controller';
import { StreamRepository } from '../repository/stream.repository';
import { StreamService } from '../service/stream.service';

@Module({
    imports: [TypeOrmModule.forFeature([StreamRepository])],
    controllers: [StreamController],
    providers: [StreamService],
    exports: [StreamService],
})
export class StreamModule {}
