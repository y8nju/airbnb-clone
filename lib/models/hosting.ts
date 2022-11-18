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
    privacy: String,
    location: {
      state: String,
      city: String,
      street: String,
      apt: String,
      zipCode: String,
      lat: Number,
      lng: Number,
      uri: String,
      placeId: String
    },
    amenities: Array,
    floorPlan: {
        guests: Number,
        beds: Number,
        bedrooms: Number, 
        bathrooms: Number,
    },
    photos: Array
})

export default mongoose.models.Hosting as mongoose.Model<HostingType> ||
    mongoose.model<HostingType>('Hosting', hostingSchema);