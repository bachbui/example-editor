import { NodeComponent, ContainerEditor } from 'substance'

class CaptionComponent extends NodeComponent {
  render($$) {
    let node = this.props.node;
    let el = super.render($$)
      .append($$(ContainerEditor, {
        name: `${node.id}-editor`,
        node,
        disabled: this.props.disabled
      }))
    return el
  }

  getTagName() {
    return 'figcaption'
  }
}

export default CaptionComponent
