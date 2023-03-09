import { Main, } from "../styles/styles";
import { ListTitle, 
  CardFilter,
  FilterTitle,
  FilterOption,
  RowCards,
  Content,
  SectionContent,
  ButtonMore, } from "../styles/ListBook";
import { Checkbox } from "../components/Checkbox";
import { Card } from "../components/Card";
 
export const ListBook = () => {
  return(
    <Main>

        <ListTitle>Books</ListTitle>
        

        <Content>
          <CardFilter>

            <FilterTitle>Filter by</FilterTitle>
            <FilterOption>Category</FilterOption>

            <Checkbox name="Arts & Music"/>
            <Checkbox name="Biographies"/>
            <Checkbox name="Fiction"/>
            <Checkbox name="Nonfiction"/>
            <Checkbox name="Computers & Tech"/>
            <Checkbox name="Kids"/>

            <FilterOption>Language</FilterOption>

            <Checkbox name="English"/>
            <Checkbox name="Portuguese"/>
            <Checkbox name="Spanish"/>

            <FilterOption>Year</FilterOption>

            <Checkbox name="2022"/>
            <Checkbox name="2021"/>
            <Checkbox name="2020"/>
            <Checkbox name="2019"/>
            <Checkbox name="2018"/>
            <Checkbox name="2017"/>

            
          </CardFilter>
          
          <SectionContent>

            <RowCards>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
            </RowCards>

            <RowCards>

              <Card/>
              <Card/>
              <Card/>
              <Card/>
            </RowCards>

            <ButtonMore>Load More Products</ButtonMore>
          </SectionContent>
        </Content>

    </Main>
  );
}