import { NodeComponent } from 'substance'

class FigureComponent extends NodeComponent {

  didMount() {
    super.didMount.call(this)
    this.context.editorSession.onRender('document', this._onDocumentChange, this)
    this.parent.getClassNames = this.getInsetClassNames
  }

  dispose() {
    super.dispose.call(this)
    this.context.editorSession.off(this)
  }

  _onDocumentChange(change) {
    if (change.hasUpdated(this.props.node.id) ||
      change.hasUpdated(this.props.node.imageSource)) {
      this.rerender()
    }
    if (change.hasUpdated([this.props.node.id, 'inset'])) {
      this.parent.rerender()
    }
  }

  render($$) {
    let Caption = this.getComponent('caption')
    let el = super.render($$)
    el.addClass(`sc-figure test size-${this.props.node.size }`)
    el.append(
      $$('img').attr({
        src: this.props.node.getImageSource(),
      }).ref('figure'),
      $$(Caption, {
        node: this.context.editorSession.getDocument().get(this.props.node.caption)
      })
    )
    return el
  }

  getInsetClassNames() {
    let inset = this.props.node.inset
    if (inset === 'left' || inset === 'right') {
      return `inset-${inset}`
    }
    return ''
  }
}

export default FigureComponent
