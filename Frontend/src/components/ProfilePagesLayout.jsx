import { H2, Main } from "../styles/styles";

import { Link, Outlet, useLocation } from 'react-router-dom'

import { ProfileNav, PageContainer, Container } from "../styles/ProfilePagesLayout";
import { BackButton } from "./BackButton";

export const ProfilePagesLayout = () => {
  const location = useLocation()

  return(
    <Main>
      <PageContainer>
        <BackButton />

        <Container>
          <ProfileNav >
            <li>
              { location.pathname === '/profile/' ? <div></div> : <></> }
              <H2 fontSize="xxxl" fontWeight={600}>
                <Link to="/profile/" >Profile</Link>
              </H2>
            </li>
            <li>
            { location.pathname === '/orders/' ? <div></div> : <></> }
              <H2 fontSize="xxxl" fontWeight={600}>
                <Link to="/orders/" >Orders</Link>
              </H2>
            </li>
          </ProfileNav>

          <Outlet />
          
        </Container>
      </PageContainer>
    </Main>
  );
}