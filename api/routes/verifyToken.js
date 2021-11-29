const jwt=require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
	const authHeader= req.header.authorization;
	if(authHeader){
		const token=authHeader.split('')[1];
		jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
			if(err) {res.status(404).json("jwt token not valid")}
			req.user=user;
			next();
		})
	}
	else { res.status(404).json("no jwt token availble"); }
}

const verifyTokenAndAuthorization=(req,res,next)=>{
	verifyToken(req,res,()=>{
		if(req.user.id===req.params.id || req.user.isAdmin){
			next();
		}
		else{ res.status(404).json("you can't perform this action")}
	});
}
const verifyTokenAndAdmin=(req,res,next)=>{
	verifyToken(req,res,()=>{
		if(req.user.isAdmin){
			next();
		}
		else{ res.status(404).json("you can't perform this action")}
	});
}


module.exports={verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin}
