const { Schema, model } = require("mongoose");


const mangaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    numVolume: {
      type: Number,
      required: true,
    },
    collection: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      enum: ["action", "fantasy", "horror"],
      default: "action"
    },
    image: {
      type: String,
      required: true
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Manga = model("Manga", mangaSchema);

module.exports = Manga;
