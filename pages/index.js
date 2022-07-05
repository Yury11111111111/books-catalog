import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooksData } from "../slices/booksSlice";
import Head from "next/head";
import { Container, Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import BookComponent from "../componets/BookComponent";

export default function Home() {
  const books = useSelector((state) => state.books.books);
  const name = useSelector((state) => state.books.name);
  const startIndex = useSelector((state) => state.books.startIndex);
  const error = useSelector((state) => state.books.error);

  const [resultName, setResultName] = useState("book");
  const [resultStartIndex, setResultStartIndex] = useState(0);
  const [resultCategory, setResultCategory] = useState("all");
  const [resultSort, setResultSort] = useState("relevance");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchBooksData({
        name: resultName,
        startIndex: resultStartIndex,
        category: resultCategory,
        sort: resultSort,
      })
    );
  }, [resultName, resultStartIndex, resultCategory, resultSort, dispatch]);

  if (error === "error") {
    dispatch(
      fetchBooksData({
        name: resultName,
        startIndex: resultStartIndex,
        category: resultCategory,
        sort: resultSort,
      })
    );
  }

  function categoryChange() {
    setResultCategory(document.querySelector("#category").value);
    setResultStartIndex(0);
    dispatch(
      fetchBooksData({
        name: resultName,
        startIndex: resultStartIndex,
        category: resultCategory,
        sort: resultSort,
      })
    );
  }

  function sortChange() {
    setResultSort(document.querySelector("#sort").value);
    setResultStartIndex(0);
    dispatch(
      fetchBooksData({
        name: resultName,
        startIndex: resultStartIndex,
        category: resultCategory,
        sort: resultSort,
      })
    );
  }

  function handleSubmit() {
    const input = document.querySelector("#form");

    setResultName(input.value);
  }

  function go_back() {
    setResultStartIndex(resultStartIndex - 30);
  }
  function go_forward() {
    setResultStartIndex(resultStartIndex + 30);
  }

  function handleKeyPress(e) {
    if (e.charCode == 13) {
      e.preventDefault()
      const input = document.querySelector("#form");

      setResultName(input.value);
    }
  }

  return (
    <>
      <Head>
        <title>Books catalog</title>
      </Head>
      <div id="page-preloader" className="preloader">
        <div className="loader"></div>
      </div>

      <header className="header">
        <Container>
          <h1 className="title">Search for books</h1>
          <Form>
            <Row className="justify-content-center">
              <Col xl={6}>
                <InputGroup>
                  <Form.Control
                    onKeyPress={handleKeyPress}
                    id="form"
                    placeholder="Search books"
                  />
                  <Button type="button" onClick={handleSubmit}>
                    Search
                  </Button>
                </InputGroup>
              </Col>
            </Row>
            <Row className="mt-3 justify-content-center">
              <Col xl={3}>
                <Form.Select
                  onChange={categoryChange}
                  id="category"
                  aria-label="Default select example"
                >
                  <option value="all">all</option>
                  <option value="art">art</option>
                  <option value="biography">biography</option>
                  <option value="computers">computers</option>
                  <option value="history">history</option>
                  <option value="medical">medical</option>
                  <option value="poetry">poetry</option>
                </Form.Select>
              </Col>
              <Col xl={3}>
                <Form.Select
                  onChange={sortChange}
                  id="sort"
                  aria-label="Default select example"
                >
                  <option value="relevance ">relevance </option>
                  <option value="newest">newest</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </Container>
      </header>
      <Container>Всего книг по вашему запросу: {books.totalItems}</Container>
      <Container>
        <div className="books">
          {books.items?.map((book, index) => {
            return <BookComponent book={book} key={index} />;
          })}
        </div>
      </Container>
      <footer>
        {resultStartIndex !== 0 ? (
          <Button className="go_back" onClick={go_back}>
            go back
          </Button>
        ) : (
          <></>
        )}
        {books.totalItems > resultStartIndex ? (
          <Button className="go_forward" onClick={go_forward}>
            go forward
          </Button>
        ) : (
          <></>
        )}
      </footer>
    </>
  );
}
