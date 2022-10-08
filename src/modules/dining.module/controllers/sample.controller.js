const catchAsync = require('../../core/utils/catchAsync');

const hello = catchAsync(async (req, res) => {
  res.send({ message: 'Hi There From Dining Module!' });
});

module.exports = {
  hello,
};
