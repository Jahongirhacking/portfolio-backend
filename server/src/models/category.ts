import mongoose from "mongoose";

export interface ICategory {
  name: string;
  categories: mongoose.Types.ObjectId[];
  img: string;
  items: mongoose.Types.ObjectId[];
  parent: mongoose.Types.ObjectId;
}

const categorySchema = new mongoose.Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to another Category document
    },
  ],
  img: {
    type: String,
    required: true,
  },
  items: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Item", // Reference to Item document
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null, // Reference to another Category document
  },
});

categorySchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

export const Category = mongoose.model("Category", categorySchema);
