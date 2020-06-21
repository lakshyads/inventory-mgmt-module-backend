import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    googleId: String,
    email: String,
});

const User = mongoose.model('User', UserSchema);

export default User;
