import { Contains, IsBoolean, IsEnum, MinLength } from "class-validator";

export class CreateNinjaDto {
    @MinLength(3)
    name: string;

    @Contains('Belt', {message: 'Invalid rank'})
    rank: string;

    @IsBoolean({message: 'available must be a boolean value'})
    available: boolean;
}