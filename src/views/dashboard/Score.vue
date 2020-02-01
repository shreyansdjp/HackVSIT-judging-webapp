<template>
  <div class="container">
    <template v-if="teamData !== null">
      <div class="row">
        <div class="col d-flex">
          <v-btn fab text @click="goBack()">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <div class="pl-2">
            <p class="h1 font-weight-bold m-0">{{ teamData.team_name }}</p>
            <p>{{ teamData.participants.length }} Participants</p>
          </div>
        </div>
      </div>

      <template v-if="teamData.participants.length > 0">
        <div class="row">
          <div
            class="col-md-4 mb-4"
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

      <hr />

      <template>
        <div class="row">
          <div class="col">
            <p class="h4">Review</p>
          </div>
        </div>

        <v-form @submit.prevent="submitReview" class="mb-5">
          <template v-if="criterias !== null">
            <div
              class="row mb-5"
              v-for="(criteria, index) in criterias"
              :key="criteria.id"
            >
              <div class="col">
                <v-card>
                  <v-card-title>
                    {{ criteria.description }}
                  </v-card-title>
                  <v-card-text>
                    <v-select
                      v-model="selections[index]"
                      :items="criteria.options"
                      item-text="description"
                      return-object
                      clearable
                      label="Score"
                      outlined
                      aria-required
                    ></v-select>
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </template>

          <div class="row">
            <div class="col">
              <v-btn color="primary" type="submit" block>submit review</v-btn>
            </div>
          </div>
        </v-form>
      </template>
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
    this.getCriterias();
  },

  data: () => ({
    teamId: null,
    teamData: null,
    feasibility: null,
    scalability: null,
    innovative: null,
    basedOnTheme: null,
    prototype: null,
    originality: null,
    criterias: null,
    selections: []
  }),

  methods: {
    getTeamData() {
      this.$http
        .get(urls.getTeam(this.teamId))
        .then(response => {
          this.teamData = response.data;
        })
        .catch(() => {
          this.teamData = null;
        });
    },
    getCriterias() {
      this.$http
        .get(urls.getCriteria)
        .then(response => {
          this.criterias = response.data;
        })
        .catch(() => {
          this.criterias = null;
        });
    },
    submitReview() {
      let criterias = [];

      for (let i = 0; i < this.selections.length; i++) {
        if (typeof this.selections[i] === "object") {
          criterias.push(this.selections[i]);
        }
      }

      this.$http
        .post(urls.submitReview(this.teamId), {
          criterias
        })
        .then(() => {
          this.$router.push({ name: "home" });
          this.$toastr.s("Review Submitted Successfully!");
        })
        .catch(() => {
          this.$toastr.e("Error in submitting review");
        });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
