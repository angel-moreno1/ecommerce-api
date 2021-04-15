import mongoose from 'mongoose';

const userSchema  = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String, 
            required: true,
            default: 'user'
        },
        active: { 
            type: Boolean, default: false 
        },
        created: { 
            type: Date, default: Date.now() 
        },
        products: { 
            type: mongoose.Schema.Types.ObjectId, ref: 'Product' 
        }
    }
);

export const User = mongoose.model('Users', userSchema);

export default User;

