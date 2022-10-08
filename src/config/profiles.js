const guest = ['guestAccess', 'openToAll'];
const staff = ['staffReadAccess', 'staffWriteAccess', ...guest];
const admin = ['adminAccess', 'adminReadAccess', 'adminWriteAccess', ...staff];
const allRoles = {
  guest,
  staff,
  admin,
};

module.exports = allRoles;
