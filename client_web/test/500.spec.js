import { shallowMount } from '@vue/test-utils'
import Error1 from '@/components/error/1.vue'
import vuetify from 'vuetify'
import Vue from 'vue'

describe('1', () => {
  let wrapper
  beforeEach(() => {
    Vue.use(vuetify)
    wrapper = shallowMount(Error1)
  })
  it('renders a vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
