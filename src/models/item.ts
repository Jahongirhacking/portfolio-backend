import mongoose from "mongoose";

export interface ItemProps {
  title: string;
  img: string;
  category: mongoose.Types.ObjectId;
  info: { img: string; description: string }[];
  links: string[];
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
  links: [String],
});

export const Item = mongoose.model("Item", itemSchema);
