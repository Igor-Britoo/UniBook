import { Main } from "../styles/styles";
import { Back,
TextBack,
PersonalButton,
OrdersButton, } from "../styles/Account";

import { ContainerOrders,
ContainerButtons,
ContainerCard,
Card,
Text,
RowOrderStatus,
RowBook,
Author,
Price,
Buyer,
SeeMoreButton, } from "../styles/Orders";

export const Orders = () => {
  return(
    <Main>
      <ContainerOrders>
        <Back>
          <svg width="13" height="21" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.44264 9.38472L8.99661 0.462512C9.58784 -0.154171 10.5439 -0.154171 11.1288 0.462512L12.5503 1.94517C13.1415 2.56186 13.1415 3.55904 12.5503 4.16917L6.49332 10.5L12.5566 16.8243C13.1478 17.441 13.1478 18.4381 12.5566 19.0483L11.1351 20.5375C10.5439 21.1542 9.58784 21.1542 9.0029 20.5375L0.448929 11.6153C-0.148591 10.9986 -0.148591 10.0014 0.44264 9.38472Z" fill="#619885"/>
          </svg>
          <TextBack>Back</TextBack>
        </Back>

        <ContainerCard>

          <ContainerButtons>
            <PersonalButton>Personal Data</PersonalButton>
            <OrdersButton>Orders</OrdersButton>
          </ContainerButtons>
          
          <div className="position-form">
            <Card>
                <RowOrderStatus>
                    <Text>Order: 19/03/2023</Text>
                    <Text>Status: In progress</Text>
                </RowOrderStatus>
                <Text>Arrive: 19/04/2023</Text>
                
                <RowBook>
                    <img src="images/book.png" alt="book" className="img"></img>
                    <div>
                        <Text>What I Learned from the Trees</Text>
                        <Author>L.E. Bowman</Author>
                        <Price>$ 20.00</Price>
                        <Buyer>Buyer: Fulano de Tal</Buyer>
                    </div>
                </RowBook>
            </Card>

            <Card>
                <RowOrderStatus>
                    <Text>Order: 19/03/2023</Text>
                    <Text>Status: In progress</Text>
                </RowOrderStatus>
                <Text>Arrive: 19/04/2023</Text>
                
                <RowBook>
                    <img src="images/book.png" alt="book" className="img"></img>
                    <div>
                        <Text>What I Learned from the Trees</Text>
                        <Author>L.E. Bowman</Author>
                        <Price>$ 20.00</Price>
                        <Buyer>Buyer: Fulano de Tal</Buyer>
                    </div>
                </RowBook>
            </Card>

            <SeeMoreButton>See More</SeeMoreButton>
          </div>

        </ContainerCard>
      </ContainerOrders>
    </Main>
  );
}