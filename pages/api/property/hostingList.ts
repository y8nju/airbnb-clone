import { NextApiRequest, NextApiResponse } from "next";
import { HostingType } from "../../../interface/hostingType";
import dbConnect from "../../../lib/dbConnect";
import Hosting from "../../../lib/models/hosting";

export default async function handler (req:NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    let datas = await Hosting.find();
    console.log(req.query)
    
    if(Object.keys(req.query).includes('roomid')) {
        datas = await Hosting.findById(req.query.roomid).lean();
    } else {
        datas = await Hosting.find(req.query).lean();
    }
    if(!datas) {
        return res.status(403).json({
            result: false,
            message: '등록된 숙소가 없습니다'
        })
    }
    return res.status(200).json({
        result: true, datas
    })
}