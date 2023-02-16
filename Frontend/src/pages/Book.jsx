import React from 'react';
import { Footer } from '../components/Footer/index';
import { Nav } from "../components/NavBar/index";
import { MainBook,
  BackHome,
  Categories,
  ContainerBook,
  CardInfo,
  Title,
  Author,
  Price,
  ContainerButtons,
  AddButton,
  BuyButton,
  TitleDescription,
  TextDescription,
  TitleProduct,
  ContainerDetails,
  Details,
  TextDetails,
} from '../styles/Book';

export const Book = () => {
  return (
    <main>
      <Nav></Nav>
      <MainBook>
        <BackHome>
          <svg width="13" height="21" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.44264 9.38472L8.99661 0.462512C9.58784 -0.154171 10.5439 -0.154171 11.1288 0.462512L12.5503 1.94517C13.1415 2.56186 13.1415 3.55904 12.5503 4.16917L6.49332 10.5L12.5566 16.8243C13.1478 17.441 13.1478 18.4381 12.5566 19.0483L11.1351 20.5375C10.5439 21.1542 9.58784 21.1542 9.0029 20.5375L0.448929 11.6153C-0.148591 10.9986 -0.148591 10.0014 0.44264 9.38472Z" fill="#619885"/>
          </svg>
          <p className='back'>Back</p>
        </BackHome>

        <Categories>
          Categories : Poetry Books / Natual History Books / Places & Peoples: Pictorial Works
        </Categories>

        <ContainerBook>
          <img className='img_book' src='images/img-book.png' alt='book'></img>
          
          <CardInfo>
            <Title>What I Learned From The Trees</Title>
            <Author>L.E. Bowman</Author>
            <Price>$ 20.00</Price>

            <ContainerButtons>
              <AddButton>Add to Cart</AddButton>
              <BuyButton>Buy</BuyButton>
            </ContainerButtons>

            <TitleDescription>Description</TitleDescription>
            <TextDescription>
              What I Learned from the Trees delves into the intricate relationship between humans and nature, 
              and how these often overlooked, everyday interactions affect us as individuals, families, and 
              communities. With a backbone rooted in primordial imagery and allegory, and a focus on how the 
              growing disconnect with our own wants, needs, and fears creates deeper divides in our relationships, 
              this collection is notably relevant to today's society and the struggles we face with the ever-expanding 
              detachment between humans and the natural world. Aren't all living creatures seeking a notable existence? 
              A deep sense of belonging? Of relevance? Of purpose? Of love? How often do we yearn for these wants, 
              yet fight the vulnerability it takes to reach them? Why do we so clearly seek each other, yet refuse to reach out our hands?
            </TextDescription>

            <TitleProduct>Product Details</TitleProduct>
            
            <ContainerDetails>
              <Details>Publisher</Details>
              <TextDetails>Lorem</TextDetails>
            </ContainerDetails>

            <ContainerDetails>
              <Details>Author</Details>
              <TextDetails>Lorem</TextDetails>
            </ContainerDetails>

            <ContainerDetails>
              <Details>Year</Details>
              <TextDetails>Lorem</TextDetails>
            </ContainerDetails>

            <ContainerDetails>
              <Details>Language</Details>
              <TextDetails>Lorem</TextDetails>
            </ContainerDetails>

            <ContainerDetails>
              <Details>Pages</Details>
              <TextDetails>Lorem</TextDetails>
            </ContainerDetails>

            <ContainerDetails>
              <Details>ISBN</Details>
              <TextDetails>Lorem</TextDetails>
            </ContainerDetails>
            
          </CardInfo>
        </ContainerBook>
      </MainBook>



      <Footer></Footer>
    </main>
  );
}