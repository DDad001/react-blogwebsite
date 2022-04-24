import React, { useState, useEffect } from "react";
import { Carousel, Row, Col, Container, Card, Button } from "react-bootstrap";
import { getPublishedItems } from "../Services/DataService";
import "../App.css";

function BlogPage() {
  const [blogItems, setBlogItems] = useState([]);
  useEffect(async () => {
    let publishedItems = await getPublishedItems();
    console.log(publishedItems[0].title);
    setBlogItems(publishedItems);
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          {blogItems.map((item, i) => {
            return (
              <>
                {/* {
                               i % 2 == 0
                               ?
                               <> */}
                <Row className="mb-4">
                  {/* <Col md={12} className="d-flex justify-content-center">
                                        <h2>{item.title}</h2>
                                   </Col> */}
                  <Col md={12}>
                    <Row>
                      <Col md={12} className="d-flex justify-content-center">
                        <h3 className="NameFont">
                          By: <u>{item.publisherName}</u>{" "}
                        </h3>
                      </Col>

                      <Col md={12} className="d-flex justify-content-center">
                        <h4 className="DateFont">{`Published: ${item.date}`}</h4>
                      </Col>
                    </Row>

                    <Col md={12} className="d-flex justify-content-center">
                      <img src={item.image} width="500px" height="300px" />
                    </Col>
                  </Col>

                  <Col md={12} className="d-flex justify-content-center mt-3">
                    <Card style={{ width: "50rem" }} className="Card mt-5">
                      <Card.Body>
                        <Card.Title>
                          <h2 className="text-center">{item.title}</h2>
                        </Card.Title>
                        <Card.Text>
                          <p>{item.description}</p>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <hr className="mb-5" />
                {/* </>
                               :
                               <> */}

                {/* <Row>
                        <Col md={6} className="d-flex justify-content-center">
                        <p>{item.description}</p>
                        </Col>
                        <Col md={6}>
                        <Row>
                            <Col md={12} className="d-flex justify-content-center">
                               <h2>{item.title}</h2>
                                </Col>
                            <Col md={12}>
                                <Row>
                                    <Col md={6} className="d-flex justify-content-center">
                                    <h3>{item.publisherName}</h3>
                                    </Col>

                                    <Col md={6} className="d-flex justify-content-center">
                                    <h4>{item.date}</h4>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12} className="d-flex justify-content-center">
                            <img src={item.image} width="100px" height="80px" />
                            </Col>
                        </Row>
                        </Col>
                        </Row> 
                
                                
                               </>
                           } */}
              </>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}

export default BlogPage;
