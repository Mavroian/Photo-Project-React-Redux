const redux = require("redux");
const shortId = require("shortid");

const initialProjectState = {
  projects: [],
};

const addProject = (project) => ({
  type: "ADD_PROJECT",
  project,
});

const getProjectById = (project) => ({
  type: "GET_PROJECT_BY_ID",
  project,
});

const reducer = (state = initialProjectState, action) => {
  switch (action.type) {
    case "ADD_PROJECT": {
      action.project.id = shortId.generate();
      console.log("logging id", action.project.id);
      const newState = { projects: [...state.projects, action.project] };
      return newState;
    }
    case "GET_PROJECT_BY_ID": {
      const requestedProject = state.projects.find((project) => {
        return project.id === action.project.id;
      });
    }
  }
  return state;
};
const store = redux.createStore(reducer, initialProjectState);

module.exports = { store, addProject };
