import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { login } from "../../../lib/api/accountApi";

export const authOption = {
	providers: [
		CredentialsProvider({
			credentials: {
				email: {},
				password: {},
			  },
			async authorize(credentials, req) {
				console.log(credentials);
				const res = await login(credentials!)
				const user = await res.json()
				if (res.ok && user) {
					return user
				}
				return null
			}
		})
	]
}
export default nextAuth(authOption); 