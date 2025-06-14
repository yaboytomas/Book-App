const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/sendEmail");

const jwtSecret = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    try {
        const { username, password, role, email } = req.body;
        
        // Basic validation
        if (!username || !password || !email) {
            return res.status(400).json({ error: "Username, password, and email are required" });
        }
        
        // Check if user already exists (by username or email)
        const existingUser = await User.findOne({ 
            $or: [{ username }, { email }] 
        });
        if (existingUser) {
            return res.status(400).json({ error: "Username or email already exists" });
        }
        
        const user = new User({ username, password, role, email });
        await user.save();
        
        // Send welcome email
        await sendEmail(email, "Welcome!", "Thanks for joining our app!");
        
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

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
}   

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        // Send login notification email (don't wait for it)
        sendEmail(user.email, "Login Alert", `Hello ${user.username}, you just logged in to your account.`);
        
        // Send response AFTER email is initiated
        res.json({ message: "Login successful", token, userId: user._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Email not found" });
        }                                       
        const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "5m" });
        user.resetToken = resetToken;
        user.resetTokenExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
        await user.save();
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        await sendEmail(email, "Password Reset", `Copy and paste token to reset your password: ${resetToken}`);
        res.json({ message: "Password reset email sent" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }  
}

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        
        if (!newPassword) {
            return res.status(400).json({ error: "New password is required" });
        }
        
        // Verify the reset token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(400).json({ error: "Invalid or expired reset token" });
        }
        
        // Find user with valid reset token
        const user = await User.findOne({
            _id: decoded.userId,
            resetToken: token,
            resetTokenExpires: { $gt: Date.now() }
        });
        
        if (!user) {
            return res.status(400).json({ error: "Invalid or expired reset token" });
        }
        
        // Update password and clear reset token
        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpires = undefined;
        await user.save();
        
        // Send confirmation email
        await sendEmail(user.email, "Password Reset Successful", 
            `Hello ${user.username}, your password has been successfully reset.`);
        
        res.json({ message: "Password reset successful" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}