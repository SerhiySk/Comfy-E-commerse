import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
const Stars = ({ stars, reviews }) => {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    if (stars < index + 0.5) return <BsStar key={index + 1} />;

    if (stars < index + 1) return <BsStarHalf key={index + 1} />;
    if (stars >= index + 1) return <BsStarFill key={index + 1} />;
  });

  return (
    <Wrapper>
      <span>{tempStars.map(star => star)}</span>
      <p>
        {reviews > 0 ? `(${reviews} customer reviews)` : '(No reviews yet)'}
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
