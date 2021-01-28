import React from "react";
import PropTypes from "prop-types";
import { Tab,Row,Col,Nav } from 'react-bootstrap'

const styles = {

};

function ItemsList({ data }) {
    return (
        <>

            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Tab 1</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Tab 2</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <p>2</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <p>2</p>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </>
    )
}

ItemsList.propTypes = {
    data: PropTypes.array.isRequired
}

export default ItemsList