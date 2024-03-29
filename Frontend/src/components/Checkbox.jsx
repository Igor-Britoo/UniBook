import React, { useEffect, useState } from "react";

import { ContainerCheckbox, Check, } from "../styles/Checkbox";
import { Label } from "../styles/styles";

import { useSearchParams } from "react-router-dom";

export const Checkbox = (props) => {
  const [checked, setChecked] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const handleCheck = () => {

    if (checked) {
      let checkboxValue = props.value              
      let matches = checkboxValue.match(/[^a-zA-Z0-9_%+]/gm)

      if (matches) {
        for (let matchedChar of matches){
          
          if (matchedChar === ' '){
            checkboxValue = checkboxValue.replace(matchedChar, '+')
          }
          else if ( matchedChar === '&' ){
            checkboxValue = checkboxValue.replace(matchedChar, '%26')
          }
          else if ( matchedChar === "'" ){
            checkboxValue = checkboxValue.replace(matchedChar, '%27')
          }
          else{
            checkboxValue = checkboxValue.replace(matchedChar, encodeURIComponent(matchedChar))
          }         
        }
      }
      else{
        checkboxValue = encodeURIComponent(checkboxValue)
      }

      let searchParamsModified = searchParams.toString().replace(`${props.category}=${checkboxValue}`, '')
      setSearchParams(searchParamsModified)

    }else{
      searchParams.append(props.category, props.value)
      setSearchParams(searchParams)
    }

    setChecked(!checked)
    window.location.reload(true)
    window.scrollTo(0, 0)
  }

  const setCheckedBasedOnUrl = () => {
    const languages = searchParams.getAll('language')
    const genres = searchParams.getAll('genre')

    if (props.category === 'language' && languages.length > 0 && languages.filter((language) => language === props.value ).length > 0 ) {
      setChecked(true)
    }

    if (props.category === 'genre' && genres.length > 0 && genres.filter((genre) => genre === props.value ).length > 0 ) {
      setChecked(true)
    }
  }

  useEffect(() => {
    setCheckedBasedOnUrl()
    // eslint-disable-next-line
  }, [])

  return(
    <>
      <ContainerCheckbox>
          <Check type={"checkbox"} onChange={handleCheck} value={props.value} checked={checked}/>
          <Label fontSize="md" fontWeight="500" >{props.name}</Label>
      </ContainerCheckbox>
    </>
  );
}