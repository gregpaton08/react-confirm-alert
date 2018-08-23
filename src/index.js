import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { render, unmountComponentAtNode } from 'react-dom'

export default class ReactConfirmAlert extends Component {
  static propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    buttons: PropTypes.array.isRequired,
    childrenElement: PropTypes.func,
    customUI: PropTypes.func,
    willUnmount: PropTypes.func,
    onClose: PropTypes.func
  }

  static defaultProps = {
    buttons: [
      {
        label: 'Cancel',
        onClick: () => null
      },
      {
        label: 'Confirm',
        onClick: () => null
      }
    ],
    childrenElement: () => null,
    willUnmount: () => null,
    onClose: () => null
  }

  handleClickButton = button => {
    if (button.onClick) button.onClick()
    this.props.onClose()
  }

  componentWillUnmount = () => {
    this.props.willUnmount()
  }

  renderCustomUI = () => {
    const { title, message, customUI } = this.props
    const dataCustomUI = {
      title,
      message,
      onClose: this.props.onClose
    }

    return customUI(dataCustomUI)
  }

  render () {
    const { title, message, buttons, childrenElement, customUI } = this.props

    return (
      <div className='react-confirm-alert-overlay'>
        <div className='react-confirm-alert'>
          {customUI
            ? this.renderCustomUI()
            : <div className='react-confirm-alert-body'>
              {title && <h1>{title}</h1>}
              {message}
              {childrenElement()}
              <div className='react-confirm-alert-button-group'>
                {buttons.map((button, i) => (
                  <button
                    key={i}
                    onClick={() => this.handleClickButton(button)}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </div>}
        </div>
      </div>
    )
  }
}

function createElementReconfirm (properties) {
  document.body.children[0].classList.add('react-confirm-alert-blur')
  const divTarget = document.createElement('div')
  divTarget.id = 'react-confirm-alert'
  document.body.appendChild(divTarget)
  const newProperties = {
    ...properties,
    onClose: () => removeElementReconfirm()
  }
  render(<ReactConfirmAlert {...newProperties} />, divTarget)
}

function removeElementReconfirm () {
  const target = document.getElementById('react-confirm-alert')
  unmountComponentAtNode(target)
  target.parentNode.removeChild(target)
  document.body.children[0].classList.remove('react-confirm-alert-blur')
}

export function confirmAlert (properties) {
  createElementReconfirm(properties)
}
