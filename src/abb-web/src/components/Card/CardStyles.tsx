import { baseColors, fonts, fontWeights } from '@src/styles/Variables';
import styled from '@emotion/styled';
import Image from 'next/image';

export const StyledImage = styled(Image)`
  cursor: pointer;
`;

export const ListingStyles = styled.div`
  .listings {
    &__details {
      display: flex;
      justify-content: space-between;
      margin-top: auto;
    }
    &__price {
      text-align: left;
      display: flex;
      flex-direction: column;
      &__night {
        font-family: ${fonts.regularText};
        font-weight: ${fontWeights.bold};

        font-size: 18px;
        span {
          color: gray;
          font-family: ${fonts.regularText};
          font-weight: ${fontWeights.bold};
        }
      }
      &__total {
        font-size: 16px;
        color: ${baseColors.greyTextDark};
        margin-top: 8px;
      }
    }
    &__rating {
      display: flex;
      margin-top: auto;
      img {
        width: 14px;
        margin-right: 4px;
      }
      span {
        font-family: ${fonts.regularText};
        span {
          font-family: ${fonts.regularText};
          color: ${baseColors.greyLight};
        }
      }
    }
    &__description {
      padding-top: 15px;
      span {
        margin-bottom: 5px;
        display: block;
      }
    }
    &__item {
      border-top: 1px solid #ebebeb;
      padding: 24px 0;
      display: flex;
      &:hover {
        .listings__image {
          button {
            opacity: 0.7;
          }
        }
      }
    }
    &__image {
      width: 300px;
      height: 200px;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      &-superHost {
        &:before {
          position: absolute;
          content: 'Super Host';
          background: white;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
          border-radius: 4px;
          padding: 4px 8px;
          top: 10px;
          left: 10px;
          letter-spacing: 0.48px;
          font-size: 12px;
          font-family: ${fonts.regularText};
          font-weight: ${fontWeights.bold};
          text-transform: uppercase;
        }
      }
      button {
        position: absolute;
        top: 50%;
        width: 32px;
        height: 32px;
        background: white;
        border-radius: 50%;
        overflow: hidden;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        opacity: 0;
        transition: 0.1s ease-in;
        cursor: pointer;
        &:hover {
          opacity: 1 !important;
        }
        img {
          width: 10px;
          height: 10px;
        }
        &:last-of-type {
          right: 10px;
        }
        &:first-of-type {
          left: 10px;
        }
      }
      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }
    &__title {
      display: flex;
      justify-content: space-between;
      button {
        background: none;
        border: none;
        outline: none;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 0;
        cursor: pointer;
        &:hover {
          &:after {
            opacity: 1;
          }
        }
        &:after {
          opacity: 0;
          background: ${baseColors.greyLight};
          position: absolute;
          content: '';
          width: 48px;
          height: 48px;
          border-radius: 50%;
          z-index: -1;
        }
      }
      h2 {
        font-size: 18px;
        font-family: ${fonts.regularText};
        font-weight: ${fontWeights.regular};
        color: ${baseColors.greyTextDark};
        margin-top: 5px 0 15px;
      }
    }
    &__content {
      width: calc(100% - 300px);
      padding-left: 15px;
      display: flex;
      flex-direction: column;
    }

    .greyText {
      font-size: 14px;
      line-height: 18px;
      color: ${baseColors.greyTextLight};
      font-family: ${fonts.regularText};
      font-weight: ${fontWeights.bold};
    }
    .seperator {
      width: 32px;
      height: 1px;
      background: ${baseColors.greyMed};
    }
  }
`;
