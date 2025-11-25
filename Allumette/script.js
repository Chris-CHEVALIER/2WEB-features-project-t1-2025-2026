const matchHead = document.getElementById('matchHead')
const flame = document.getElementById('flame')
const instruction = document.getElementById('instruction')
const body = document.body

let isDragging = false
let startX = 0
let currentLeft = 50
const minLeft = 50
const maxLeft = 350
const threshold = maxLeft - 20

matchHead.addEventListener('mousedown', e => {
  isDragging = true
  startX = e.clientX - currentLeft
  matchHead.style.transition = 'none'
  instruction.classList.add('hidden')
})

document.addEventListener('mousemove', e => {
  if (!isDragging) return

  let newLeft = e.clientX - startX
  newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft))
  currentLeft = newLeft
  matchHead.style.left = newLeft + 'px'
})

document.addEventListener('mouseup', () => {
  if (!isDragging) return
  isDragging = false
  matchHead.style.transition = 'left 0.3s ease, box-shadow 0.3s ease'

  if (currentLeft >= threshold) {
    // Allumette allumée
    currentLeft = maxLeft
    matchHead.style.left = maxLeft + 'px'
    matchHead.classList.add('lit')
    flame.classList.add('visible')
    body.classList.add('lit')
  } else {
    // Retour à la position initiale
    currentLeft = minLeft
    matchHead.style.left = minLeft + 'px'
    matchHead.classList.remove('lit')
    flame.classList.remove('visible')
    body.classList.remove('lit')
    setTimeout(() => {
      instruction.classList.remove('hidden')
    }, 300)
  }
})

// Support tactile
matchHead.addEventListener('touchstart', e => {
  isDragging = true
  startX = e.touches[0].clientX - currentLeft
  matchHead.style.transition = 'none'
  instruction.classList.add('hidden')
  e.preventDefault()
})

document.addEventListener('touchmove', e => {
  if (!isDragging) return

  let newLeft = e.touches[0].clientX - startX
  newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft))
  currentLeft = newLeft
  matchHead.style.left = newLeft + 'px'
})

document.addEventListener('touchend', () => {
  if (!isDragging) return
  isDragging = false
  matchHead.style.transition = 'left 0.3s ease, box-shadow 0.3s ease'

  if (currentLeft >= threshold) {
    currentLeft = maxLeft
    matchHead.style.left = maxLeft + 'px'
    matchHead.classList.add('lit')
    flame.classList.add('visible')
    body.classList.add('lit')
  } else {
    currentLeft = minLeft
    matchHead.style.left = minLeft + 'px'
    matchHead.classList.remove('lit')
    flame.classList.remove('visible')
    body.classList.remove('lit')
    setTimeout(() => {
      instruction.classList.remove('hidden')
    }, 300)
  }
})
