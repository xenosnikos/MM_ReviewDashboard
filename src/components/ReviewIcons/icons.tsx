const googleLogo = "http://localhost:3000/static/images/reviewslogo/google-logo.png";
const yelpLogo = "http://localhost:3000/static/images/reviewslogo/yelp-logo.png";
const yellowPagesLogo =
  "http://localhost:3000/static/images/reviewslogo/yellow-pages-logo.png";
const carGurusLogo = "http://localhost:3000/static/images/reviewslogo/cargurus-logo.png";
const carsLogo = "http://localhost:3000/static/images/reviewslogo/carslogo.png";
const dealerLogo = "http://localhost:3000/static/images/reviewslogo/dealer-logo.png";
const facebookLogo = "http://localhost:3000/static/images/reviewslogo/facebook-logo.png";

const star = "http://localhost:3000/static/images/icons/yellow-star.png";
const positiveIcon = "http://localhost:3000/static/images/icons/positive.png";
const neutralIcon = "http://localhost:3000/static/images/icons/neutral.png";
const negativeIcon = "http://localhost:3000/static/images/icons/negative.png";
const reviewIcon = "http://localhost:3000/static/images/icons/reviews.png";

export const logo = (type: string) => {
  if (type === "Google") return googleLogo;
  if (type === "Yelp") return yelpLogo;
  if (type === "Yellow Pages") return yellowPagesLogo;
  if (type === "CarGurus") return carGurusLogo;
  if (type === "Cars") return carsLogo;
  if (type === "Dealer") return dealerLogo;
  if (type === "Facebook") return facebookLogo;
  return type;
};

export { star, positiveIcon, neutralIcon, negativeIcon, reviewIcon };