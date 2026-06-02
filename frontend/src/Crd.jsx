import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Crd() {
    const [mcount, setmenucount] = useState(0);
    const [fcount, setfoodcatcount] = useState(0);
    const [qcount, setqtycount] = useState(0);

    function count() {
        axios.get("http://localhost:3000/cnt")
            .then(response => {
                setmenucount(response.data.menu_count);
                setfoodcatcount(response.data.food_cat_count);
                setqtycount(response.data.qty_count);
            });
    }

    useEffect(() => {
        count();
    }, []);

    return (
        <Container className="py-4">
            <Row className="g-4 justify-content-center">
                <Col xs={12} sm={6} md={4}>
                    <Card className="text-center shadow-lg p-3">
                        <Card.Body>
                            <Card.Title className="fw-bold">AVAILABLE MENU</Card.Title>
                            <Card.Text style={{ fontSize: '25px' }}>{mcount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <Card className="text-center shadow-lg p-3" >
                        <Card.Body>
                            <Card.Title className="fw-bold">AVAILABLE FOOD_CAT</Card.Title>
                            <Card.Text style={{ fontSize: '25px' }}>{fcount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <Card className="text-center shadow-lg p-3" >
                        <Card.Body>
                            <Card.Title className="fw-bold">AVAILABLE SIZE</Card.Title>
                            <Card.Text style={{ fontSize: '25px' }}>{qcount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
