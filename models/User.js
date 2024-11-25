const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    encryptedPayload: { type: String },
});

// Constants for encryption
const algorithm = "aes-256-cbc";
const key = crypto.createHash("sha256").update(process.env.SECRET_KEY).digest(); // 32-byte key
const iv = crypto.randomBytes(16); // 16-byte IV

// Hash password before saving
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Encrypt sensitive data
UserSchema.methods.encryptPayload = function (data) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return `${iv.toString("hex")}:${encrypted}`; // Store IV and encrypted data together
};

// Decrypt sensitive data
UserSchema.methods.decryptPayload = function (data) {
    const [storedIv, encryptedData] = data.split(":");
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(storedIv, "hex"));
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};

module.exports = mongoose.model("User", UserSchema);
