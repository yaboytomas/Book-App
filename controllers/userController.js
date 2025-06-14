const User = require("../models/userModel");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: "User updated" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => { 
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.me = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
