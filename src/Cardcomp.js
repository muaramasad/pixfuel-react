import React from 'react';
import { Card, CardImg, CardText, CardBlock,
  CardTitle, Button, Col } from 'reactstrap';

const Cardcomp = (props) => {
  return (
    <Col xs="12" sm="12" md="4" className="d-flex align-items-stretch pb-5">
        <Card>
          <CardImg top width="100%" src={props.imgUrl} alt="Card image cap" />
          <CardBlock>
            <CardTitle>{props.title}</CardTitle>
            <CardText>{props.descriptions}</CardText>
            <CardText>
                <small className="text-muted">Last updated 3 mins ago</small>
            </CardText>
            <a href={`${props.link}`}><Button>View</Button></a>
          </CardBlock>
        </Card>
    </Col>
  );
};

export default Cardcomp;
