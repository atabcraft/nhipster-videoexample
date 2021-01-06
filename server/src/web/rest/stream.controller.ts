import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { StreamDTO } from '../../service/dto/stream.dto';
import { StreamService } from '../../service/stream.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/streams')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('streams')
export class StreamController {
    logger = new Logger('StreamController');

    constructor(private readonly streamService: StreamService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: StreamDTO,
    })
    async getAll(@Req() req: Request): Promise<StreamDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.streamService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: StreamDTO,
    })
    async getOne(@Param('id') id: string): Promise<StreamDTO> {
        return await this.streamService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create stream' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: StreamDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() streamDTO: StreamDTO): Promise<StreamDTO> {
        const created = await this.streamService.save(streamDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Stream', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update stream' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: StreamDTO,
    })
    async put(@Req() req: Request, @Body() streamDTO: StreamDTO): Promise<StreamDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Stream', streamDTO.id);
        return await this.streamService.update(streamDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete stream' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Stream', id);
        return await this.streamService.deleteById(id);
    }
}
