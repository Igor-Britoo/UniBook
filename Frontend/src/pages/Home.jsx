import React from 'react';
import { Footer } from '../components/Footer/index';
import { Nav } from "../components/NavBar/index";
import { StyledText, 
  TitlesHome,
  ContainerSections,
  Card,
  TitleBook,
  AuthorName,
  Price,
  ButtonAddCart,
  RowBooks, } from '../components/MainPageComponents';

export const Home = () => {
  return(
    <main>
      <Nav></Nav>
  
      <StyledText>
        <img src='/images/banner.png'></img>
        <ContainerSections>
          <TitlesHome>Best Sellers of the Week</TitlesHome>
          <RowBooks>

          <Card>
            {/* <img src='./images/book.png'></img> */}
            <TitleBook>What I Learned from the Trees</TitleBook>
            <AuthorName>L.E. Browman</AuthorName>
            <Price>$ 20.00</Price>
            <ButtonAddCart>
              Add to Cart
            </ButtonAddCart>
          </Card>

          <Card>
            {/* <img src='./images/book.png'></img> */}
            <TitleBook>What I Learned from the Trees</TitleBook>
            <AuthorName>L.E. Browman</AuthorName>
            <Price>$ 20.00</Price>
            <ButtonAddCart>
              Add to Cart
            </ButtonAddCart>
          </Card>

          <Card>
            {/* <img src='./images/book.png'></img> */}
            <TitleBook>What I Learned from the Trees</TitleBook>
            <AuthorName>L.E. Browman</AuthorName>
            <Price>$ 20.00</Price>
            <ButtonAddCart>
              Add to Cart
            </ButtonAddCart>
          </Card>

          <Card>
            {/* <img src='./images/book.png'></img> */}
            <TitleBook>What I Learned from the Trees</TitleBook>
            <AuthorName>L.E. Browman</AuthorName>
            <Price>$ 20.00</Price>
            <ButtonAddCart>
              Add to Cart
            </ButtonAddCart>
          </Card>

          <Card>
            {/* <img src='./images/book.png'></img> */}
            <TitleBook>What I Learned from the Trees</TitleBook>
            <AuthorName>L.E. Browman</AuthorName>
            <Price>$ 20.00</Price>
            <ButtonAddCart>
              Add to Cart
            </ButtonAddCart>
          </Card>
          
          </RowBooks>
        </ContainerSections>

        <ContainerSections>
          <TitlesHome>On Sale</TitlesHome>

          <RowBooks>

          <Card>
            {/* <img src='./images/book.png'></img> */}
            <TitleBook>What I Learned from the Trees</TitleBook>
            <AuthorName>L.E. Browman</AuthorName>
            <Price>$ 20.00</Price>
            <ButtonAddCart>
              Add to Cart
            </ButtonAddCart>
          </Card>

          <Card>
            {/* <img src='./images/book.png'></img> */}
            <TitleBook>What I Learned from the Trees</TitleBook>
            <AuthorName>L.E. Browman</AuthorName>
            <Price>$ 20.00</Price>
            <ButtonAddCart>
              Add to Cart
            </ButtonAddCart>
          </Card>

          <Card>
            {/* <img src='./images/book.png'></img> */}
            <TitleBook>What I Learned from the Trees</TitleBook>
            <AuthorName>L.E. Browman</AuthorName>
            <Price>$ 20.00</Price>
            <ButtonAddCart>
              Add to Cart
            </ButtonAddCart>
          </Card>

          <Card>
            {/* <img src='./images/book.png'></img> */}
            <TitleBook>What I Learned from the Trees</TitleBook>
            <AuthorName>L.E. Browman</AuthorName>
            <Price>$ 20.00</Price>
            <ButtonAddCart>
              Add to Cart
            </ButtonAddCart>
          </Card>

          <Card>
            {/* <img src='./images/book.png'></img> */}
            <TitleBook>What I Learned from the Trees</TitleBook>
            <AuthorName>L.E. Browman</AuthorName>
            <Price>$ 20.00</Price>
            <ButtonAddCart>
              Add to Cart
            </ButtonAddCart>
          </Card>
          
          </RowBooks>
        </ContainerSections>

        <ContainerSections>
          <TitlesHome>Most Viewed</TitlesHome>

          <RowBooks>

          <Card>
            {/* <img src='./images/book.png'></img> */}
            <TitleBook>What I Learned from the Trees</TitleBook>
            <AuthorName>L.E. Browman</AuthorName>
            <Price>$ 20.00</Price>
            <ButtonAddCart>
              Add to Cart
            </ButtonAddCart>
          </Card>

          <Card>
            {/* <img src='./images/book.png'></img> */}
            <TitleBook>What I Learned from the Trees</TitleBook>
            <AuthorName>L.E. Browman</AuthorName>
            <Price>$ 20.00</Price>
            <ButtonAddCart>
              Add to Cart
            </ButtonAddCart>
          </Card>

          <Card>
            {/* <img src='./images/book.png'></img> */}
            <TitleBook>What I Learned from the Trees</TitleBook>
            <AuthorName>L.E. Browman</AuthorName>
            <Price>$ 20.00</Price>
            <ButtonAddCart>
              Add to Cart
            </ButtonAddCart>
          </Card>

          <Card>
            {/* <img src='./images/book.png'></img> */}
            <TitleBook>What I Learned from the Trees</TitleBook>
            <AuthorName>L.E. Browman</AuthorName>
            <Price>$ 20.00</Price>
            <ButtonAddCart>
              Add to Cart
            </ButtonAddCart>
          </Card>

          <Card>
            {/* <img src='./images/book.png'></img> */}
            <TitleBook>What I Learned from the Trees</TitleBook>
            <AuthorName>L.E. Browman</AuthorName>
            <Price>$ 20.00</Price>
            <ButtonAddCart>
              Add to Cart
            </ButtonAddCart>
          </Card>
          
          </RowBooks>
        </ContainerSections>
      </StyledText>

      <Footer/>
    </main>
  )
}