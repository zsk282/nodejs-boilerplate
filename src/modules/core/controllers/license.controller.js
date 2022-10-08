const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { licenseService } = require('../services');

const getLicenses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['module_name', 'module_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await licenseService.queryLicense(filter, options);
  res.send(result);
});

module.exports = {
  getLicenses,
};
