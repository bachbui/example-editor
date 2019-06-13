import ContainerConverter from './ContainerConverter'

export default Object.assign({}, ContainerConverter, {
  type: 'body',
  tagName: 'body',

  import: function(el, node, converter) {
    node.id = 'body'
    ContainerConverter.import(el, node, converter)
  }
})
