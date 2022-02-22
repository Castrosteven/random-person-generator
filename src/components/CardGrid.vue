<script setup lang="ts">
import type { ResultsEntity } from "types";
import PersonCard from "./PersonCard.vue";

const emit = defineEmits<{
  (e: "setPerson", value: ResultsEntity): void;
}>();

const props = defineProps<{ people: ResultsEntity[] }>();
</script>

<template>
  <div class="grid grid-cols-3 gap-2 grid-rows-4 p-2">
    <div v-for="(person, index) in props.people" :key="index">
      <PersonCard :person="person" @click="emit('setPerson', person)" />
    </div>
  </div>
</template>
