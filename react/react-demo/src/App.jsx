const heroList = [
  {
    id: 1,
    name: '锐雯',
    lane: '上单',
  },

  {
    id: 2,
    name: '泰拉米尔',
    lane: '上单',
  },

  {
    id: 3,
    name: '奎因',
    lane: '上单',
  },

  {
    id: 4,
    name: '奥恩',
    lane: '上单',
  },

  {
    id: 5,
    name: '亚索',
    lane: '中单',
  },

  {
    id: 6,
    name: '李青',
    lane: '打野',
  },

  {
    id: 7,
    name: '努努',
    lane: '打野',
  },

  {
    id: 8,
    name: '艾希',
    lane: 'ADC',
  },

  {
    id: 9,
    name: '薇恩',
    lane: 'ADC',
  },

  {
    id: 10,
    name: '卡特琳',
    lane: '辅助',
  },

  {
    id: 11,
    name: '莫德凯撒',
    lane: '辅助',
  },
]

function getHeroList() {
  return (
    <ul>
      {heroList.map(hero => (
        <li key={hero.id}>{hero.name}&nbsp;&nbsp;分路:{hero.lane}</li>
      ))}
    </ul>
  )
}

export default getHeroList;
