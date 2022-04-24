import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Accordion,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import {
  addBlogItem,
  checkToken,
  LoggedInData,
  getBlogItems,
  getBlogItemsByUserId,
  updateBlogItems,
} from "../Services/DataService";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  let navigate = useNavigate();

  useEffect(() => {
    if (!checkToken()) {
      navigate("/Login");
    } else {
      setTimeout(async () => {
        let loggedInData = LoggedInData();
        setBlogUserId(loggedInData.userId);
        setBlogPublisherName(loggedInData.publisherName);
        console.log(loggedInData);
        let userBlogItems = await getBlogItemsByUserId(loggedInData.userId);
        setBlogItems(userBlogItems);
        console.log(userBlogItems);
        setIsLoading(false);
      }, 1000);
    }
  }, []);

  const [blogItems, setBlogItems] = useState([]);

  //Modal
  const [blogId, setBlogId] = useState(0);
  const [blogUserId, setBlogUserId] = useState(0);
  const [blogPublisherName, setBlogPublisherName] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogTags, setBlogTags] = useState("");
  const [blogIsDeleted, setIsDeleted] = useState(false);
  const [blogIsPublished, setIsPublished] = useState(false);
  //Form

  //Bools to show the modal and edit
  const [show, setShow] = useState(false);
  const [editBool, setEditBool] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //Function For Modal
  const handleClose = () => setShow(false);
  const handleShow = (
    e,
    {
      id,
      userId,
      publisherName,
      title,
      image,
      description,
      category,
      tags,
      isDeleted,
      isPublished,
    }
  ) => {
    setShow(true);
    if (e.target.textContent == "Add Blog Item") {
      setEditBool(false);
    } else {
      setEditBool(true);
    }
    setBlogId(id);
    setBlogUserId(userId);
    setBlogPublisherName(publisherName);
    setBlogTitle(title);
    setBlogImage(image);
    setBlogDescription(description);
    setBlogCategory(category);
    setBlogTags(tags);
    setIsDeleted(isDeleted);
    setIsPublished(isPublished);
  };
  const handleSave = async ({ target: { textContent } }) => {
    const Published = {
      Id: blogId,
      UserId: blogUserId,
      PublisherName: blogPublisherName,
      Title: blogTitle,
      Image: blogImage,
      Description: blogDescription,
      Date: new Date(),
      Category: blogCategory,
      Tags: blogTags,
      IsDeleted: false,
      IsPublished:
        textContent === "Save" || textContent === "Save Changes" ? false : true,
    };
    console.log(Published);
    handleClose();
    let result = false;
    if (editBool) {
      result = await updateBlogItems(Published);
    } else {
      result = await addBlogItem(Published);
    }
    if (result) {
      let userBlogItems = await getBlogItemsByUserId(blogUserId);
      console.log(userBlogItems);
      setBlogItems(userBlogItems);
    } else {
      alert(`Blog Item not ${editBool ? "Updated" : "Added"} `);
    }
  };

  const handlePublish = async (item) => {
    item.isPublished = !item.isPublished;
    let result = await updateBlogItems(item);
    if (result) {
      let userBlogItems = await getBlogItemsByUserId(blogUserId);
      console.log(userBlogItems);
      setBlogItems(userBlogItems);
    } else {
      alert(`Blog Item not ${editBool ? "Updated" : "Added"} `);
    }
  };

  const handleDelete = async (item) => {
    console.log(item);
    item.isDeleted = !item.isDeleted;
    let result = await updateBlogItems(item);
    if (result) {
      let userBlogItems = await getBlogItemsByUserId(blogUserId);
      console.log(userBlogItems);
      setBlogItems(userBlogItems);
    } else {
      alert(`Blog Item not ${editBool ? "Updated" : "Added"} `);
    }
  };

  const handleImage = async (event) => {
    let file = event.target.files[0];
    const reader = new FileReader(file);
    reader.onloadend = () => {
      setBlogImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container fluid className="mt-5">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editBool ? "Edit" : "Add"} Blog Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                onChange={(e) => setBlogTitle(e.target.value)}
                value={blogTitle}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={blogDescription}
                onChange={({ target: { value } }) => setBlogDescription(value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Category">
              <Form.Select
                aria-label="Pick a Category"
                value={blogCategory}
                onChange={(e) => setBlogCategory(e.target.value)}
              >
                <option>Pick a Category</option>
                <option value="Food">Food</option>
                <option value="Tech">Tech</option>
                <option value="Sports">Sports</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Tags">
              <Form.Label>Enter Tags seperated by a comma</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a Tag seperated by a comma"
                value={blogTags}
                onChange={({ target }) => setBlogTags(target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Image">
              <Form.Label>Pick an Image</Form.Label>
              <Form.Control
                type="File"
                accept="image/png, image/jpg"
                onChange={handleImage}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editBool ? "Save Changes" : "Save"}
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editBool ? "Save Changes" : "Save"} and Publish
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col md={12} className="d-flex justify-content-center">
          <Button
            onClick={(e) =>
              handleShow(e, {
                id: 0,
                userId: blogUserId,
                publisherName: blogPublisherName,
                title: "",
                image: "",
                description: "",
                category: "",
                tags: "",
                isDeleted: false,
                isPublished: false,
              })
            }
          >
            Add Blog Item
          </Button>
        </Col>
      </Row>

      <Row>
        <Col className="mt-5">
          {isLoading ? (
            // Show loading screen here
            <h1>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              Loading...
            </h1>
          ) : blogItems.length == 0 ? (
            <h1 className="d-flex justify-content-center">
              No Blog Items, Add Blog Items Above
            </h1>
          ) : (
            <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Published</Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                    {blogItems.map((item, i) => {
                      return (
                        <>
                          {item.isPublished && !item.isDeleted ? (
                            <ListGroup.Item key={i}>
                              <Col md={6}>{item.title}</Col>

                              <Col md={6}>
                                <Button
                                  variant="danger"
                                  onClick={() => handleDelete(item)}
                                >
                                  Delete
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={(e) => handleShow(e, item)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="warning"
                                  onClick={() => handlePublish(item)}
                                >
                                  Unpublish
                                </Button>
                              </Col>
                            </ListGroup.Item>
                          ) : null}
                        </>
                      );
                    })}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Unpublished</Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                    {blogItems.map((item, i) => {
                      return (
                        <>
                          {!item.isPublished && !item.isDeleted ? (
                            <ListGroup.Item key={i}>
                              <Col md={6}>{item.title}</Col>

                              <Col md={6}>
                                <Button
                                  variant="danger"
                                  onClick={() => handleDelete(item)}
                                >
                                  Delete
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={(e) => handleShow(e, item)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="warning"
                                  onClick={() => handlePublish(item)}
                                >
                                  Publish
                                </Button>
                              </Col>
                            </ListGroup.Item>
                          ) : null}
                        </>
                      );
                    })}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
