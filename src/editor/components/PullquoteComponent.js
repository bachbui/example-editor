import { NodeComponent } from 'substance'
import ContainerComponent from './ContainerComponent'

class PullquoteComponent extends NodeComponent {

  didMount() {
    super.didMount.call(this)
    this.context.editorSession.onRender('document', this._onDocumentChange, this)
    this.parent.getClassNames = this.getPositionClassNames
    this.parent.rerender()
  }

  dispose() {
    super.dispose.call(this)
  }

  _onDocumentChange(change) {
    if (change.hasUpdated([this.props.node.id, 'position'])) {
      this.parent.rerender()
    }
  }

  render($$) {
    let document = this.context.editorSession.getDocument()
    let node = this.props.node

    let Body = this.getComponent('pullquote-body')
    let Credit = this.getComponent('pullquote-credit')
    let el = super.render($$)
      .addClass('pullquote')
      .append(
        $$(Body, {
          node: document.get(node.body)
        }),
        $$(Credit, {
          node: document.get(node.credit)
        })
      )
    return el
  }

  getPositionClassNames() {
    return this.props.node.position
  }
}

class PullquoteBodyComponent extends ContainerComponent {
  getTagName() {
    return 'div'
  }

  getClassNames() {
    return 'pullquote-body'
  }
}

class PullquoteCreditComponent extends ContainerComponent {
  getTagName() {
    return 'div'
  }

  getClassNames() {
    return 'pullquote-credit'
  }
}

export { PullquoteComponent, PullquoteBodyComponent, PullquoteCreditComponent }
