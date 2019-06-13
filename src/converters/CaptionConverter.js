export default {

  type: 'caption',
  tagName: 'caption',

  import: function(el, node, converter) {
    // node.content = converter.annotatedText(el, [node.id, 'content'])
    node.nodes = el.getChildren().map(function(child) {
      var childNode = converter.convertElement(child)
      return childNode.id
    })
  },

  export: function(node, el, converter) {
    // el.append(converter.annotatedText([node.id, 'content']))
    el.append(converter.convertNodes(node.nodes))
  }

}
