import styled from "styled-components";

export const StyledDiv = styled.div`
  background-color: ${props => props.theme.siteBackgroundColor};
  color: ${props => props.theme.black};
`;

export const StyledInner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;
