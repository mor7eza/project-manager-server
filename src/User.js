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
    organizationRole: [
      {
        organization: String,
        role: String
      }
    ],
    projectRole: [
      {
        project: String,
        role: String
      }
    ]
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
