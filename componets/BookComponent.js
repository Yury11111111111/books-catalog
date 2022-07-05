import React from "react";
import Link from "next/link"
import Image from 'react-bootstrap/Image'

const BookComponent = (props) => {
  return (
    <>
    <Link href={`/book/${props.book.id}`}>
      <div className="book__wraper">
        {props.book?.volumeInfo?.categories ? 
            <div className="book__category">{props.book?.volumeInfo?.categories[0]}</div>
          : <></>}
        {props.book?.volumeInfo?.imageLinks?.thumbnail ? (
          <Image
            src={props.book?.volumeInfo?.imageLinks?.thumbnail}
            alt="book cover"
            className="book__img"
          />
        ) : (
          <Image className="noCover" src="https://rublevbar.com/files/rublevbar/image/no_product.jpg" alt="no book cover" />
        )}
        <div className="book__title">{props.book?.volumeInfo?.title}</div>
        <div className="book__autors">{props.book?.volumeInfo?.authors}</div>
      </div></Link>
    </>
  );
};

export default BookComponent;
