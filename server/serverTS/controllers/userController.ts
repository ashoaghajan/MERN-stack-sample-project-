import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';

export const sign_in = async(user: any, res: any) => {
    const { email, password } = user;

    try{
        const existingUser: any = await UserModel.findOne({ email });

        // user does not exist
        if(!existingUser){
            return res.status(404).json({ message: "User doesn't exist" });
        }
        const isPwdCorrect = await bycrypt.compare(password, existingUser.password);
        // password is not correct
        if(!isPwdCorrect){
            return res.status(400).json({ message: "Invalid Credentials." });
        } 

        //password is correct
        const { email: userEmail, _id: id } = existingUser;
        const token = jwt.sign({ userEmail, id }, process.env.SECRET!, { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}


export const sign_up = async(newUser: any, res: any) => {
    const { email, password, confirmPassword, firstName, lastName } = newUser;

    try{
        const existingUser: any = await UserModel.findOne({ email });
        // user exists
        if(existingUser){
            return res.status(400).json({ message: "User with this email already exists." });
        }

        //check if password and confirmPassword is the same
        if(password !== confirmPassword){
            return res.status(400).json({ message: "Passwords do not match." });
        }

        const hashedPassword = await bycrypt.hash(password, 12);
        const result: any = await UserModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email, id: result._id }, process.env.SECRET!, { expiresIn: '1h' });

        res.status(200).json({ result, token });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}