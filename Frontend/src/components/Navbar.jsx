import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { BiMenu as OpenMenu } from "react-icons/bi"
import { MdClose as CloseMenu } from "react-icons/md"

import { NavbarContainer, NavbarContainerMobile , UpNav, DownNav, NavOption, NavButton, NavButtonsContainer, SearchContainer, SearchInput, MobileMenu, NavButtonsContainerMobile } from "../styles/Navbar";
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

  const navigateToPath = (path) => {
    navigate(path)
    window.location.reload(true)
  }

  const submitSearch = () => {
    if (search){
      navigateToPath(`/books/search?q=${search}`)
    }
  }

  return(
    <>
      <NavbarContainer>
        
        <UpNav>

            <div className="row">
    
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
              
              <NavButtonsContainerMobile>
                <NavButton onClick={toggleDropdownMenu}>
                  <FaUser color="white" fontSize="2.1em"/>
                </NavButton>

                <DropdownMenu dropdownMenuActive={dropdownMenuActive}/>

                <NavButton>
                  <FaShoppingCart color="white" fontSize="2.4em" onClick={openCart}/>
                  <Span fontSize="xs" fontWeight="700" onClick={openCart}>0</Span>
                </NavButton>
                
                <Cart cartActive={cartActive} setCartMode={setCartMode}/>

              </NavButtonsContainerMobile>

          </div>
          
          <SearchContainer>
            <SearchInput type="text" placeholder="Search by Title, Author or ISBN" value={search} onChange={handleSearch} onKeyDown={submitSearchOnEnter}/>
            <button onClick={submitSearch}>
              <FaSearch color="#1C3333" fontSize="1.5em"/>
            </button>
          </SearchContainer>

          <NavButtonsContainer>
            <NavButton onClick={toggleDropdownMenu}>
              <FaUser color="white" fontSize="2.1em"/>
            </NavButton>

            <DropdownMenu dropdownMenuActive={dropdownMenuActive}/>

            <NavButton>
              <FaShoppingCart color="white" fontSize="2.4em" onClick={openCart}/>
              <Span fontSize="xs" fontWeight="700" onClick={openCart}>0</Span>
            </NavButton>
            
            <Cart cartActive={cartActive} setCartMode={setCartMode}/>

          </NavButtonsContainer>

        </UpNav>

        <DownNav mobileMenuOpen={mobileMenuActive}>
          <NavOption>
            <H2 fontSize='xxl' fontWeight="500"><Link onClick={() => navigateToPath("/books-best-sellers/")} >Best Sellers</Link></H2>
          </NavOption>

          <NavOption>
            <H2 fontSize='xxl' fontWeight="500"><Link onClick={() => navigateToPath("/books-most-viewed/")} >Most Viewed</Link></H2>
          </NavOption>

          <NavOption>
            <H2 fontSize='xxl' fontWeight="500"><Link onClick={() => navigateToPath("/books-on-sale/")} >On Sale</Link></H2>
          </NavOption>

          <NavOption>
            <H2 fontSize='xxl' fontWeight="500"><Link onClick={() => navigateToPath("/books/filter?genre=Fantasy")} >Fantasy</Link></H2>
          </NavOption>

          <NavOption>
            <H2 fontSize='xxl' fontWeight="500"><Link onClick={() => navigateToPath("/books/filter?genre=Horror")} >Horror</Link></H2>
          </NavOption>

          <NavOption>
            <H2 fontSize='xxl' fontWeight="500"><Link onClick={() => navigateToPath("/books/filter?genre=History")} >History</Link></H2>
          </NavOption>
        </DownNav>

      </NavbarContainer>
    </>
  );
}