const items = [
  {
    event_uuid: 'e62d78b3-b16c-485d-81a4-49815d7d0655',
    user_uuid: 'e62d78b3-b16c-485d-81a4-49815d7d0655',
    role: 'host',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    event_uuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fc5',
    user_uuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
    role: 'host',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    event_uuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fc5',
    user_uuid: '33467e86-d69d-11e8-9f8b-f2801f1b9fd1',
    role: 'guest',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    event_uuid: 'e62d78b3-b16c-485d-81a4-49815d7d0655',
    user_uuid: '33467e86-d69d-11e8-9f8b-f2801f1b9fd1',
    role: 'guest',
    created_at: new Date(),
    updated_at: new Date(),
  },

];

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('user_events', items, {});
  },
  down: () => {},
};
