import { shallowMount } from '@vue/test-utils'
import Error2 from '@/components/error/2.vue'
import vuetify from 'vuetify'
import Vue from 'vue'

describe('2', () => {
  let wrapper
  beforeEach(() => {
    Vue.use(vuetify)
    wrapper = shallowMount(Error2)
  })
  it('renders a vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
