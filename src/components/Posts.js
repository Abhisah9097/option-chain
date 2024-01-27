import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

export default function Posts() {
  const { posts, loadingPosts } = useSelector((state) => state.PostReducer);
  return (
    <Container>
      {loadingPosts ? (
        <div className="loader">
          <LineWave
            visible={true}
            height="100"
            width="100"
            color="black"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />
        </div>
      ) : (
        posts.map((item) => {
          return (
            <Row className="posts">
              <Col lg={8} md={10} sm={12}>
                <Link to={`/${item.id}`}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.body}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </Row>
          );
        })
      )}
    </Container>
  );
}