import { Types } from "mongoose";
import dateFns from "date-fns";
import { HostingType } from "./hostingType";

export interface BookingType {
    _id?: Types.ObjectId,
    productId?: string | Types.ObjectId;
    checkin?: dateFns | Date | null;
    checkout?: dateFns | Date | null;
    numberOfGuests?: number;
    numberOfAdults?: number;
    numberOfChildren?: number;
    numberOfInfants?: number;
    numberOfPets?: number;
}
export interface PopulateBookingType {
    _id?: Types.ObjectId,
    productId?: HostingType;
    checkin?: dateFns | Date | null;
    checkout?: dateFns | Date | null;
    numberOfGuests?: number;
    numberOfAdults?: number;
    numberOfChildren?: number;
    numberOfInfants?: number;
    numberOfPets?: number;
}