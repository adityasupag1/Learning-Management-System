const userModel = require('../models/userModel')

module.exports.getCurrentUser = async (req , res) =>{
   try {
    const user = await userModel.findById(req.userId).select("-password");
    if(!user) return res.status(404).json(
     {
       message : "User Not Found"
     }
    );

    return res.status(200).json(user);
   } catch (error) {
    return res.status(5000).json({ message: `Get Current User Error ${error}` });
   }
}