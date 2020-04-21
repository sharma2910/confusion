import React from 'react';
import { Card, CardBody, CardText, CardTitle, CardImg } from 'reactstrap';


function RenderDish({ dish }) {
    if (dish != null) {
        let comments = dish.comments.map((comment) => {
            return (
                <div key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>--  {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                </div>
            )
        })
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100" src={dish.image} />
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
    } else {
        return (
            <div></div>
        )
    }
}

const DishDetail = (props) => {
    return (
        <div className="container">
            <RenderDish dish={props.dish} />
        </div>
    );
}


export default DishDetail;