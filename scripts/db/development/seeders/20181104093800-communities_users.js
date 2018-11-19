const items = [
  {
    community_uuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'owner',
  },
  {
    community_uuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'applied',
    role: 'guest',
  },
  {
    community_uuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'invited',
    role: 'moderator',
  },
  {
    community_uuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'admin',
  },
  {
    community_uuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'owner',
  },
  {
    community_uuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'applied',
    role: 'guest',
  },
  {
    community_uuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'invited',
    role: 'moderator',
  },
  {
    community_uuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'admin',
  },
  {
    community_uuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'owner',
  },
  {
    community_uuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'applied',
    role: 'guest',
  },
  {
    community_uuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'invited',
    role: 'moderator',
  },
  {
    community_uuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'admin',
  },
  {
    community_uuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'owner',
  },
  {
    community_uuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'member',
  },
  {
    community_uuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'banned',
    role: 'moderator',
  },
  {
    community_uuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'invited',
    role: 'moderator',
  },
  {
    community_uuid: '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'owner',
  },
  {
    community_uuid: '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'invited',
    role: 'admin',
  },
  {
    community_uuid: '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'applied',
    role: 'guest',
  },
  {
    community_uuid: '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'owner',
  },
  {
    community_uuid: '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1',
    user_uuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'member',
  },
];

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('community_users', items, {});
  },
  down: () => {},
};
