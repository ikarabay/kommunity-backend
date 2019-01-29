import Sequelize, { type DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const ConversationPost = sequelize.define('ConversationPost', {
    uuid: {
      type: dataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'uuid',
      validate: {
        isUUID: 4,
      },
    },
    authorUuid: {
      type: dataTypes.UUID,
      allowNull: false,
      field: 'author_uuid',
      validate: {
        isUUID: 4,
      },
    },
    parentUuid: {
      type: dataTypes.UUID,
      field: 'parent_uuid',
      validate: {
        isUUID: 4,
      },
    },
    communityUuid: {
      type: dataTypes.UUID,
      allowNull: false,
      field: 'community_uuid',
      validate: {
        isUUID: 4,
      },
    },
    categoryUuid: {
      type: dataTypes.UUID,
      allowNull: false,
      field: 'category_uuid',
      validate: {
        isUUID: 4,
      },
    },
    content: {
      type: dataTypes.TEXT('long'),
      allowNull: false,
      field: 'content',
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: dataTypes.STRING(50),
      field: 'title',
      validate: {
        len: [1, 50],
      },
    },
    viewCount: {
      type: dataTypes.INTEGER,
      defaultValue: 0,
      field: 'view_count',
      validate: {
        isInt: true,
      },
    },
    attachmentUploadUuids: {
      type: dataTypes.ARRAY(dataTypes.TEXT),
      field: 'attachment_upload_uuids',
    },
  }, {
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'conversation_posts',
  });

  ConversationPost.associate = (models) => {
    ConversationPost.hasOne(models.ConversationPost, {
      as: 'parentPost',
      foreignKey: 'parentUuid',
    });
  };

  return ConversationPost;
};
