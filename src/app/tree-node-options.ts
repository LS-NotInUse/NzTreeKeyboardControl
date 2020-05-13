export const staticNodeOptions = [
  {
    title: 'AAA',
    key: '/AAA',
    children: [
      {
        title: '111',
        key: '/AAA/111',
        children: [
          {
            title: 'aaa',
            key: '/AAA/111/aaa',
            children: [
              {key: '/AAA/111/aaa§i', title: 'i', isLeaf: true},
              {key: '/AAA/111/aaa§ii', title: 'ii', isLeaf: true},
              {key: '/AAA/111/aaa§iii', title: 'iii', isLeaf: true}
            ],
            isLeaf: false
          },
          {
            title: 'bbb',
            key: '/AAA/111/bbb',
            children: [
              {
                title: 'i',
                key: '/AAA/111/bbb/i',
                children: [
                  {key: '/AAA/111/bbb/i§!!!', title: '!!!', isLeaf: true},
                  {key: '/AAA/111/bbb/i§@@@', title: '@@@', isLeaf: true},
                  {key: '/AAA/111/bbb/i§###', title: '###', isLeaf: true}
                ],
                isLeaf: false
              },
              {key: '/AAA/111/bbb§iv', title: 'iv', preview: '70x70', isLeaf: true},
              {key: '/AAA/111/bbb§v', title: 'v', preview: '70x70', isLeaf: true}
            ],
            isLeaf: false
          }
        ],
        isLeaf: false
      },
      {title: '222', key: '/AAA/222', children: [], isLeaf: true},
      {title: '333', key: '/AAA/333', children: [], isLeaf: true},
      {title: '444', key: '/AAA/444', children: [], isLeaf: true},
      {
        title: '555',
        key: '/AAA/555',
        children: [
          {
            title: 'ccc',
            key: '/AAA/555/ccc',
            children: [{key: '/AAA/555/ccc§vi', title: 'vi', preview: '15x32', isLeaf: true}],
            isLeaf: false
          }
        ],
        isLeaf: false
      },
      {
        title: '666',
        key: '/AAA/666',
        children: [
          {
            title: 'ddd',
            key: '/AAA/666/ddd',
            children: [{key: '/AAA/666/ddd§vii', title: 'vii', preview: '20x30', isLeaf: true}],
            isLeaf: false
          }
        ],
        isLeaf: false
      },
      {title: '777', key: '/AAA/777', children: [], isLeaf: true},
      {title: '888', key: '/AAA/888', children: [], isLeaf: true},
      {title: '999', key: '/AAA/999', children: [], isLeaf: true},
      {title: '1111', key: '/AAA/1111', children: [], isLeaf: true},
      {title: '2222', key: '/AAA/2222', children: [], isLeaf: true},
      {title: '3333', key: '/AAA/3333', children: [], isLeaf: true},
      {title: '000', key: '/AAA/000', children: [], isLeaf: true}
    ],
    isLeaf: false
  },
  {
    title: 'BBB',
    key: '/BBB',
    children: [
      {
        title: '4444',
        key: '/BBB/4444',
        children: [
          {
            title: 'eee',
            key: '/BBB/4444/eee',
            children: [
              {
                key: '/BBB/4444/eee§viii',
                title: 'viii',
                preview: '30x30',
                spec: {'Dummy Spec 1': 'Hello', 'Dummy Spec 2': 'Sysmaker'},
                isLeaf: true
              }
            ],
            isLeaf: false
          }
        ],
        isLeaf: false
      },
      {title: '5555', key: '/BBB/5555', children: [], isLeaf: true},
      {title: '6666', key: '/BBB/6666', children: [], isLeaf: true},
      {title: '7777', key: '/BBB/7777', children: [], isLeaf: true},
      {title: '8888', key: '/BBB/8888', children: [], isLeaf: true},
      {title: '9999', key: '/BBB/9999', children: [], isLeaf: true},
      {
        title: '11111',
        key: '/BBB/11111',
        children: [
          {
            title: 'fff',
            key: '/BBB/11111/fff',
            children: [{key: '/BBB/11111/fff§ix', title: 'ix', preview: '16x20', isLeaf: true}],
            isLeaf: false
          }
        ],
        isLeaf: false
      },
      {title: '22222', key: '/BBB/22222', children: [], isLeaf: true},
      {title: '33333', key: '/BBB/33333', children: [], isLeaf: true},
      {title: '44444', key: '/BBB/44444', children: [], isLeaf: true},
      {title: '55555', key: '/BBB/55555', children: [], isLeaf: true},
      {title: '0000', key: '/BBB/0000', children: [], isLeaf: true}
    ],
    isLeaf: false
  },
  {
    title: 'CCC',
    key: '/CCC',
    children: [
      {key: '/CCC§66666', title: '66666', isLeaf: true},
      {key: '/CCC§77777', title: '77777', isLeaf: true}
    ],
    isLeaf: false
  }
];
