const deviceIdGenerator = async (req, res, next) => {
  const isDeviceId = req.cookies?.deviceId;
  if (!isDeviceId) {
    const deviceId = crypto.randomUUID();
    res.cookie('deviceId', deviceId, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    console.log("aqui", isDeviceId)
  }
  next();
};

export default deviceIdGenerator;
