import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { HostingType } from "../../../interface/hostingType";
import dbConnect from "../../../lib/dbConnect";
import Hosting from "../../../lib/models/hosting";
export default async function handler (req:NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const token = await getToken({req});
    const doc = req.body as HostingType;
    console.log("updateStepData Handle --- ", {
        doc,
        owner: token?.email,
      });
      let resultItem;
    if(req.method !== "POST") {
        return res.status(405).json({result: false, message: '요청을 처리할 수 없습니다'})
    }
    try {
        if(!token?.email) {
            throw new Error('로그인 한 사용자들이 사용할 수 있습니다');
        }
        if(doc._id) {
            const updateData = {...doc};
            delete updateData._id;
            resultItem = await Hosting.findByIdAndUpdate(doc._id, updateData, {
                returnDocument: "after",
            });
            console.log(resultItem);
        } else {
            resultItem = await Hosting.create(doc);
        }
        return res.status(200).json({result: true, data: resultItem});
    }catch(e) {
        return res.status(400).json({result:false, message: String(e)})
    }
}