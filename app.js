// CONSTANTS
const GAME_WIDTH = 500
const GAME_HEIGHT = 500
const CHARACTER_WIDTH = 50
const CHARACTER_HEIGHT = 50
const FPS = 60                    // ----------> frame per seconds
const LOOP_INTERVAL = Math.round(1000 / FPS)       //------> 1000 milisecond  over  60 frame per second   ===>>>   means 60 fps is converted to 1 second per 60 frames
const VELOCITY = 2.5

// Game Loop
let gameLoop

// Character
const $character = $('#character')
let character = {
  position: { x: 0, y: 0 },
  movement: { left: false, up: false, right: false, down: false }
}

// Toggle which direction the character is moving to
const setChararacterMovement = (value, keyCode) => {
  switch (keyCode) {
    case 37:
      character.movement.left = value                   // set the movement direction to be true
      break
    case 38:
      character.movement.up = value
      break
    case 39:
      character.movement.right = value
      break
    case 40:
      character.movement.down = value
      break
  }
}

// Handling Key Down
const handleKeyDown = (e) => {
  setChararacterMovement(true, e.keyCode)
}

// Handling Key Up
const handleKeyUp = (e) => {
  const { keyCode } = e
  setChararacterMovement(false, e.keyCode)
}

// Everytime this gets invoked, update character position
const updateMovements = () => {
  const { position: { x, y }, movement: { left, up, right, down } } = character
  let newX = x
  let newY = y

  if (left) newX -= VELOCITY                       // even if it's keyup, which make the direction false,
  if (up) newY -= VELOCITY                              //  new coordinate, named 'newX' and 'newY' will still feed value to character's css property
  if (right) newX += VELOCITY
  if (down) newY += VELOCITY

  character.position.x = newX
  character.position.y = newY
  $character.css('left', newX).css('top', newY)                             // use css's property left and top to move the character
}

const init = () => {
  $(document).on('keydown', handleKeyDown)                         // move
  $(document).on('keyup', handleKeyUp)                             // not move

  gameLoop = setInterval(updateMovements, LOOP_INTERVAL)
}

init()
