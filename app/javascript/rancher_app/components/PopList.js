import React from 'react';

export default class PopList extends React.Component {
  constructor(props) {
    super(props);
  }
  handleOnClick = (e) => {
    this.props.onSelectChange(e.target.value);
  }
  handleOnDoubleClick = (e) => {
    this.props.closeOnDoubleClick(true);
  }
  componentWillMount() {
    window.addEventListener('resize', this.resizePopList);
  }
  render() {
    return (
      <div className='button-container'>
        <button
          className='button button__main'
          onClick={this.handleOnClick}
          onDoubleClick={this.handleOnDoubleClick}
          style={{ backgroundImage: 'url(' + require('../images/' + this.props.selected + '.png') + ')' }}
          >
        </button>
        {
          this.props.list.map((item, index) => (
            <button
              className='button button__item'
              key={index}
              value={item}
              onClick={this.handleOnClick}
              onDoubleClick={this.handleOnDoubleClick}
              style={{
                transform: 'rotate('+((360/this.props.list.length)*index)+'deg) translate(150px) rotate('+(-(360/this.props.list.length)*index)+'deg) translate(200px, 200px) translate(-50%, -50%)',
                backgroundImage: 'url(' + require('../images/' + item + '.png') + ')'
              }}
            >
            </button>
          ))
        }
        <button
          className='button button__close'
          onClick={this.handleOnDoubleClick}
        >
          &times;
        </button>
      </div>
    );
  }
}
