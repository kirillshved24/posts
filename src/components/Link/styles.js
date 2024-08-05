import styled, { css } from "styled-components";
import { Link, NavLink } from "react-router-dom";

const LinkStyle = css`
color:black;
text-decoration:none;

&:hover{
color:red;
text-decoration:underline;
}
`

export const SimpleLink = styled(Link)`${LinkStyle}`


export const NavigationLink = styled(NavLink)`${LinkStyle}`
