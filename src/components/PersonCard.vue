<script setup lang="ts">
import type { ResultsEntity } from "types";
import { computed, ref } from "vue";
import { store } from "../store";
const props = defineProps<{ person: ResultsEntity }>();

let imgUrl = computed(
  () => `https://flagcdn.com/24x18/${props.person.nat.toLowerCase()}.png`
);

const addToFavorites = (person: ResultsEntity) => {
  store.commit("addUserToFavorites", person);
};

const userIsFavorite = computed(() => {
  const users = store.state.favoriteUsers;
  const found = users.find((user) => user.login.uuid === props.person.login.uuid);
  if (found) {
    return true;
  }
  return false;
});
</script>

<template>
  <div
    class="bg-gray-800 h-60 rounded-lg flex flex-col items-center p-2 cursor-pointer hover:bg-gray-500"
  >
    <div class="flex-grow justify-end flex w-full">
      <i
        @click.stop="addToFavorites(props.person)"
        :class="`fas fa-star text-2xl ${userIsFavorite ? 'text-yellow-400' : ''}`"
      ></i>
    </div>
    <div class="flex-grow">
      <img
        :src="props.person.picture.large"
        :alt="props.person.name.first"
        class="rounded-full"
      />
    </div>
    <div class="flex-grow"></div>
    <div class="flex-grow">
      <div class="flex gap-2">
        <div>Name: {{ props.person.name.first }} {{ props.person.name.last }}</div>
        <img :src="imgUrl" width="24" height="18" alt="South Africa" />
      </div>
    </div>
  </div>
</template>
