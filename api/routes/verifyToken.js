const jwt=require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
	const authHeader= req.headers.authorization;
	if(authHeader){
		const token=authHeader.split(' ')[1]; 
		jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
			if(err) { 
				console.log(token);
				return res.status(404).json("jwt token not valid")
			}
			req.user=user;
			next();
		})
	}
	else { res.status(404).json("no jwt token availble"); }
}

const verifyTokenAndAuthorization=(req,res,next)=>{
	verifyToken(req,res,()=>{
		console.log(req.user)
		if(req.user._id===req.params.id || req.user.isAdmin){
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
		else{ res.status(404).json("only admin can perform this action")}
	});
}

const gernateAccessToken = (user)=> jwt.sign({_id:user._id , isAdmin:user.isAdmin }, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"20s"});
const gernateRefreshToken = (user)=> jwt.sign({_id:user._id , isAdmin:user.isAdmin } , process.env.REFRESH_TOKEN_SECRET)

module.exports={verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin ,gernateAccessToken ,gernateRefreshToken }
