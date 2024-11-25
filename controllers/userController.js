const User = require("../models/User");

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found!" });

        res.status(200).json({ name: user.name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
