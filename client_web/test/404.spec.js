import { shallowMount } from '@vue/test-utils'
import Error404 from '@/components/error/404.vue'
import vuetify from 'vuetify'
import Vue from 'vue'

describe('404', () => {
  let wrapper
  beforeEach(() => {
    Vue.use(vuetify)
    wrapper = shallowMount(Error404)
  })
  it('renders a vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
