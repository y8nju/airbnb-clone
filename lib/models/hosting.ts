import mongoose from "mongoose";
import { HostingType } from "../../interface/hostingType";

const hostingSchema = new mongoose.Schema<HostingType>({
    hostname: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    group: String, 
    property: String, 
    privacy: String
})

export default mongoose.models.Hosting as mongoose.Model<HostingType> ||
    mongoose.model<HostingType>('Hosting', hostingSchema);