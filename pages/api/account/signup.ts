import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";

import AccountType from "../../../interface/accountType";
import Account from "../../../lib/models/account";
import { useCtx } from "../../../context/context";
import dbConnect from "../../../lib/dbConnect";

export default async function handler (req:NextApiRequest, res: NextApiResponse) {
    await dbConnect();
	const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    if(req.method !== "POST") {
        return res.status(405).json({result: false, message: '요청을 처리할 수 없습니다'})
    }
    const doc = req.body as AccountType;
    try{
        const findEmail = await Account.findOne({email: req.body.email});    
        if(!doc.email || !emailRegex.test(doc.email) || !doc.firstName || !doc.lastName || !doc.birth || !doc.password) {
            throw new Error('누락된 필드값이 존재합니다.');
        }
        
        if(findEmail) {
            throw new Error('이미 사용 중인 이메일입니다')
        }
        
        const hashedPassword = await hash(req.body.password, 12);
        const data = await Account.create({
            ...doc,
            password: hashedPassword
        });
        return res.status(200).json({result: true, data: data});
    } catch(e) {
        return res.status(400).json({result:false, message: String(e)})
    }
}