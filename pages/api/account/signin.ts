import { NextApiRequest, NextApiResponse } from "next";
import { compareSync } from "bcryptjs";
import Account from "../../../lib/models/account";
import dbConnect from "../../../lib/dbConnect";

export default async function handler (req:NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    if(req.method !== "POST") {
        return res.status(405).json({result: false, message: '요청을 처리할 수 없습니다'})
    }
    const {email, password} = req.body as { email: string; password: string };
    console.log('req.body', req.body)
    const getEmail = await Account.findOne({email: email});
    console.log()
    if(compareSync(password, getEmail?.password!)) {
        return res.status(200).json(getEmail);
    }
    return res.status(400).json(null)
}