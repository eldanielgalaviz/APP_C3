import { AM } from "./valueObjects/AM";
import { AP } from "./valueObjects/AP";
import { date_create } from "./valueObjects/date_create";
import { date_modify } from "./valueObjects/date_modify";
import { departamento } from "./valueObjects/departamento";
import { Email } from "./valueObjects/Email";
import { Idlocationkey } from "./valueObjects/Idlocationkey";
import { Idoperationmenu } from "./valueObjects/Idoperationmenu";
import { Idpositionuser } from "./valueObjects/Idpositionuser";
import { Idstatususer } from "./valueObjects/Idstatususer";
import { Iduser } from "./valueObjects/Iduser";
import { Idusertype } from "./valueObjects/Idusertype";
import { Name } from "./valueObjects/Name";
import { PasswordHash } from "./valueObjects/PasswordHash";
import { puesto } from "./valueObjects/puesto";
import { user_create } from "./valueObjects/user_create";
import { user_modify } from "./valueObjects/user_modify"; 

export class User {
    Iduser: Iduser;
    Name: Name;
    AP: AP;
    AM: AM;
    Email: Email;
    PasswordHash: PasswordHash;
    puesto: puesto;
    departamento: departamento;
    Idlocationkey: Idlocationkey;
    // Idstatususer: Idstatususer;
    Idusertype: Idusertype;
    Idpositionuser: Idpositionuser;
    Idoperationmenu: Idoperationmenu;
    user_create: user_create;
    
    constructor(
        Iduser: Iduser,
        Name: Name,
        AP: AP,
        AM: AM,
        Email: Email,
        PasswordHash: PasswordHash,
        puesto: puesto,
        departamento: departamento,
        Idlocationkey: Idlocationkey,
        // Idstatususer: Idstatususer,
        Idusertype: Idusertype,
        Idpositionuser: Idpositionuser,
        Idoperationmenu: Idoperationmenu,
        user_create: user_create,
    ) {
        this.Iduser = Iduser;
        this.Name = Name;
        this.AP = AP;
        this.AM = AM;
        this.Email = Email;
        this.PasswordHash = PasswordHash;
        this.puesto = puesto;
        this.departamento = departamento;
        this.Idlocationkey = Idlocationkey;
        // this.Idstatususer = Idstatususer;
        this.Idusertype = Idusertype;
        this.Idpositionuser = Idpositionuser;
        this.Idoperationmenu = Idoperationmenu;
        this.user_create = user_create;
    }

    public mapToPrimitives(){
        return {
            Iduser: this.Iduser,
            Name: this.Name,
            AP: this.AP,
            AM: this.AM,
            Email: this.Email,
            PasswordHash: this.PasswordHash,
            puesto: this.puesto,
            departamento: this.departamento,
            Idlocationkey: this.Idlocationkey,
            // Idstatususer: this.Idstatususer,
            Idusertype: this.Idusertype,
            Idpositionuser: this.Idpositionuser,
            Idoperationmenu: this.Idoperationmenu,
            user_create: this.user_create,
        }
    }
}