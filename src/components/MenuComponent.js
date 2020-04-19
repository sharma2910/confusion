import React , {Component} from 'react' ;
import { Card,CardBody,CardImgOverlay,CardText,CardImg,CardTitle } from 'reactstrap';
import DishdetailComponent from './DishdetailComponent'

class Menu extends Component{

    constructor(props){
        super(props);

        this.state={
            selectedDish: null
        }
    }

    onDishSelect(dish){
        this.setState({selectedDish: dish})
    }

    render() {
        const menu = this.props.dishes.map( (dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100" src={dish.image}/>
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <DishdetailComponent selectedDish={this.state.selectedDish}/>
            </div>
        );
    }

}

export default Menu;
