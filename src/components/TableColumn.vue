<!-- <template>
  <el-table-column :label="header.label" :prop="header.key" align="center" min-width="100">
    <template v-if="header.children && header.children.length">
      <TableColumn
        v-for="(childHeader, index) in header.children"
        :key="index"
        :header="childHeader"
      />
    </template>
    <template v-if="!header.children || !header.children.length" #default="scope">
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
<style></style> -->
<template>
  <el-table-column :label="header.label" :prop="header.key" align="center" min-width="100">
    <template v-if="header.children && header.children.length">
      <TableColumn
        v-for="(childHeader, index) in header.children"
        :key="index"
        :header="childHeader"
      >
        <!-- 传递插槽内容到子组件 -->
        <template v-for="(_, slotName) in $slots" #[slotName]="scope">
          <slot :name="slotName" v-bind="scope"></slot>
        </template>
      </TableColumn>
    </template>
    <template v-if="!header.children || !header.children.length" #default="scope">
      <!-- 使用传入的插槽或默认显示 -->
      <slot :name="header.key" :item="scope.row">
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
