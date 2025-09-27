<template>
  <el-table-column :label="header.label" :prop="header.key" align="center" min-width="100">
    <template v-if="header.children && header.children.length">
      <TableColumn
        v-for="(childHeader, index) in header.children"
        :key="index"
        :header="childHeader"
      />
    </template>
    <template v-if="!header.children || !header.children.length" #default="scope">
      <!-- Gemini -->
      <slot :name="header.key" v-bind:item="{item: scope.row}">
        {{ scope.row[header.key] }}
      </slot>
    </template>
  </el-table-column>
</template>
<script setup>
const props = defineProps({
  header: {
    type: Object,
    required: true,
  },
})
</script>
<style></style>
