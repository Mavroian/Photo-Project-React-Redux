const router = require("express").Router();
const builds = require("./builds");
const { store, addProject } = require("../../util/redux");

router.get("/", (req, res) => {
  res.status(200).send(store.getState());
});

router.post("/", (req, res) => {
  const project = req.body;
  store.dispatch(addProject(project));
  res.status(200).send(store.getState());
});

router.get("/:projectId", (req, res) => {
  const { projectId } = req.params;
  console.log(req.params);
  console.log("poop", projectId);
  console.log(req.body);
  const found = 1;
});

router.patch("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const { project } = req.body;
  // TODO edit a projects information. Make sure to validate whats being sent!
  res.status(418).json({ message: "Not Implemented" });
});

router.delete("/:projectId", (req, res) => {
  const { projectId } = req.params;
  // TODO delete project, return status 200 with no body on success
  res.status(418).json({ message: "Not Implemented" });
});

router.use("/:projectId/builds", builds);

module.exports = router;
