import { NextApiRequest, NextApiResponse } from "next";
import { HostingType } from "../../../interface/hostingType";
import dbConnect from "../../../lib/dbConnect";
import Hosting from "../../../lib/models/hosting";

export default async function handler (req:NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const {roomid} = req.body;
    let deleted;
    if(roomid) {
        deleted = await Hosting.findByIdAndDelete(roomid);
    }
    if(!deleted) {
        return res.status(403).json({
            result: false,
            message: '삭제 할 숙소 정보를 찾을 수 없습니다다'
        })
    }
    console.log(deleted);
    return res.status(200).json({
        result: true, deleted
    })
}