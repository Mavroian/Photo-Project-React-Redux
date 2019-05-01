const redux = require("redux");

const initialBuildState = {
  builds: [],
};

const addBuild = (projectId) => ({
  type: "ADD_BUILD",
  projectId,
});

const startBuild = (projectId, buildId) => ({
  type: "START_BUILD",
  projectId,
  buildId,
});

const buildCounter = {};
const reducer = (state = initialBuildState, action) => {
  switch (action.type) {
    case "ADD_BUILD": {
      if (buildCounter.hasOwnProperty(action.projectId)) {
        buildCounter[action.projectId]++;
      } else {
        buildCounter[action.projectId] = 0;
      }

      const newBuild = {
        projectId: action.projectId,
        buildNumber: buildCounter[action.projectId], // A continuous number incrementing for each build in a project
        state: "Pending", // One of "Pending" | "Running" | "Success" | "Failed"
        output: "Wating for output",
      };
      setTimeout(() => {
        newBuild.state = "Running";
      }, 3000);
      setTimeout(() => {
        newBuild.state = "Success";
      }, 6000);
      const newState = { builds: [...state.builds, newBuild] };
      return newState;
    }
  }
  return state;
};
const store = redux.createStore(reducer, initialBuildState);

module.exports = { store, addBuild, startBuild };
