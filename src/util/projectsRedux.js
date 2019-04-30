const redux = require("redux");
const shortId = require("shortid");

const initialProjectState = {
  projects: [],
};

const addProject = (project) => ({
  type: "ADD_PROJECT",
  project,
});

const deleteProject = (id) => ({
  type: "DELETE_PROJECT",
  id,
});

const patchProject = (id, changes) => ({
  type: "PATCH_PROJECT",
  id,
  changes,
});

const reducer = (state = initialProjectState, action) => {
  switch (action.type) {
    case "ADD_PROJECT": {
      action.project.id = shortId.generate();
      const newState = { projects: [...state.projects, action.project] };
      return newState;
    }
    case "DELETE_PROJECT": {
      const newState = {
        projects: state.projects.filter((project) => {
          return project.id !== action.id;
        }),
      };
      return newState;
    }
    case "PATCH_PROJECT": {
      const newState = { projects: [...state.projects] };
      const projectToEdit = newState.projects.find((project) => {
        return project.id === action.id;
      });

      for (const key in action.changes) {
        projectToEdit[key] = action.changes[key];
      }

      return newState;
    }
  }
  return state;
};
const store = redux.createStore(reducer, initialProjectState);

module.exports = { store, addProject, deleteProject, patchProject };
