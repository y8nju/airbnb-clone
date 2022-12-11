import nextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { login } from "../../../lib/api/accountApi";
import account from "../../../lib/models/account";
import { compareSync } from "bcryptjs";
import { ParaglidingSharp } from "@mui/icons-material";
import dbConnect from "../../../lib/dbConnect";

export const authOption: NextAuthOptions = {
	pages: {
		error: "/auth/error",
	},
	providers: [
		CredentialsProvider({
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials, req) {
				let user : User;
				await dbConnect();
				console.log('credentials', JSON.stringify(credentials));
				try {
					const got = await account.findOne({email: credentials!.email}); // id Find
					if(!got )	{
						return null;
					}
					if(compareSync(credentials!.password, got?.password)) {
						return user = {id :  got._id.toString(), email : got.email, name : got.firstName};
					}else {
						return null;
					}
				} catch (e) {
					console.log("SERVER - AUTHORIZE");
					console.log(e);
				}
				return null;
			}
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code"
				}
			}
		})
	],
	callbacks: {
		async signIn(params) {
			// return true	// 인증O
			// return false // 인증X /error=AcessDenied
			// throw new Error('Duplicated');	// 파라미터
			console.log('params', params);
			await dbConnect();
			const {email, name} = params.user;
			const {provider, providerAccountId} = params.account!;
			const findEmail = await account.findOne({email: email});
			console.log('findEmail', findEmail)
			if(!findEmail){
				return `/oAuthPage/gOauthSignup?email=${email}&provider=${provider}&providerAccountId=${providerAccountId}`
			}
			if(findEmail.signupType == 'email' && provider == 'google') {
				console.log('계정 가입 타입 확인')
				// name이 한글이면 오류 발생!
				const params = new URLSearchParams();
				params.append("name", name!);
				params.append("email", email!);
				params.append("provider", provider!);
				params.append("providerAccountId", providerAccountId!);
				return '/oAuthPage?'+params.toString();
			}
			return true;

		}
	}
}
export default nextAuth(authOption); 