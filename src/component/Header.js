/**
 * Created by rozer on 3/31/2018.
 */
import React, { Component } from 'react'
import Menu from './Menu'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar'
import AddPostFilter from './AddPostFilter'
import { Link } from 'react-router-dom'

const styles = { header: { position: "fixed", top: 0, textAlign:'left'}, };

class Header extends Component{

    static propTypes = {
        sortType: PropTypes.func.isRequired  
    };

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});
    
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        title={<Link to={`/`} style={{cursor:'pointer', textDecoration:'none', color:'#fff'}}>HELLOBLOGS</Link>}
                        onLeftIconButtonClick={this.handleToggle}
                        style={styles.header}
                        iconElementRight={<AddPostFilter sortType={this.props.sortType}/>}
                    />
                    <Menu open={this.state.open} close={this.handleClose}/>
                </MuiThemeProvider>
            </div>
        );
    }
}



export default Header;
