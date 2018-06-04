/**
 * Created by rozer on 4/9/2018.
 */
import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {capitalize} from '../utils/helper'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Close from 'material-ui/svg-icons/navigation/close'

class Menu extends Component {

    static propTypes = {
        close: PropTypes.func.isRequired
    };

    render() {
        const {categories} = this.props;
        return(
            <Drawer
                docked={false}
                open={this.props.open}
                onRequestChange={(open) => this.setState({open})}
            >
                <MenuItem onClick={this.props.close}>
                    <Close style={{width:125, height:50}}/>
                </MenuItem>
                <Link to="/" style={{textDecoration:'none'}}>
                    <MenuItem onClick={this.props.close}>Home</MenuItem>
                </Link>
                {categories !== 'undefined' && categories.map( (category) =>(
                    <Link to={`/${category.path}`} key={`/${category.path}`} style={{textDecoration:'none'}}>
                        <MenuItem onClick={this.props.close}>
                            {capitalize(category.name)}
                        </MenuItem>
                    </Link>
                ))}

            </Drawer>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        categories: Object.values(state.categories),
    }
};

export default connect(mapStateToProps)(Menu)
