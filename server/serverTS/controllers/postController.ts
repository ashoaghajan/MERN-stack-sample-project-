import mongoose from 'mongoose';
import PostMessage from '../models/postMessage';

// get all posts 
export const get_data = async(res: any) => {
    try{
        const data = await PostMessage.find();
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
}

// add a new post
export const post_data = async(req: any, res: any) => {
    const { body } = req;
    const dataToAdd = new PostMessage(body);

    try{
        await dataToAdd.save();
        res.status(201).json(dataToAdd);
    }
    catch(err){
        res.status(409).json({ message: err.message });
    }
}

// delete a post
export const delete_data = async(req: any, res: any) => {
    const  { id: _id } = req.params;

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

// edit a post
export const patch_data = async(req: any, res: any) => {
    const  { id: _id } = req.params;
    const { body } = req;

    if(req.userId) return res.json({ message: 'Unauthenticated user.' });
   
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

// like a post
export const like_data = async(req: any, res: any) => {
    const  { id: _id } = req.params;

    if(req.userId) return res.json({ message: 'Unauthenticated user.' });
   
    try{
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).send('No post with that id');
        }
        else{
            const post: any = await PostMessage.findById(_id);
            const index = post!.likes.findIndex((id: string) => id === String(req.userId));

            if(index === -1){
                // like the post
                post.likes.push(req.userId);
            }
            else{
                // dislike the post
                post.likes = post.likes.filter((id: string) => id !== String(req.userId));
            }
            
            const updatedData = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
            res.json(updatedData);
        }
    }
    catch(err){
        res.status(409).json({ message: err.message });
    }
}

