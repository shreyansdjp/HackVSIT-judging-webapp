export default {
  login: "/login",
  getTeams: function(query) {
    return `/team/all/?query=${query}`;
  },
  getTeam: function(teamId) {
    return `/team/${teamId}`;
  },
  getCriteria: "/criteria/all",
  submitReview: function(teamId) {
    return `/team/${teamId}/judge`;
  }
};
