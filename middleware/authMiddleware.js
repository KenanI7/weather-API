const authMiddleware = (req, res, next) => {
  // Check if user is authenticated
  if (req.session && req.session.user) {
    // If user is authenticated, proceed to the next middleware or route handler
    next();
  } else {
    // If user is not authenticated, return an unauthorized error response
    res.status(401).json({ error: "Unauthorized access" });
  }
};

module.exports = authMiddleware;
