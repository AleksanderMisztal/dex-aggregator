import { getImgsByIds } from '../../lib/coingeckoApi';

export default async (req, res) => {
  let { ids } = req.query;
  ids = JSON.parse(ids);
  res.send(await getImgsByIds(ids));
};
