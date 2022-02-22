<script setup lang="ts">
import type { ResultsEntity } from "types";
import { store } from "../store";

import { computed, ref } from "vue";
const emit = defineEmits<{
  (e: "setPerson", value: null): void;
}>();
const props = defineProps<{ person: ResultsEntity }>();
const {
  cell,
  dob,
  email,
  gender,
  location,
  login,
  name,
  nat,
  phone,
  picture,
} = props.person;

const userIsFavorite = computed(() => {
  const users = store.state.favoriteUsers;
  const found = users.find((user) => user.login.uuid === props.person.login.uuid);
  if (found) {
    return true;
  }
  return false;
});
function goBack() {
  // sets the singlePerson object to null, to go back to the list
  emit("setPerson", null);
}
const addToFavorites = (person: ResultsEntity) => {
  store.commit("addUserToFavorites", person);
};

const passwordType = ref(true);
let imgUrl = `https://flagcdn.com/24x18/${nat.toLowerCase()}.png`;
</script>

<template>
  <div class="bg-gray-700 h-full flex flex-col">
    <!-- Top bar -->
    <div class="h-14 p-2 flex justify-between items-center">
      <div>
        <button
          @click="goBack"
          class="p-2 bg-green-400 rounded-lg text-black hover:bg-green-700"
        >
          Go Back
        </button>
      </div>
      <div @click.stop="addToFavorites(props.person)">
        <button>
          <i
            :class="`fas fa-star text-2xl ${userIsFavorite ? 'text-yellow-400' : ''}`"
          ></i>
        </button>
      </div>
    </div>
    <!-- Card -->
    <div class="flex-grow p-4 h-full">
      <div class="bg-gray-200 h-full p-2 rounded-lg text-black">
        <div class="grid grid-cols-4 grid-rows-4 gap-2 h-full">
          <!--  -->
          <div
            class="col-span-4 row-span-1 bg-gray-50 h-full flex justify-center items-center"
          >
            <img :src="picture.large" :alt="name.first" class="md:h-full rounded h-3/4" />
          </div>
          <!--  -->
          <div class="col-span-4 bg-gray-50 flex items-center justify-center h-full">
            <p class="text-3xl font-semibold text-center">
              {{ name.title }} {{ name.first }} {{ name.last }}
            </p>
          </div>
          <!--  -->
          <div class="col-span-2 row-span-1 text-center h-full bg-gray-50">
            <p class="underline font-medium">Personal Information</p>
            <div>
              <ul class="pt-5">
                <li class="p-2">
                  <div class="flex justify-between">
                    <div class="font-semibold">Gender</div>
                    <div>
                      <span>{{ gender }}</span>
                    </div>
                  </div>
                </li>
                <li class="p-2">
                  <div class="flex justify-between">
                    <div class="font-semibold">Date Of Birth</div>
                    <div>
                      <span>{{ new Date(dob.date).toLocaleDateString() }}</span>
                    </div>
                  </div>
                </li>
                <li class="p-2">
                  <div class="flex justify-between">
                    <div class="font-semibold">Age</div>
                    <div>
                      <span>{{ dob.age }}</span>
                    </div>
                  </div>
                </li>
                <li class="p-2">
                  <div class="flex justify-between flex-wrap">
                    <div class="font-semibold">Place Of Birth</div>
                    <div class="flex gap-2">
                      {{ nat }}
                      <img
                        :src="imgUrl"
                        srcset="
                          https://flagcdn.com/32x24/za.png 2x,
                          https://flagcdn.com/48x36/za.png 3x
                        "
                        width="24"
                        height="18"
                        alt="South Africa"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-span-2 text-center bg-gray-50">
            <p class="underline font-medium">Contact Information</p>
            <div>
              <ul class="pt-5">
                <li class="p-2">
                  <div class="flex justify-between">
                    <div class="font-semibold">Phone Number</div>
                    <div class="text-green-500 underline">
                      <a :href="`tel:` + phone">{{ phone }}</a>
                    </div>
                  </div>
                </li>
                <li class="p-2">
                  <div class="flex justify-between">
                    <div class="font-semibold">Cell Number</div>
                    <div class="text-green-500 underline">
                      <a :href="`tel:` + cell">{{ cell }}</a>
                    </div>
                  </div>
                </li>
                <li class="p-2">
                  <div class="flex justify-between flex-wrap">
                    <div class="font-semibold">Email</div>
                    <div class="text-green-500 underline">
                      <a :href="`mailto:` + email">{{ email }}</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-span-2 text-center row-span-2 bg-gray-50">
            <p class="underline font-medium">Location Information</p>
            <div class="flex h-full justify-center items-center">
              <a
                :href="`https://www.google.com/maps/search/?api=1&query=${location.coordinates.latitude},${location.coordinates.longitude}`"
                class="text-green-500 underline"
                target="_blank"
              >
                <address>
                  {{ location.street.name }}{{ location.street.number }}
                  <br />
                  {{ location.city }} {{ location.state }}
                  {{ location.postcode }}
                  <br />
                  {{ location.country }}
                </address>
              </a>
            </div>
          </div>
          <div class="col-span-2 text-center row-span-2 bg-gray-50">
            <p class="underline font-medium">Credential</p>
            <div>
              <ul class="pt-5">
                <li class="p-2">
                  <div class="flex justify-between">
                    <div class="font-semibold">Username</div>
                    <div>
                      <input type="text" :value="login.username" disabled />
                    </div>
                  </div>
                </li>
                <li class="p-2">
                  <div class="flex justify-between">
                    <div class="font-semibold">Password</div>
                    <div
                      class="text-green-500 underline flex flex-col justify-center items-center"
                    >
                      <input
                        :type="passwordType ? 'password' : 'text'"
                        :value="login.password"
                        disabled
                      />
                      <div>
                        <button
                          class="p-1 bg-gray-900 text-white rounded-lg"
                          @click="passwordType = !passwordType"
                        >
                          {{ passwordType ? "show" : "hide" }}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
