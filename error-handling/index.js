module.exports = (app) => {
  app.use((req, res) => {
    res.status(404).json({ msg: "This route doesn't exists" });
  });
  app.user((err, req, res, next) => {
    console.error("Error", req.method, req.path, err);
    res.status(500).json({ msg: "Internal server error!" });
  });
};
