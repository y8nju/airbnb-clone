import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { BookingType } from "../../../interface/bookingType";
import dbConnect from "../../../lib/dbConnect";
import Booking from "../../../lib/models/booking";

export default async function handler (req:NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const token = await getToken({req});
    const doc = req.body as BookingType;
    const {checkin, checkout} = doc;
    console.log('mongoDoc', doc)
    const checkinYear = String(checkin).split('.')[0].trim();
    const checkinMonth = ('0' + String(checkin).split('.')[1].trim()).slice(-2);
    const checkinDate = ('0' + String(checkin).split('.')[2].trim()).slice(-2);
    const checkoutYear = String(checkout).split('.')[0].trim();
    const checkoutMonth = ('0' + String(checkout).split('.')[1].trim()).slice(-2);
    const checkoutDate = ('0' + String(checkout).split('.')[2].trim()).slice(-2);
    const newDoc = {
        ...doc,
        checkin: new Date(`${checkinYear}-${checkinMonth}-${checkinDate}`),
        checkout: new Date(`${checkoutYear}-${checkoutMonth}-${checkoutDate}`)
    }
    console.log(newDoc)
    let resultItem;
    if(req.method !== "POST") {
        return res.status(405).json({result: false, message: '요청을 처리할 수 없습니다'})
    }
    try {
        if(newDoc._id) {
            resultItem = await Booking.findByIdAndUpdate(doc._id, newDoc, {
                returnDocument: "after",
            });
            console.log(resultItem);
        } else {
            resultItem = await Booking.create(newDoc);
        }
        return res.status(200).json({result: true, data: resultItem});
    } catch(e) {
        return res.status(400).json({result:false, message: String(e)})
    }
}