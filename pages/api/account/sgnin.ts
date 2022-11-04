import { NextApiRequest, NextApiResponse } from "next";
import { compare, hash } from "bcryptjs";
import Account from "../../../lib/models/account";

export default async function handler (req:NextApiRequest, res: NextApiResponse) {

    if(req.method !== "POST") {
        return res.status(405).json({result: false, message: '요청을 처리할 수 없습니다'})
    }

    try{
        const {email, password} = req.body
        const findEmail = await Account.findOne({email: email});   
        if(!findEmail) {
            return res.status(302).json({
                result: false,
                message: '존재하지 않는 사용자입니다'
            });
        }
        const hashedPassword = await hash(password, 12);
        if(findEmail && (await compare(hashedPassword, findEmail.password))) {
            return res.status(200).json({result: true, message: '로그인이 완료되었습니다'});
        }
    } catch(e) {
        return res.status(400).json({result:false, message: String(e)})
    }
}