const { Schema, model, Types } = require("mongoose");


const commentSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    manga: { type: Types.ObjectId, ref: 'Manga' },
    text: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
