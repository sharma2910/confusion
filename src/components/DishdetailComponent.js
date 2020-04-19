import React, { Component } from 'react';
import {Card, CardBody,CardText,CardTitle,CardImg} from 'reactstrap';

class DishdetailComponent extends Component{
    
    constructor(props){
        super(props);

    }

    
    
    renderDish(dish){
        if(dish != null){
            let comments = dish.comments.map((comment) => {
                return(
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>--  {comment.author}, {comment.date}</p>
                    </div>
                )
            })
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg width="100" src={dish.image}/>
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h3>Comments</h3>
                        {comments}
                    </div>
                </div>

            )
        }else{
            return(
                <div></div>
            )
        }
    }

    render(){
        return(
        <div>
            {this.renderDish(this.props.selectedDish)}
        </div>
        )
    }
}

export default DishdetailComponent;