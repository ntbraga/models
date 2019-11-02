import { Schema } from "mongoose";
import { BaseModel } from "./model";

export const baseModel = async function(schema: Schema, options: any) {
    schema.add(BaseModel);
}