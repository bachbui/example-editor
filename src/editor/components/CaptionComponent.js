import ContainerComponent from './ContainerComponent'

class CaptionComponent extends ContainerComponent {
  getTagName() {
    return 'figcaption'
  }
}

export default CaptionComponent
