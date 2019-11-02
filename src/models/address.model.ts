import { IModel, TModel } from "../lib/model";
import { Schema, model } from "mongoose";

export interface IAddress extends IModel {

    street: string,
    number: string,
    district: string,
    city: string,
    country: string,
    complement: string,
    zipcode: string

}

type TAddress = TModel<IAddress>;

const IAddress: TAddress = {

    street: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    complement: {
        type: String
    },
    zipcode: {
        type: String,
        required: true
    }

}

const UserSchema: Schema<IAddress> = new Schema<IAddress>(IAddress, { timestamps: { createdAt: true, updatedAt: true }, versionKey: false });

export default model<IAddress>('address', UserSchema);