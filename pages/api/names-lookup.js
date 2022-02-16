import fs from 'fs';
import path from 'path';

export default (req, res) => {
  const filePath = path.resolve('./public', 'nameLookup.txt');
  const rawItems = fs.readFileSync(filePath);
  const items = rawItems
    .toString()
    .split('\n')
    .map((row) => {
      const address = row.substring(0, 42);
      const name = row.substring(43, row.length);
      return [address, name];
    });
  res.statusCode = 200;
  res.json(items.splice(0, 100));
};
