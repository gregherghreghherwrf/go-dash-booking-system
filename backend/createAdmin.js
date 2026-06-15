const mongoose = require(
  "mongoose"
);

const bcrypt = require(
  "bcryptjs"
);

const Admin = require(
  "./models/Admin"
);

mongoose.connect(
  process.env.MONGO_URI
);

async function create() {
  const password =
    await bcrypt.hash(
      "GoDash@123",
      10
    );

  await Admin.create({
    email:
      "admin@godash.com",
    password,
  });

  console.log(
    "Admin created"
  );

  process.exit();
}

create();