import CoinGecko from 'coingecko-api';
import { fetchJson } from './fetchApi';
const cg = new CoinGecko();

const cgApiUrl = 'https://api.coingecko.com/api/v3';
const getEndpoint = (path, params) => fetchJson(cgApiUrl + path, params);

export const getHistoricalPrice = async (id, date) => {
  const res = await cg.coins.fetchHistory(id, { date });
  return res.data.market_data.current_price.usd;
};

export const getCoinDataByAddress = async (address) => {
  const { data } = await cg.coins.fetchCoinContractInfo(address);
  const { name, id } = data;
  const img = data.image.small;
  const price = data.market_data.current_price.usd;
  return { id, name, img, price };
};

export const getTopEthCoins = async () => {
  let data = await getEndpoint('/coins/list?include_platform=true');
  data = data.filter((item) => item.platforms.ethereum);
  data.forEach((item) => {
    item.address = item.platforms.ethereum;
    delete item.platforms;
  });
  return data;
};

const getImgById = async (id) => {
  let data = await getEndpoint('/coins/' + id);
  return data.image.large;
};

export const getImgsByIds = async (ids) => {
  let data = ids.map((id) => getImgById(id).then((img) => [id, img]));
  data = Object.fromEntries(await Promise.all(data));
  return data;
};

export const searchCoins = async (query) => {
  if (!query) query = '';
  const data = await getEndpoint('/search', { query });
  return data.coins;
};

export const findTopEthCoins = async (phrase, ethCoinsList) => {
  console.log({ phrase, ethCoinsList });
  const coins = await searchCoins(phrase);
  const ethCoinAddresses = Object.fromEntries(
    ethCoinsList.map((coin) => [coin.id, coin.address])
  );
  const topEthCoins = coins
    .filter((coin) => ethCoinAddresses[coin.id])
    .slice(0, 20)
    .map((coin) => {
      const { id, name, thumb } = coin;
      return {
        id,
        name,
        img: thumb.replace('/thumb/', '/small/'),
        address: ethCoinAddresses[coin.id],
      };
    });
  return topEthCoins;
};
