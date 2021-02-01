import jwt from 'jsonwebtoken';

export const authMiddleware = async(req: any, res: any, next: any) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;
        let decodedData: any = ''; 

        if(isCustomAuth){
            decodedData = jwt.verify(token, process.env.SECRET!);
            req.userId = decodedData?.id;
        }
        else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } 
    catch(error) {
        console.log(error)
    }   
}