import { Types } from "mongoose";
import dateFns from "date-fns";
import { HostingType } from "./hostingType";

export interface BookingType {
    _id?: Types.ObjectId,
    guestId: string,
    productId?: string | Types.ObjectId;
    checkin?: dateFns | Date | string | null;
    checkout?: dateFns | Date | string | null;
    numberOfGuests?: number;
    numberOfAdults?: number;
    numberOfChildren?: number;
    numberOfInfants?: number;
    numberOfPets?: number;
    client?: string;
    payment?: {
        source: string;
        orderId: string;
        payerId: string;
        paidTime: Date;
    };
}
export interface PopulateBookingType {
    _id: Types.ObjectId,
    guestId: string,
    productId: HostingType;
    checkin: dateFns | Date | null;
    checkout: dateFns | Date | null;
    numberOfGuests: number;
    numberOfAdults: number;
    numberOfChildren: number;
    numberOfInfants: number;
    numberOfPets: number;
    client?: string;
    payment?: {
        source: string;
        orderId: string;
        paidTime: Date;
    };
}