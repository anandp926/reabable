/**
 * Created by rozer on 6/4/2018.
 */
import React, { Component } from 'react'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FilterList from 'material-ui/svg-icons/content/filter-list';
import LibraryAdd from 'material-ui/svg-icons/av/library-add';
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import Addpost from './Addpost'
import FaTimesCircleO from 'react-icons/lib/fa/times-circle-o'

class AddPostFilter extends Component {

    static propTypes = {
        sortType: PropTypes.func.isRequired
    };

    constructor () {
        super();
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    render() {
        const {sortType} = this.props;
        return(
            <div>
                <LibraryAdd style={{cursor:'pointer', color:'white'}} onClick={this.handleOpenModal}/>
                <IconMenu
                    iconButtonElement={<IconButton><FilterList /></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem primaryText="By Date" onClick={(e) => sortType("-timestamp")}/>
                    <MenuItem primaryText="By UpVote" onClick={(e) => sortType("-voteScore")}/>
                    <MenuItem primaryText="By DownVote" onClick={(e) => sortType("voteScore")}/>
                </IconMenu>
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.handleCloseModal}
                    className="Modal"
                >
                    <div className="right">
                        <button className="btncss" onClick={this.handleCloseModal}><FaTimesCircleO size={30}/></button>
                    </div>
                    <Addpost modal={this.handleCloseModal} />
                </Modal>
            </div>

        )
    }
}

export default AddPostFilter
