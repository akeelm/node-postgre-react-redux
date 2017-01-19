const _ = require('underscore');

export function cleanAndMapModel(source, destination) {
  delete destination.constraints;
  delete destination.isValid;
  source = JSON.parse(JSON.stringify(source));

  var keys = _.keys(destination);
  _.extend(destination, _.pick(source, keys));
  _.pick(_.destination, _.identity);
  destination = JSON.parse(JSON.stringify(destination));
  return destination;
}
