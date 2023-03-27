import { H2, Main } from "../styles/styles";

import { Link, Outlet } from 'react-router-dom'
import { useState } from "react";

import { ProfileNav, PageContainer, Container } from "../styles/ProfilePagesLayout";
import { BackButton } from "./BackButton";

export const ProfilePagesLayout = () => {
  const [isOrdersPage, setIsOrdersPage] = useState(false)

  return(
    <Main>
      <PageContainer>
        <BackButton />

        <Container>
          <ProfileNav isOrdersPage={isOrdersPage}>
            <li>
              { !isOrdersPage ? <div></div> : <></> }
              <H2 fontSize="xxxl" fontWeight={600}>
                <Link to="/profile/" onClick={() => setIsOrdersPage(false)}>Profile</Link>
              </H2>
            </li>
            <li>
            { isOrdersPage ? <div></div> : <></> }
              <H2 fontSize="xxxl" fontWeight={600}>
                <Link to="/orders/" onClick={() => setIsOrdersPage(true)}>Orders</Link>
              </H2>
            </li>
          </ProfileNav>

          <Outlet />
          
        </Container>
      </PageContainer>
    </Main>
  );
}