import * as React from "react";
import { PaginationStyles } from "./PaginationStyles";

interface IPaginationProps {}

const Pagination: React.FunctionComponent<IPaginationProps> = props => {
  return (
    <PaginationStyles>
      <p>Hi I am the pagination</p>
    </PaginationStyles>
  );
};

export default Pagination;
