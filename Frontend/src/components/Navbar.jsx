import React, { useState } from "react";
import { Link } from 'react-router-dom'

import { 
    NavbarContainer, 
    UpNav,
    DownNav,
    NavOption, 
    NavButton,
    NavButtonsContainer,
    SearchContainer,
    SearchInput, 
} from "../styles/Navbar";

import { H1, H2 } from "../styles/styles";

export const Navbar = () => {
  return(
    <>
      <NavbarContainer>
        
        <UpNav>

          <Link to="/"><H1 color="white" fontSize='xxxxl'>UniBook</H1></Link>

          <SearchContainer>
            <SearchInput type="text" placeholder="Search by Title, Author or ISBN" />
            <svg viewBox="0 0 19 21" height="20" width="20">
              <path d="M18.7417 17.293L15.0427 13.3984C14.8757 13.2227 14.6494 13.125 14.4119 13.125H13.8072C14.8312 11.7461 15.4397 10.0117 15.4397 8.125C15.4397 3.63672 11.9855 0 7.72251 0C3.45953 0 0.00537109 3.63672 0.00537109 8.125C0.00537109 12.6133 3.45953 16.25 7.72251 16.25C9.51452 16.25 11.1618 15.6094 12.4715 14.5312V15.168C12.4715 15.418 12.5643 15.6562 12.7312 15.832L16.4303 19.7266C16.779 20.0937 17.343 20.0937 17.688 19.7266L18.738 18.6211C19.0867 18.2539 19.0867 17.6602 18.7417 17.293ZM7.72251 13.125C5.09943 13.125 2.9735 10.8906 2.9735 8.125C2.9735 5.36328 5.09572 3.125 7.72251 3.125C10.3456 3.125 12.4715 5.35937 12.4715 8.125C12.4715 10.8867 10.3493 13.125 7.72251 13.125Z" fill="#1C3333"/>
            </svg>
          </SearchContainer>

          <NavButtonsContainer>
            <NavButton>
              {/*
              <FontAwesomeIcon icon={faUser} color="white" font-size="2.5em" fixedWidth/>
              */}
              <svg width="25" height="30" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.4359 20C22.9391 20 27.3993 15.5234 27.3993 10C27.3993 4.47656 22.9391 0 17.4359 0C11.9327 0 7.47253 4.47656 7.47253 10C7.47253 15.5234 11.9327 20 17.4359 20ZM24.4103 22.5H23.1103C21.3823 23.2969 19.4597 23.75 17.4359 23.75C15.4121 23.75 13.4973 23.2969 11.7614 22.5H10.4615C4.6859 22.5 0 27.2031 0 33V36.25C0 38.3203 1.67353 40 3.73626 40H31.1355C33.1983 40 34.8718 38.3203 34.8718 36.25V33C34.8718 27.2031 30.1859 22.5 24.4103 22.5Z" fill="white"/>
              </svg>
            </NavButton>
            <NavButton>
              {/*
              <FontAwesomeIcon icon={faShoppingCart} color="white" font-size="2.5em" fixedWidth />
              */}
              <svg width="36" height="31" viewBox="0 0 46 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.675 26.2027L39.9579 11.7583C40.1949 10.7153 39.4022 9.72222 38.3326 9.72222H11.0561L10.4196 6.61041C10.261 5.83479 9.57847 5.27777 8.78674 5.27777H1.66667C0.746181 5.27777 0 6.02395 0 6.94444V8.05555C0 8.97604 0.746181 9.72222 1.66667 9.72222H6.51965L11.398 33.5719C10.2309 34.2431 9.44445 35.5015 9.44445 36.9444C9.44445 39.0922 11.1856 40.8333 13.3333 40.8333C15.4811 40.8333 17.2222 39.0922 17.2222 36.9444C17.2222 35.856 16.7745 34.8726 16.0539 34.1667H30.6127C29.8922 34.8726 29.4445 35.856 29.4445 36.9444C29.4445 39.0922 31.1856 40.8333 33.3333 40.8333C35.4811 40.8333 37.2222 39.0922 37.2222 36.9444C37.2222 35.4047 36.3272 34.0742 35.0292 33.4441L35.4124 31.7583C35.6494 30.7153 34.8567 29.7222 33.7872 29.7222H15.147L14.6925 27.5H35.0498C35.828 27.5 36.5026 26.9615 36.675 26.2027Z" fill="white"/>
                <circle cx="37.5" cy="12.5" r="8.5" fill="#CCCCCC"/>
              </svg>
            </NavButton>
          </NavButtonsContainer>

        </UpNav>

        <DownNav>
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