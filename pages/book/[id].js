import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Container, Image, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchThisBookData } from "../../slices/thisBookSlice";
import { useRouter } from "next/router";

export default function bookid() {
  const router = useRouter();

  const book = useSelector((state) => state.thisBook.thisBook);
  const error = useSelector((state) => state.thisBook.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchThisBookData({
        id: router.query.id,
      })
    );
  }, [dispatch, router]);

  if (error === "error") {
    dispatch(
      fetchThisBookData({
        id: router.query.id,
      })
    );
  }

  return (
    <div>
      <Container>
        <div id="page-preloader" className="preloader">
          <div className="loader"></div>
        </div>
        <Link href={"/"} className="back">
          <Button className="back">Back</Button>
        </Link>
        <Row className="justify-content-center">
          <Col>
            <h1 className="this_book__title">{book?.volumeInfo?.title}</h1>
          </Col>
        </Row>
        <Row>
          <Col xl={6}>
            <strong>Категории:</strong>
            {book?.volumeInfo?.categories ? (
              <div className="this_book__category">
                {book?.volumeInfo?.categories}
              </div>
            ) : (
              <div>Нет категорий</div>
            )}
            <div className="this_book__autors">
              <strong>
                {book?.volumeInfo?.authors?.length === 1 ? (
                  <>Автор </>
                ) : (
                  <>Авторы: </>
                )}
              </strong>
              {book?.volumeInfo?.authors}
            </div>
            <br />
          </Col>
          <Col xl={6}>
            {book?.volumeInfo?.imageLinks?.extraLarge ? (
              <Image
                src={book?.volumeInfo?.imageLinks?.extraLarge}
                alt="book cover"
                className="this_book__img"
              />
            ) : (
              <Image
                className="noCover"
                src="https://rublevbar.com/files/rublevbar/image/no_product.jpg"
                alt="no book cover"
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
