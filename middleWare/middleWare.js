const jwt= require('jsonwebtoken')

const userAuth = async function(req, res, next){
    try{
        const token = req.headers['x-api-key']
        if (!token){
            res.status(403).send({status:false,message:"Missing Authentication Token in req"})
            return
        }

        const decode = await jwt.verify(token, 'mahesh@cor')
        if(!decode){
            res.status(403).send({status:false,message:'invalid Authentication token in request'})
            return
        }
        req.userId=decoded.userId;
        next()
    }
    catch(error){
        res.status(500).send({status:false,message:error.message})
    }
}


module.exports = { userAuth }