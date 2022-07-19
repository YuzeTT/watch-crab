import prod from './prod.env'
import dev from './dev.env'

export default {
  build: {
    DisableF12: true,
    env: prod,
    // 示例
    hotPublishUrl:"http://umbrella22.github.io/electron-vite-template",
    hotPublishConfigName: "update-config"
  },
  dev: {
    env: dev,
    removeElectronJunk: true,
    chineseLog: false,
    port: 9080,
  },
  DllFolder: '',
  HotUpdateFolder: 'update',
  UseStartupChart: true,
  IsUseSysTitle: false,
  BuiltInServerPort: 25565
}