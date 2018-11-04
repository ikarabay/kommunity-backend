

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all(
      [
        queryInterface.bulkInsert('Communities',
          [
            {
              uuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              name: 'Test Community 01',
              tagline: 'Community,01,Tags',
              desc: 'Community 01 description.',
              location: 'Turkey',
              socialLinks: '{"twitter":"twitter link 01", "facebook":"facebook link 01"}',
              avatarUploadUuid: '23ea0fe4-d6a1-11e8-9f8b-f2801f1b9fd1',
              tier: '{"free":"true"}',
              visibility: 'public',
              isActive: 0,
            },
            {
              uuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              name: 'Test Community 02',
              tagline: 'Community,02,Tags',
              desc: 'Community 02 description.',
              location: 'Turkey',
              socialLinks: '{"twitter":"twitter link 02", "facebook":"facebook link 02"}',
              avatarUploadUuid: '23ea0eb8-d6a1-11e8-9f8b-f2801f1b9fd1',
              tier: '{"free":"true"}',
              visibility: 'private',
              isActive: 1,
            },
            {
              uuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              name: 'Test Community 03',
              tagline: 'Community,03,Tags',
              desc: 'Community 03 description.',
              location: 'Turkey',
              socialLinks: '{"twitter":"twitter link 03", "facebook":"facebook link 03"}',
              avatarUploadUuid: '23ea0cb8-d6a1-11e8-9f8b-f2801f1b9fd1',
              tier: '{"free":"true"}',
              visibility: 'secret',
              isActive: 1,
            },
            {
              uuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              name: 'Test Community 04',
              tagline: 'Community,04,Tags',
              desc: 'Community 04 description.',
              location: 'Turkey',
              socialLinks: '{"twitter":"twitter link 04", "facebook":"facebook link 04"}',
              avatarUploadUuid: '23ea0787-d6a1-11e8-9f8b-f2801f1b9fd1',
              tier: '{"free":"true"}',
              visibility: 'public',
              isActive: 1,
            },
            {
              uuid: '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              name: 'Test Community 05',
              tagline: 'Community,05,Tags',
              desc: 'Community 05 description.',
              location: 'Turkey',
              socialLinks: '{"twitter":"twitter link 05", "facebook":"facebook link 05"}',
              avatarUploadUuid: '23ea0788-d6a1-11e8-9f8b-f2801f1b9fd1',
              tier: '{"free":"true"}',
              visibility: 'private',
              isActive: 0,
            },
            {
              uuid: '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              name: 'Test Community 06',
              tagline: 'Community,06,Tags',
              desc: 'Community 06 description.',
              location: 'Turkey',
              socialLinks: '{"twitter":"twitter link 06", "facebook":"facebook link 06"}',
              avatarUploadUuid: '23ea0404-d6a1-11e8-9f8b-f2801f1b9fd1',
              tier: '{"free":"true"}',
              visibility: 'public',
              isActive: 1,
            },
          ],
          {},),
        queryInterface.bulkInsert('CommunityUsers',
          [
            {
              communityUuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'approved',
              role: 'owner',
            },
            {
              communityUuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'applied',
              role: 'guest',
            },
            {
              communityUuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'invited',
              role: 'moderator',
            },
            {
              communityUuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'approved',
              role: 'admin',
            },
            {
              communityUuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'approved',
              role: 'owner',
            },
            {
              communityUuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'applied',
              role: 'guest',
            },
            {
              communityUuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'invited',
              role: 'moderator',
            },
            {
              communityUuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'approved',
              role: 'admin',
            },
            {
              communityUuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'approved',
              role: 'owner',
            },
            {
              communityUuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'applied',
              role: 'guest',
            },
            {
              communityUuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'invited',
              role: 'moderator',
            },
            {
              communityUuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'approved',
              role: 'admin',
            },
            {
              communityUuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'approved',
              role: 'owner',
            },
            {
              communityUuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'approved',
              role: 'member',
            },
            {
              communityUuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'banned',
              role: 'moderator',
            },
            {
              communityUuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'invited',
              role: 'moderator',
            },
            {
              communityUuid: '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'approved',
              role: 'owner',
            },
            {
              communityUuid: '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'invited',
              role: 'admin',
            },
            {
              communityUuid: '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'applied',
              role: 'guest',
            },
            {
              communityUuid: '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'approved',
              role: 'moderator',
            },
            {
              communityUuid: '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'approved',
              role: 'owner',
            },
            {
              communityUuid: '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'approved',
              role: 'member',
            },
            {
              communityUuid: '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'approved',
              role: 'member',
            },
            {
              communityUuid: '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'banned',
              role: 'member',
            },
          ],
          {},),
        queryInterface.bulkInsert('ConversationCategories',
          [
            {
              uuid: '310f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 01',
              visibility: 'public',
              minRoleRequired: 'guest',
            },
            {
              uuid: '310f97c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 02',
              visibility: 'private',
              minRoleRequired: 'member',
            },
            {
              uuid: '310f98c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 03',
              visibility: 'private',
              minRoleRequired: 'moderator',
            },
            {
              uuid: '310f99c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 04',
              visibility: 'secret',
              minRoleRequired: 'admin',
            },
            {
              uuid: '310d93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 05',
              visibility: 'public',
              minRoleRequired: 'guest',
            },
            {
              uuid: '310g93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 06',
              visibility: 'private',
              minRoleRequired: 'member',
            },
            {
              uuid: '310h93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 07',
              visibility: 'private',
              minRoleRequired: 'moderator',
            },
            {
              uuid: '310l93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 08',
              visibility: 'secret',
              minRoleRequired: 'admin',
            },
            {
              uuid: '310q93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 09',
              visibility: 'public',
              minRoleRequired: 'guest',
            },
            {
              uuid: '312f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 10',
              visibility: 'private',
              minRoleRequired: 'member',
            },
            {
              uuid: '311f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 11',
              visibility: 'private',
              minRoleRequired: 'moderator',
            },
            {
              uuid: '313f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 12',
              visibility: 'secret',
              minRoleRequired: 'admin',
            },
            {
              uuid: '317f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 13',
              visibility: 'public',
              minRoleRequired: 'guest',
            },
            {
              uuid: '318f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 14',
              visibility: 'private',
              minRoleRequired: 'member',
            },
            {
              uuid: '319f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 15',
              visibility: 'private',
              minRoleRequired: 'moderator',
            },
            {
              uuid: '320f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 16',
              visibility: 'secret',
              minRoleRequired: 'admin',
            },
            {
              uuid: '330f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 17',
              visibility: 'public',
              minRoleRequired: 'guest',
            },
            {
              uuid: '340f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 18',
              visibility: 'private',
              minRoleRequired: 'member',
            },
            {
              uuid: '350f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 19',
              visibility: 'private',
              minRoleRequired: 'moderator',
            },
            {
              uuid: '360f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 20',
              visibility: 'secret',
              minRoleRequired: 'admin',
            },
            {
              uuid: '370f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 21',
              visibility: 'public',
              minRoleRequired: 'guest',
            },
            {
              uuid: '380f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 22',
              visibility: 'private',
              minRoleRequired: 'member',
            },
            {
              uuid: '390f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 23',
              visibility: 'private',
              minRoleRequired: 'moderator',
            },
            {
              uuid: '310f93u8-d76a-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              communityUuid: '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1',
              userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Category 24',
              visibility: 'secret',
              minRoleRequired: 'admin',
            },
          ],
          {},),
        queryInterface.bulkInsert('ConversationPosts',
          [
            {
              uuid: '1749067c-d78d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              parentUuid: null,
              communityUuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
              categoryUuid: '310f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              content: 'Test conversation posts 01',
              viewCount: 10,
              attachmentUploadUuids: '{"uuids" : ["23ea0d96-d6a1-11e8-9f8b-f2801f1b9fd1"]}',
            },
            {
              uuid: '1749091a-d78d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              userUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
              parentUuid: '1749067c-d78d-11e8-9f8b-f2801f1b9fd1',
              communityUuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
              categoryUuid: '310f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              content: 'Test conversation posts 02',
              viewCount: 10,
              attachmentUploadUuids: null,
            },
            {
              uuid: '17490a78-d78d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              parentUuid: '1749067c-d78d-11e8-9f8b-f2801f1b9fd1',
              communityUuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
              categoryUuid: '310f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              content: 'Test conversation posts 03',
              viewCount: 10,
              attachmentUploadUuids: null,
            },
            {
              uuid: '17490bae-d78d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              userUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
              parentUuid: '17490a78-d78d-11e8-9f8b-f2801f1b9fd1',
              communityUuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
              categoryUuid: '310f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              content: 'Test conversation posts 04',
              viewCount: 10,
              attachmentUploadUuids: null,
            },
            {
              uuid: '17490ce4-d78d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              parentUuid: '17490bae-d78d-11e8-9f8b-f2801f1b9fd1',
              communityUuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
              categoryUuid: '310f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              content: 'Test conversation posts 05',
              viewCount: 10,
              attachmentUploadUuids: null,
            },
            {
              uuid: '17490e1a-d78d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              parentUuid: null,
              communityUuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
              categoryUuid: '310g93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              content: 'Test conversation posts 06',
              viewCount: 5,
              attachmentUploadUuids: null,
            },
            {
              uuid: '1749102c-d78d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
              parentUuid: '17490e1a-d78d-11e8-9f8b-f2801f1b9fd1',
              communityUuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
              categoryUuid: '310g93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              content: 'Test conversation posts 07',
              viewCount: 5,
              attachmentUploadUuids: '{"uuids" : ["23ea02d8-d6a1-11e8-9f8b-f2801f1b9fd1"]}',
            },
            {
              uuid: '17491176-d78d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              parentUuid: '17490e1a-d78d-11e8-9f8b-f2801f1b9fd1',
              communityUuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
              categoryUuid: '310g93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              content: 'Test conversation posts 08',
              viewCount: 5,
              attachmentUploadUuids: null,
            },
            {
              uuid: '174913e2-d78d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              parentUuid: null,
              communityUuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
              categoryUuid: '311f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              content: 'Test conversation posts 09',
              viewCount: 5,
              attachmentUploadUuids: null,
            },
            {
              uuid: '174915c2-d78d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              parentUuid: null,
              communityUuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
              categoryUuid: '320f93c8-d76a-11e8-9f8b-f2801f1b9fd1',
              content: 'Test conversation posts 10',
              viewCount: 5,
              attachmentUploadUuids: '{"uuids" : ["23ea065c-d6a1-11e8-9f8b-f2801f1b9fd1"]}',
            },
          ],
          {},),
        queryInterface.bulkInsert('Uploads',
          [
            {
              uuid: '23e9bfd0-d6a1-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              ownerUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test User Avatar 01',
              originalFileName: 'test_user_avatar_01.png',
              type: 'user_avatar',
              shortDesc: 'Test user avatart file 01.',
            },
            {
              uuid: '23ea1110-d6a1-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              ownerUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test User Avatar 02',
              originalFileName: 'test_user_avatar_02.png',
              type: 'user_avatar',
              shortDesc: 'Test user avatart file 02.',
            },
            {
              uuid: '23ea0fe4-d6a1-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              ownerUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Community Avatar 01',
              originalFileName: 'test_community_avatar_01.png',
              type: 'community_avatar',
              shortDesc: 'Test community avatart file 01.',
            },
            {
              uuid: '23ea0eb8-d6a1-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              ownerUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Community Avatar 02',
              originalFileName: 'test_community_avatar_02.png',
              type: 'community_avatar',
              shortDesc: 'Test community avatart file 02.',
            },
            {
              uuid: '23ea0cb8-d6a1-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              ownerUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Community Avatar 03',
              originalFileName: 'test_community_avatar_03.png',
              type: 'community_avatar',
              shortDesc: 'Test community avatart file 03.',
            },
            {
              uuid: '23ea0d96-d6a1-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              ownerUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test User Post Attachment 01',
              originalFileName: 'test_01.doc',
              type: 'post_attachment',
              shortDesc: 'Test user post attachment file 01.',
            },
            {
              uuid: '23ea0c60-d6a1-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              ownerUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test User Post Attachment 02',
              originalFileName: 'test_02.doc',
              type: 'post_attachment',
              shortDesc: 'Test user post attachment file 02.',
            },
            {
              uuid: '23ea0b02-d6a1-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              ownerUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test User Avatar 03',
              originalFileName: 'test_user_avatar_03.png',
              type: 'user_avatar',
              shortDesc: 'Test user avatart file 03.',
            },
            {
              uuid: '23ea0787-d6a1-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              ownerUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Community Avatar 04',
              originalFileName: 'test_community_avatar_04.png',
              type: 'community_avatar',
              shortDesc: 'Test community avatart file 04.',
            },
            {
              uuid: '23ea0788-d6a1-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              ownerUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Community Avatar 05',
              originalFileName: 'test_community_avatar_05.png',
              type: 'community_avatar',
              shortDesc: 'Test community avatart file 05.',
            },
            {
              uuid: '23ea065c-d6a1-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              ownerUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test User Post Attachment 03',
              originalFileName: 'test_03.doc',
              type: 'post_attachment',
              shortDesc: 'Test user post attachment file 03.',
            },
            {
              uuid: '23ea0530-d6a1-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              ownerUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test User Avatar 04',
              originalFileName: 'test_user_avatar_04.png',
              type: 'user_avatar',
              shortDesc: 'Test user avatart file 04.',
            },
            {
              uuid: '23ea0404-d6a1-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              ownerUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test Community Avatar 06',
              originalFileName: 'test_community_avatar_06.png',
              type: 'community_avatar',
              shortDesc: 'Test community avatart file 06.',
            },
            {
              uuid: '23ea02d8-d6a1-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              ownerUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test User Post Attachment 04',
              originalFileName: 'test_04.doc',
              type: 'post_attachment',
              shortDesc: 'Test user post attachment file 04.',
            },
            {
              uuid: '23fa0530-d6a1-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              ownerUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test User Avatar 05',
              originalFileName: 'test_user_avatar_05.png',
              type: 'user_avatar',
              shortDesc: 'Test user avatart file 05.',
            },
            {
              uuid: '23es02d8-d6a1-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              ownerUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
              name: 'Test User Post Attachment 05',
              originalFileName: 'test_05.doc',
              type: 'post_attachment',
              shortDesc: 'Test user post attachment file 05.',
            },
          ],
          {},),
        queryInterface.bulkInsert('Users',
          [
            {
              uuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              email: 'test01@test.com',
              passwordHash: 'e10adc3949ba59abbe56e057f20f883e',
              firstName: 'Firstname',
              lastName: 'Lastname',
              userAttributes: '{"title":"Test Title"}',
              location: 'Turkey',
              avatarUploadUuid: '23ea1110-d6a1-11e8-9f8b-f2801f1b9fd1',
              lastSeenAt: new Date(),
              confirmedEmailAt: new Date(),
            },
            {
              uuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              email: 'test02@test.com',
              passwordHash: 'e10adc3949ba59abbe56e057f20f883e',
              firstName: 'Firstname',
              lastName: 'Lastname',
              userAttributes: '{"title":"Test Title"}',
              location: 'Germany',
              avatarUploadUuid: '23ea0b02-d6a1-11e8-9f8b-f2801f1b9fd1',
              lastSeenAt: new Date(),
              confirmedEmailAt: new Date(),
            },
            {
              uuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              email: 'test03@test.com',
              passwordHash: 'e10adc3949ba59abbe56e057f20f883e',
              firstName: 'Firstname',
              lastName: 'Lastname',
              userAttributes: '{"title":"Test Title"}',
              location: 'United Kingdom',
              avatarUploadUuid: '23ea0530-d6a1-11e8-9f8b-f2801f1b9fd1',
              lastSeenAt: new Date(),
              confirmedEmailAt: new Date(),
            },
            {
              uuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              email: 'test04@test.com',
              passwordHash: 'e10adc3949ba59abbe56e057f20f883e',
              firstName: 'Firstname',
              lastName: 'Lastname',
              userAttributes: '{"title":"Test Title"}',
              location: 'Germany',
              avatarUploadUuid: '23fa0530-d6a1-11e8-9f8b-f2801f1b9fd1',
              lastSeenAt: new Date(),
              confirmedEmailAt: new Date(),
            },
            {
              uuid: '33467e86-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              email: 'test05@test.com',
              passwordHash: 'e10adc3949ba59abbe56e057f20f883e',
              firstName: 'Firstname',
              lastName: 'Lastname',
              userAttributes: '{"title":"Test Title"}',
              location: 'United Kingdom',
              avatarUploadUuid: null,
              lastSeenAt: null,
              confirmedEmailAt: null,
            },
            {
              uuid: '23e9da9c-d69d-11e8-9f8b-f2801f1b9fd1',
              createdAt: new Date(),
              updatedAt: new Date(),
              email: 'test06@test.com',
              passwordHash: 'e10adc3949ba59abbe56e057f20f883e',
              firstName: 'Firstname',
              lastName: 'Lastname',
              userAttributes: '{"title":"Test Title"}',
              location: 'Turkey',
              avatarUploadUuid: null,
              lastSeenAt: null,
              confirmedEmailAt: null,
            },
          ],
          {},),
      ],
    );
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all(
      [
        queryInterface.bulkDelete('Communities', null, {}),
        queryInterface.bulkDelete('CommunityUsers', null, {}),
        queryInterface.bulkDelete('ConversationCategories', null, {}),
        queryInterface.bulkDelete('ConversationPosts', null, {}),
        queryInterface.bulkDelete('Uploads', null, {}),
        queryInterface.bulkDelete('Users', null, {}),
      ],
    );
  },
};
