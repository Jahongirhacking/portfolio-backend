import mongoose from "mongoose";

export interface IAdmin {
  name: string;
  username: string;
  passwordHash: string;
  background_img: string;
  short_info: string;
  cv: {
    profile_img: string;
    bio: string;
    link: string;
  };
  services: {
    icon: string;
    name: string;
    description: string;
  }[];
  skills: {
    name: string;
    percent: number;
  }[];
  sites: { logo: string }[];
}

const adminSchema = new mongoose.Schema<IAdmin>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  background_img: {
    type: String,
    default: "",
  },
  short_info: {
    type: String,
    default: "",
  },
  cv: {
    type: {
      profile_img: {
        type: String,
        default: "",
      },
      bio: {
        type: String,
        default: "",
      },
      link: {
        type: String,
        default: "",
      },
    },
    default: {},
  },
  services: {
    type: [
      {
        icon: {
          type: String,
          default: "",
        },
        name: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
      },
    ],
    default: [],
  },
  skills: {
    type: [
      {
        name: String,
        percent: Number,
      },
    ],
  },
  sites: {
    type: [{ logo: String }],
    default: [],
  },
});

adminSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    delete obj.passwordHash;
  },
});

export const Admin = mongoose.model("Admin", adminSchema);
