import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GetLoggedInUserData, login } from "../Services/DataService";
import "../App.css";

function Login() {
  let navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = async () => {
    let userData = {
      Username,
      Password,
    };
    let token = await login(userData);
    if (token.token != null) {
      localStorage.setItem("Token", token.token);
      GetLoggedInUserData(Username);
      navigate("/Dashboard");
    }
  };

  return (
    <Container>
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
          <h1 className="d-flex justify-content-center TextColor">Login</h1>

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
            <p className="mt-3 TextColor">Don't have an account? Create one</p>
          </div>

          <Row>
            <Col lg={12} className="d-flex justify-content-center">
              <p
                className="TextColor"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/CreateAccount")}
              >
                <u>Create Account</u>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
