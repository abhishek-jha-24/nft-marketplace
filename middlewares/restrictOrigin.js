const allowedOrigins = ["localhost","127.0.0.1"];

module.exports = (req, res, next) => {
  let isDomainAllowed = allowedOrigins.indexOf(req.hostname) !== -1;
  if (!isDomainAllowed) return res.status(403).json({ message: "RESTRICTED" });
  next();
};
