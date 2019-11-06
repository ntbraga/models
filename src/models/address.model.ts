import { IModel, TModel } from "../lib/model";
import { Schema } from "mongoose";

export interface IAddress extends IModel {

    address: string,
    number: string,
    district: string,
    city: string,
    country: string,
    complement: string,
    uf: string,
    zipcode: string
    people: string | Schema.Types.ObjectId,
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

    address: {
        type: String,
        required: [true, 'É necessário preencher a rua']
    },
    number: {
        type: String
    },
    district: {
        type: String,
        required: [true, 'É necessário preencher o bairro']
    },
    city: {
        type: String,
        required: [true, 'É necessário preencher a cidade']
    },
    country: {
        type: String,
        required: [true, 'É necessário preencher o país']
    },
    complement: {
        type: String
    },
    uf: {
        type: String,
        required: true,
        maxlength: 2,
        minlength: 2
    },
    zipcode: {
        type: String,
        required: [true, 'É necessário preencher o cep'],
        set: (value: string) => {
            return (value || '').replace(/[. ()-/_]/g, '');
        },
        get: (value: string) => {
            return (value || '').replace(/(\d{5})(\d{3})/, '$1-$2'); 
        }
    },
    people: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: [true, 'O endereço deve pertencer a uma pessoa.']
    }

}