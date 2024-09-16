import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
    private ninjas = [
        {
            id: 1,
            name: 'Yoshi',
            rank: 'Black Belt',
            available: true,
        },
        {
            id: 2,
            name: 'Crystal',
            rank: 'Orange Belt',
            available: false,
        },
        {
            id: 3,
            name: 'Ryu',
            rank: 'Orange Belt',
            available: true,
        },
    ];

    getNinjas(available?: boolean) {
        if (available !== undefined) {
            return this.ninjas.filter(ninja => ninja.available === available);
        }
        return this.ninjas;
    }

    getNinja(id: number) {
        const existingNinja = this.ninjas.find(ninja => ninja.id === id);
        if (existingNinja) {
            return existingNinja;
        }
        else {
            throw new Error('ninja not found.');
        }
    }

    createNinja(ninja: CreateNinjaDto) {
        this.ninjas.push({...ninja, id: this.ninjas.length + 1});
        return ninja;
    }

    updateNinja(id: number, ninja: UpdateNinjaDto) {
        this.ninjas = this.ninjas.map(ninjaItem => {        
            if (ninjaItem.id === id) {
                return {...ninjaItem, ...ninja};
            }
            return ninjaItem;
        });
    }

    removeNinja(id: number) {
        const ninjaIndex = this.ninjas.findIndex(ninja => ninja.id === id);
        if (ninjaIndex > -1) {
            this.ninjas.splice(ninjaIndex, 1);
            return true;
        }
        else {
            throw new Error('ninja not found.');
        }
    }
}
