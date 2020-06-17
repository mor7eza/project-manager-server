const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: String,
    email: String,
    password: String,
    gender: Boolean,
    birthday: String,
    avatar: String,
    sysAdmmin: Boolean,
    organizations: [
      {
        organization: { type: Schema.Types.ObjectId, ref: "Organization" },
        role: String
      }
    ],
    projects: [
      {
        project: { type: Schema.Types.ObjectId, ref: "Project" },
        role: String
      }
    ]
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
