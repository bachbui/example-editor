import { Command } from 'substance'

export default class EditNodeCommand extends Command {
  getCommandState(params) {
    let { selection, document } = params.selectionState;
    if (selection.isNodeSelection()
      && document.get(selection.nodeId).type === this.config.nodeType
    ) {
      return {
        disabled: false,
        active: false,
        nodeId: selection.nodeId
      }
    }
    return {
      disabled: true,
      active: false
    }
  }

  execute() { }
}
