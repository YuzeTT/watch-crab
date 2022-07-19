<template>
  <div class="window-title" v-if="!IsUseSysTitle && isNotMac && !IsWeb">
    <!-- 软件logo预留位置 -->
    <div style="-webkit-app-region: drag" class="logo">
      <div class="icon-logo"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M11.71 17.99A5.993 5.993 0 0 1 6 12c0-3.31 2.69-6 6-6c3.22 0 5.84 2.53 5.99 5.71l-2.1-.63a3.999 3.999 0 1 0-4.81 4.81l.63 2.1zM22 12c0 .3-.01.6-.04.9l-1.97-.59c.01-.1.01-.21.01-.31c0-4.42-3.58-8-8-8s-8 3.58-8 8s3.58 8 8 8c.1 0 .21 0 .31-.01l.59 1.97c-.3.03-.6.04-.9.04c-5.52 0-10-4.48-10-10S6.48 2 12 2s10 4.48 10 10zm-3.77 4.26l2.27-.76c.46-.15.45-.81-.01-.95l-7.6-2.28c-.38-.11-.74.24-.62.62l2.28 7.6c.14.47.8.48.95.01l.76-2.27l3.91 3.91c.2.2.51.2.71 0l1.27-1.27c.2-.2.2-.51 0-.71l-3.92-3.9z" fill="currentColor"></path></svg></div>
      <!-- <img
        src="@renderer/assets/icons/svg/electron-logo.svg"
        class="icon-logo"
      /> -->
    </div>
    <!-- 菜单栏位置 -->
    <div style="margin-top: 3px;">WatchCrab</div>
    <!-- 中间标题位置 -->
    <div style="-webkit-app-region: drag" class="title"></div>
    <div class="controls-container">
      <div class="windows-icon-bg" @click="Mini">
        <img src="@renderer/assets/icons/svg/mini.svg" class="icon-size" />
      </div>
      <div class="windows-icon-bg" @click="MixOrReduction">
        <img
          v-if="mix"
          src="@renderer/assets/icons/svg/reduction.svg"
          class="icon-size"
        />
        <img
          v-else
          src="@renderer/assets/icons/svg/mix.svg"
          class="icon-size"
        />
      </div>
      <div class="windows-icon-bg close-icon" @click="Close">
        <img src="@renderer/assets/icons/svg/close.svg" class="icon-size" />
      </div>
    </div>
  </div>
  <div v-else-if="!IsUseSysTitle && !isNotMac" class="window-title">
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const { ipcRenderer } = require("electron");

const IsUseSysTitle = ref(false);
const mix = ref(false);
const isNotMac = ref(process.platform !== "darwin");
const IsWeb = ref(process.env.BUILD_TARGET);
ipcRenderer.invoke("IsUseSysTitle").then((res) => {
  IsUseSysTitle.value = res;
});

const Mini = () => {
  ipcRenderer.invoke("windows-mini");
};
const MixOrReduction = () => {
  ipcRenderer.invoke("window-max").then((res) => {
    mix.value = res.status;
  });
};
const Close = () => {
  ipcRenderer.invoke("window-close");
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.window-title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  -webkit-app-region: drag;
  position: fixed;
  top: 0;
  z-index: 99999;
  .icon-logo {
    width: 1.2em;
    height: 1.2em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    line-height: normal;
  }
  .title {
    text-align: center;
    line-height: normal;
  }
  .logo {
    margin-left: 15px;
    margin-right: 10px;
  }
  .controls-container {
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    text-align: center;
    position: relative;
    z-index: 3000;
    -webkit-app-region: no-drag;
    height: 100%;
    width: 138px;
    margin-left: auto;
    .windows-icon-bg {
      display: inline-block;
      -webkit-app-region: no-drag;
      height: 100%;
      width: 33.34%;
      color: rgba(129, 129, 129, 0.6);
      .icon-size {
        width: 12px;
        height: 15px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }
    }
    .windows-icon-bg:hover {
      background-color: rgba(182, 182, 182, 0.2);
      color: #333;
    }
    .close-icon:hover {
      background-color: rgba(232, 17, 35, 0.9);
      color: #fff;
    }
  }
}
</style>
