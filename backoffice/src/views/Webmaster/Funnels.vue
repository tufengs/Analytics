<template>
  <div class="w-full">
    <h2 class="text-slate-800 font-bold text-2xl">Funnels</h2>
    <div class="pt-3 flex items-center gap-x-3">
      <v-text-field v-model="comment" density="compact" placeholder="Enter funnel name" hide-details />
      <v-select multiple :items="tags" v-model="tagsToAdd" placeholder="Select tags" density="compact"
        item-title="comment" hide-details return-object />
      <v-btn @click="create" variant="tonal" color="purple-darken-3">Create</v-btn>
    </div>

    <v-list class="grid grid-cols-3 gap-3 overflow-visible">
      <v-list-item v-for="funnel in funnels" class="shadow-lg rounded-lg !p-6">
        <template #title>
          <h1 class="text-lg font-bold">{{ funnel.comment }}</h1>
        </template>
        <template #subtitle>
          <p class="pb-4">{{ funnel._id }}</p>
        </template>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col" v-for="tag in funnel.tags">
            <p class="font-semibold">{{ tag.comment }}</p>
            <span class="text-xs opacity-60">
              {{ tag._id }}
              <font-awesome-icon @click="copyToClipboard(tag._id)" class="cursor-pointer ms-1"
                :icon="['fas', 'clipboard']" />
            </span>
          </div>
        </div>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFunnelStore } from "@/stores/funnel";
import { useTagStore } from "@/stores/tag";
import { storeToRefs } from "pinia";
import { createToast } from "mosha-vue-toastify";
const funnelStore = useFunnelStore();
const tagStore = useTagStore();
const { getTags } = tagStore;
const { getFunnels, createFunnel } = funnelStore;
const { funnels } = storeToRefs(funnelStore);
const tags = ref([]);
const tagsToAdd = ref([])
const comment = ref('')

onMounted(async () => {
  try {
    await getFunnels();
    tags.value = await getTags();
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
    if (!comment.value) return createToast('Please enter a funnel name', { type: 'warning', position: 'bottom-right' });
    if (!tagsToAdd.value.length) return createToast('Please select at least one tag', { type: 'warning', position: 'bottom-right' });
    await createFunnel({ comment: comment.value, tags: tagsToAdd.value });
    comment.value = "";
    tagsToAdd.value = [];
  } catch (error) {

  }
}
</script>

<style scoped></style>
