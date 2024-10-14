import mongoose from "mongoose";
import { isValidYouTubeEmbed, isValidYoutubeURL } from "../utils/isValidUrl";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const ResourceSchema = new Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ["pdf", "blog", "youtube", "custom"],
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: async function name(this: any, url: string) {
        if (this.type === "youtube") {
          return isValidYoutubeURL(url);
        }
        return true;
      },
      message: "Please provide a valid youtube url",
    },
  },
  youtubeEmbedLink: {
    type: String,
    validate: {
      validator: isValidYouTubeEmbed,
      message: (props: { value: string }) =>
        `${props.value} is not a valid YouTube embed link!`,
    },
  },
  description: { type: String },
  topic: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const PendingResourceSchema = new Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ["pdf", "blog", "youtube", "custom"],
    required: true,
  },
  link: { type: String, required: true },
  description: { type: String },
  topic: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  submittedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const TopicSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  resources: [{ type: Schema.Types.ObjectId, ref: "Resource" }],
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", UserSchema);
export const Resource = mongoose.model("Resource", ResourceSchema);
export const PendingResource = mongoose.model(
  "PendingResource",
  PendingResourceSchema
);
export const Topic = mongoose.model("Topic", TopicSchema);
