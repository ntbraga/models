export { IUser as User, UserDefinition, encodePassword } from './models/user.model';
export { IPeople as People, PeopleDefinition } from './models/people.model';
export { IAddress as Address, AddressDefinition } from './models/address.model';
export { baseModel as baseModelPlugin, DefaultSchemaOptions } from './lib';

export interface LoginRequest {
    user: string;
    password: string;
}