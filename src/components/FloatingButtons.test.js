import { shallowMount } from '@vue/test-utils'
import FloatingButtons from './FloatingButtons'

jest.useFakeTimers()

const buttons = [
  {
    html: '<p id="main-elem">Hello</p>',
    color: 'red',
  },
  {
    html: '<p id="first-option">Option1</p>',
    click: jest.fn(),
  },
  {
    html: '<p id="second-option">Option2</p>',
    color: 'blue',
    radius: 128,
    click: jest.fn(),
  },
]

const buttonsWithDefaults = [ { html: 'Hi', }, { html: 'Hola', } ]
const buttonsWithoutDefaults = [ { html: 'Hi', color: 'black', radius: 16 }, { html: 'Hola', color: 'white', radius: 512, click: jest.fn() } ]

const propsData = { buttons }

beforeEach(() => {
  jest.clearAllMocks()
})

it('renders', () => {
  const wrapper = shallowMount(FloatingButtons, { propsData })
  expect(wrapper.find('#floating-buttons').exists()).toBe(true)
})

it('is expanded from props', () => {
  const wrapper = shallowMount(FloatingButtons, { propsData: { ...propsData, expanded: true }})
  expect(wrapper.vm.$data.isExpanded).toBe(true)
})

it('uses content from props on main button', () => {
  const wrapper = shallowMount(FloatingButtons, { propsData })
  const content = wrapper.find('#main-button-content #main-elem')
  expect(content.exists()).toBe(true)
})

it('sets isExpanded on main button click', () => {
  const wrapper = shallowMount(FloatingButtons, { propsData })
  const button = wrapper.find('#main-button')

  expect(wrapper.vm.$data.isExpanded).toBe(false)

  button.trigger('click', { path: [ { id: 'main-button' } ]})
  expect(wrapper.vm.$data.isExpanded).toBe(true)

  button.trigger('click', { path: [ { id: 'main-button' } ]})
  expect(wrapper.vm.$data.isExpanded).toBe(false)
})

it('sets target for main button animation when click in inner target chrome browser', () => {
  const mockTarget = {
    id: 'main-button',
    classList: {
      remove: jest.fn(),
      add: jest.fn()
    }
  }

  const wrapper = shallowMount(FloatingButtons, { propsData })
  const button = wrapper.find('#main-button-content')

  button.trigger('click', { path: [ { id: 'main-button-content' }, mockTarget ]})

  expect(mockTarget.classList.remove).toHaveBeenCalledWith('main-click-animation')
  expect(mockTarget.classList.add).toHaveBeenCalledWith('main-click-animation')
})

it('sets target for main button animation when click in inner target other browser', () => {
  const mockTarget = {
    id: 'main-button',
    classList: {
      remove: jest.fn(),
      add: jest.fn()
    }
  }

  const wrapper = shallowMount(FloatingButtons, { propsData })
  const button = wrapper.find('#main-button-content')

  const composedPath = () => [ { id: 'main-button-content' }, mockTarget ]
  button.trigger('click', { composedPath })

  expect(mockTarget.classList.remove).toHaveBeenCalledWith('main-click-animation')
  expect(mockTarget.classList.add).toHaveBeenCalledWith('main-click-animation')
})

it('sets timer to remove animation class from target', () => {
  const mockTarget = {
    id: 'main-button',
    classList: {
      remove: jest.fn(),
      add: jest.fn()
    }
  }

  const wrapper = shallowMount(FloatingButtons, { propsData })
  const button = wrapper.find('#main-button-content')

  button.trigger('click', { path: [ { id: 'main-button-content' }, mockTarget ]})

  expect(mockTarget.classList.remove.mock.calls.length).toBe(1)
  expect(mockTarget.classList.remove.mock.calls[0]).toEqual([ 'main-click-animation' ])
  expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 400)

  jest.runAllTimers()

  expect(mockTarget.classList.remove.mock.calls.length).toBe(2)
  expect(mockTarget.classList.remove.mock.calls[1]).toEqual([ 'main-click-animation' ])
})

buttons.slice(1, buttons.length).forEach(({ click }, index) => {
  it(`uses click handler from props in ${index + 1} option button`, () => {
    const wrapper = shallowMount(FloatingButtons, { propsData })
    const button = wrapper.findAll('.button').at(index + 1)

    button.trigger('click')

    expect(click).toHaveBeenCalled()
  })
})

it('ignores click handler when undefined in option button', () => {
  const buttons = [ { html: 'Hi', }, { html: 'Hola', click: undefined } ]
  const wrapper = shallowMount(FloatingButtons, { propsData: { buttons }})
  const button = wrapper.findAll('.button').at(1)

  console.error = jest.fn()
  button.trigger('click')

  if(console.error.mock.calls.length) {
    expect(console.error.mock.calls[0][0].includes('button.click is not a function')).not.toBe(true)
  }
  expect(true)
})

describe('buttons with defaults', () => {
  buttonsWithDefaults.forEach((button, index) => {
    it(`uses default background color on button ${index} when not set in props`, () => {
      const wrapper = shallowMount(FloatingButtons, { propsData: { buttons: buttonsWithDefaults }})
      const button = wrapper.findAll('.button').at(index)

      if(index === 0) {
        expect(button.element.style._values['background-color']).toBe('rgb(250, 105, 0)')
      } else {
        expect(button.element.style._values['background-color']).toBe('rgb(62, 204, 231)')
      }
    })

    it(`uses default radius on button ${index} when not set in props`, () => {
      const wrapper = shallowMount(FloatingButtons, { propsData: { buttons: buttonsWithDefaults }})
      const button = wrapper.findAll('.button').at(index)

      expect(button.element.style._values['width']).toBe('64px')
      expect(button.element.style._values['height']).toBe('64px')
      expect(button.element.style._values['border-radius']).toBe('64px')
    })
  })
})

describe('buttons without defaults', () => {
  buttonsWithoutDefaults.forEach(({ color, radius }, index) => {
    it(`uses background color from props on button ${index}`, () => {
      const wrapper = shallowMount(FloatingButtons, { propsData: { buttons: buttonsWithoutDefaults }})
      const button = wrapper.findAll('.button').at(index)
      expect(button.element.style._values['background-color']).toBe(color)
    })

    it(`uses radius from props on button ${index}`, () => {
      const wrapper = shallowMount(FloatingButtons, { propsData: { buttons: buttonsWithoutDefaults }})

      const button = wrapper.findAll('.button').at(index)
      expect(button.element.style._values['width']).toBe(radius + 'px')
      expect(button.element.style._values['height']).toBe(radius + 'px')
      expect(button.element.style._values['border-radius']).toBe(radius + 'px')
    })
  })
})
