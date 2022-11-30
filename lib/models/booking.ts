import mongoose from "mongoose";
import { BookingType } from "../../interface/bookingType";

const bookingSchema = new mongoose.Schema<BookingType>({
    guestId: String,
    productId: {
        type: mongoose.SchemaTypes.ObjectId,
		ref: 'Hosting',
    },
    checkin: Date,
    checkout: Date,
    numberOfGuests: Number,
    numberOfAdults: Number,
    numberOfInfants: Number,
    numberOfChildren: Number,
    numberOfPets: Number,
    payment: {
        source: String,
        orderId: String,
        payerId: String,
        paidTime: Date
    }

    // disabledBookingDate 다 따로 받기( checkout 날짜 빼기)
})

export default mongoose.models.Booking as mongoose.Model<BookingType> ||
    mongoose.model<BookingType>('Booking', bookingSchema);