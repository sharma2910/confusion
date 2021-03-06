import React, { Component } from 'react';
import { Card, CardBody, CardText, CardTitle, CardImg, Button, Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(value) {
        this.toggleModal()
        this.props.postComment(this.props.dishId, value.rating, value.name, value.comment)
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="m-1">
                                <Label for="rating">Rating</Label>
                                <Control.select className="form-control" model=".rating" name="rating" id="rating">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="m-1">
                                <Label htmlFor="name">Your Name</Label>
                                <Control.text model=".name" id="name" name="name" className="form-control"
                                    placeholder="Your Name"
                                    validators={{
                                        minLength: minLength(3), maxLength: maxLength(15)
                                    }} />
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 3 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Row>
                            <Row className="m-1">
                                <Label htmlFor="name">Comment</Label>
                                <Control.textarea rows="8" model=".comment" id="name" name="name" className="form-control" />
                            </Row>
                            <Button className="m-2" type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderComment({ comments, postComment, dishId }) {
    if (comments != null) {
        let com = comments.map((comment) => {
            return (
                <Fade in>
                    <ul className="list-unstyled">
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                        </li>
                    </ul>
                </Fade>
            )
        })
        return (
            <div className="col-12 col-md-5 m-3">
                <h3>Comments</h3>
                <br />
                <Stagger in>
                    {com}
                </Stagger>
                <CommentForm postComment={postComment}
                    dishId={dishId} />
            </div>
        );
    } else {
        return (
            <div> No Comments </div>
        );
    }
}

function RenderDish({ dish }) {
    if (dish != null) {

        return (
            <div className="col-12 col-md-5 m-3">
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg width="100" src={baseUrl + dish.image} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="container">
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComment comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id} />
                </div>
            </div>
        );
    }
}


export default DishDetail;