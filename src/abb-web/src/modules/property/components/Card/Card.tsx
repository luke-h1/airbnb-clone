import ListingStyles from './CardStyles';

const Card = () => {
  return (
    <ListingStyles>
      <div className="listings__item">
        <div className="listings__image">
          <button type="button">
            <img src="/icons/chevronLeft.svg" alt="left" />
          </button>
          <button type="button">
            <img src="/icons/chevronRight.svg" alt="right" />
          </button>
          <img
            src="https://images.unsplash.com/photo-1613745049604-0b28944b1fe6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt=""
          />
        </div>
        <div className="listings__content">
          <div className="listings__title">
            <div className="listings__icon__text">
              <span className="greyText">Private room in Birkenhead</span>
              <h2>Small Single in Eastham, Wirral Townhouse</h2>
            </div>
            <div className="listings__title__icon">
              <button type="button">
                <img src="/icons/heart.svg" alt="Heart" />
              </button>
            </div>
          </div>
          <div className="seperator" />
          <div className="listings__description">
            <span className="greyText"> 2 Guests . 1 Bedroom </span>
            <span className="greyText"> Kitchen . Wifi . Heating </span>
          </div>
          <div className="listings__details">
            <div className="listings__rating">
              <img src="/icons/star.svg" alt="Star" />
              <span>
                5 <span>(14)</span>
              </span>
            </div>
            <div className="listings__price">
              <div className="listings__price__night">
                $28<span>/ night</span>
              </div>
              <div className="listings__price__total">
                <span>$56 total</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ListingStyles>
  );
};
export default Card;
