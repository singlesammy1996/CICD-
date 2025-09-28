<!-- <template>
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
          <span class="expand-placeholder">▶</span>
        </template>
      </el-table-column>

      <template v-for="(headerRow, index) in headers" :key="index">
        <template v-for="(header, hIndex) in headerRow" :key="hIndex">
          <TableColumn :header="header">
            <template v-for="(col) in finalColumns" #[col.key]="scope">
              <slot :name="col.key" :item="scope.row"></slot>
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
<style lang="scss" scoped></style> -->
<template>
  <div class="table-container">
    <el-table
      :data="items"
      :row-key="itemKey"
      class="desktop-table custom-el-table"
      border
      ref="tableRef"
      @expand-change="handleExpandChange"
      style="width: 100%"
    >
      <!-- 添加展开列 -->
      <el-table-column type="expand">
        <template #default="scope">
          <div class="expand-content">
            <slot name="expand" :row="scope.row" :scope></slot>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="" width="50" align="center">
        <template #default="scope">
          <span class="expand-placeholder">▶</span>
        </template>
      </el-table-column>

      <template v-for="(headerRow, index) in headers" :key="index">
        <template v-for="(header, hIndex) in headerRow" :key="hIndex">
          <TableColumn :header="header">
            <!-- 将所有插槽传递给TableColumn组件 -->
            <template v-for="(_, slotName) in $slots" #[slotName]="scope">
              <slot :name="slotName" v-bind="scope"></slot>
            </template>
          </TableColumn>
        </template>
      </template>
    </el-table>
    <div class="mobile-card-list"></div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import TableColumn from './TableColumn.vue'

// 将sampleData移到defineProps之外的作用域
const tableRef = ref(null)

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    default: () => [
      {
        id: 1,
        name: '张三',
        age: 25,
        email: 'zhangsan@example.com',
        address: '北京市朝阳区',
        details: {
          phone: '13800138000',
          hobby: '篮球, 游泳',
          education: '本科',
        },
      },
      {
        id: 2,
        name: '李四',
        age: 30,
        email: 'lisi@example.com',
        address: '上海市浦东新区',
        details: {
          phone: '13900139000',
          hobby: '阅读, 旅行',
          education: '硕士',
        },
      },
      {
        id: 3,
        name: '王五',
        age: 28,
        email: 'wangwu@example.com',
        address: '广州市天河区',
        details: {
          phone: '13700137000',
          hobby: '音乐, 电影',
          education: '博士',
        },
      },
    ], // 使用示例数据作为默认值
  },
  itemKey: {
    type: String,
    default: 'id',
  },
})
const emit = defineEmits(['expand-change'])

const handleExpandChange = (row, expandedRows) => {
  emit('expand-change', row, expandedRows)
}

const toggleRowExpansion = (row, expanded) => {
  tableRef.value.toggleRowExpansion(row, expanded)
}

defineExpose({
  toggleRowExpansion,
  tableRef,
})
</script>
<style scoped>
.expand-content {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin: 10px;
}
</style>
