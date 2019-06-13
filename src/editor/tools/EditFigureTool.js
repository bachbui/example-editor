import { ToggleTool } from 'substance'

/**
  Tool for editing an existing hyperlink.
  Designed so that it can be used either in a toolbar, or within
  an overlay on the Surface.
  @component
*/

class EditFigureTool extends ToggleTool {

  getNodeId() {
    return this.props.commandState.nodeId
  }

  getNode() {
    let doc = this.context.editorSession.getDocument()
    return doc.get(this.getNodeId());
  }

  render($$) {
    let node = this.getNode()
    let Dropdown = this.getComponent('dropdown')
    let commandState = this.props.commandState
    let el = $$('div').addClass('sc-edit-hyperlink-tool')

    // GUARD: Return if tool is disabled
    if (commandState.disabled) {
      console.warn('Tried to render EditLinkTool while disabled.')
      return el
    }

    el.append(
      $$('fieldset').append(
        $$(Dropdown, {
          options: node.constructor.positions,
          value: node.position,
          label: 'Position'
        }).on('change', this.onPositionChange)
      )
    )
    return el
  }

  onPositionChange(e) {
    let nodeId = this.getNodeId();
    this._runInTransaction(function(tx, args) {
      tx.set([nodeId, 'position'], e.srcElement.value)
      return args
    });
  }

  _runInTransaction(transactionFunction) {
    let sm = this.context.surfaceManager
    let surface = sm.getFocusedSurface()
    if (!surface) {
      console.warn('No focused surface. Stopping command execution.')
      return
    }
    let editorSession = this.context.editorSession
    editorSession.transaction(transactionFunction);
  }
}

export default EditFigureTool
