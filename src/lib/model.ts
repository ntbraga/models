import { Schema, SchemaTypeOpts, SchemaType, SchemaDefinition, Document } from 'mongoose';

export type TModel<T extends IModel> = {
    [P in keyof T]?: SchemaTypeOpts<any> | Schema | SchemaType;
} & SchemaDefinition;

export interface IModel extends Document {
    _id: string,
    createdAt: Date,
    updatedAt: Date
}

export const BaseModel: TModel<IModel> = {
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}