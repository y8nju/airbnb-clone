import { Types } from "mongoose";

export interface HostAddressType {
    uri: string;
    placeId?: string;
    state?: string;
    city?: string;
    street?: string;
    apt?: string;
    zipCode?: string;
    lat?: number;
    lng?: number;
}
export interface FloorPlanType {
    guests: number,
    beds: number,
    bedrooms?: number, 
    bathrooms: number,
}
export interface HostingType {
    _id?: Types.ObjectId,
    hostname?: string,
    createdAt?: Date,
    group?: string, 
    property?: string, 
    privacy?: string,
    location?: HostAddressType,
    amenities?: string[],
    floorPlan?: FloorPlanType,
    photos?: string[]
}
