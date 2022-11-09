import mongoose from "mongoose";
import PropertyType from "../../interface/propertyType";

const propertySchema = new mongoose.Schema<PropertyType>({
    group: String, 
    image: String,
    types: Array
});

export default mongoose.models.Property as mongoose.Model<PropertyType> ||
    mongoose.model<PropertyType>('Property', propertySchema);