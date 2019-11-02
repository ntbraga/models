import { IModel, TModel } from "../lib/model";
import { Schema, model } from "mongoose";

export interface IUser extends IModel {

    user: string;
    email: string;
    countryCode: string;
    phone: string;
    password: string;
    name: string;

}

type TUser = TModel<IUser>;

const IUser: TUser = {
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
}

const UserSchema: Schema<IUser> = new Schema<IUser>(IUser, { timestamps: { createdAt: true, updatedAt: true }, versionKey: false });

export default model<IUser>('user', UserSchema);