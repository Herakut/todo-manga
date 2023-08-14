const { Schema, model} = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    profileImg: {
      type: String,
      default: "https://www.bing.com/images/search?view=detailV2&ccid=Ghae4OEd&id=1AFDF3123335E05A0A7206F41047B9721BA1AB17&thid=OIP.Ghae4OEdb4UmC3hkqpFvLAHaGd&mediaurl=https%3a%2f%2fwww.clipartkey.com%2fmpngs%2fm%2f152-1520367_user-profile-default-image-png-clipart-png-download.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.1a169ee0e11d6f85260b7864aa916f2c%3frik%3dF6uhG3K5RxD0Bg%26pid%3dImgRaw%26r%3d0&exph=785&expw=900&q=profile+default&simid=607992547328139643&FORM=IRPRST&ck=0D6094784C1373BB844156E92261345D&selectedIndex=0"
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Manga' }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);
module.exports = User;
