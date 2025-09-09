const asyncHandler = (fn) = async (req,res,next) =>{
  try {
    

  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: err.message
    })
  }
}

export {asyncHandler}