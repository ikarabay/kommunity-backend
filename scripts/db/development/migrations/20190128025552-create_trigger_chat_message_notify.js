const query = `
  CREATE TRIGGER chat_message_notify AFTER INSERT OR UPDATE OR DELETE ON messages
  FOR EACH ROW EXECUTE PROCEDURE notify_trigger(
    'uuid',
    'channel_uuid',
    'created_at',
    'sender_uuid',
    'text'
  );
`;

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(query);
  },

  down: (/* queryInterface, Sequelize */) => {},
};
