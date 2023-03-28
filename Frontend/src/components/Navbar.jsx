import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { BiMenu as OpenMenu } from "react-icons/bi"
import { MdClose as CloseMenu } from "react-icons/md"

import { NavbarContainer, UpNav, DownNav, NavOption, NavButton, NavButtonsContainer, SearchContainer, SearchInput, MobileMenu } from "../styles/Navbar";
import { H1, H2, Span } from "../styles/styles";
import { Cart } from "./Cart";
import { DropdownMenu } from "./DropdownMenu";

export const Navbar = () => {
  const navigate = useNavigate()

  const [mobileMenuActive, setMobileMenuMode] = useState(false)
  const [dropdownMenuActive, setDropdownMenuMode] = useState(false)
  const [cartActive, setCartMode] = useState(false)
  const [search, setSearch] = useState("")

  const toggleMobileMenu = () =>{
    setMobileMenuMode(!mobileMenuActive)
  }
  const toggleDropdownMenu = () =>{
    setDropdownMenuMode(!dropdownMenuActive)
  }
  const openCart = () =>{
    setCartMode(!cartActive)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const submitSearchOnEnter = (event) => {
    if (event.keyCode === 13) {
      submitSearch()
    }
  }

  const submitSearch = () => {
    if (search){
      navigate(`/books?q=${search}`)
      window.location.reload(true)
    }
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
            <SearchInput type="text" placeholder="Search by Title, Author or ISBN" value={search} onChange={handleSearch} onKeyDown={submitSearchOnEnter}/>
            <button onClick={submitSearch}>
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
            <H2 fontSize='xxl' fontWeight="500"><Link to="/list/" >Special Offers</Link></H2>
          </NavOption>

          <NavOption>
            <H2 fontSize='xxl' fontWeight="500"><Link to="/list/" >New Books</Link></H2>
          </NavOption>

          <NavOption>
            <H2 fontSize='xxl' fontWeight="500"><Link to="/list/" >Best Sellers</Link></H2>
          </NavOption>

          <NavOption>
            <H2 fontSize='xxl' fontWeight="500"><Link to="/list/" >Fiction</Link></H2>
          </NavOption>

          <NavOption>
            <H2 fontSize='xxl' fontWeight="500"><Link to="/list/" >Nonfiction</Link></H2>
          </NavOption>

          <NavOption>
            <H2 fontSize='xxl' fontWeight="500"><Link to="/list/" >Kids</Link></H2>
          </NavOption>
        </DownNav>

      </NavbarContainer>
    </>
  );
}