import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Modal, 
    ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


import { connect } from 'react-redux';
import { getItems, deleteItem, addItem, getItem, editItem } from '../actions/itemActions';

class ShoppingList extends Component {
    state = {
        modal: false,
        name: '',
        id: 0,
        isEdit: false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    componentDidMount() {
        this.props.getItems();
    }

    onChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value ,
            isEdit: true
        });
    };

    onDeleteClick = (one) => {
        confirmAlert({
            title: '',
            message: 'Are you sure to delete "'+ one.name +'"?',
            buttons: [
              {
                label: 'Yes, delete!',
                className: 'btn-danger',
                onClick: () => { this.props.deleteItem(one._id); }
              },
              {
                label: 'No',
                onClick: () => { }
              }
            ]
          });
    }

    onSubmit = (e) => {
        e.preventDefault();
        var editItem = {
            name: this.state.name
        }

        if(this.state.isEdit) {
            this.props.editItem(this.state.id, editItem);
        }
        this.toggle();
    };

    onEditClick = (one) => {
        this.setState({ 
            id: one._id, 
            name: one.name,
            isEdit: false
        });
        this.toggle();
    }

    render() {
        var items = this.props.values.items;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        { items.map((one) => (
                            <CSSTransition key={one._id} timeout={500} className="text-left">
                                <ListGroupItem>
                                    <Button className="remove-btn" color="danger" size="sm"
                                        onClick={this.onDeleteClick.bind(this, one)} >
                                        &times; 
                                    </Button>
                                    {one.name}
                                    <Button className="edit-btn" color="info" size="sm"
                                        onClick={this.onEditClick.bind(this, one )} >
                                        &#9998; 
                                    </Button>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>

                <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={false}>
                    <ModalHeader toggle={this.toggle}>
                        Edit item: {this.state.name}
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item name here:</Label>
                                <Input autoFocus type="text" name="name" id="item" defaultValue={this.state.name} onChange={this.onChange} />
                                <Button color="dark" block style={{marginTop: '2rem'}}>Edit item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}

var mapStateToProps = (state) => ({
    values: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem, addItem, getItem, editItem })(ShoppingList);