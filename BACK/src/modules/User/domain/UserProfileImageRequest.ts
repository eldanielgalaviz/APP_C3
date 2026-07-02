import { 
  IsNotEmpty, 
  IsString, 
  MinLength, 
  MaxLength, 
  IsInt
} from 'class-validator';

export class UserProfileImageRequest {
    @IsInt({ message: 'IdUser debe ser un número entero' })
    p_IdUser!: number;

    @IsNotEmpty({ message: 'La URL de la imagen no puede estar en blanco' })
    @IsString({ message: 'La URL de la imagen debe ser una cadena de texto' })
    @MinLength(5, { message: 'La URL de la imagen debe tener al menos 5 caracteres' })
    @MaxLength(255, { message: 'La URL de la imagen no puede superar los 255 caracteres' })
    p_url_img!: string;
}