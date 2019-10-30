const onlyUnique = (v, i, self) => self.indexOf(v) === i;

const float2per = (raw) => {
  const float = parseFloat(raw);
  return float * 100;
};

const events = require('./adj_growth').map((data) => {
  const {
    date, buys, growth, adjGrowth, name, url,
  } = data;
  return {
    date,
    name,
    url,
    buys: parseInt(buys, 10),
    growth: (growth === '') ? null : float2per(growth),
    adjGrowth: (growth === '' || adjGrowth === '') ? null : float2per(adjGrowth),
  };
});

const mainCards = require('./maineventers').map((data) => {
  const {
    date, headliners, features, name,
  } = data;
  return {
    date,
    name,
    headliners: headliners.split(', ').filter(onlyUnique),
    features: features.split(', ').filter(onlyUnique),
  };
});

const eventCards = require('./cards').map((data) => {
  const {
    date, order, wrestlers,
  } = data;
  return {
    date,
    order,
    wrestlers: wrestlers.split(', '),
  };
});

const roster = require('./roster')
  .filter(w => mainCards
    .some(c => c.features.includes(w.id) || c.headliners.includes(w.id)));

export default {
  mainCards,
  events,
  eventCards,
  roster,
};
