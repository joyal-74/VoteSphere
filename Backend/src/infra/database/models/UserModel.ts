import mongoose, { Schema, Types } from "mongoose";

interface UserDocument {
    _id: Types.ObjectId;
    userId: string;
    username: string;
    createdAt: Date;
}

const UserSchema = new Schema<UserDocument>({
    userId : {type :String, required : true},
    username: { type: String, required: true },
}, { timestamps: true });

export const UserModel = mongoose.model<UserDocument>("User", UserSchema);