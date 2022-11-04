export default interface AccountType {
    email: string,
    lastname: string,
    firstName: string, 
    birth: string,
    password: string,
    marketing?: Date, 
    visible?: Date
}