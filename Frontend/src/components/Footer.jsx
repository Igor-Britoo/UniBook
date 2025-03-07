import React from 'react';
import { Link } from 'react-router-dom'
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

import { H1, H2 , H3 } from '../styles/styles';
import { FooterContainer, UpFooter, DownFooter, Social, Section, CardFlags } from '../styles/Footer';

export const Footer = () => {
  return(
    <FooterContainer>
      <UpFooter>
        <Link to='/'><H1 color="white" fontSize="xxxxl">UniBook</H1></Link> 
        
        <Social>
          <Link>
            <FaInstagram color="white" fontSize="2.4em"/>
          </Link>
          
          <Link>
            <FaTwitter color="white" fontSize="2.4em" />
          </Link>

          <Link>
            <FaLinkedin color="white" fontSize="2.4em" />
          </Link>
        </Social>
      </UpFooter>

      <DownFooter>
        <Section>
          <H2 color="white" fontSize="xxl" fontWeight="600">Help</H2 >
          <H3 color="white" fontSize="xl" fontWeight="400"><Link>Sales, Exchanges and Privacy Policy</Link></H3>
          <H3 color="white" fontSize="xl" fontWeight="400"><Link>Purchase Terms and Conditions</Link></H3>
          <H3 color="white" fontSize="xl" fontWeight="400"><Link>Contact us</Link></H3>

        </Section>

        <Section>
          <H2 color="white" fontSize="xxl" fontWeight="600">Institutional</H2 >
          <H3 color="white" fontSize="xl" fontWeight="400"><Link>About</Link></H3>
        </Section>
          
        <Section>
          <H2 color="white" fontSize="xxl" fontWeight="600">Payment Methods</H2 >
          <CardFlags>
            <img src='/images/Visa.png' alt="Visa flag"></img>
            <img src='/images/Hiper.png' alt="Hiper flag"></img>
            <img src='/images/Master.png' alt="Master flag"></img>
            <img src='/images/Paypal.png' alt="Paypal flag"></img>
          </CardFlags>
        </Section>
      </DownFooter>
    </FooterContainer>
  )
}