const items = [
  {
    uuid: '23ea0cb8-d6a1-11e8-9f8b-f2801f1b9fd1',
    owner_uuid: 'e62d78b3-b16c-485d-81a4-49815d7d0655',
    name: 'Test Community Avatar 03',
    original_file_name: 'test_community_avatar_03.png',
    type: 'community_avatar',
    short_desc: 'Test community avatart file 03.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    uuid: '23ea0d96-d6a1-11e8-9f8b-f2801f1b9fd1',
    owner_uuid: 'e62d78b3-b16c-485d-81a4-49815d7d0655',
    name: 'Test User Post Attachment 01',
    original_file_name: 'test_01.doc',
    type: 'post_attachment',
    short_desc: 'Test user post attachment file 01.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    uuid: '23ea0c60-d6a1-11e8-9f8b-f2801f1b9fd1',
    owner_uuid: 'e62d78b3-b16c-485d-81a4-49815d7d0655',
    name: 'Test User Post Attachment 02',
    original_file_name: 'test_02.doc',
    type: 'post_attachment',
    short_desc: 'Test user post attachment file 02.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    uuid: '23ea0b02-d6a1-11e8-9f8b-f2801f1b9fd1',
    owner_uuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
    name: 'Test User Avatar 03',
    original_file_name: 'test_user_avatar_03.png',
    type: 'user_avatar',
    short_desc: 'Test user avatart file 03.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    uuid: '23ea0787-d6a1-11e8-9f8b-f2801f1b9fd1',
    owner_uuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
    name: 'Test Community Avatar 04',
    original_file_name: 'test_community_avatar_04.png',
    type: 'community_avatar',
    short_desc: 'Test community avatart file 04.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    uuid: '23ea0788-d6a1-11e8-9f8b-f2801f1b9fd1',
    owner_uuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
    name: 'Test Community Avatar 05',
    original_file_name: 'test_community_avatar_05.png',
    type: 'community_avatar',
    short_desc: 'Test community avatart file 05.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    uuid: '23ea065c-d6a1-11e8-9f8b-f2801f1b9fd1',
    owner_uuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
    name: 'Test User Post Attachment 03',
    original_file_name: 'test_03.doc',
    type: 'post_attachment',
    short_desc: 'Test user post attachment file 03.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    uuid: '23ea0530-d6a1-11e8-9f8b-f2801f1b9fd1',
    owner_uuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
    name: 'Test User Avatar 04',
    original_file_name: 'test_user_avatar_04.png',
    type: 'user_avatar',
    short_desc: 'Test user avatart file 04.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    uuid: '23ea0404-d6a1-11e8-9f8b-f2801f1b9fd1',
    owner_uuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
    name: 'Test Community Avatar 06',
    original_file_name: 'test_community_avatar_06.png',
    type: 'community_avatar',
    short_desc: 'Test community avatart file 06.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    uuid: '23ea0248-d6a1-11e8-9f8b-f2801f1b9fd1',
    owner_uuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
    name: 'Test User Post Attachment 04',
    original_file_name: 'test_04.doc',
    type: 'post_attachment',
    short_desc: 'Test user post attachment file 04.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    uuid: '23fa0530-d6a1-11e8-9f8b-f2801f1b9fd1',
    owner_uuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
    name: 'Test User Avatar 05',
    original_file_name: 'test_user_avatar_05.png',
    type: 'user_avatar',
    short_desc: 'Test user avatart file 05.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    uuid: '23ea0218-d6a1-11e8-9f8b-f2801f1b9fd1',
    owner_uuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
    name: 'Test User Post Attachment 05',
    original_file_name: 'test_05.doc',
    type: 'post_attachment',
    short_desc: 'Test user post attachment file 05.',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('uploaded_item', items, {});
  },
  down: () => {},
};
