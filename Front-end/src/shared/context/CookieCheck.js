const CookieCheck = () => {
  let cookieCheck;
  if (!document.cookie) {
    cookieCheck = false;
  } else cookieCheck = true;

  //console.log(cookieCheck);
  return cookieCheck;
};

export default CookieCheck;
