import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Property from "../../../lib/models/property";

export default async function handler (req:NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const {group} = req.query;
    
    let datas = await Property.find();
    if(group) {
        datas = await Property.find({ group: group });   
    }
    if(!datas) {
        return res.status(403).json({result: false, messege: '데이터가 존재하지 않습니다'})
    }
    return res.status(200).json({result: true, datas})
}