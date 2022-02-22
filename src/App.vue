<script setup lang="ts">
import SelectInput from "./components/UI/SelectInput.vue";
import { computed, ref, watchEffect } from "vue";
import instance from "./services/";
import type { ResponseInterface, ResultsEntity } from "../types";
import PersonCard from "./components/PersonCard.vue";
import SinglePersonCard from "./components/SinglePersonCard.vue";
import Navbar from "./components/Navbar.vue";
import { useStore } from "vuex";
import { key } from "./store";
import FavotiresBar from "./components/FavotiresBar.vue";
import Table from "./components/Table/Table.vue";
import CardGrid from "./components/CardGrid.vue";
const store = useStore(key);

const favoriteUsers = computed(() => store.state.favoriteUsers);

const showTable = ref(false);

const showFavorites = ref(false);

// AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NO, NL, NZ, TR, US
const nats = ref([
  { name: "Random", value: "random" },
  { name: "Australia", value: "AU" },
  { name: "Brazil", value: "BR" },
  { name: "Canada", value: "CA" },
  { name: "Switzerland", value: "CH" },
  { name: "Germany", value: "DE" },
  { name: "Denmark", value: "DK" },
  { name: "Spain", value: "ES" },
  { name: "Finland", value: "FI" },
  { name: "France", value: "FR" },
  { name: "United Kingdom", value: "GB" },
  { name: "Ireland", value: "IE" },
  { name: "Iran", value: "IR" },
  { name: "Norway", value: "NO" },
  { name: "Netherlands", value: "NL" },
  { name: "New Zeland", value: "NZ" },
  { name: "Turkey", value: "TR" },
  {
    name: "United States",
    value: "US",
  },
]);
const genders = ref([
  { name: "Random", value: "random" },
  { name: "Female", value: "female" },
  { name: "Male", value: "male" },
]);

const info = ref();

const loading = ref(true);

const query = ref({
  gender: "",
  nat: "",
  results: 10,
});

const singlePerson = ref<ResultsEntity | null>(null);

const numberOfPages = computed(() => {
  if (query.value.results > 10) {
    return Math.ceil(query.value.results / 10);
  }
  return 1;
});

const people = ref<ResponseInterface["results"]>([]);

watchEffect(async () => {
  loading.value = true;
  const { data } = await instance.get("", {
    params: query.value,
  });
  people.value = data.results;
  info.value = data.info;
  loading.value = false;
});
</script>

<template>
  <main class="h-screen bg-gray-700 text-white">
    <Navbar />
    <div class="container mx-auto h-full pt-20 pb-10 flex flex-col gap-2 pl-2 pr-2">
      <!-- Top Selectors -->
      <div v-if="!singlePerson" class="grid grid-cols-3 grid-rows-1 gap-4">
        <SelectInput
          name="gender-selector"
          id="gender-selector"
          :options="genders"
          label="Select Gender"
          @update="(value) => (query.gender = value)"
        />
        <SelectInput
          name="nat-selector"
          id="nat-selector"
          :options="nats"
          label="Select Nationality"
          @update="(value) => (query.nat = value)"
        />
        <div class="flex flex-col gap-2 text-center">
          <label for="number-of-users">Amount</label>
          <input
            min="1"
            class="text-black p-1.5 rounded-lg"
            type="number"
            required
            v-model="query.results"
          />
        </div>
      </div>
      <!-- Favories Bar -->
      <FavotiresBar
        v-if="people"
        :showTable="showTable"
        @set-show-table="() => (showTable = !showTable)"
        @showFavorites="() => (showFavorites = !showFavorites)"
      />
      <!-- Container -->
      <div
        :class="`container mx-auto bg-gray-200 rounded-lg flex-grow ${
          showTable ? '' : 'overflow-y-auto overflow-auto'
        }`"
      >
        <!-- Loading -->
        <div
          v-if="loading"
          class="text-black font-black text-5xl flex h-full justify-center items-center"
        >
          <div class="flex flex-col gap-5 text-center">
            <span>🤔</span>
            <span>Loading...</span>
          </div>
        </div>
        <div
          v-if="showFavorites && favoriteUsers.length === 0"
          class="text-black font-black text-5xl flex h-full justify-center items-center"
        >
          <div class="flex flex-col gap-5 text-center">
            <span>😞</span>
            <span>No Favorites</span>
          </div>
        </div>
        <div
          v-if="singlePerson === null"
          class="flex h-full justify-around items-center p-2"
        >
          <div class="w-full h-full">
            <Table
              v-if="people && showTable"
              :people="showFavorites ? favoriteUsers : people"
              :numberOfPages="numberOfPages"
              @set-person="(person) => (singlePerson = person)"
            />
            <CardGrid
              v-else-if="people && !showTable"
              :people="showFavorites ? favoriteUsers : people"
              @setPerson="(p) => (singlePerson = p)"
            />
          </div>
        </div>
        <div v-else class="p-2 h-full">
          <SinglePersonCard
            :person="singlePerson"
            @set-person="(n) => (singlePerson = n)"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>

html { html { scroll-behavior: smooth; } html { scroll-behavior: smooth; } html {
scroll-behavior: smooth; }
