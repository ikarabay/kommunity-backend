import uuid from 'uuid/v4';

const messages = [
  {
    channel_uuid: '43e8e515-f99d-4c4f-b883-f1095a5ca222',
    uuid: uuid(),
    sender_uuid: 'e62d78b3-b16c-485d-81a4-49815d7d0655',
    text: 'hello!',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    channel_uuid: '43e8e515-f99d-4c4f-b883-f1095a5ca222',
    uuid: uuid(),
    sender_uuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
    text: 'whats up',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('messages', messages, {});
  },
  down: () => {},
};
