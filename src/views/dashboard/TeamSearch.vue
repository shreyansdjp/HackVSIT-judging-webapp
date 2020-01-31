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
        <div class="col-md-1">
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
        <template v-else></template>
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
    teams: null
  }),

  methods: {
    getTeams() {
      this.$http
        .get(urls.getTeams(this.query))
        .then(response => {
          this.teams = response.data;
        })
        .catch(console.log);
    }
  }
};
</script>
