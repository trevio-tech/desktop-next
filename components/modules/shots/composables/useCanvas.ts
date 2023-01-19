import { fabric } from 'fabric'
import { onMounted, onBeforeMount } from 'vue'

let canvas = null

export default () => {
  onMounted(() => {
    canvas = new fabric.Canvas('shot', {
      selection: false
    })

    const { offsetWidth, offsetHeight } = document.querySelector('#shot-container')

    canvas.setWidth(offsetWidth)
    canvas.setHeight(offsetHeight)

    canvas.on({
      'mouse:up': onMouseUp,
      'object:moving': onObjectMove
    })

    document.addEventListener('keydown', deleteObject)
  })

  onBeforeMount(() => {
    document.removeEventListener('keydown', deleteObject)
  })

  return {
    addText
  }
}

const deleteObject = (event) => {
  if (event.key === 'Delete') {
    const activeObject = canvas.getActiveObject()

    if (activeObject !== null) {
      canvas.remove(activeObject)
    }
  }
}

const addText = () => {
  const text = new fabric.Textbox('Текст', {
    fontFamily: 'Montserrat',
    fontSize: 32,
    lockSkewingY: true,
  }).setControlsVisibility({
    mb: false,
    mt: false,
  })

  canvas.add(text)

  console.log('Add text')

  text.center()
}

const onMouseUp = (options) => {
  if (options.target) {
    options.target.setCoords()

    canvas.forEachObject(function (object) {
      if (object === options.target) return

      // Если выбранный объект пересекся с корзиной, то удаляем его.
      if (options.target.intersectsWithObject(object) && object.id === 'trash') {
        canvas.remove(options.target)
      }
    })
  }

  // После события mouse:up, удаляем корзину.
  removeTrash()
}

const onObjectMove = () => {
  const objectIds = {}

  for (let object of canvas.getObjects()) {
    if (object.id) {
      objectIds[object.id] = true
      break
    }
  }

  // При перемещении объекта показываем пользователю корзину.
  if (! objectIds.trash) {
    addTrash()
  }
}

/**
 * Добавляет объект корзины.
 */
const addTrash = () => {
  const trash = new fabric.Circle({
    width: 80,
    height: 80,
    radius: 40,
    left: (canvas.getWidth() / 2) - 40,
    top: canvas.getHeight() - 100,
    fill: '#aaa',
    opacity: 0.5,
    id: 'trash',
    selectable: false,
    hoverCursor: 'default'
  })

  canvas.add(trash)

  console.log('Add trash')
}

/**
 * Удаляет объект корзины.
 */
const removeTrash = () => {
  for (let object of canvas.getObjects()) {
    if (object.id === 'trash') {
      canvas.remove(object)
      console.log('Remove trash')
      break
    }
  }
}
