const adminAuth = (req, res, next) => {
console.log("The user is authenticated");   
const userAuthId = "007";
const isAuth = userAuthId === "007";
if (isAuth) {
  next();
} else {
  res.status(401).send("The user is not authenticated");
}

}

module.exports = {
    adminAuth,
};