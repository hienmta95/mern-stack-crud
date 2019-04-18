import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        var newItem = {
            name: this.state.name,
            date: Date.now()
        }

        // add item via additem action
        this.props.addItem(newItem);

        // close modal
        this.toggle();
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return(
            <div>
                <Button color="dark" style={{marginBottom: '2rem'}} onClick={this.toggle}>
                    Add Item!
                </Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={false}>
                    <ModalHeader toggle={this.toggle}>
                        Add item to MERN shopping cart
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item input here. </Label>
                                <Input autoFocus type="text" name="name" id="item" placeholder="type item..." onChange={this.onChange} />
                                <Button color="dark" block style={{marginTop: '2rem'}}>Add item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item
});
export default connect(mapStateToProps, {addItem})(ItemModal);
