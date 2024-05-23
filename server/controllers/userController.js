import User from "../models/userModel.js";
export const getUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    console.log("getting user");
    //    const findEmail=User.findOne({email})
    const newUser = new User({
      name,
      email,
    });
    await newUser.save();

    return res.status(200).json({
        "user": newUser
    });
  } catch (error) {
    return res.status(500).json({
        "error": error
    })
};


}

export const sendUser=async(req,res)=>{
    try {
       
        const users=await User.find();
        console.log(users);
        res.status(200).json({
            users
        })
    } catch (error) {
       res.status(500).json({
        error:error
       })   
    }
    
}

export const deleteUser =async(req,res)=>{
    try {
        const {id}=req.params;
        console.log(id)
    const deleteUser =await User.findByIdAndDelete(id);
    console.log(deleteUser)
    res.status(200).json({
        message:"user deleted succesfully"
    })
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
    
}

export const updateUser = async (req, res) => {
    const { name, email } = req.body;
    const { id } = req.params;
  
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { name, email },
        { new: true, runValidators: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };