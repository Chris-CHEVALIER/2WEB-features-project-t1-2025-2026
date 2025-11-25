const container = document.getElementById('container')
const interiorLight = document.getElementById('interior-light')
const lightGlow = document.getElementById('light-glow')
const lanternHand = document.getElementById('lantern-hand')

let targetX = window.innerWidth / 2
let targetY = window.innerHeight / 2
let currentX = targetX
let currentY = targetY

// Contraintes pour limiter le mouvement (en %)
const MARGIN_X = 15 // 15% de marge de chaque côté
const MARGIN_Y = 15 // 15% de marge en haut et en bas

container.addEventListener('mousemove', e => {
  const containerRect = container.getBoundingClientRect()

  // Calculer les limites
  const minX = containerRect.width * (MARGIN_X / 100)
  const maxX = containerRect.width * (1 - MARGIN_X / 100)
  const minY = containerRect.height * (MARGIN_Y / 100)
  const maxY = containerRect.height * (1 - MARGIN_Y / 100)

  // Limiter la position de la souris dans l'espace réduit
  targetX = Math.max(minX, Math.min(maxX, e.clientX))
  targetY = Math.max(minY, Math.min(maxY, e.clientY))

  // Mettre à jour immédiatement l'effet de lumière
  const percentX = (targetX / containerRect.width) * 100
  const percentY = (targetY / containerRect.height) * 100

  interiorLight.style.setProperty('--mouse-x', `${percentX}%`)
  interiorLight.style.setProperty('--mouse-y', `${percentY}%`)
  lightGlow.style.setProperty('--mouse-x', `${percentX}%`)
  lightGlow.style.setProperty('--mouse-y', `${percentY}%`)
})

// Animation smooth pour la main avec la lanterne
function animateLantern () {
  // Interpolation douce (easing)
  const ease = 0.08
  currentX += (targetX - currentX) * ease
  currentY += (targetY - currentY) * ease

  // Calculer la position depuis le coin bas-gauche
  const armOriginX = 0
  const armOriginY = window.innerHeight

  // Calculer l'angle
  const deltaX = currentX - armOriginX
  const deltaY = armOriginY - currentY
  const angle = Math.atan2(-deltaY, deltaX) * (180 / Math.PI)

  // Calculer la distance
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

  // Calculer l'échelle pour que le bout du bras atteigne la souris
  // L'image fait 400px, on l'étire pour atteindre la distance
  const imageArmLength = 400
  const scale = distance / imageArmLength

  // Appliquer la rotation et l'échelle
  lanternHand.style.transform = `rotate(${angle}deg) scaleX(${scale})`

  requestAnimationFrame(animateLantern)
}

// Démarrer l'animation
animateLantern()

// Initialiser la position au centre
window.addEventListener('load', () => {
  interiorLight.style.setProperty('--mouse-x', '50%')
  interiorLight.style.setProperty('--mouse-y', '50%')
  lightGlow.style.setProperty('--mouse-x', '50%')
  lightGlow.style.setProperty('--mouse-y', '50%')
})
