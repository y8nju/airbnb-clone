import { StringExpression } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Account from "../../../lib/models/account";
import { authOption } from "../auth/[...nextauth]";

export default async function handler (req:NextApiRequest, res: NextApiResponse) {
    const {email, visible} = req.body
    const findEmail = await Account.findOne({email: email});
    if(!findEmail) {
        return res.status(302).json({
            result: false,
            message: '존재하지 않는 사용자입니다'
        });
    } 
    await Account.updateOne({email: email}, {$set:{visible: visible}});
    return res.status(200).json({
        result: true
    })
}