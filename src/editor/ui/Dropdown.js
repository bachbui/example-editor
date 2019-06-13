import { Component } from 'substance';

export default class Dropdown extends Component {
  render($$) {
    let el = this.renderLabel($$);
    el.append(this.renderInput($$));

    if (this.props.active) {
      el.addClass('sm-active')
    }
    if (this.props.theme) {
      el.addClass('sm-theme-' + this.props.theme)
    }

    if (this.props.disabled) {
      // make button inaccessible
      el.attr('tabindex', -1)
        .attr('disabled', true)
    } else {
      // make button accessible for tab-navigation
      el.attr('tabindex', 1)
    }
    return el;
  }

  renderInput($$) {
    let input = $$('select')
      .attr()
      .append(this.props.options.map(({ name, value }) => {
        return $$('option')
          .attr('value', value)
          .attr('label', name)
          .attr('selected', (value == this.props.value) || undefined)
      }));
    return input;
  }

  renderLabel($$) {
    return $$('label').append(this.getLabel(this.props.label));
  }

  getLabel (name) {
    let labelProvider = this.context.labelProvider;
    return labelProvider.getLabel(name, this.props.commandState)
  }
}
