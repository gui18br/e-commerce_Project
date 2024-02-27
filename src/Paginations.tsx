import React from "react";
import "./Pagination.css";
import { Button } from "./components/button";

interface PaginationProps {
  limit: number;
  total: number;
  offset: number;
  setOffset: (offset: number) => void;
}

const MAX_ITEMS = 5;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Pagination = (props: PaginationProps) => {
  const current = props.offset ? props.offset / props.limit + 1 : 1;
  const pages = Math.ceil(props.total / props.limit);
  const first = Math.max(current - MAX_LEFT, 1);

  function onPageChange(page: number) {
    props.setOffset((page - 1) * props.limit);
  }

  return (
    <ul className="pagination">
      <li>
        <Button
          onClick={() => onPageChange(current - 1)}
          smallButton={true}
          disabled={current === 1}
        >
          Anterior
        </Button>
      </li>
      {[...Array(Math.min(MAX_ITEMS, pages))]
        .map((_, index) => index + first)
        .map((page) => (
          <li key={page}>
            <button
              className={
                page === current
                  ? "pagination__item--active"
                  : "pagination__item"
              }
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      <li>
        <Button
          onClick={() => onPageChange(current + 1)}
          smallButton={true}
          disabled={current === pages}
        >
          Próximo
        </Button>
      </li>
    </ul>
  );
};

export default Pagination;
