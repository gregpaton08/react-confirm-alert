import React from 'react'
import ReactDOM from 'react-dom'
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'
import '../src/react-confirm-alert.css'

const ReactConfirmAlertComponent = props => (
  <ReactConfirmAlert
    title='Confirm to submit'
    message='Are you sure to do this.'
    buttons={[
      {
        label: 'Yes',
        onClick: props.onClick
      },
      {
        label: 'No',
        onClick: props.onClick
      }
    ]}
  />
)

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayConfirmAlert: false
    }
  }

  submit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    })
  }

  submitCustomUI = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>You want to delete this file?</p>
            <button onClick={onClose}>No</button>
            <button onClick={onClose}>Yes, Delete it!</button>
          </div>
        )
      }
    })
  }

  render () {
    return (
      <div className='main-container'>
        <section className='section1'>
          <div className='center'>
            <div className='title'>React confirm alert 2</div>
            <br />
            <br />
            <a href='javascript:;' className='button' onClick={this.submit}>
              Show confirm
            </a>
            <a
              href='javascript:;'
              className='button outline'
              onClick={this.submitCustomUI}
            >
              Show confirm Custom UI
            </a>
            <a
              href='javascript:;'
              className='button outline'
              onClick={() => this.setState({
                ...this.state,
                displayConfirmAlert: true
              })}
            >
              Show confirm component
            </a>
          </div>
        </section>
        {this.state.displayConfirmAlert &&
          <ReactConfirmAlertComponent
            onClick={() => this.setState({
              ...this.state,
              displayConfirmAlert: false
            })}
          />
        }
      </div>
    )
  }
}

const rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl)
