import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({
  step1,
  step2,
  step3,
}: {
  step1: boolean;
  step2: boolean;
  step3: boolean;
}) => {
  return (
    <div>
      <div>
        {step1 ? (
          <Link to="/login">
            <a>Sign In</a>
          </Link>
        ) : (
          <a>Sign In</a>
        )}
      </div>

      <div>
        {step2 ? (
          <Link to="/payment">
            <a>Payment</a>
          </Link>
        ) : (
          <a>Payment</a>
        )}
      </div>

      <div>
        {step3 ? (
          <Link to="/placeorder">
            <a>Place Order</a>
          </Link>
        ) : (
          <a>Place Order</a>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
