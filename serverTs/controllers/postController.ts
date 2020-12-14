import mongoose from 'mongoose';

export const get_data = async(res: any, model: mongoose.Model<mongoose.Document, {}>) => {
    try{
        const data = await model.find();
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
}

export const post_data = async(req: any, res: any, model: mongoose.Model<mongoose.Document, {}>) => {
    const { body } = req;
    const dataToAdd = new model(body);

    try{
        await dataToAdd.save();
        res.status(201).json(dataToAdd);
    }
    catch(err){
        res.status(409).json({ message: err.message });
    }
}

export const patch_data = async(req: any, res: any, model: mongoose.Model<mongoose.Document, {}>) => {
    const  { id: _id } = req.params;
    const { body } = req;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No post with that id');
    }
    else{
        const updatedData = await model.findByIdAndUpdate(_id, body, { new: true });
        res.json(updatedData);
    }
}

export const delete_data = async(req: any, res: any, model: mongoose.Model<mongoose.Document, {}>) => {
    const  { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No post with that id');
    }
    else{
        const deletedData = await model.findByIdAndRemove(_id);
        res.json(deletedData);
    }
}