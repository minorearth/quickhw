export const getUserName = () => {
  return localStorage.getItem("name");
};

export const getImgCnt = () => {
  const counterLS = localStorage.getItem("counter");
  if (!counterLS) {
    localStorage.setItem("counter", 0);
    return 0;
  } else {
    IncCnt();
    return counterLS;
  }
};

const IncCnt = () => {
  const counterLS = localStorage.getItem("counter");
  localStorage.setItem("counter", Number(counterLS) + 1);
};
