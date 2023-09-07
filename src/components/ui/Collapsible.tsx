import React, { useState, ReactElement } from "react";
import styled from "styled-components";
import ArrowRight from "../../assets/icons/arrow-right.svg";
import ArrowDown from "../../assets/icons/arrow-down.svg";

type CollapsibleProps = React.PropsWithChildren<{
  fill?: string;
  children: ReactElement;
}>;

const StyledContainer = styled.div`
  font-size: 15px;
  line-height: 22px;
  .toggle {
    padding: 10px;
  }
`;

const Collapsible = ({
  fill = "black",
  children,
}: CollapsibleProps): ReactElement => {
  const height = 24;
  const width = 24;

  const Open = () => (
    <ArrowDown fill={fill} width={height} height={width}></ArrowDown>
  );
  const Closed = () => (
    <ArrowRight fill={fill} width={height} height={width}></ArrowRight>
  );
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <StyledContainer onClick={() => toggle()}>
      {open ? <Open /> : <Closed />}
      {open && <div className="toggle">{children}</div>}
    </StyledContainer>
  );
};

export default Collapsible;
