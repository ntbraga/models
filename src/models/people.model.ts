import { IModel, TModel } from "../lib/model";

export interface IPeople extends IModel {

    name: string;
    email: string;
    countryCode: string;
    phone: string;

}

type TPeople = TModel<IPeople>; 

export const PeopleDefinition: TPeople = {
    name: {
        type: String,
        required: [true, 'O nome é obrigatório']
    },
    email: {
        type: String,
        required: [true, 'O E-mail é obrigatório.'],
        unique: [true, 'Só é permitida uma pessoa com este e-mail.']
    },
    countryCode: {
        type: String,
        default: function (this: TPeople) {
            return this.phone == undefined ? undefined : '+55';
        },
        required: function (this: TPeople) {
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
    }
};