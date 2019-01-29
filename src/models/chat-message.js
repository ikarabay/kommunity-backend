import Sequelize, { type DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const ChatMessage = sequelize.define('ChatMessage', {
    uuid: {
      type: dataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'uuid',
      validate: {
        isUUID: 4,
      },
    },
    channelUuid: {
      type: dataTypes.UUID,
      allowNull: false,
      field: 'channel_uuid',
      validate: {
        isUUID: 4,
      },
    },
    senderUuid: {
      type: dataTypes.UUID,
      allowNull: false,
      field: 'sender_uuid',
      validate: {
        isUUID: 4,
      },
    },
    text: {
      type: dataTypes.TEXT('long'),
      allowNull: false,
      field: 'text',
    },
    createdAt: {
      type: dataTypes.DATE,
      field: 'created_at',
      validate: {
        isDate: true,
      },
    },
  }, {
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'chat_messages',
  });

  ChatMessage.associate = (models) => {
    ChatMessage.belongsTo(models.User, {
      as: 'sender',
    });
    ChatMessage.belongsTo(models.ChatChannel, {
      as: 'channel',
    });
  };

  return ChatMessage;
};
