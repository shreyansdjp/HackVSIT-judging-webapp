<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <p class="h1">Team Search</p>
        <hr />
      </div>
    </div>

    <v-form @submit.prevent="getTeams">
      <div class="row">
        <div class="col-md-11">
          <v-text-field
            v-model="query"
            outlined
            placeholder="Search Team"
          ></v-text-field>
        </div>
        <div class="col-md-1 d-flex justify-content-center">
          <v-btn fab text type="submit">
            <v-icon>search</v-icon>
          </v-btn>
        </div>
      </div>
    </v-form>

    <div class="row">
      <template v-if="teams !== null">
        <template v-if="teams.length > 0">
          <div class="col-md-4" v-for="team in teams" :key="team.id">
            <v-card>
              <v-card-text>
                <p class="h4 text-dark m-0 font-weight-bold">
                  {{ team.team_name }}
                </p>
                <p class="subtitle-1">
                  {{ team.participants.length }} Participants
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="primary"
                  :to="{ name: 'review', params: { teamId: team.id } }"
                >
                  Review
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </template>

        <template v-else>
          <div class="col">
            <v-card>
              <v-card-text>
                No Teams for the related query.
              </v-card-text>
            </v-card>
          </div>
        </template>
      </template>
      <template v-else-if="loading">
        <div class="col d-flex justify-content-center pa-12 ma-12">
          <v-progress-circular indeterminate color="primary" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import urls from "@/shared/urls";

export default {
  name: "TeamSearch",

  data: () => ({
    query: "",
    teams: null,
    loading: false
  }),

  methods: {
    getTeams() {
      this.loading = true;
      this.teams = null;
      this.$http
        .get(urls.getTeams(this.query))
        .then(response => {
          this.loading = false;
          this.teams = response.data;
        })
        .catch(() => {
          this.loading = false;
          this.teams = [];
        });
    }
  }
};
</script>
