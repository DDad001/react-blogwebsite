import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, Col, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link, } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import BlogPage from "./components/BlogPage";
import LogOutBtn from "./components/LogOutBtn";

function App() {
  return (

    <BrowserRouter>
    <Navbar bg="light">
    <Container fluid>
      <Navbar.Brand className="mx-4" href="#home">Danial's Blog Site</Navbar.Brand>
      <Navbar.Toggle />
        <Nav className="me-auto">
      <Nav.Link as={Link} to="/"><strong><u>Blogs</u></strong></Nav.Link>
      <Nav.Link as={Link} to="/Dashboard"><strong><u>Dashboard</u></strong></Nav.Link>
    </Nav>
      <Navbar.Collapse className="justify-content-end mx-2">
        <Navbar.Text>
        <LogOutBtn/>
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
    </Navbar>
    <Container>
    <Routes>
      <Route path="/" element={<BlogPage />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/CreateAccount" element={<CreateAccount />} />
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
    </Container>
    </BrowserRouter>
  );
}

export default App;
