import { IModel, TModel } from "../lib/model";

export interface IUser extends IModel {

    user: string;
    email: string;
    countryCode: string;
    phone: string;
    password: string;
    name: string;

}

type TUser = TModel<IUser>;

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
        default: function(this: TUser) {
            return this.phone == undefined ? undefined : '+55';
        },
        required: function (this: TUser) {
            return this.phone != undefined;
        }
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
};