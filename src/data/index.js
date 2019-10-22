const onlyUnique = (v, i, self) => self.indexOf(v) === i;

const events = require('./adj_growth').map((data) => {
  const {
    date, buys, growth, adjGrowth, name,
  } = data;
  return {
    date,
    name,
    buys: parseInt(buys, 10),
    growth: (growth === '') ? null : parseFloat(growth),
    adjGrowth: (adjGrowth === '') ? null : parseFloat(adjGrowth),
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

const roster = require('./roster');

const headliners = () => {
  const wrestlers = [];
  const exps = {};
  mainCards.forEach((card) => {
    card.headliners.forEach((w) => {
      const event = events.find(ev => ev.date === card.date);
      if (!wrestlers.includes(w)) {
        wrestlers.push(w);
        exps[w] = [event];
      } else {
        exps[w].push(event);
      }
    });
  });
  return exps;
};

const features = () => {
  const wrestlers = [];
  const exps = {};
  mainCards.forEach((card) => {
    card.features.forEach((w) => {
      const event = events.find(ev => ev.date === card.date);
      if (!wrestlers.includes(w)) {
        wrestlers.push(w);
        exps[w] = [event];
      } else {
        exps[w].push(event);
      }
    });
  });
  return exps;
};

const id2roster = (id) => {
  const wrestler = roster.find(w => w.id === id);
  return wrestler;
};

const id2Exps = (id) => {
  const name = id2roster(id);
  if (!name) return null;
  const hlEvents = headliners()[id];
  const ftEvents = features()[id];
  const hlYears = hlEvents
    .map(ev => ev.date.slice(0, 4)).filter(onlyUnique);
  const ftYears = ftEvents
    .map(ev => ev.date.slice(0, 4)).filter(onlyUnique);
  const years = [];
  hlYears.forEach((year) => {
    const evs = hlEvents.filter(ev => ev.date.slice(0, 4) === year);
    const type = 'headlining';
    years.push({ events: evs, type, year });
  });
  ftYears.forEach((year) => {
    const evs = ftEvents.filter(ev => ev.date.slice(0, 4) === year);
    const type = 'featuring';
    years.push({ events: evs, type, year });
  });
  return years;
};

export default {
  headliners,
  mainCards,
  events,
  eventCards,
  id2roster,
  features,
  id2Exps,
};
