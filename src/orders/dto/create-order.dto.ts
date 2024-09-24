import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  product: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;
}
