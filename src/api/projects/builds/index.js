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
  const state = store.getState();
  const buildToEdit = state.builds.filter((build) => {
    return build.projectId === projectId;
  });
  
  res.send(buildToEdit[buildToEdit.length-1]);
});

router.get("/:buildId", (req, res) => {
  const { projectId, buildId } = req.params;
  const state = store.getState();
  const buildToEdit = state.builds.find((build) => {
    return build.projectId === projectId && build.buildNumber === ~~buildId;
  });
  res.send(buildToEdit);
});

module.exports = router;
