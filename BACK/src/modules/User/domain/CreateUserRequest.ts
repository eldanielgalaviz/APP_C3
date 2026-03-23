import { 
  IsNotEmpty, 
  IsString, 
  MinLength, 
  MaxLength, 
  IsEmail,
  IsOptional,
  IsInt
} from 'class-validator';

export class CreateUserRequest {

  @IsInt({ message: 'Iduser debe ser un número entero' })
  @IsNotEmpty({ message: 'Iduser es obligatorio' })
  Iduser!: number;

  @IsNotEmpty({ message: 'El nombre no puede estar en blanco' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(150, { message: 'El nombre no puede superar los 150 caracteres' })
  Name: string = '';

  @IsNotEmpty({ message: 'El apellido paterno no puede estar en blanco' })
  @IsString()
  @MinLength(2, { message: 'El apellido paterno debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El apellido paterno no puede superar los 100 caracteres' })
  AP: string = '';

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'El apellido materno debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El apellido materno no puede superar los 100 caracteres' })
  AM?: string;

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @MaxLength(255, { message: 'El correo no puede superar los 255 caracteres' })
  Email: string = '';

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  PasswordHash: string = '';

  @IsNotEmpty({ message: 'El puesto es obligatorio' })
  @IsString()
  @MinLength(2, { message: 'El puesto debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El puesto no puede superar los 100 caracteres' })
  puesto: string = '';

  @IsNotEmpty({ message: 'El departamento es obligatorio' })
  @IsString()
  @MinLength(2, { message: 'El departamento debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El departamento no puede superar los 100 caracteres' })
  departamento: string = '';

  // @IsInt({ message: 'Idlocationkey debe ser un número entero' })
  // @IsNotEmpty({ message: 'Idlocationkey es obligatorio' })
  Idlocationkey: number = 0;

  // @IsInt()
  // @IsNotEmpty({ message: 'Idstatususer es obligatorio' })
  Idstatususer: number = 0;

  // @IsInt()
  // @IsNotEmpty({ message: 'Idusertype es obligatorio' })
  Idusertype: number = 0;

  // @IsInt()
  // @IsNotEmpty({ message: 'Idpositionuser es obligatorio' })
  Idpositionuser: number = 0;

  // @IsInt()
  // @IsNotEmpty({ message: 'Idoperationmenu es obligatorio' })
  // Idoperationmenu: number = 0;

  @IsOptional()
  @IsString()
  user_create?: string;
}