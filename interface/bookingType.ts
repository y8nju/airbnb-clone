import { Types } from "mongoose";

export interface BookingType {
    productId?: string | Types.ObjectId;
    checkin?: dateFns | Date | null;
    checkout?: dateFns | Date | null;
    numberOfGuests?: number;
    numberOfAdults?: number;
    numberOfInfants?: number;
    numberOfChildren?: number;
    numberOfPets?: number;
}