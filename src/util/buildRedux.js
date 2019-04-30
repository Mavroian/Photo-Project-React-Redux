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
const reducer = (state = initialBuildstate, action) => {
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
      const newState = { builds: [...state.builds, newBuild] };
      return newState;
    }
    case "START_BUILD": {
      const newState = { builds: [...state.builds] };
      console.log(1, newState);
      const buildToEdit = newState.builds.find((build) => {
        return (
          build.projectId === action.projectId &&
          build.buildNumber === action.buildId
        );
      });

      buildToEdit.state = "Running";
      console.log(2, newState);
      return newState;
    }
  }
  return state;
};
const store = redux.createStore(reducer, initialBuildState);

module.exports = { store, addBuild, startBuild };
