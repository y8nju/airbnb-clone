import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { login } from "../../../lib/api/accountApi";
import account from "../../../lib/models/account";
import { compare } from "bcryptjs";

export const authOption = {
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
						if (response.result) {
							return response
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
		})
	]
}
export default nextAuth(authOption); 