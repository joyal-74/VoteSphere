import mongoose, { Schema, Types } from "mongoose";

export interface MessageDocument {
    roomId: string;
    userId: string | Types.ObjectId;
    username: string;
    content: string;
    parentMessageId : string;
    createdAt: Date;
    editedAt?: Date;
    isDeleted: boolean;
}

const MessageSchema = new Schema<MessageDocument>({
    roomId: { type: String, required: true, index: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    username: { type: String, required: true },
    content: { type: String, required: true },
    parentMessageId: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    editedAt: { type: Date },
    isDeleted: { type: Boolean, default: false }
});

export const MessageModel = mongoose.model<MessageDocument>("Message", MessageSchema);