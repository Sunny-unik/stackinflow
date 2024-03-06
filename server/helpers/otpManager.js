function getOtp() {
  const randomNum = Math.floor(Math.random() * 1000000).toString();
  return randomNum.length < 6
    ? randomNum + Math.floor(Math.random() * 10)
    : randomNum;
}

module.exports = { getOtp };
