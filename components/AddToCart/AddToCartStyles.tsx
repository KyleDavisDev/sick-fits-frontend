import styled from "styled-components";

export const StyledButton = styled.button`
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.smoke};
  }
`;
