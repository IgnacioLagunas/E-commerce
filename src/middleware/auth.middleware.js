export const isLogedMiddleware = (req, res, next) => {
  // Logica de verificacion de usuario
  console.log('user:', req.session);
  if (!req.session.passport) return res.redirect('/login');
  next();
};

// export const roleAuthMiddleware = (roles) => {
//   return (res,req,netx) => {
//     if(!roles.includes(req.user.role))
//   }
// }
