export default {
  type: 'figure',
  tagName: 'figure',

  import: function(el, node, converter) {
    var title = el.find('title')
    var caption = el.find('caption')
    node.imageSource = el.attr('image-source')
    node.inset = el.attr('inset') || undefined
    node.size = el.attr('size') || undefined
    node.title = converter.convertElement(title).id
    node.caption = converter.convertElement(caption).id
  },

  export: function(node, el, converter) {
    el.attr('image-source', node.imageSource)

    if (node.inset) {
      el.attr('inset', node.inset)
    }

    if (node.size) {
      el.attr('size', node.size)
    }
    el.append(converter.convertNode(node.title))
    el.append(converter.convertNode(node.caption))
  }
}
