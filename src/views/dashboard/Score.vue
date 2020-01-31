<template>
  <div class="container">
    <template v-if="teamData !== null">
      <div class="row">
        <div class="col">
          <p class="h1 font-weight-bold m-0">{{ teamData.team_name }}</p>
          <p>{{ teamData.participants.length }} Participants</p>
          <hr />
        </div>
      </div>

      <template v-if="teamData.participants.length > 0">
        <div class="row">
          <div class="col">
            <p class="h4 m-0">Participants</p>
          </div>
        </div>
        <div class="row">
          <div
            class="col-md-4"
            v-for="participant in teamData.participants"
            :key="participant.id"
          >
            <v-card>
              <v-card-text>
                <p class="h4 m-0 text-dark font-weight-bold">
                  {{ participant.first_name }}
                  {{ participant.last_name }}
                </p>
                <p class="subtitle-1">{{ participant.email }}</p>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </template>

      <template></template>

    </template>

    <template v-else>
      <div class="row">
        <div class="col d-flex justify-content-center pa-12 ma-12">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import urls from "@/shared/urls";

export default {
  name: "Score",

  beforeMount: function() {
    this.teamId = this.$route.params.teamId;
    this.getTeamData();
  },

  data: () => ({
    teamId: null,
    teamData: null
  }),

  methods: {
    getTeamData() {
      this.$http
        .get(urls.getTeam(this.teamId))
        .then(response => {
          this.teamData = response.data;
        })
        .catch(console.log);
    }
  }
};
</script>
