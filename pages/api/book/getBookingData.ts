import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Booking from "../../../lib/models/booking";

export default async function handler (req:NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    let datas;
    if(Object.keys(req.query).includes('id')) {
        datas = await Booking.findById(req.query.id).populate('productId').lean();
    }
    if(Object.keys(req.query).includes('guestId')) {
        console.log(req.query)
        datas = await Booking.find({guestId: req.query.guestId}).populate('productId').lean();
    }
    if(!datas) {
        return res.status(403).json({
            result: false,
            message: '등록된 예약이 없습니다'
        })
    }
    return res.status(200).json({
        result: true, datas
    })
}