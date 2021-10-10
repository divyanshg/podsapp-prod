const mongoose = require("mongoose")

const opts = {
  createdAt: "created_at",
  updatedAt: "updated_at",
};

const ShowSchema = mongoose.Schema({
    ShowId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    UserId: {
        type:String,
        required: true
    },
    channel: {
       name: String,
       id: String
    },
    episodes: {
        type: Array
    },
    image: String,
    backgroundColor: String,
    Followers: [
        {
            userId: {
                type: String,
                unique: true
            }
        }
    ]
}, opts)

const Show = mongoose.model("Show", ShowSchema)

module.exports = Show;