<script setup lang="ts">
import { ref } from 'vue'
import { FormInst, useMessage } from 'naive-ui'
import axios from 'axios';
import TitleBar from "../components/common/TitleBar.vue";

const { ipcRenderer } = require('electron')
const message = useMessage()

const activeName = ref('Twitter')
const input_twitter_id = ref('')
const log = ref('')

const formValue = ref(
  {
    twitter: {
      id: 'joebiden',
      followers: null,
      isShowName: false,
      getTime: 5
    }
  }
)

const add_log = (text) => {
  log.value += `[App|${activeName.value}] ${text}\n`
}

const twitter_test = () => {
  console.log('twitter_test')
  add_log(`ID: ${formValue.value.twitter.id} 测试开始`)
  axios.get(`https://api.socialcounts.org/twitter-live-follower-count/${formValue.value.twitter.id}`)
    .then(res => {
      formValue.value.twitter.followers = res.data.API_sub
      add_log(`ID: ${formValue.value.twitter.id} 测试结束\n${JSON.stringify(res.data, null, 2)}`)
      add_log(res.data.API_sub)
      console.log(res.data)
    })
    .catch(err => {
      add_log(`ID: ${formValue.value.twitter.id} 测试失败`)
      add_log(JSON.stringify(err, null, 2))
    })
  axios.get(`http://mlmcounts.herokuapp.com/twitter/api/?name=chaci_YY`)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      add_log(`ID: ${formValue.value.twitter.id} 测试失败`)
      add_log(JSON.stringify(err, null, 2))
    })
}

const open = () => {
  console.log('open')
  add_log(`ID: ${formValue.value.twitter.id} 打开浮窗`)
  let data = {
    url: `/show?type=twitter&id=${formValue.value.twitter.id}&isShowName=${formValue.value.twitter.isShowName}&time=${formValue.value.twitter.getTime}`,
    config: {
      height: 150,
      width: 350,
      transparent: true
    }
  };
  ipcRenderer.invoke("open-win", data);
}
</script>

<template>
  <title-bar />
  <div class="column">
    <div class="container">
      <n-tabs default-value="Twitter" type="segment" animated>
        <n-tab-pane name="Twitter" tab="Twitter">
          <n-card title="平台配置" style="margin-bottom: 15px">
            <div style="display: flex;align-items: center;">
              <n-tag :color="{ color: '#fff' }" :bordered="false" size="large" style="min-width: 70px;margin-right: 10px;">
                Twitter ID
              </n-tag>
              
              <n-input-group>
                <n-input-group-label>@</n-input-group-label>
                <n-input style="width: 100%;" v-model:value="formValue.twitter.id" type="text" placeholder="输入Twitter ID" />
              </n-input-group>
            </div>
            <div style="margin-top: 10px;display: flex;align-items: center;">
              <n-tag :color="{ color: '#fff' }" :bordered="false" size="large" style="min-width: 70px;margin-right: 10px;">
                请求延迟
              </n-tag>
              <n-input-number v-model:value="formValue.twitter.getTime" clearable placeholder="推荐 5~10 秒">
                <template #suffix>
                  秒
                </template>
              </n-input-number>
            </div>
            <div style="margin-top: 10px;">
              <n-checkbox v-model:checked="formValue.twitter.isShowName">
                显示名称（需要连接VPN）
              </n-checkbox>
            </div>
            <div style="margin-top: 10px;">
              <n-grid x-gap="12" :cols="4">
                <n-gi>
                  <n-button style="width: 100%;" @click="twitter_test">测试</n-button>
                </n-gi>
                <n-gi :span="3">
                  <n-button type="primary" style="width: 100%;" @click="open">
                    打开浮窗
                  </n-button>
                </n-gi>
              </n-grid>
            </div>
          </n-card>
          <n-card title="测试结果" style="margin-bottom: 15px">
            <n-statistic label="粉丝数">
              {{ formValue.twitter.followers?formValue.twitter.followers:'未测试' }}
              <template #suffix v-if="formValue.twitter.followers">
                人
              </template>
            </n-statistic>
            <n-log :log="log" style="max-height: 200px;margin-top: 10px;" />
          </n-card>
        </n-tab-pane>
        <n-tab-pane name="Bilibili" tab="Bilibili">
          开发中...
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>

<style scoped>
.column {
  padding-top: 30px;
}

.container {
  margin: 15px;
}

.input {
  display: flex;
  align-items: center;
}

.buttons {
  margin: 10px 0;
}
</style>