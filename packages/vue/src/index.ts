import { isVue2 } from "vue-demi"
import LuckyWheel from "./components/LuckyWheel"
import LuckyGrid from "./components/LuckyGrid"
import SlotMachine from "./components/SlotMachine"
import LuckyScratch from "./components/LuckyScratch"


const install = (app: { component: Function }) => {
  app.component('LuckyWheel', LuckyWheel)
  app.component('LuckyGrid', LuckyGrid)
  app.component('SlotMachine', SlotMachine)
  app.component('LuckyScratch', LuckyScratch)
}

if (typeof window !== 'undefined' && (window as any).Vue && isVue2) {
  install((window as any).Vue)
}

export { install, LuckyWheel, LuckyGrid, SlotMachine, LuckyScratch }
export default { install }
