const User = require('../models/User.model');
const { verifyToken } = require('../utils/jwt.utils');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: No token provided',
    });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid token',
    });
  }

  try {
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User not found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Token verification failed',
    });
  }
};

module.exports = authenticate;
