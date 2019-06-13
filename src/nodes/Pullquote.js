import { DocumentNode, Container } from 'substance'

class Pullquote extends DocumentNode {}

Pullquote.schema = {
  type: 'pullquote',
  body: { type: 'id' },
  credit: { type: 'id' },
  position: { type: 'string', default: 'center' }
}

Pullquote.positions = [
  { name: 'Inset Left', value: 'inset-left' },
  { name: 'Center', value: 'center' },
  { name: 'Inset Right', value: 'inset-right' }
]

class PullquoteBody extends Container {}

PullquoteBody.schema = {
  type: 'pullquote-body'
}

class PullquoteCredit extends Container {}

PullquoteCredit.schema = {
  type: 'pullquote-credit'
}

export { Pullquote, PullquoteBody, PullquoteCredit }
