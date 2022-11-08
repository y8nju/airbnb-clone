export default interface AccountType {
    email: string,
    lastName: string,
    firstName: string, 
    birth: string,
    password: string,
    marketing?: Date | null, 
    visible?: Date | null, 
    signupType: string,
    provider: string, 
    providerAccountId: string
}