import db from "../db/lowdb.js";

// View Profile
export const viewProfile = async (req, res) => {
  try {
    await db.read();
    const user = db.data.users.find((u) => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude password before sending
    const { password, ...safeUser } = user;

    res.status(200).json({ profile: safeUser });
  } catch (err) {
    console.error("Error viewing profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//  Edit Profile
export const editProfile = async (req, res) => {
  try {
    const { name, email, phone, fullname, country } = req.body;

    await db.read();
    const userIndex = db.data.users.findIndex((u) => u.id === req.user.id);

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) db.data.users[userIndex].name = name;
    if (email) db.data.users[userIndex].email = email;
    if (phone) db.data.users[userIndex].phone = phone;
    if (fullname) db.data.users[userIndex].fullname = fullname;
    if (country) db.data.users[userIndex].country = country;

    await db.write();

    const updatedUser = { ...db.data.users[userIndex] };
    delete updatedUser.password;

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedUser,
    });
  } catch (err) {
    console.error("Error editing profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
