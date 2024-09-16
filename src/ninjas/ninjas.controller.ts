import { Body, Controller, Delete, Get, NotFoundException, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
@UseGuards(BeltGuard)
export class NinjasController {
    constructor(private readonly ninjasService: NinjasService) {}
    @Get()
    getNinjas(@Query('available', ParseBoolPipe) available: boolean) {
        return this.ninjasService.getNinjas(available);
    }

    @Get(":id")
    getNinja(@Param('id', ParseIntPipe) id: number) {
       try {
        return this.ninjasService.getNinja(id);
       } catch (error) {
        throw new NotFoundException(error.message);
       }
    }

    @Post()
    createNinja(@Body(new ValidationPipe()) body: CreateNinjaDto) {
        return this.ninjasService.createNinja(body);
    }

    @Put(":id")
    updateNinja(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateNinjaDto) {
        return this.ninjasService.updateNinja(id, body);
    }

    @Delete(":id")
    removeNinja(@Param('id', ParseIntPipe) id: number) {
        return this.ninjasService.removeNinja(id);
    }
}
