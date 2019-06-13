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
  inset: { type: 'string', default: 'center' },
  size: { type: 'string', default: 'large' }
}

Figure.sizes = [
  { name: 'Small', value: 'small' },
  { name: 'Medium', value: 'medium' },
  { name: 'Large', value: 'large' }
]

Figure.insets = [
  { name: 'Left', value: 'left' },
  { name: 'Center', value: 'center' },
  { name: 'Right', value: 'right' }
]

export default Figure
