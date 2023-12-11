import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
   clerkId: string;
   name: string;
   username: string;
   email: string;
   picture: string;
   saved: Schema.Types.ObjectId[];
   joinedAt: Date;
   password?: string;
   location?: string;
   bio?: string;
   portfolioWebsite?: string;
   reputation?: number;
}

const UserSchema = new Schema({
   clerkId: { type: String, required: true },
   name: { type: String, required: true },
   username: { type: String, required: true, unique: true },
   email: { type: String, required: true, unique: true },
   picture: { type: String, required: true },
   saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
   joinedAt: { type: Date, default: Date.now },
   password: { type: String },
   location: { type: String },
   bio: { type: String },
   portfolioWebsite: { type: String },
   reputation: { type: Number, default: 0 },
});

const User = models.User || model("User", UserSchema);

export default User;
