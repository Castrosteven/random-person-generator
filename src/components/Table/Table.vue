<script setup lang="ts">
import { computed, ref } from "vue";
import type { ResultsEntity } from "../../../types";
import { store } from "../../store";

const emit = defineEmits<{
  (e: "setPerson", value: ResultsEntity): void;
}>();
const props = defineProps<{ people: ResultsEntity[]; numberOfPages: number }>();
const Headers = ref(["Name", "Gender", "Location", "Favorite"]);
const currentPage = ref(1);

const start = ref(0);
const end = ref(10);

const filterdPeopleArray = computed(() => {
  const offset = (currentPage.value - 1) * 10;
  return props.people.slice(offset).slice(start.value, end.value);
});

const userIsFavorite = (person: ResultsEntity) => {
  const users = store.state.favoriteUsers;
  const found = users.find((user) => user.login.uuid === person.login.uuid);
  if (found) {
    return true;
  }
  return false;
};

const addToFavorites = (person: ResultsEntity) => {
  store.commit("addUserToFavorites", person);
};
</script>

<template>
  <table class="rounded-lg">
    <thead class="bg-green-400 text-black">
      <tr class="h-4">
        <th v-for="(header, index) in Headers" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody class="text-black">
      <tr
        class="odd:bg-white even:bg-slate-100 hover:bg-gray-300 cursor-pointer"
        v-for="(person, index) in filterdPeopleArray"
        :key="index"
        @click.stop="emit('setPerson', person)"
      >
        <td class="flex items-center gap-4">
          <img :src="person.picture.large" class="rounded-full h-8" />
          <div>
            <span>{{ person.name.first }} {{ person.name.last }}</span>
          </div>
        </td>

        <td>
          <span class="flex justify-start items-center">
            <button @click.stop="addToFavorites(person)">
              <i
                :class="` text-2xl fas fa-${person.gender} ${
                  person.gender === 'female' ? 'text-red-400' : 'text-blue-400'
                }`"
              ></i>
            </button>
          </span>
        </td>
        <td>
          <span>{{ person.location.country }}</span>
        </td>
        <td>
          <span class="flex justify-start items-center">
            <i
              :class="`fas fa-star text-2xl ${
                userIsFavorite(person) ? 'text-yellow-400' : ''
              }`"
            ></i>
          </span>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr class="text-black">
        <td>Page {{ currentPage }} of {{ props.numberOfPages }}</td>
        <td></td>
        <td></td>

        <td>
          <div class="flex justify-center">
            <div class="flex gap-5">
              <button
                class="bg-green-400 p-2 rounded-lg disabled:bg-gray-500"
                :disabled="currentPage === 1"
                @click="currentPage--"
              >
                Previous
              </button>
              <button
                :disabled="numberOfPages === currentPage"
                class="bg-green-400 p-2 rounded-lg disabled:bg-gray-500"
                @click="currentPage++"
              >
                Next
              </button>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  border: 1px solid black;
}
th,
td {
  text-align: left;
  padding: 12px;
}
</style>
