// Mongoose Schema Here

import mongoose from 'mongoose'
import { Document } from 'mongoose';
import { isValidYouTubeEmbed, isValidYoutubeURL } from '../utils/isValidUrl';
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, 
});

interface IResource extends Document {
  title: string;
  type: 'pdf' | 'blog' | 'youtube' | 'custom';
  link: string;
  youtubeEmbedLink?: string;
  description?: string;
  topic: mongoose.Schema.Types.ObjectId;
  postedBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

// Resource Schema (for storing approved PDFs, blogs, videos, custom blogs)
const ResourceSchema = new Schema({
  title: { type: String, required: true }, 
  type: { type: String, enum: ['pdf', 'blog', 'youtube', 'custom'], required: true }, 
  link: { type: String, required: true, validate: isValidYoutubeURL },
  youtubeEmbedLink: {
      type: String,
      validate: {
          validator: isValidYouTubeEmbed,
          message: (props: { value: string }) => `${props.value} is not a valid YouTube embed link!`
      }
  },
  description: { type: String }, 
  topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true }, 
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  createdAt: { type: Date, default: Date.now },
});

// Pending Resource Schema (for storing user-submitted resources for admin approval)
const PendingResourceSchema = new Schema({
  title: { type: String, required: true }, 
  type: { type: String, enum: ['pdf', 'blog', 'youtube', 'custom'], required: true }, 
  link: { type: String, required: true }, 
  description: { type: String }, 
  topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true }, 
  submittedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  createdAt: { type: Date, default: Date.now },
});

// Topic Schema (for DBMS, OOPS, Web Dev, etc.)
const TopicSchema = new Schema({
  name: { type: String, required: true,unique:true }, 
  description: { type: String }, 
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
  imageUrl: {type:String,required:true} ,
  createdAt: { type: Date, default: Date.now },
});

// Exporting models

  export const User = mongoose.model('User', UserSchema);
  export const Resource = mongoose.model('Resource', ResourceSchema);
  export const PendingResource = mongoose.model('PendingResource', PendingResourceSchema);
  export const Topic = mongoose.model('Topic', TopicSchema);