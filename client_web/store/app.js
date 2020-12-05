import { set, toggle } from '@/utils/store'

export const state = () => ({
  toolbar: true,
  drawer: false,
  mini: true,
  color: '#424242',
  image: 'https://thumbs.gfycat.com/LoathsomeCaringIchidna-small.gif',
  gradient: 'linear-gradient(270deg, #74ebd5, #b8bfdb, #39c2d8) no-repeat;',
})

export const mutations = {
  setDrawer: set('drawer'),
  setToolbar: set('toolbar'),
  setMini: set('mini'),
  setImage: set('image'),
  setColor: set('color'),
  toggleDrawer: toggle('drawer'),
  toggleToolbar: toggle('toolbar'),
  setGradient: set('gradient'),
}
