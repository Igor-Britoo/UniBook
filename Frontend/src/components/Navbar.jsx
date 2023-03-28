import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { BiMenu as OpenMenu } from "react-icons/bi"
import { MdClose as CloseMenu } from "react-icons/md"

import { NavbarContainer, UpNav, DownNav, NavOption, NavButton, NavButtonsContainer, SearchContainer, SearchInput, MobileMenu } from "../styles/Navbar";
import { H1, H2, Span } from "../styles/styles";
import { Cart } from "./Cart";
import { DropdownMenu } from "./DropdownMenu";

export const Navbar = () => {
  const [mobileMenuActive, setMobileMenuMode] = useState(false)
  const [dropdownMenuActive, setDropdownMenuMode] = useState(false)
  const [cartActive, setCartMode] = useState(false)
  const toggleMobileMenu = () =>{
    setMobileMenuMode(!mobileMenuActive)
  }
  const toggleDropdownMenu = () =>{
    setDropdownMenuMode(!dropdownMenuActive)
  }
  const openCart = () =>{
    setCartMode(!cartActive)
  }
  return(
    <>
      <NavbarContainer>
        
        <UpNav>
          <MobileMenu>
            {mobileMenuActive ? 
            <CloseMenu color="white" fontSize="3em" onClick={toggleMobileMenu}/>
            :
            <OpenMenu color="white" fontSize="3.1em" onClick={toggleMobileMenu}/> 
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
              <FaUser color="white" fontSize="2.1em" onClick={toggleDropdownMenu}/>
            </NavButton>

            <DropdownMenu dropdownMenuActive={dropdownMenuActive}/>

            <NavButton>
              <FaShoppingCart color="white" fontSize="2.4em" onClick={openCart}/>
              <Span fontSize="xs" fontWeight="700">0</Span>
            </NavButton>
            
            <Cart cartActive={cartActive} setCartMode={setCartMode}/>

          </NavButtonsContainer>

        </UpNav>

        <DownNav mobileMenuOpen={mobileMenuActive}>
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