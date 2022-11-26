import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Booking from "../../../lib/models/booking";

export default async function handler (req:NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const {id} = req.query;
    const datas = await Booking.findById(id).populate('productId').lean();
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