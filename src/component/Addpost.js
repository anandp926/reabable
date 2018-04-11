/**
 * Created by rozer on 4/11/2018.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../style.css'

class Addpost extends Component {

    state = {
        author: "",
        title: "",
        body: "",
        category: ""
    };

    selectCategory = (event) =>{
        this.setState({
            category: event.target.value
        });
    };

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {

        const { categories, onFormSubmit } = this.props;

        return(
            <div className="container">
                <form onSubmit={ onFormSubmit }>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="category">Select Category</label>
                        </div>
                        <div className="col-75">
                            <select name="category" value={this.state.value}  onChange={e => this.selectCategory(e)}>
                                { categories !== undefined && categories.map(category => {
                                    return(
                                        <option key={category.path} value={category.name}>{category.name}</option>
                                    )
                                })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="aname">Author Name</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="aname" name="author" value={this.state.author} onChange={ e => this.handleInputChange(e)} placeholder="Your name.."/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="title" name="title" value={this.state.title} onChange={ e => this.handleInputChange(e)} placeholder="Title of the post.."/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="body">Content</label>
                        </div>
                        <div className="col-75">
                            <textarea id="body" name="body" value={this.state.body} onChange={ e => this.handleInputChange(e)} placeholder="Write content.." className="box"></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (categories) =>{
    return(
        categories
    )
}

export default connect(mapStateToProps)(Addpost)
