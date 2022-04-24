import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { createAccount } from "../Services/DataService";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  let navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = () => {
    let userData = {
      Id: 0,
      Username,
      Password,
    };
    createAccount(userData);
  };

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center mt-5">
        <Col
          lg={6}
          className="mt-5"
          style={{
            backgroundColor: "#0A326D",
            borderRadius: 5,
            paddingTop: 30,
            paddingBottom: 30,
          }}
        >
          <h1 className="d-flex justify-content-center TextColor">
            Create Account
          </h1>

          <div className="d-flex justify-content-center mb-3 mt-4">
            <input
              id="ip2"
              width={10}
              type="text"
              placeholder="Enter Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div className="d-flex justify-content-center mb-3 mt-4">
            <input
              id="ip2"
              type="password"
              placeholder="Enter Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <div className="d-flex justify-content-center mt-4">
            <Button
              className="RoundButton"
              variant="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <p className="mt-3 TextColor">Have an account?</p>
          </div>

          <Row>
            <Col lg={12} className="d-flex justify-content-center">
              <p
                className="TextColor"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/Login")}
              >
                <u>Login Here</u>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateAccount;
