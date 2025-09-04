<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      {{ $t('headTxt.user.name') }}
    </div>
    <MyElInput placeholder="请输入内容">
      <template #prepend>
        pppppppre
      </template>
      <template #append>
        appppppppend
      </template>
    </MyElInput>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import MyElInput from '@/components/MyElInput.vue';
import { useI18n } from 'vue-i18n';

interface ApiResponse<T> {
  code: number;
  data: T;
  message: string
}
async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const res = await axios.get(url)
  return res.data
}

// const {t} = useI18n()

</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
