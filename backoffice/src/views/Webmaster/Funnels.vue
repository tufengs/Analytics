<template>
  <div class="w-full">
    <h2 class="text-slate-800 font-bold text-2xl">Funnels</h2>
    <div class="pt-3 flex items-center gap-x-3">
      <v-select 
        multiple 
        :items="tags"
        v-model="tagsToAdd" 
        placeholder="Select tags"
        density="compact" 
        item-title="comment"
        hide-details
        return-object 
      />
      <v-btn @click="create" variant="tonal" color="purple-darken-3">Create</v-btn>
    </div>

    <v-list class="grid grid-cols-3 gap-3">
      <v-list-item v-for="funnel in funnels" class="shadow-lg rounded-lg !p-6">
        <div v-for="tag in funnel.tags">{{ tag.comment }}</div>
        <template #subtitle>
          {{ funnel._id }}
        </template>
        <template #append>
          <!-- <v-btn @click="copyToClipboard(funnel._id)" variant="tonal" color="purple-darken-3" rounded height="40" width="40" class="!p-0">
            <font-awesome-icon :icon="['fas', 'clipboard']" />
          </v-btn> -->
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {useFunnelStore} from "@/stores/funnel";
import {useTagStore} from "@/stores/tag";
import { storeToRefs } from "pinia";
import { createToast } from "mosha-vue-toastify";
const funnelStore = useFunnelStore();
const tagStore = useTagStore();
const { getTags } = tagStore;
const {getFunnels, createFunnel} = funnelStore;
const { funnels } = storeToRefs(funnelStore);
const tags = ref([]);
const tagsToAdd = ref([])

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
    await createFunnel({ tags: tagsToAdd.value });
    tagsToAdd.value = [];
  } catch (error) {
    
  }
}
</script>

<style scoped>

</style>
