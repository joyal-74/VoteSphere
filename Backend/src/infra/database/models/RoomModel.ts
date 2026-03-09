import mongoose, { Schema } from "mongoose";
import { Poll } from "../../../domain/entities/Poll";

interface RoomDocument {
    _id: string;
    title: string;
    createdBy: string;
    users: string[];
    polls: Poll[];
    createdAt: Date;
}

const PollOptionSchema = new Schema({
    id: { type: String, required: true },
    text: { type: String, required: true },
    votes: { type: Number, default: 0 }
}, { _id: false });

const UserVoteSchema = new Schema({
    userId: { type: String, required: true },
    optionId: { type: String, required: true }
}, { _id: false });

const RoomSchema = new Schema<RoomDocument>({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    createdBy: { type: String, required: true },
    users: [{ type: String }],
    polls: [{
        id: String,
        question: String,
        createdBy: String,
        isActive: Boolean,
        createdAt: Date,
        options: [PollOptionSchema],
        votedUserIds: [String],
        votes: [UserVoteSchema] 
    }],
    createdAt: { type: Date, default: Date.now }
});

export const RoomModel = mongoose.model<RoomDocument>("Room", RoomSchema);