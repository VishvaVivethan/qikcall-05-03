const jwt=require('jsonwebtoken');
const userContoller=require('./connector/connector');

module.exports.returnResponseJson = function returnResponseJson(msg , status = 400, data=undefined){
    return {msg:msg, status:status,data:data}
}

module.exports.verfication=async(req,res,next)=>{
   try{ 
    const token=req.header('Authorization').replace('Bearer.','');
    const decoded=jwt.verify(token,process.env.SECERT_KEY);
    const user =await userContoller.getuserdata(decoded.user.id);
    console.log(user,'user')
    if(user.status==400){
        throw new Error();
    }
    req.user=user.data;
    next();
} catch (error) {
    console.error(error)
    return res.status(401).send({msg:'Please authticate'});
  }

}