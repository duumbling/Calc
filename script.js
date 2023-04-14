let btnsList = document.querySelectorAll('.calc-btn'),
  mathList = document.querySelectorAll('.calc-maths'),
  display = document.querySelector('.calc-display input'),
  specList = document.querySelectorAll('.calc-spec'),
  enterBtn = document.querySelector('.calc-enter')


const draw = () => {
  for (let btn of btnsList) {

    btn.onclick = () => {
      if (display.value == 'NaN') {
        display.value = '0'
      }
      else if (display.value != 0 && btn.innerHTML != 'C') {
        if (display.value.length < 15) {
          display.value += btn.innerHTML
        }
      }
      else if (btn.innerHTML == 'C') {
        display.value = '0'
      }
      else if (display.value == 0 || display == 'NaN') {
        display.value = btn.innerHTML
      }
    }
  }
  for (let math of mathList) {
    math.onclick = () => {
      if (display.value[display.value.length - 1] !== '÷' && display.value[display.value.length - 1] !== '-' && display.value[display.value.length - 1] !== '+' && display.value[display.value.length - 1] !== '%' && display.value[display.value.length - 1] !== '×' && display.value[display.value.length - 1] !== '(' && display.value != 0) {
        display.value += math.innerHTML
      }
    }
  }
  for (let spec of specList) {
    spec.onclick = () => {
      console.log(spec.innerHTML)
      if (display.value[display.value.length - 1] != '(' && display.value[display.value.length - 1] !== '÷' && display.value[display.value.length - 1] !== '-' && display.value[display.value.length - 1] !== '+' && display.value[display.value.length - 1] !== '%' && display.value[display.value.length - 1] !== '×' && display.value[display.value.length - 1] !== ')' && display.value.indexOf('(') != -1) {
        display.value += spec.innerHTML
      } else if (spec.innerHTML == '(' && display.value[display.value.length - 1] !== '(' && display.value[display.value.length - 1] !== ')' && display.value[display.value.length - 1] !== /^[0-9]+$/ && (display.value == 0 || display.value == 'NaN')) {
        display.value = spec.innerHTML
      } else if ((display.value[display.value.length - 1] == '÷' || display.value[display.value.length - 1] == '-' || display.value[display.value.length - 1] == '+' || display.value[display.value.length - 1] == '%' || display.value[display.value.length - 1] == '×') && spec.innerHTML == '(') {
        display.value += spec.innerHTML
      }
    }
  }
}
draw()

const enter = () => {
  let answer
  const converter = () => {
    answer = display.value
    if (answer.match('÷')) {
      answer = answer.replace('÷', '/')
    }
    if (answer.match('×')) {
      answer = answer.replace('×', '*')
    }
    if (answer.match('%')) {
      answer = (+answer.slice(answer.indexOf('%') + 1) / 100) * +answer.slice(0, answer.indexOf('%'))
    }
  }
  enterBtn.onclick = () => {
    converter()
    console.log(`(${answer})`)
    display.value = eval(`${answer}`)
  }
}
enter()