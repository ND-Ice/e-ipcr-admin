import React from "react";
import styled from "styled-components";

import Logo from "../image/logo.png";

export default function BrandName() {
  return (
    <BrandContainer>
      <LogoImage src={Logo} />
      <h5 className="m-0">E-IPCR</h5>
    </BrandContainer>
  );
}

const BrandContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
`;
