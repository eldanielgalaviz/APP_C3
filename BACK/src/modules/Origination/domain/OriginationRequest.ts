import { 
  IsNotEmpty, 
  IsString, 
  MinLength, 
  MaxLength, 
  IsEmail,
  IsOptional,
  IsInt
} from 'class-validator';

export class OriginationRequest {

    @IsInt({ message: 'Id_prospect_contact debe ser un número entero' })
    @IsNotEmpty({ message: 'Id_prospect_contact es obligatorio' })
    Id_prospect_contact!: number;

    @IsInt({ message: 'projects_id debe ser un número entero' })
    @IsNotEmpty({ message: 'Id_prospect_contact es obligatorio' })
    projects_id!: number;

    @IsNotEmpty({ message: 'El prospect_contact_name no puede estar en blanco' })
    @IsString()
      @MinLength(3, { message: 'El prospect_contact_name debe tener al menos 3 caracteres' })
    @MaxLength(250, { message: 'El prospect_contact_name no puede superar los 250 caracteres' })
    prospect_contact_name!: string;

    @IsNotEmpty({ message: 'El prospect_contact_role no puede estar en blanco' })
    @IsString()
    @MinLength(3, { message: 'El prospect_contact_role debe tener al menos 3 caracteres' })
    @MaxLength(250, { message: 'El prospect_contact_role no puede superar los 250 caracteres' })
    prospect_contact_role!: string;

    @IsNotEmpty({ message: 'El prospect_contact_telephone no puede estar en blanco' })
    @IsString()
    @MinLength(10, { message: 'El prospect_contact_telephone debe tener al menos 10 caracteres' })
    @MaxLength(15, { message: 'El prospect_contact_telephone no puede superar los 15 caracteres' })
    prospect_contact_telephone!: string;
    
    @IsNotEmpty({ message: 'El prospect_contact_email no puede estar en blanco' })
    @IsString()
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    @MinLength(8, { message: 'El prospect_contact_email debe tener al menos 8 caracteres' })
    @MaxLength(55, { message: 'El prospect_contact_email no puede superar los 55 caracteres' })
    prospect_contact_email!: string;

    @IsInt({ message: 'postal_code_id debe ser un número entero' })
    @IsNotEmpty({ message: 'postal_code_id es obligatorio' })
    postal_code_id!: number;

    @IsInt({ message: 'neighborhood_id debe ser un número entero' })
    @IsNotEmpty({ message: 'neighborhood_id es obligatorio' })
    neighborhood_id!: number;

    @IsInt({ message: 'municipalities_id debe ser un número entero' })
    @IsNotEmpty({ message: 'municipalities_id es obligatorio' })
    municipalities_id!: number;

    @IsNotEmpty({ message: 'El prospect_contact_telephone no puede estar en blanco' })
    @MaxLength(250, { message: 'El prospect_contact_telephone no puede superar los 250 caracteres' })
    street!: string;

    @IsOptional()
    exterior_number!: number;

    @IsOptional()
    interior_number!: number;

    @IsInt({ message: 'program_id debe ser un número entero' })
    @IsNotEmpty({ message: 'program_id es obligatorio' })
    program_id!: number;

    @IsInt({ message: 'prospect_priority_id debe ser un número entero' })
    @IsNotEmpty({ message: 'prospect_priority_id es obligatorio' })
    prospect_priority_id!: number;

    @IsInt({ message: 'project_alive_id debe ser un número entero' })
    @IsNotEmpty({ message: 'project_alive_id es obligatorio' })
    project_alive_id!: number;
}