import { Types } from "mongoose"

export default interface PropertyType {
    _id?: Types.ObjectId
    group: string, 
    image: string,
    types: object[]
}