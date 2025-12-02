import { isVue2 } from "vue-demi"
import LuckyScratch from "./components/LuckyScratch"


const install = (app: { component: Function }) => {
  app.component('LuckyScratch', LuckyScratch)
}

if (typeof window !== 'undefined' && (window as any).Vue && isVue2) {
  install((window as any).Vue)
}

export { install, LuckyScratch }
export default { install }
