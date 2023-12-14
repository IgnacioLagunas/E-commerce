class SessionsController {
  getCurrent = (req, res) => {
    res.json({ user: req.user });
  };
}

export default new SessionsController();
