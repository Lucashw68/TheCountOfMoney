import { set, toggle } from '@/store/utils'

export default {
  setDrawer: set('drawer'),
  setMini: set('mini'),
  setImage: set('image'),
  setColor: set('color'),
  toggleDrawer: toggle('drawer'),
  setGradient: set('gradient'),
}
