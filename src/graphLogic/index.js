const colors = {
  red: {
    light: '239, 154, 154',
    normal: '244, 67, 54',
    dark: '211, 47, 47',
  },
  amber: {
    light: '255, 224, 130',
    normal: '255, 193, 7',
    dark: '255, 160, 0',
  },
  blue: {
    light: '144, 202, 249',
    normal: '33, 150, 243',
    dark: '25, 118, 210',
  },
  cyan: {
    light: '128, 222, 234',
    normal: '0, 188, 212',
    dark: '0, 151, 167',
  },
};

const mapData = (raw) => {
  const mainData = [];
  const adjData = [];
  raw.forEach(({
    year, events, avgGrow, avgAdj,
  }) => {
    const x = parseInt(year, 10);
    if (avgGrow !== null) mainData.push({ x, y: avgGrow, r: events.length * 3 });
    if (avgAdj !== null) adjData.push({ x, y: avgAdj });
  });
  return [{ data: mainData }, { data: adjData }];
};

const mapStyle = (datasets, color) => {
  const mainData = {
    label: 'Avg Growth',
    fill: true,
    backgroundColor: `rgba(${color.dark}, 0.5)`,
    borderColor: `rgba(${color.dark}, 1)`,
    data: datasets[0].data,
    type: 'bubble',
  };
  const adjData = {
    label: 'Adjusted Growth',
    fill: false,
    borderColor: `rgba(${color.light}, 0.8)`,
    borderDash: [5, 5],
    data: datasets[1].data,
    showLine: true,
  };
  return [mainData, adjData];
};

const data2graphs = (raw, colorName) => {
  const datasets = mapData(raw);
  return mapStyle(datasets, colors[colorName]);
};

export default data2graphs;
