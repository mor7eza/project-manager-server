const { model, Schema, Types, ObjectId } = require("mongoose");

const projectSchema = new Schema({
  name: String,
  cover: String,
  organization: { type: ObjectId, ref: "Organization" },
  users: [{ type: ObjectId, ref: "User" }],
  numbers: [
    {
      id: Types.ObjectId,
      number: String,
      description: String,
      status: String,
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = model("Project", projectSchema);
