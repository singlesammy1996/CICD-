<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
// window.num = 100
// const fn = function() {
//   return {
//     num: 200,
//     innerFn: function () {
//       console.log(this.num)
//     },
//     arrowFn: () => {
//       console.log(this.num)
//     }
//   }
// }
// const obj = fn()
// obj.innerFn() // 200
// obj.arrowFn() // 100
// const a = fn().innerFn
// a()

// 自定义表格组件部分
import DataTable from './components/DataTable.vue'
import { ref } from 'vue'
const dataTableRef = ref()
// 多级表头
const tableHeaders = [
  [
    // 第一列：基础信息 (父级)
    {
      label: '基础信息',
      children: [
        { label: 'ID', key: 'id' },
        { label: '姓名', key: 'name' },
      ],
    },
    // 第二列：销售业绩 (父级)
    {
      label: '销售业绩（单位：元）',
      children: [
        { label: '季度销售', key: 'qtr_sales' },
        { label: '年度目标', key: 'annual_sales' },
      ],
    },
    // 第三列：操作（单列）
    {
      label: '操作',
      key: 'action',
    },
  ],
]
// 表格数据
const tableData = [
  {
    id: 1001,
    name: '张三',
    qtr_sales: 12000,
    annual_sales: 48000,
    detail: '张三是团队的核心成员，年度目标完成度高。',
  },
  {
    id: 1002,
    name: '李四',
    qtr_sales: 18000,
    annual_sales: 72000,
    detail: '李四超额完成季度目标，已提前锁定年度奖金',
  },
  {
    id: 1003,
    name: '王五',
    qtr_sales: 8500,
    annual_sales: 34000,
    detail: '王五的季度目标完成度低于要求，需提高目标完成度。',
  },
]

const handleExpandChange = (row, expandedRows) => {
  console.log('展开状态变化:', row, expandedRows)
}

const toggleExpand = (row) => {
  dataTableRef.value.toggleRowExpansion(row)
}
// 自定义表格组件部分
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->

  <!-- 表格 -->
  <div style="padding: 20px">
    <h1>基础表格展示</h1>
    <DataTable :headers="tableHeaders" :items="tableData" item-key="id" ref="dataTableRef">
      <template #annual_sales="{ item }">
        <span :style="{ color: item.annual_sales > 5000 ? 'green' : 'red' }" class="font-medium">
          ${{ item.annual_sales.toLocaleString() }}
        </span>
      </template>

      <template #name="{ item }">
        <span style="font-weight: bold; color: #409eff"> {{ item.name }}(ID: {{ item.id }}) </span>
      </template>

      <template #action="{ item }">
        <el-button size="small" @click="toggleExpand(item)">查看详情</el-button>
      </template>

      <template #expand="scope">
        <div style="color:#000 ;width:100%;height:30px;">
          {{ scope.row.detail }}
        </div>
      </template>
    </DataTable>
  </div>
  <!-- 表格 -->
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
