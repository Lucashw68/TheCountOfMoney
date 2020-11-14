import { shallowMount } from '@vue/test-utils'
import Error500 from '@/components/error/500.vue'
import vuetify from 'vuetify'
import Vue from 'vue'

describe('500', () => {
  let wrapper
  beforeEach(() => {
    Vue.use(vuetify)
    wrapper = shallowMount(Error500)
  })
  it('renders a vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
