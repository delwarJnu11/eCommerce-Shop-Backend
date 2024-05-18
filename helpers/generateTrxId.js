const generateTrxId = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let trxId = "";
  for (let i = 0; i < length; i++) {
    trxId += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return trxId;
};
module.exports = generateTrxId;
