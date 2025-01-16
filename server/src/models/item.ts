import mongoose from "mongoose";

export interface ItemProps {
  id?: string;
  title: string;
  img: string;
  category: mongoose.Types.ObjectId;
  info: { img: string; description: string }[];
  links: string[];
  rating: number;
}

const itemSchema = new mongoose.Schema<ItemProps>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  info: [{ img: String, description: String }],
  rating: {
    type: Number,
    required: true,
  },
  links: [String],
});

itemSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

export const Item = mongoose.model("Item", itemSchema);
