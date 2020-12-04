import { set, toggle } from '@/store/utils'

export default {
  setDrawer: set('drawer'),
  setToolbar: set('toolbar'),
  setMini: set('mini'),
  setImage: set('image'),
  setColor: set('color'),
  toggleDrawer: toggle('drawer'),
  toggleToolbar: toggle('toolbar'),
  setGradient: set('gradient'),
}
