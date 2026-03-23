import { UserRepository } from "../../domain/repository/UserRepository";
import { User } from "../../domain/User";
import { AM } from "../../domain/valueObjects/AM";
import { AP } from "../../domain/valueObjects/AP";
// import { date_create } from "../../domain/valueObjects/date_create";
// import { date_modify } from "../../domain/valueObjects/date_modify";
import { departamento } from "../../domain/valueObjects/departamento";
import { Email } from "../../domain/valueObjects/Email";
import { Idlocationkey } from "../../domain/valueObjects/Idlocationkey";
import { Idoperationmenu } from "../../domain/valueObjects/Idoperationmenu";
import { Idpositionuser } from "../../domain/valueObjects/Idpositionuser";
// import { Idstatususer } from "../../domain/valueObjects/Idstatususer";
import { Iduser } from "../../domain/valueObjects/Iduser";
import { Idusertype } from "../../domain/valueObjects/Idusertype";
import { Name } from "../../domain/valueObjects/Name";
import { PasswordHash } from "../../domain/valueObjects/PasswordHash";
import { puesto } from "../../domain/valueObjects/puesto";
import { user_create } from "../../domain/valueObjects/user_create";
// import { user_modify } from "../../domain/valueObjects/user_modify";

export class setUsers {
  constructor(private repository: UserRepository) {} 

  async run(
    id: number,
    name: string,
    ap: string,
    am: string,
    email: string,
    password: string,
    Puesto: string,
    depart: string,
    locationkey: number,
    statusUser: number,
    userType: number,
    positionUser: number,
    operationMenu: number,
    userCreate: number,
  ): Promise<void> {
    const user = new User(
     new Iduser(id),
     new Name(name),
     new AP(ap),
     new AM(am),
     new Email(email),
     new PasswordHash(password),
     new puesto(Puesto),
     new departamento(depart),
     new Idlocationkey(locationkey),
    //  new Idstatususer(statusUser),
     new Idusertype(userType),
     new Idpositionuser(positionUser),
     new Idoperationmenu(operationMenu),
     new user_create(userCreate),
    );

    return this.repository.setUsers(user);
  }
}