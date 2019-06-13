import { DocumentNode, Container } from 'substance'

class Pullquote extends DocumentNode {}

Pullquote.schema = {
  type: 'pullquote',
  body: { type: 'id' },
  credit: { type: 'id' },
  inset: { type: 'string', default: 'center' }
}

class PullquoteBody extends Container {}

PullquoteBody.schema = {
  type: 'pullquote-body'
}

class PullquoteCredit extends Container {}

PullquoteCredit.schema = {
  type: 'pullquote-credit'
}

export { Pullquote, PullquoteBody, PullquoteCredit }
