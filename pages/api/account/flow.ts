import { NextApiRequest, NextApiResponse } from "next";
import Account from "../../../lib/models/account";

export default async function handler (req:NextApiRequest, res: NextApiResponse) {

    if(req.method !== "POST") {
        return res.status(405).json({message: '요청을 처리할 수 없습니다'})
    }
    const findEmail = await Account.findOne({email: req.body.email});
    if(!findEmail) {
        return res.status(302).json({
            result: false,
            message: '존재하지 않는 사용자입니다'
        });
    }
    return res.status(200).json({
        result: true, data: findEmail
    })
}