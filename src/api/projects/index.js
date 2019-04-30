const router = require("express").Router();
const builds = require("./builds");
const {
  store,
  addProject,
  deleteProject,
  patchProject,
} = require("../../util/projectsRedux");

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
  const state = store.getState();
  res.send(
    state.projects.find((proj) => {
      return proj.id === projectId;
    })
  );
});

router.patch("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const project = req.body;
  const state = store.dispatch(patchProject(projectId, project));
  res.send(state);
});

router.delete("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const state = store.dispatch(deleteProject(projectId));
  res.send(state);
});

router.use("/:projectId/builds", builds);

module.exports = router;
