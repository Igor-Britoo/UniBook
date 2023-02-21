import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { BiMenu as OpenMenu } from "react-icons/bi"
import { MdClose as CloseMenu } from "react-icons/md"

import { NavbarContainer, UpNav, DownNav, NavOption, NavButton, NavButtonsContainer, SearchContainer, SearchInput, MobileMenu } from "../styles/Navbar";
import { H1, H2, Span } from "../styles/styles";

export const Navbar = () => {
  const [active, setMode] = useState(false)
  const toggleMode = () =>{
    setMode(!active)
  }
  return(
    <>
      <NavbarContainer>
        
        <UpNav>
          <MobileMenu>
            {active ? 
            <CloseMenu color="white" fontSize="3em" onClick={toggleMode}/>
            :
            <OpenMenu color="white" fontSize="3.1em" onClick={toggleMode}/> 
            }
          </MobileMenu>

          <Link to="/">
            <H1 color="white" fontSize='xxxxl'>UniBook</H1>
          </Link>

          <SearchContainer>
            <SearchInput type="text" placeholder="Search by Title, Author or ISBN" />
            <button>
              <FaSearch color="#1C3333" fontSize="1.5em"/>
            </button>
          </SearchContainer>

          <NavButtonsContainer>
            <NavButton>
              <FaUser color="white" fontSize="2.1em"/>
            </NavButton>

            <NavButton>
              <FaShoppingCart color="white" fontSize="2.4em"/>
              <Span fontSize="xs" fontWeight="700">0</Span>
            </NavButton>
          </NavButtonsContainer>

        </UpNav>

        <DownNav mobileMenuOpen={active}>
          <NavOption>
            <H2 fontSize='xxl' fontWeight="500"><Link>Special Offers</Link></H2>
          </NavOption>

          <NavOption>
            <H2 fontSize='xxl' fontWeight="500"><Link>New Books</Link></H2>
          </NavOption>

          <NavOption>
            <H2 fontSize='xxl' fontWeight="500"><Link>Best Sellers</Link></H2>
          </NavOption>

          <NavOption>
            <H2 fontSize='xxl' fontWeight="500"><Link>Fiction</Link></H2>
          </NavOption>

          <NavOption>
            <H2 fontSize='xxl' fontWeight="500"><Link>Nonfiction</Link></H2>
          </NavOption>

          <NavOption>
            <H2 fontSize='xxl' fontWeight="500"><Link>Kids</Link></H2>
          </NavOption>
        </DownNav>

      </NavbarContainer>
    </>
  );
}