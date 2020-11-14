import { shallowMount } from '@vue/test-utils'
import Error0 from '@/components/error/0.vue'
import vuetify from 'vuetify'
import Vue from 'vue'

describe('0', () => {
  let wrapper
  beforeEach(() => {
    Vue.use(vuetify)
    wrapper = shallowMount(Error0)
  })
  it('renders a vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
