import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { login } from "../../../lib/api/accountApi";
import account from "../../../lib/models/account";
import { compare } from "bcryptjs";
import { ParaglidingSharp } from "@mui/icons-material";

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
				console.log('credentials', JSON.stringify(credentials));
				try {
					const getId = await account.findOne({email: credentials!.email}); // id Find
					if(getId) {
						console.log('getId', getId)
						const response = await login(credentials!)
						console.log("authorize : ", response);
						if (response) {
							return { email: response.email,
								name: `${response.lastName} ${response.firstName}`,
							} as any;
						}else {
							return null
						}
					}else {
						throw new Error('invalid email/password');
					}
				} catch (e) {
					console.log("SERVER - AUTHORIZE");
					console.log(e);
				}
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
			console.log(params);
			const {email} = params.user;
			const {provider, providerAccountId} = params.account!;
			const findEmail = await account.findOne({email: email});
			console.log(findEmail)
			if(!findEmail){
				return `/OAuth/googleSignup?email=${email}&provider=${provider}&providerAccountId=${providerAccountId}`
			}
			if(findEmail.signupType == 'email' && provider == 'google') {
				console.log('계정 가입 타입 확인')
				return false;
			}
			if(findEmail.signupType == 'google' && provider == 'google' ||
				findEmail.signupType == null && provider == 'credentials') {
				return true;
			}

		}
	}
}
export default nextAuth(authOption); 