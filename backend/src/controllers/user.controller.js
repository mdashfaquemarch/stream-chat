




async function signOut(req, res, next) {
    try {
        const options = {
        httpOnly: true,
        secure: true,
        maxAge: 24*60*60*1000,
        sameSite: 'Lax'
      }
    res.clearCookie("accessToken", options);

    return res.status(200).json({
        message: "user logged out successfully",
        success: false
    })
    } catch (error) {
        console.log(error);
    }
}

async function getMe(req, res, next) {
    try {
        return res.status(200).json({
            message: "user fetched successfully",
            data: req.user,
            success: true,
            error: false
        })
    } catch (error) {
        console.log(error);
    }
}

export {signOut, getMe}
