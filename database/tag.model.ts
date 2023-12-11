import { Schema, models, model, Document } from "mongoose";

export interface ITag extends Document {
   name: string;
   description: string;
   followers: Schema.Types.ObjectId[];
   questions: Schema.Types.ObjectId[];
   createdOn: Date;
}

const TagSchema = new Schema({
   name: { type: String, require: true, unique: true },
   description: { type: String, require: true },
   followers: [{ type: Schema.Types.ObjectId, ref: "User" }], // users who are following this tag
   questions: [{ type: Schema.Types.ObjectId, ref: "Question" }], // all the question that have been asked with
   createdOn: { type: Date, default: Date.now },
});

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;
