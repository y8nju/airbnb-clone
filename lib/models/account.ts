import mongoose from "mongoose";
import AccountType from "../../interface/accountType";

const accountSchema = new mongoose.Schema<AccountType>({
    email: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    }, 
    birth: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    marketing: Date, 
    visible: Date
});

export default mongoose.models.Account as mongoose.Model<AccountType> ||
    mongoose.model<AccountType>('Account', accountSchema);