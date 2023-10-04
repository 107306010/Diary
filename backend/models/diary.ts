import mongoose from "mongoose";
import type { Types } from "mongoose";

import type { DiaryData } from "@lib/shared_types";

// In `DiaryData`, we have `diary_id` and `id` as a string, but in the database, we want to store them as an ObjectId.
interface DiaryDocument
  extends Omit<DiaryData, "id" | "diary_id">,
    mongoose.Document {
  diary_id: Types.ObjectId;
}

interface DiaryModel extends mongoose.Model<DiaryDocument>{}

const DiarySchema = new mongoose.Schema<DiaryDocument>(
    {
        description:{
            type: String,
            required: true
        },
        date:{
            type: String,
        },
        tags:{
            type: []
        },
        emotions:{
            type: []
        }
        // diary_id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        // },
    },
    {
        timestamps: true,
        // toJSON: {
        //   transform: (_, ret): void => {
        //     ret.id = ret._id.toString();
        //     ret.diary_id = ret.diary_id.toString();
        //     delete ret._id;
        //     delete ret.__v;
        //   },
        // },
    }
)

const Diary = mongoose.model<DiaryDocument, DiaryModel>("Diary", DiarySchema);
export default Diary;