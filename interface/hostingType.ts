import { Types } from "mongoose";

export interface HostingType {
    _id?: Types.ObjectId,
    hostname?: string,
    createdAt?: Date,
    group?: string, 
    property?: string, 
    privacy?: string
}