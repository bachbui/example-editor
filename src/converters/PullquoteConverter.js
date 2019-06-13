import ContainerConverter from './ContainerConverter'

const PullquoteConverter = {
  type: 'pullquote',
  tagName: 'pullquote',

  import: function(el, node, converter) {
    var body = el.find('pullquote-body')
    var credit = el.find('pullquote-credit')
    node.position = el.attr('position')
    node.body = converter.convertElement(body).id
    node.credit = converter.convertElement(credit).id
  },

  export: function(node, el, converter) {
    if (node.position) {
      el.attr('position', node.position)
    }
    el.append(converter.convertNode(node.body))
    el.append(converter.convertNode(node.credit))
  }
}

const PullquoteBodyConverter = Object.assign({}, ContainerConverter, {
  type: 'pullquote-body',
  tagName: 'pullquote-body'
})

const PullquoteCreditConverter = Object.assign({}, ContainerConverter, {
  type: 'pullquote-credit',
  tagName: 'pullquote-credit'
})

export { PullquoteConverter, PullquoteBodyConverter, PullquoteCreditConverter }
