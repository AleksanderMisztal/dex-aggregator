import CoinGecko from 'coingecko-api';

const cg = new CoinGecko();
const getHistoricalPrice = async (id, date) => {
  const res = await cg.coins.fetchHistory(id, { date });
  return res.data.market_data.current_price.usd;
};

const getCoinDataByAddress = async (address) => {
  const { data } = await cg.coins.fetchCoinContractInfo(address);
  const { name, id } = data;
  const img = data.image.small;
  const price = data.market_data.current_price.usd;
  return { id, name, img, price };
};

export default async (req, res) => {
  const response = await cg.coins.all();
  const btc = await cg.coins.fetch('bitcoin');

  const exchanges = await cg.exchanges.all();
  const prices = await cg.simple.price({
    ids: ['bitcoin', 'algorand', 'near', 'ethereum'],
    vs_currencies: 'usd',
  });
  console.log(btc.data.name);
  console.log(prices.data);
  const supportedCurrencies = await cg.simple.supportedVsCurrencies();
  const btcHistory = await getHistoricalPrice('bitcoin', '1-1-2022');
  console.log(btcHistory);
  res.send(exchanges.data[5].image);
  console.log(
    await getCoinDataByAddress('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')
  );
};
