import React from 'react';
import styled from '@emotion/styled';
import { baseColors } from '@src/styles/Variables';

interface FooterProps {
}

const StyledFooter = styled.footer`
  background: ${baseColors.greyLight};
  border-top: 1px solid ${baseColors.greyMed};
  padding: 30px 0;
  .container { 
      display: flex;
      max-width: 1200px;
      margin: auto;
      justify-content: space-between;
  }
  h4 { 
      text-transform: uppercase;
      font-size: 12px;
  }

`;

const UnorderedList = styled.ul`
      list-style-type: none;
      padding-left: 0;
`;

const ListItem = styled.li`
          margin-bottom: '15px';
          margin-top: '15px';
          line-height: 15px;
          padding-top: 15px;
          /* font-family: 'Circular Book' */
`;

const Footer: React.FC<FooterProps> = () => {
  return (
    <StyledFooter>
      <div className="container">
        <div>
          <h4>ABOUT</h4>
          <UnorderedList>
            <ListItem>How Airbnb works</ListItem>
            <ListItem>Airbnb Plus</ListItem>
            <ListItem>Airbnb for Work</ListItem>
            <ListItem>Founders' Letter</ListItem>
            <ListItem>
              Newsroom
            </ListItem>
            <ListItem>Airbnb Luxe</ListItem>
            <ListItem>
              Made possible by Hosts
            </ListItem>
            <ListItem>Investors</ListItem>
            <ListItem>
              HotelTonight
            </ListItem>
            <ListItem>
              Careers
            </ListItem>

          </UnorderedList>
        </div>
        <div>
          <h4>COMMUNITY
          </h4>
          <UnorderedList>
            <ListItem>Diversity & Belonging</ListItem>
            <ListItem>Airbnb Associates</ListItem>
            <ListItem>Gift cards</ListItem>
            <ListItem>Against Discrimination</ListItem>
            <ListItem>FrontListItemne Stays</ListItem>
            <ListItem>Airbnb.org</ListItem>
            <ListItem>
              AccessibiListItemty
            </ListItem>
            <ListItem>
              Guest Referrals
            </ListItem>
          </UnorderedList>
        </div>
        <div>
          <h4>HOST</h4>
          <UnorderedList>
            <ListItem>Host your home</ListItem>
            <ListItem>Responsible hosting</ListItem>
            <ListItem>Host an OnListItemne Experience</ListItem>
            <ListItem>Resource Center</ListItem>
            <ListItem>Host an Experience</ListItem>
            <ListItem>Community Center</ListItem>
          </UnorderedList>
        </div>
        <div>
          <h4>SUPPORT</h4>
          <UnorderedList>
            <ListItem>Our COVID-19 Response</ListItem>
            <ListItem>Neighborhood Support</ListItem>
            <ListItem>
              Help Center
            </ListItem>
            <ListItem>
              Trust & Safety
            </ListItem>
            <ListItem>
              Cancellation options
            </ListItem>
          </UnorderedList>
        </div>
      </div>
    </StyledFooter>

  );
};
export default Footer;
