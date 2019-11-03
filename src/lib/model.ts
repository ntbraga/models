import { Schema, SchemaTypeOpts, SchemaType, SchemaDefinition, Document, Types } from 'mongoose';

export type TModel<T extends IModel> = {
    [P in keyof T]?: SchemaTypeOpts<any> | Schema | SchemaType;
} & SchemaDefinition;

export interface IModel extends Document {
    _id: Types.ObjectId,
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