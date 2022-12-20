import React from "react";
import { DownNav, 
  NavBar, 
  UpNav, 
  Logo, 
  Option, 
  Input, 
  Search, 
  NavButton,
  Form,
  MobileNavBar } from "../styles/components/navbar";

export const Home = () =>{
  return(
    <>
      <MobileNavBar>
        {/* Esse svg vai para dentro de um botão */}
        <svg width="20" height="20" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 2H19C19.2652 2 19.5196 1.89464 19.7071 1.70711C19.8946 1.51957 20 1.26522 20 1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2ZM19 12H1C0.734784 12 0.48043 12.1054 0.292893 12.2929C0.105357 12.4804 0 12.7348 0 13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14H19C19.2652 14 19.5196 13.8946 19.7071 13.7071C19.8946 13.5196 20 13.2652 20 13C20 12.7348 19.8946 12.4804 19.7071 12.2929C19.5196 12.1054 19.2652 12 19 12ZM19 8H1C0.734784 8 0.48043 8.10536 0.292893 8.29289C0.105357 8.48043 0 8.73478 0 9C0 9.26522 0.105357 9.51957 0.292893 9.70711C0.48043 9.89464 0.734784 10 1 10H19C19.2652 10 19.5196 9.89464 19.7071 9.70711C19.8946 9.51957 20 9.26522 20 9C20 8.73478 19.8946 8.48043 19.7071 8.29289C19.5196 8.10536 19.2652 8 19 8ZM19 4H1C0.734784 4 0.48043 4.10536 0.292893 4.29289C0.105357 4.48043 0 4.73478 0 5C0 5.26522 0.105357 5.51957 0.292893 5.70711C0.48043 5.89464 0.734784 6 1 6H19C19.2652 6 19.5196 5.89464 19.7071 5.70711C19.8946 5.51957 20 5.26522 20 5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4Z" fill="white"/>
        </svg>

      </MobileNavBar>


      <NavBar>
        
        <UpNav>
          <Logo>UniBook</Logo>

          <Form>
            <Input type="text" name="search" placeholder="Search by Title, Author, Keyword or ISBN"></Input>
            <Search>
              <svg width="19" height="20" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.7417 17.293L15.0427 13.3984C14.8757 13.2227 14.6494 13.125 14.4119 13.125H13.8072C14.8312 11.7461 15.4397 10.0117 15.4397 8.125C15.4397 3.63672 11.9855 0 7.72251 0C3.45953 0 0.00537109 3.63672 0.00537109 8.125C0.00537109 12.6133 3.45953 16.25 7.72251 16.25C9.51452 16.25 11.1618 15.6094 12.4715 14.5312V15.168C12.4715 15.418 12.5643 15.6562 12.7312 15.832L16.4303 19.7266C16.779 20.0937 17.343 20.0937 17.688 19.7266L18.738 18.6211C19.0867 18.2539 19.0867 17.6602 18.7417 17.293ZM7.72251 13.125C5.09943 13.125 2.9735 10.8906 2.9735 8.125C2.9735 5.36328 5.09572 3.125 7.72251 3.125C10.3456 3.125 12.4715 5.35937 12.4715 8.125C12.4715 10.8867 10.3493 13.125 7.72251 13.125Z" fill="#1C3333"/>
              </svg>
            </Search>
          </Form>

          <div className="buttons">
            <NavButton>
              <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.4359 20C22.9391 20 27.3993 15.5234 27.3993 10C27.3993 4.47656 22.9391 0 17.4359 0C11.9327 0 7.47253 4.47656 7.47253 10C7.47253 15.5234 11.9327 20 17.4359 20ZM24.4103 22.5H23.1103C21.3823 23.2969 19.4597 23.75 17.4359 23.75C15.4121 23.75 13.4973 23.2969 11.7614 22.5H10.4615C4.6859 22.5 0 27.2031 0 33V36.25C0 38.3203 1.67353 40 3.73626 40H31.1355C33.1983 40 34.8718 38.3203 34.8718 36.25V33C34.8718 27.2031 30.1859 22.5 24.4103 22.5Z" fill="white"/>
              </svg>
            </NavButton>
            <NavButton>
            <svg width="46" height="41" viewBox="0 0 46 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M36.675 26.2027L39.9579 11.7583C40.1949 10.7153 39.4022 9.72222 38.3326 9.72222H11.0561L10.4196 6.61041C10.261 5.83479 9.57847 5.27777 8.78674 5.27777H1.66667C0.746181 5.27777 0 6.02395 0 6.94444V8.05555C0 8.97604 0.746181 9.72222 1.66667 9.72222H6.51965L11.398 33.5719C10.2309 34.2431 9.44445 35.5015 9.44445 36.9444C9.44445 39.0922 11.1856 40.8333 13.3333 40.8333C15.4811 40.8333 17.2222 39.0922 17.2222 36.9444C17.2222 35.856 16.7745 34.8726 16.0539 34.1667H30.6127C29.8922 34.8726 29.4445 35.856 29.4445 36.9444C29.4445 39.0922 31.1856 40.8333 33.3333 40.8333C35.4811 40.8333 37.2222 39.0922 37.2222 36.9444C37.2222 35.4047 36.3272 34.0742 35.0292 33.4441L35.4124 31.7583C35.6494 30.7153 34.8567 29.7222 33.7872 29.7222H15.147L14.6925 27.5H35.0498C35.828 27.5 36.5026 26.9615 36.675 26.2027Z" fill="white"/>
              <circle cx="37.5" cy="12.5" r="8.5" fill="#CCCCCC"/>
              <path d="M37.72 17.14C37.2333 17.14 36.83 17.04 36.51 16.84C36.19 16.64 35.95 16.3667 35.79 16.02C35.63 15.6667 35.55 15.26 35.55 14.8V11.17C35.55 10.6967 35.6267 10.2833 35.78 9.93C35.9333 9.57 36.17 9.29 36.49 9.09C36.81 8.89 37.22 8.79 37.72 8.79C38.2133 8.79 38.6167 8.89 38.93 9.09C39.25 9.29 39.4867 9.57 39.64 9.93C39.7933 10.2833 39.87 10.6967 39.87 11.17V14.8C39.87 15.26 39.79 15.6667 39.63 16.02C39.47 16.3667 39.23 16.64 38.91 16.84C38.59 17.04 38.1933 17.14 37.72 17.14ZM37.72 15.78C37.9 15.78 38.03 15.7233 38.11 15.61C38.19 15.4967 38.2433 15.3633 38.27 15.21C38.2967 15.05 38.31 14.9033 38.31 14.77V11.2C38.31 11.0533 38.2967 10.9 38.27 10.74C38.25 10.58 38.2 10.4433 38.12 10.33C38.04 10.21 37.9067 10.15 37.72 10.15C37.5333 10.15 37.3967 10.21 37.31 10.33C37.23 10.4433 37.1767 10.58 37.15 10.74C37.13 10.9 37.12 11.0533 37.12 11.2V14.77C37.12 14.9033 37.1333 15.05 37.16 15.21C37.1867 15.3633 37.2433 15.4967 37.33 15.61C37.4167 15.7233 37.5467 15.78 37.72 15.78Z" fill="#1C3333"/>
            </svg>
            </NavButton>
          </div>

        </UpNav>

        <DownNav>
          <Option>Special Offers</Option>
          <Option>New Books</Option>
          <Option>Best Sellers</Option>
          <Option>Fiction</Option>
          <Option>Nonfiction</Option>
          <Option>Kids</Option>
        </DownNav>
      </NavBar>
    </>
  );
}