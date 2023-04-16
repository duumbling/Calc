let btnsList = document.querySelectorAll('.calc-btn'),
  mathList = document.querySelectorAll('.calc-maths'),
  display = document.querySelector('.calc-display input'),
  specList = document.querySelectorAll('.calc-spec'),
  enterBtn = document.querySelector('.calc-enter'),
  specStatus = false,
  startEnter = true


const draw = () => {
  for (let btn of btnsList) {

    btn.onclick = () => {

      if (display.value == 'NaN') {
        display.value = '0'
      }
      else if (display.value != 0 && btn.innerHTML != 'C' && startEnter === false) {
        if (display.value.length < 15) {
          if (!specStatus) {
            display.value += btn.innerHTML
          } else {
            display.value = display.value.slice(0, [display.value.length - 1])
            display.value += btn.innerHTML
            display.value += ')'
          }
        }
      }
      else if (btn.innerHTML == 'C') {
        specStatus = false
        startEnter = true
        display.value = '0'
      }
      else if (display.value == 0 || display == 'NaN' || startEnter === true) {
        display.value = btn.innerHTML
        startEnter = false
      }
    }
  }
  for (let math of mathList) {
    math.onclick = () => {
      if (!display.value.at(-1).match(/×|%|\+|\-|÷|=|\(/ig) && display.value != 0 && specStatus && startEnter === false) {

        display.value = display.value.slice(0, [display.value.length - 1])
        display.value += math.innerHTML
        display.value += ')'
      } else if (!display.value.at(-1).match(/×|%|\+|\-|÷|=|\(/ig) && display.value != 0 && startEnter === false) {
        display.value += math.innerHTML
      }
    }
  }
  for (let spec of specList) {
    spec.onclick = () => {
      console.log(spec.innerHTML)
      if (spec.innerHTML === '(' && display.value.at(-1).match(/×|%|\+|\-|÷|=|\(/ig)) {
        display.value += '()'
        specStatus = true
        // display.selectionStart = display.selectionEnd = display.value.length - 1
      } else if (spec.innerHTML === '(' && (display.value == 0 || display == 'NaN') && startEnter === true) {
        display.value = '()'
        specStatus = true
        startEnter = false
        // display.selectionStart = display.selectionEnd = display.value.length - 1

      } else if (spec.innerHTML === ')') {
        specStatus = false
      }
      // if (display.value[display.value.length - 1] != '(' && display.value[display.value.length - 1] !== '÷' && display.value[display.value.length - 1] !== '-' && display.value[display.value.length - 1] !== '+' && display.value[display.value.length - 1] !== '%' && display.value[display.value.length - 1] !== '×' && display.value[display.value.length - 1] !== ')' && display.value.indexOf('(') != -1) {
      //   display.value += spec.innerHTML
      // } else if (spec.innerHTML == '(' && display.value[display.value.length - 1] !== '(' && display.value[display.value.length - 1] !== ')' && display.value[display.value.length - 1] !== /^[0-9]+$/ && (display.value == 0 || display.value == 'NaN') && ) {
      //   display.value = spec.innerHTML
      // } else if ((display.value[display.value.length - 1] == '÷' || display.value[display.value.length - 1] == '-' || display.value[display.value.length - 1] == '+' || display.value[display.value.length - 1] == '%' || display.value[display.value.length - 1] == '×') && spec.innerHTML == '(') {
      //   display.value += spec.innerHTML
      // }

    }
  }
}
draw()
// display.addEventListener('click', () => {
//   display.focus()
//   display.selectionStart = display.selectionEnd = display.value.length - 1
// })

const enter = () => {

  let answer
  const converter = () => {
    answer = display.value
    if (answer.match('÷')) {
      answer = answer.replace(/÷/g, '/')
    }
    if (answer.match('×')) {
      answer = answer.replace(/×/g, '*')
    }
    if (answer.match('%')) {
      if (answer.match(/\(/)) {
        // answer = answer.slice(answer.indexOf('('), answer.indexOf(')')+1)
        answer = `(${(answer.slice(answer.indexOf('('), answer.indexOf(')') + 1))}/100)*${answer.slice(0, answer.indexOf('%'))}`
      } else {
        answer = (+answer.slice(answer.indexOf('%') + 1) / 100) * +answer.slice(0, answer.indexOf('%'))
      }

    }
  }
  enterBtn.onclick = () => {
    startEnter = true
    specStatus = false
    converter()
    console.log(`(${answer})`)
    display.value = eval(`${answer}`)
  }
}
enter()
//todo(2(
//todo (3(3)3)
//todo (10%100)*6