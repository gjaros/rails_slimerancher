import React from 'react';
import Modal from 'react-modal';
import PopList from './PopList';
import { connect } from 'react-redux';
import { setSelected, toggleModal } from '../actions/actions';

const customStyles = {
  content: {
    background: 'none',
    border: 'none',
    zIndex: 3
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 3
  }
};

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      plotID: props.plotID,
      selected: props.selected,
      modalIsOpen: props.modalIsOpen,
      listsIndex: props.listsIndex,
      resources: props.resources,
      entriesList: [],
      compileList: []
    };
  }
  componentDidMount() {
    this.createDefaultList();
  }
  toggleModal = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
    this.props.dispatch(toggleModal(this.state.plotID, this.state.listsIndex));
  }
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }
  handleOnSelectChange = (selected) => {
    if (selected === "") {
      selected = "Blank";
    }
    this.setState({
      selected: selected
    }, () => { this.createSelectList() });
    this.props.dispatch(setSelected(this.state.plotID, this.state.listsIndex, selected));
  }
  createDefaultList = () => {
    this.setState(() => {
      switch (Object.prototype.toString.call(this.state.resources)) {
      case "[object Object]":
        return ({
          entriesList: Object.keys(this.state.resources),
          compileList: Object.entries(this.state.resources)
        });
        break;
      case "[object Array]":
        return ({
          entriesList: this.state.resources,
          compileList: this.state.resources
        });
        break;
      case "[object String]":
        return ({
          entriesList: Object.values(this.state.resources),
          compileList: this.state.resources
        });
        break;
      }
    });
  }
  createSelectList = () => {
    if (this.state.selected === "Blank") {
      this.createDefaultList()
    } else {
      this.setState(() => {
        for (let i = 0; i < this.state.compileList.length; i++) {
          if (Object.prototype.toString.call(this.state.compileList[i][1]) === "[object Object]") {
            if (this.state.compileList[i][0] === this.state.selected) {
              return ({
                entriesList: Object.keys(this.state.compileList[i][1]),
                compileList: Object.entries(this.state.compileList[i][1])
              });
            }
          } else if (Object.prototype.toString.call(this.state.compileList[i][1]) === "[object Array]") {
            if (this.state.compileList[i][0] === this.state.selected) {
              return ({
                entriesList: this.state.compileList[i][1],
                compileList: this.state.compileList[i][1]
              });
            }
          }
        }
      });
    }
  }
  render() {
    return (
      <div>
        <button
          className="modal-button"
          onClick={this.toggleModal}
          style={{ backgroundImage: 'url(' + require('../images/' + this.state.selected + '.png') + ')' }}>
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          style={customStyles}
          className="modal"
          >
          <button
            className="button button__close"
            onClick={this.toggleModal}
            >
              X
          </button>
          <PopList
            list={this.state.entriesList}
            selected={this.state.selected}
            onSelectChange={this.handleOnSelectChange}
            closeOnDoubleClick={this.toggleModal}
          />
        </Modal>
      </div>
    );
  }
}

List.defaultProps = {
  selected: 'Blank'
};

export default connect()(List);
