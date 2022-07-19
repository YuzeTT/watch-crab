<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { darkTheme } from 'naive-ui'
import { ArrowUp, Refresh } from '@vicons/ionicons5'
import axios from 'axios';

const { ipcRenderer } = require('electron')
// let win = require('electron').remote.getCurrentWindow()
const isLock = ref(false)
const user = ref({
  id: '',
  name: '',
  avatar: '',
  followers: 0,
})

const ifLock = () => {
  ipcRenderer.on('alwaysOnTop',(event,data)=>{
    switch (data) {
      case 'yes':
        isLock.value = true
        break;
      case 'no':
        isLock.value = false
        break;
    }
  })
}

const lock = () => {
  ipcRenderer.send('window-top')
  ifLock()
}

onBeforeMount(() => {
  ifLock()
})

const update = () => {
  axios.get(`http://mlmcounts.herokuapp.com/twitter/api/?name=chaci_YY`)
    .then(res => {
      console.log(res)
      user.value.name = res.data.name
      user.value.followers = res.data.followers_count
    })
    .catch(err => {
      console.log(err)
    })
}

</script>

<template>
  <div class="container" style="-webkit-app-region: drag">
    <n-config-provider :theme="darkTheme">
      <div>
        <div class="bar_box" style="-webkit-app-region: no-drag;">
            <!-- <div class="move" >
              <n-icon size="20">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M176 112l80-80l80 80"></path><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M255.98 32l.02 448"></path><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M176 400l80 80l80-80"></path><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M400 176l80 80l-80 80"></path><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M112 176l-80 80l80 80"></path><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M32 256h448"></path></svg>
              </n-icon>
            </div> -->
            <div></div>
            <div>
              <n-space>
                <n-button text style="font-size: 20px" ghost @click="update">
                  <n-icon>
                    <Refresh/>
                  </n-icon>
                </n-button>
                <n-button text style="font-size: 20px" ghost :color="isLock?'#18a058':'#767c82'" @click="lock">
                  <n-icon>
                    <ArrowUp/>
                  </n-icon>
                </n-button>
              </n-space>
            </div>
          </div>
      </div>
      <div style="padding: 20px 25px;">
        <div class="name">{{ user.name?user.name:'获取中...' }}</div>
        <div class="box">
          <div>
            <n-icon color="#1DA1F2" size="35" style="margin-right: 10px;">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </n-icon>
            <span class="number">{{ user.followers?user.followers:'---' }}</span>
          </div>
        </div>
      </div>
    </n-config-provider>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "ds";
  src: url("../assets/DS-DIGI-1.ttf");
}

.container {
  background-color: rgba(0, 0, 0, .55);
  padding: 10px;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bar_box {
  position: absolute;
  top: 10px;
  right: 10px;
}

.name {
  text-align: center;
  font-size: 20px;
  color: #fff;
  margin-bottom: 5px;
}

.number {
  font-family: ds;
  font-size: 3rem;
  line-height: normal;
  color: #fff;
}

.move {
  position: absolute;
  top: 10px;
  left: 10px;
  /* width: 40px;
  height: 40px; */
  color: rgba(0, 0, 0, .4);
  -webkit-app-region: drag
}
</style>