import { IModel, TModel } from "../lib/model";
import { SHA3, enc as Encoders } from 'crypto-js';

export interface IUser extends IModel {

    user: string;
    email: string;
    countryCode: string;
    phone: string;
    password: string;
    name: string;

}

type TUser = TModel<IUser>;

export const encodePassword = (value: string) => {
    return SHA3(value).toString(Encoders.Base64);
} 

export const UserDefinition: TUser = {
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        default: function (this: TUser) {
            return this.phone == undefined ? undefined : '+55';
        },
        required: function (this: TUser) {
            return this.phone != undefined;
        }
    },
    phone: {
        type: String,
        set: (value: string) => {
            return (value || '').replace(/[. ()-/_]/g, '');
        },
        get: (value: string) => {
            return (value || '').replace(/[. ()-/_]/g, '').replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
        }
    },
    password: {
        type: String,
        required: true,
        set: encodePassword
    },
    name: {
        type: String,
        required: true
    }
};