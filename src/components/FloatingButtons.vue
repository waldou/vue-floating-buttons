<template>
  <div id="floating-buttons" :class="fbDirectionClass" :style="mainStyle">
    <div id="main-button" class="button" @click="mainButtonClick" :style="fbMainButtonStyle">
      <div id="main-button-content" v-html="buttons[0].html" />
    </div>
    <div :class="fbOptionsClasses" :style="fbOptionsStyle(index)"
         v-for="(button, index) in fbOptionButtons" :key="'button-'+index" @click="optionButtonClick(button)">
      <div class="button-content" v-html="button.html" />
    </div>
  </div>
</template>

<script>
const DEFAULT_MAIN_BUTTON_COLOR = '#fa6900'
const DEFAULT_OPTION_BUTTON_COLOR = '#3ecce7'
const DEFAULT_DISABLED_BUTTON_COLOR = '#bbbbbb'
const DEFAULT_BUTTON_RADIUS = 64

const MB_ID = 'main-button'
const MB_CLICK_ANIMATION_CLASS = 'main-click-animation'
const MB_CLICK_ANIMATION_TRANSITION_DURATION = 400

const BOUNCE_ANIMATION_DURATION = 400
const BOUNCE_ANIMATION_DURATION_OFFSET = 64

const VALID_DIRECTIONS = {
  down: 'down',
  up: 'up',
  right: 'right',
  left: 'left'
}

export default {
  name: 'FloatingButtons',
  props: {
    mainStyle: {
      type: String,
      required: false,
      default: '',
    },
    mainButtonStyle: {
      type: String,
      required: false,
      default: '',
    },
    optionsStyle: {
      type: String,
      required: false,
      default: '',
    },
    direction: {
      type: String,
      required: false,
      validator: value => {
        return VALID_DIRECTIONS[value]
      },
      default: 'down',
    },
    buttons: {
      type: Array,
      required: true,
      validator: value => {
        return value.length > 1
      },
    },
    expanded: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isExpanded: false,
    }
  },
  mounted() {
    this.isExpanded = this.expanded
  },
  methods: {
    mainButtonClick: function(e) {
      if(!this.buttons[0].disabled) {
        this.mainButtonAnimate(e)
        this.isExpanded = !this.isExpanded
      }
    },
    mainButtonAnimate: function(e) {
      e.preventDefault
      let path = e.path || e.composedPath()
      let target = undefined
      if(path[0].id === MB_ID) {
        target = e.target
      } else {
        for(var idx in path) {
          if(path[idx].id === MB_ID) {
            target = path[idx]
            break
          }
        }
      }
      target.classList.remove(MB_CLICK_ANIMATION_CLASS)
      target.classList.add(MB_CLICK_ANIMATION_CLASS)
      setTimeout(function() {
        target.classList.remove(MB_CLICK_ANIMATION_CLASS)
      }, MB_CLICK_ANIMATION_TRANSITION_DURATION)
    },
    optionButtonClick: function(button) {
      if(!button.disabled && button.click) {
        button.click()
      }
    },
    fbOptionsStyle(optionIndex) {
      let backgroundColor
      if(this.fbOptionButtons[optionIndex].disabled) {
        backgroundColor = this.fbOptionButtons[optionIndex].disabledColor || DEFAULT_DISABLED_BUTTON_COLOR
      } else {
        backgroundColor = this.fbOptionButtons[optionIndex].color || DEFAULT_OPTION_BUTTON_COLOR
      }
      const radius = this.fbOptionButtons[optionIndex].radius || DEFAULT_BUTTON_RADIUS
      const animationDuration = BOUNCE_ANIMATION_DURATION + BOUNCE_ANIMATION_DURATION_OFFSET * optionIndex
      return 'background-color: ' + backgroundColor + '; ' +
              'width: ' + radius + 'px; ' +
              'height: ' + radius + 'px; ' +
              'border-radius: ' + radius + 'px; ' +
              'animation-duration: ' + animationDuration + 'ms; ' +
              this.optionsStyle
    },
  },
  computed: {
    fbOptionButtons() {
      return this.buttons.slice(1, this.buttons.length)
    },
    fbDirectionClass() {
      return 'floating-buttons-go-' + this.direction
    },
    fbMainButtonStyle() {
      let backgroundColor
      if(this.buttons[0].disabled) {
        backgroundColor = this.buttons[0].disabledColor || DEFAULT_DISABLED_BUTTON_COLOR
      } else {
        backgroundColor = this.buttons[0].color || DEFAULT_MAIN_BUTTON_COLOR
      }
      const radius = this.buttons[0].radius || DEFAULT_BUTTON_RADIUS
      return 'background-color: ' + backgroundColor + '; ' +
              'width: ' + radius + 'px; ' +
              'height: ' + radius + 'px; ' +
              'border-radius: ' + radius + 'px; ' +
              this.mainButtonStyle
    },
    fbExpandedClasses() {
      return this.isExpanded ? 'expandedButtons ' + this.fbBounceClasses : 'hiddenButtons '
    },
    fbBounceClasses() {
      return 'bounce bounce-go-' + this.direction
    },
    fbOptionsClasses() {
      return 'button ' + this.fbExpandedClasses
    },
  },
}
</script>

<style lang="scss" scoped>
$click-animation-transition-duration: 400ms;
$button-expanded-transition-duration: 128ms;
$translate1: 16px;
$translate2: 8px;

#floating-buttons {
  position: relative;
  display: flex;
  align-items: center;
}

.floating-buttons-go-down {
  flex-direction: column;
}

.floating-buttons-go-up {
  flex-direction: column-reverse;
}

.floating-buttons-go-right {
  flex-direction: row;
}

.floating-buttons-go-left {
  flex-direction: row-reverse;
}

#main-button {
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;

  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.main-click-animation {
  transform-origin: center;
  animation-name: main-click;
  animation-duration: $click-animation-transition-duration;
  animation-iteration-count: 1;
}

.hiddenButtons {
  visibility: hidden;
  opacity: 0;
}

.expandedButtons {
  visibility: visible;
  opacity: 1;
}

.button {
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 4px;
  cursor: pointer;
  -webkit-transition-duration: $button-expanded-transition-duration;
  transition-duration: $button-expanded-transition-duration;
}

.bounce {
  animation-iteration-count: 1;
}

.bounce-go-down {
  transform-origin: top;
  animation-name: bounce-down;
}

.bounce-go-up {
  transform-origin: bottom;
  animation-name: bounce-up;
}

.bounce-go-right {
  transform-origin: left;
  animation-name: bounce-right;
}

.bounce-go-left {
  transform-origin: right;
  animation-name: bounce-left;
}

@keyframes main-click {
  0%   { transform: scale(1, 1) }
  25%  { transform: scale(0.7, 0.7) }
  50%  { transform: scale(1, 1) }
  75%  { transform: scale(0.9, 0.9) }
  100% { transform: scale(1,1) }
}

@keyframes bounce-up {
  0%   { transform: scale(1, 1)    translateY(0); }
  10%  { transform: scale(1.1, 0.9) translateY(0); }
  30%  { transform: scale(0.9, 1.1) translateY(-$translate1); }
  50%  { transform: scale(1, 1)    translateY(0); }
  57%  { transform: scale(1, 1)    translateY(-$translate2); }
  64%  { transform: scale(1, 1)    translateY(0); }
  100% { transform: scale(1, 1)    translateY(0); }
}

@keyframes bounce-down {
  0%   { transform: scale(1, 1)    translateY(0); }
  10%  { transform: scale(1.1, 0.9) translateY(0); }
  30%  { transform: scale(0.9, 1.1) translateY($translate1); }
  50%  { transform: scale(1, 1)    translateY(0); }
  57%  { transform: scale(1, 1)    translateY($translate2); }
  64%  { transform: scale(1, 1)    translateY(0); }
  100% { transform: scale(1, 1)    translateY(0); }
}

@keyframes bounce-right {
  0%   { transform: scale(1, 1)    translateX(0); }
  10%  { transform: scale(0.9, 1.1) translateX(0); }
  30%  { transform: scale(1.1, 0.9) translateX($translate1); }
  50%  { transform: scale(1, 1)    translateX(0); }
  57%  { transform: scale(1, 1)    translateX($translate2); }
  64%  { transform: scale(1, 1)    translateX(0); }
  100% { transform: scale(1, 1)    translateX(0); }
}

@keyframes bounce-left {
  0%   { transform: scale(1, 1)    translateX(0); }
  10%  { transform: scale(0.9, 1.1) translateX(0); }
  30%  { transform: scale(1.1, 0.9) translateX(-$translate1); }
  50%  { transform: scale(1, 1)    translateX(0); }
  57%  { transform: scale(1, 1)    translateX(-$translate2); }
  64%  { transform: scale(1, 1)    translateX(0); }
  100% { transform: scale(1, 1)    translateX(0); }
}
</style>
