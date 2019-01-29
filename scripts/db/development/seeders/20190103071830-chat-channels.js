const channels = [
  {
    community_uuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
    uuid: '43e8e515-f99d-4c4f-b883-f1095a5ca222',
    name: 'General',
    desc: 'life stuff..',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    community_uuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
    uuid: 'db012048-3915-48dd-a81e-f81ade988587',
    name: 'React',
    desc: 'discussions on react..',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('chat_channels', channels, {});
  },
  down: () => {},
};
