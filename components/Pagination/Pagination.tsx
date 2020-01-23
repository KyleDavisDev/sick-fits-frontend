import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";

import { perPage } from "../../config";

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

import { PaginationStyles } from "./PaginationStyles";

interface IPaginationProps {
  page: number;
}

const Pagination: React.FunctionComponent<IPaginationProps> = props => {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ data, loading }) => {
        const count = data.itemsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        const curPage = props.page;
        if (loading) return <p>Loading...</p>;
        return (
          <React.Fragment>
            <Head>
              <title>
                Sick Fits! Page {curPage} of {pages}
              </title>
            </Head>
            <PaginationStyles>
              <Link href={{ pathname: "shop", query: { page: curPage - 1 } }}>
                <a className="prev" aria-disabled={curPage <= 1}>
                  &larr; Prev
                </a>
              </Link>
              <p>
                Page {curPage} of {pages} !
              </p>
              <Link href={{ pathname: "shop", query: { page: curPage + 1 } }}>
                <a className="next" aria-disabled={curPage >= pages}>
                  Next &rarr;
                </a>
              </Link>
            </PaginationStyles>
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default Pagination;
