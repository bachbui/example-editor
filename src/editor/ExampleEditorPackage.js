import {
  BasePackage as SubstanceBasePackage,
  Document as SubstanceDocument,
  AnnotationCommand,
  EditAnnotationCommand,
  SwitchTextTypeCommand,
  XMLImporter,
  XMLExporter
} from 'substance'

import {
  Body,
  Caption,
  Emphasis,
  ExampleArticle,
  Figure,
  Hyperlink,
  Paragraph,
  Pullquote,
  PullquoteBody,
  PullquoteCredit,
  Title
} from '../nodes'

import {
  BodyConverter,
  ExampleArticleConverter,
  ParagraphConverter,
  TitleConverter,
  FigureConverter,
  CaptionConverter,
  EmphasisConverter,
  HyperlinkConverter,
  PullquoteConverter,
  PullquoteBodyConverter,
  PullquoteCreditConverter
} from '../converters'

import {
  EditNodeCommand,
  HyperlinkCommand
} from './commands'

import {
  BodyComponent,
  CaptionComponent,
  EmphasisComponent,
  ExampleArticleComponent,
  ExampleEditor,
  FigureComponent,
  HyperlinkComponent,
  ParagraphComponent,
  PullquoteComponent,
  TitleComponent
} from './components'

import {
  EditFigureTool,
  EditHyperlinkTool
} from './tools'

import {
  Checkbox,
  Dropdown
} from './ui'

export default {
  name: 'author',
  configure(config) {
    config.defineSchema({
      name: 'example-article',
      version: '1.0.0',
      DocumentClass: SubstanceDocument,
      defaultTextType: 'paragraph'
    })

    config.import(SubstanceBasePackage)

    // Register Nodes
    config.addNode(Body)
    config.addNode(Caption)
    config.addNode(Emphasis)
    config.addNode(ExampleArticle)
    config.addNode(Figure)
    config.addNode(Hyperlink)
    config.addNode(Paragraph)
    config.addNode(Pullquote)
    config.addNode(PullquoteBody)
    config.addNode(PullquoteCredit)
    config.addNode(Title)

    // Converters
    config.addConverter('xml', BodyConverter)
    config.addConverter('xml', CaptionConverter)
    config.addConverter('xml', EmphasisConverter)
    config.addConverter('xml', ExampleArticleConverter)
    config.addConverter('xml', FigureConverter)
    config.addConverter('xml', HyperlinkConverter)
    config.addConverter('xml', ParagraphConverter)
    config.addConverter('xml', PullquoteConverter)
    config.addConverter('xml', PullquoteBodyConverter)
    config.addConverter('xml', PullquoteCreditConverter)
    config.addConverter('xml', TitleConverter)

    // TODO: we could make XMLImporter the default
    config.addImporter('xml', XMLImporter)
    config.addExporter('xml', XMLExporter)

    // Commands
    config.addCommand('paragraph', SwitchTextTypeCommand, {
      spec: { type: 'paragraph' },
      commandGroup: 'text-types'
    })
    config.addCommand('emphasis', AnnotationCommand, {
      nodeType: 'emphasis',
      commandGroup: 'annotations'
    })
    config.addCommand('hyperlink', HyperlinkCommand, {
      nodeType: 'hyperlink',
      commandGroup: 'annotations'
    })
    config.addCommand('edit-hyperlink', EditAnnotationCommand, {
      nodeType: 'hyperlink',
      commandGroup: 'prompt'
    })
    config.addCommand('edit-figure', EditNodeCommand, {
      nodeType: 'figure',
      commandGroup: 'prompt'
    })

    // Tools
    config.addTool('edit-hyperlink', EditHyperlinkTool)
    config.addTool('edit-figure', EditFigureTool)

    // Icons
    config.addIcon('emphasis', {
      fontawesome: 'fa-italic'
    })
    config.addIcon('hyperlink', {
      fontawesome: 'fa-link'
    })
    config.addIcon('open-hyperlink', {
      fontawesome: 'fa-external-link'
    })

    // Components
    config.addComponent('caption', CaptionComponent)
    config.addComponent('checkbox', Checkbox)
    config.addComponent('dropdown', Dropdown)
    config.addComponent('example-article', ExampleArticleComponent)
    config.addComponent('title', TitleComponent)
    config.addComponent('body', BodyComponent)
    config.addComponent('paragraph', ParagraphComponent)
    config.addComponent('pullquote', PullquoteComponent)
    config.addComponent('figure', FigureComponent)
    config.addComponent('emphasis', EmphasisComponent)
    config.addComponent('hyperlink', HyperlinkComponent)

    // Declarative spec for tool display
    config.addToolPanel('toolbar', [
      {
        name: 'text-types',
        type: 'tool-dropdown',
        showDisabled: false,
        style: 'descriptive',
        commandGroups: ['text-types']
      },
      {
        name: 'annotations',
        type: 'tool-group',
        showDisabled: true,
        style: 'minimal',
        commandGroups: ['annotations']
      }
    ])

    config.addToolPanel('main-overlay', [
      {
        name: 'prompt',
        type: 'tool-prompt',
        showDisabled: false,
        commandGroups: ['prompt']
      }
    ])

  },
  ExampleEditor
}
