<template>
  <div class="my-el-input">
    <h1>自定义elinput</h1>
    <!-- <el-input v-bind="$attrs">
            <div v-for="slot in $slots">
                {{ slot }}
            </div>
        </el-input> -->
    <component :is="h(ElInput, { ...$attrs, ref: changeRef }, $slots)"></component>
  </div>
</template>
<script setup lang="ts">
import { ElInput } from 'element-plus'
import { getCurrentInstance, h, onMounted, type ComponentPublicInstance } from 'vue'
defineOptions({
  name: 'MyElInput',
})
const vm = getCurrentInstance()

// onMounted(() => {
//     console.log(vm)
// })

function changeRef(exposed: ComponentPublicInstance | Element | null) {
  console.log(exposed)
  if (vm !== null) {
    vm.exposed = exposed
  }
}

defineExpose({})
</script>
<style scoped></style>
