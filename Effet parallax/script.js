;(function () {
  const introPanel = document.querySelector('.panel-intro')
  const secondPanel = document.querySelector('.panel-second')
  const logoPanel = document.querySelector('.panel-logo')
  const mountains = document.getElementById('mountains')

  function clamp (v, min, max) {
    return v < min ? min : v > max ? max : v
  }

  function onScroll () {
    const scrollY = window.scrollY
    const vh = window.innerHeight

    /* Découpage en zones (à titre indicatif) :
       [0 - 1vh]   : intro
       [1 - 2vh]   : second texte
       [>= ~2vh]   : logo + montagnes visibles
    */

    /* --- PANEL 1 : intro --- */
    const introFadeEnd = 0.9 * vh
    const pIntro = clamp(scrollY / introFadeEnd, 0, 1)
    introPanel.style.opacity = 1 - pIntro

    /* --- PANEL 2 : second texte --- */
    const secondStart = 0.5 * vh
    const secondFull = 1.4 * vh
    const secondEnd = 2.2 * vh

    const pSecondIn = clamp(
      (scrollY - secondStart) / (secondFull - secondStart),
      0,
      1
    )
    const pSecondOut = clamp(
      (scrollY - secondFull) / (secondEnd - secondFull),
      0,
      1
    )

    secondPanel.style.opacity = pSecondIn * (1 - pSecondOut)

    /* --- PANEL 3 : logo --- */
    const logoStart = 1.8 * vh
    const logoFull = 2.6 * vh
    // On garde uniquement un "fade in" puis on reste à 1 (plus de fade out)
    const pLogoIn = clamp((scrollY - logoStart) / (logoFull - logoStart), 0, 1)

    // Le panel logo (logo + montagnes + caption) apparaît progressivement puis reste visible
    logoPanel.style.opacity = pLogoIn

    /* --- Mouvement des montagnes :
       elles partent de "sous l'écran" (top:100vh)
       et remontent jusqu'à largement au-dessus (–120vh) pour recouvrir le logo
    */
    const mountainsStart = 2.0 * vh
    const mountainsEnd = 3.8 * vh
    const pMountains = clamp(
      (scrollY - mountainsStart) / (mountainsEnd - mountainsStart),
      0,
      1
    )

    const translateY = -pMountains * 120 // en vh
    mountains.style.transform = `translateY(${translateY}vh)`
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  onScroll()
})()
