import mongoose from 'mongoose';
import PostMessage from '../models/postMessage';

export const get_data = async(res: any) => {
    try{
        const data = await PostMessage.find();
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
}

export const post_data = async(dataToAdd: mongoose.Document, res: any) => {
    try{
        await dataToAdd.save();
        res.status(201).json(dataToAdd);
    }
    catch(err){
        res.status(409).json({ message: err.message });
    }
}

export const patch_data = async(_id: string, body: any, res: any) => {
   
    try{
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).send('No post with that id');
        }
        else{
            const updatedData = await PostMessage.findByIdAndUpdate(_id, body, { new: true });
            res.json(updatedData);
        }
    }
    catch(err){
        res.status(409).json({ message: err.message });
    }

}

export const delete_data = async(_id: string, res: any) => {

    try{
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).send('No post with that id');
        }
        else{
            const deletedData = await PostMessage.findByIdAndRemove(_id);
            res.json(deletedData);
        }
    }
    catch(err){
        res.status(409).json({ message: err.message });
    }
}