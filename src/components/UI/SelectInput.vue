<script setup lang="ts">
//https://vuejs.org/api/utility-types.html#proptype-t
import type { PropType } from "vue";
// https://vuejs.org/guide/typescript/composition-api.html#typing-component-emits
const emit = defineEmits<{
  (e: "update", value: string): void;
}>();
//https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  options: {
    type: Object as PropType<{ name: String; value: String }[]>,
    required: true,
  },
});
const { id, name, options, label } = props;
// Send the emit "update", with the value of the option selected to the parent
function updateQuery(e: Event) {
  const target = <HTMLInputElement>e.target;
  emit("update", target.value);
}
</script>

<template>
  <div class="flex flex-col gap-2 text-center">
    <label :for="id">{{ label }}</label>
    <select
      :name="name"
      :id="id"
      class="p-2 text-black rounded-lg"
      @change="updateQuery($event)"
    >
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<style></style>
