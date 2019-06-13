import { ToggleTool } from 'substance'

/**
  Tool for editing an existing hyperlink.
  Designed so that it can be used either in a toolbar, or within
  an overlay on the Surface.
  @component
*/

class EditHyperlinkTool extends ToggleTool {

  getUrlPath() {
    let propPath = this.constructor.urlPropertyPath
    return [this.getNodeId()].concat(propPath)
  }

  getNodeId() {
    return this.props.commandState.nodeId
  }

  getNode() {
    let doc = this.context.editorSession.getDocument()
    return doc.get(this.getNodeId());
  }

  _openLink() {
    let doc = this.context.editorSession.getDocument()
    window.open(doc.get(this.getUrlPath()), '_blank')
  }

  render($$) {
    let Input = this.getComponent('input')
    let Button = this.getComponent('button')
    let Checkbox = this.getComponent('checkbox')
    let commandState = this.props.commandState
    let el = $$('div').addClass('sc-edit-hyperlink-tool')

    // GUARD: Return if tool is disabled
    if (commandState.disabled) {
      console.warn('Tried to render EditLinkTool while disabled.')
      return el
    }

    let urlPath = this.getUrlPath()
    let isAffiliateLink = this.getNode().isAffiliateLink

    el.append(
      $$('fieldset').append(
        $$(Input, {
          type: 'url',
          path: urlPath,
          placeholder: 'Paste or type a link url'
        }),
        $$(Checkbox, {
          checked: isAffiliateLink,
          label: 'Affiliate link'
        }).on('change', this.onAffiliateLinkChange)
      ),
      $$(Button, {
        icon: 'open-hyperlink',
        theme: 'dark',
      }).on('click', this._openLink),

      $$(Button, {
        icon: 'delete',
        theme: 'dark',
      }).on('click', this.onDelete)
    )
    return el
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

  onAffiliateLinkChange(e) {
    e.preventDefault();
    e.stopPropagation();
    let nodeId = this.getNodeId();
    this._runInTransaction(function(tx, args) {
      tx.set([nodeId, 'isAffiliateLink'], e.srcElement.checked)
      return args
    });
  }

  onDelete(e) {
    e.preventDefault();
    let nodeId = this.getNodeId()
    this._runInTransaction(function(tx, args) {
      tx.delete(nodeId)
      return args
    });
  }
}

EditHyperlinkTool.urlPropertyPath = ['url']

export default EditHyperlinkTool
