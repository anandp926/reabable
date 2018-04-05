/**
 * Created by rozer on 3/31/2018.
 */
import React, { Component } from 'react'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaCommentO from 'react-icons/lib/fa/comment-o'
import { connect } from 'react-redux'
import { fetchAllPosts } from '../actions/posts'

class Post extends Component {

    componentDidMount(){
        this.props.fetchAllPosts();
    }

    render() {
        console.log(this.props);
        return (
            <div className="card">
                <div className="container">
                    <div className="Time">
                        6:35 PM, Saturday, 31 March 2018
                    </div>
                    <h4>
                        <b><a href="#post">'We are back': Emotional Dhoni on Chennai Super Kings' IPL return</a></b>
                        <small className="Author">By: Anand Singh</small>
                    </h4>
                    <p>
                        NEW DELHI: 'Captain Cool' Mahendra Singh Dhoni got emotional while speaking about the return of Chennai Super Kings (CSK) to the Indian Premier League (IPL) after two years.
                        "We are back! We are back as a whole team," an emotional Dhoni was seen speaking in a brief video shared on Twitter.
                    </p>
                    <div className="Like-comment">
                        <span className="Like-comment1">100 Likes</span>
                        <span className="Like-comment2">564 Comments</span>
                    </div>
                    <div className="Vote-comment">
                        <button className="Like">
                            <FaThumbsOUp size={30}/>Like
                        </button>
                        <button className="Comment">
                            <FaCommentO size={30}/>Comment
                        </button>
                    </div>
                    <div className="Show-comment">
                        I'm working with you for money. if i have money no one can defeat me.
                        <div className="Show-comment-button">
                            <button>replay</button>
                            <button>edit</button>
                            <button>delete</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts
});

export default connect(mapStateToProps, { fetchAllPosts })(Post);
