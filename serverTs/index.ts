import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

// middlewares
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

//routes
app.use('/posts', require('./routes/posts'));

app.get('/', (req: any, res: any) => {
    res.send('Hello to memories API')
});


dotenv.config();

// mondoDb connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL!, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => 
    app.listen(PORT, () => console.log(`Serve running on port: ${PORT}`))
).catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);