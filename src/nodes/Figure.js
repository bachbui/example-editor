import { DocumentNode } from 'substance'

class Figure extends DocumentNode {

  getImageSource() {
    if (this.imageSource) {
      return this.imageSource
    }
  }
}

Figure.schema = {
  type: 'figure',
  imageSource: { type: 'string' },
  title: { type: 'id' },
  caption: { type: 'id' },
  position: { type: 'string', default: 'center' }
}

Figure.positions = [
  { name: 'Left', value: 'inset-left' },
  { name: 'Center', value: 'center' },
  { name: 'Right', value: 'inset-right' },
  { name: 'Full Bleed', value: 'full-bleed'}
]

export default Figure
