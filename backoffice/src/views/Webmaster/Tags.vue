<template>
  <div class="w-full">
    <h2 class="text-slate-800 font-bold pb-3 text-2xl">Tags</h2>
    <div class="pb-3 flex items-center gap-x-3">
      <v-text-field  v-model="comment" density="compact" placeholder="Enter tag name" hide-details @keyup.enter="create" />
      <v-btn @click="create" variant="tonal" color="purple-darken-3">Create</v-btn>
    </div>
    <v-list class="grid grid-cols-3 gap-3">
      <v-list-item v-for="tag in tags" class="shadow-lg rounded-lg !p-6">{{ tag.comment }}
        <template #subtitle>
          {{ tag._id }}
        </template>
        <template #append>
          <v-btn @click="copyToClipboard(tag._id)" variant="tonal" color="purple-darken-3" rounded height="40" width="40" class="!p-0">
            <font-awesome-icon :icon="['fas', 'clipboard']" />
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {useTagStore} from "@/stores/tag";
import { storeToRefs } from "pinia";
import { createToast } from "mosha-vue-toastify";
const tagStore = useTagStore();
const {getTags, createTag} = tagStore;
const { tags } = storeToRefs(tagStore);
const comment = ref('');

onMounted(async () => {
  try {
    await getTags();
  } catch (error) {
    
  }
})

const copyToClipboard = (id: string) => {
  try {
    navigator.clipboard.writeText(id);
    createToast('Id copied to clipboard', { type: 'success', position: 'bottom-right' })
  } catch (error) {
  }
}
const create = async () => {
  try {
    await createTag({ comment: comment.value });
    comment.value = "";
  } catch (error) {
    
  }
}

const handleImpersonateUser = (id: string) => {

}
</script>

<style scoped>

</style>
