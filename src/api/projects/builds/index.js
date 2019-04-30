const router = require("express").Router({ mergeParams: true });
const {
  store,
  addBuild,
  deleteBuild,
  patchBuild,
  startBuild,
} = require("../../../util/buildRedux");

router.get("/", (req, res) => {
  const { projectId } = req.params;

  res.send(store.getState());
});

router.post("/", (req, res) => {
  const { projectId } = req.params;
  store.dispatch(addBuild(projectId));
  const state = store.getState();
  res.send(state);
});

router.get("/latest", (req, res) => {
  const { projectId } = req.params;
  // TODO Retrieve the latest build of a project
  res.status(418).json({ message: "Not Implemented" });
});

router.get("/:buildId", (req, res) => {
  const { projectId, buildId } = req.params;
  // TODO Retrieve a single build from a project
  const state = store.dispatch(startBuild(projectId, ~~buildId));
  console.log("log in index", state);
  res.send(state);
});

module.exports = router;
