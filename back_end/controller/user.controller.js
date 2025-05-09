const UserServices = require('../services/user.service'); 
 
exports.register = async (req, res, next) => {

    console.log("Received register request with body:", req.body);
  try {
    
    const { email, password } = req.body;

    const duplicate = await UserServices.getUserByEmail(email);
    console.log("Duplicate found:", duplicate);

    if (duplicate) {
      throw new Error(`User ${email} already registered`);
    }

    const response = await UserServices.registerUser(email, password);
    console.log("User registered successfully");

    res.json({ status: true, success: 'User registered successfully' });

  } catch (err) {
    console.log("Error in register controller:", err);
    next(err);
  }
};

exports.login = async (req, res, next) => { 
    try { 
 
        const { email, password } = req.body; 
 
        if (!email || !password) { 
            throw new Error('Parameter are not correct'); 
        } 
        let user = await UserServices.checkUser(email); 
        if (!user) { 
     throw new Error('User does not exist'); 
        } 
 
        const isPasswordCorrect = await user.comparePassword(password); 
 
        if (isPasswordCorrect === false) { 
            throw new Error(`Username or Password does not match`); 
        } 
 
        // Creating Token 
 
        let tokenData; 
        tokenData = { _id: user._id, email: user.email }; 
     

        const token = await UserServices.generateAccessToken(tokenData,"secret","1h"); 

        res.status(200).json({ status: true, success: "sendData", token: token }); 
    } catch (error) { 
   console.log(error, 'err---->'); 
        next(error); 
    } 
}