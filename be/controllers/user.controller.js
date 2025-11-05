const changPassController = async (req, res) => {
    const {currPass, newPass, username} = req.body
    if(!currPass ||!newPass)  return res.status(400).json({ message: "Missing credentital !!" });

    try {
        
    } catch (error) {
        
    }
}