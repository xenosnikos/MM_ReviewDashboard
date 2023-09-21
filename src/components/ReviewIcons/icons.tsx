const googleLogo = `${process.env.NEXT_PUBLIC_BACKEND_LOGO_URL}/static/images/reviewslogo/google-logo.png`;
const yelpLogo = `${process.env.NEXT_PUBLIC_BACKEND_LOGO_URL}/static/images/reviewslogo/yelp-logo.png`;
const yellowPagesLogo =
  `${process.env.NEXT_PUBLIC_BACKEND_LOGO_URL}/static/images/reviewslogo/yellow-pages-logo.png`;
const carGurusLogo = `${process.env.NEXT_PUBLIC_BACKEND_LOGO_URL}/static/images/reviewslogo/cargurus-logo.png`;
const carsLogo = `${process.env.NEXT_PUBLIC_BACKEND_LOGO_URL}/static/images/reviewslogo/carslogo.png`;
const dealerLogo = `${process.env.NEXT_PUBLIC_BACKEND_LOGO_URL}/static/images/reviewslogo/dealer-logo.png`;
const facebookLogo = `${process.env.NEXT_PUBLIC_BACKEND_LOGO_URL}/static/images/reviewslogo/facebook-logo.png`;

const star = `${process.env.NEXT_PUBLIC_BACKEND_LOGO_URL}/static/images/icons/yellow-star.png`;
const positiveIcon = `${process.env.NEXT_PUBLIC_BACKEND_LOGO_URL}/static/images/icons/positive.png`;
const neutralIcon = `${process.env.NEXT_PUBLIC_BACKEND_LOGO_URL}/static/images/icons/neutral.png`;
const negativeIcon = `${process.env.NEXT_PUBLIC_BACKEND_LOGO_URL}/static/images/icons/negative.png`;
const reviewIcon = `${process.env.NEXT_PUBLIC_BACKEND_LOGO_URL}/static/images/icons/reviews.png`;

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
