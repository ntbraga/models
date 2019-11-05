import { IModel, TModel } from "../lib/model";
import { Schema } from "mongoose";

export interface IAddress extends IModel {

    street: string,
    number: string,
    district: string,
    city: string,
    country: string,
    complement: string,
    zipcode: string
    user: Schema.Types.ObjectId,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }

}

type TAddress = TModel<IAddress>;

export const AddressDefinition: TAddress = {

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
        required: true,
        set: (value: string) => {
            return (value || '').replace(/[. ()-/_]/g, '');
        },
        get: (value: string) => {
            return (value || '').replace(/(\d{5})(\d{3})/, '$1-$2'); 
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: true
    }

}