//lo uso para verificar si cada usuario, mediante el token, tiene permiso para estar aca. Es como un guardia de seguridad. 
import jwt from 'jsonwebtoken'
import 'dotenv/config'; //esto es para leer los datos del .env 

export const verifyToken = (req, res, next) => { //next es para que siga en el proceso, con la siguiente accion
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Not allowed to stay here, sorry'})
    }

    try {
        //* 2) limpieza y verificacion. A veces el token viene como 'Bearer xxxx..' , aca le quito el Bearer para quedarme solo con el codigo.
        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET); //trae el token limpio
        //* 3) guardo los datos dentro del req.(la peticion)
        req.user = verified;
        //* 4) next. seguir al siguiente paso
        next();

    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'Not possible to access. Token not valid'})
    }
}