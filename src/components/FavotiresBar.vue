<script setup lang="ts">
import { useStore } from "vuex";
import { key } from "../store";
const store = useStore(key);

const emit = defineEmits<{
  (e: "setShowTable", value: null): void;
  (e: "showFavorites", value: null): void;
}>();
const props = defineProps<{ showTable: boolean }>();
const clickHandler = () => {
  emit("setShowTable", null);
};
</script>

<template>
  <div class="bg-green-400 flex justify-between items-center p-2 rounded-lg pr-4 pl-4">
    <div class="text-black">
      <button
        @click="emit('showFavorites', null)"
        class="bg-gray-800 text-white p-2 rounded-lg"
      >
        Show Favorites :
        {{ store.state.favoriteUsers.length }}
      </button>
    </div>
    <div class="flex gap-4">
      <i
        @click="clickHandler"
        :class="`${
          props.showTable ? 'text-gray-500' : 'text-black'
        } fas fa-th-large text-2xl hover:text-green-800`"
      ></i>
      <i
        @click="clickHandler"
        :class="`${
          props.showTable ? 'text-black' : 'text-gray-500'
        } fas fa-table text-2xl hover:text-green-800`"
      ></i>
    </div>
  </div>
</template>
