const { model, Schema, ObjectId } = require("mongoose");

const organizationSchema = new Schema(
  {
    name: String,
    logo: String,
    projects: [{ type: ObjectId, ref: "Project" }],
    users: [{ type: ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

module.exports = model("Organization", organizationSchema);
