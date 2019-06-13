export default {
  import: function(el, node, converter) {
    node.nodes = el.getChildren().map(function(child) {
      var childNode = converter.convertElement(child)
      return childNode.id
    })
  },

  export: function(node, el, converter) {
    el.append(converter.convertNodes(node.nodes))
  }
}
