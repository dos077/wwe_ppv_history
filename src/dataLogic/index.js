import data from '../data';

const onlyUnique = (v, i, self) => self.indexOf(v) === i;

const getAvg = (arr) => {
  const trimed = arr.filter(el => !!el);
  if (!trimed && trimed.length === 0) return null;
  let sum = 0;
  trimed.forEach((n) => { sum += n; });
  return Math.round(sum * 100 / trimed.length) / 100;
};

const id2roster = (id) => {
  const wrestler = data.roster.find(w => w.id === id);
  return wrestler;
};

const headliners = () => {
  const wrestlers = [];
  const exps = {};
  data.mainCards.forEach((card) => {
    card.headliners.forEach((w) => {
      const event = data.events.find(ev => ev.date === card.date);
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
  data.mainCards.forEach((card) => {
    card.features.forEach((w) => {
      const event = data.events.find(ev => ev.date === card.date);
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

const id2Exps = (id) => {
  const name = id2roster(id);
  if (!name) return null;
  const hlEvents = headliners()[id] || [];
  const ftEvents = features()[id] || [];
  const years = [];
  const hlYears = hlEvents
    .map(ev => ev.date.slice(0, 4)).filter(onlyUnique);
  hlYears.forEach((year) => {
    const evs = hlEvents.filter(ev => ev.date.slice(0, 4) === year);
    const type = 'headlining';
    years.push({ events: evs, type, year });
  });
  const ftYears = ftEvents
    .map(ev => ev.date.slice(0, 4)).filter(onlyUnique);
  ftYears.forEach((year) => {
    const evs = ftEvents.filter(ev => ev.date.slice(0, 4) === year);
    const type = 'featuring';
    years.push({ events: evs, type, year });
  });
  return years;
};

const statPerYear = (wId) => {
  const raws = id2Exps(wId);
  return raws.map(({ year, type, events }) => {
    const avgBuys = Math.round(getAvg(events.map(ev => ev.buys)));
    const avgGrow = getAvg(events.map(ev => ev.growth));
    const avgAdj = getAvg(events.map(ev => ev.adjGrowth));
    const id = `${year}-${type}`;
    return {
      year, type, events, avgBuys, avgGrow, avgAdj, id,
    };
  });
};

export default {
  headliners,
  features,
  id2roster,
  statPerYear,
};
