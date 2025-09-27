<template>
  <div class="table-container">
    <el-table
      :data="items"
      :row-key="itemKey"
      class="desktop-table custom-el-table"
      border
      style="width: 100%"
    >
      <el-table-column label="" width="50" align="center">
        <template #default="scope">
          <!-- 如果是第一行则显示展开图标 -->
          <span class="expand-placeholder">▶</span>
        </template>
      </el-table-column>

      <template v-for="(headerRow, index) in headers" :key="index">
        <template v-for="(header, hIndex) in headerRow" :key="hIndex">
          <TableColumn :header="header">
            <template v-for="(col) in finalColumns" #[col.key]="scope">
                <!-- TO DO -->
              <slot :name="col.key" :item="scope.row">{{ hIndex }}</slot>
            </template>
          </TableColumn>
        </template>
      </template>
    </el-table>
    <div class="mobile-card-list"></div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import TableColumn from './TableColumn.vue'

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  itemKey: {
    type: String,
    default: 'id',
  },
})
const finalColumns = computed(() => {
  const columns = []
  function extractColumns(headerArray) {
    headerArray.forEach((header) => {
      if (header.children) {
        extractColumns(header.children)
      } else {
        columns.push(header)
      }
    })
  }
  if (props.headers.length > 0) {
    extractColumns(props.headers[0])
  }
  return columns
})
</script>
<style lang="scss" scoped></style>
