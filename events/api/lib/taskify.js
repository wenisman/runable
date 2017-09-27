const { task } = require('folktale/concurrency/task');

const taskify = (fn, context) => {
  return function() {
    const args = Array.from(arguments);
    return task((resolver) => {
      args.push((err, data) => {
        if (err) {
          return resolver.reject(err);
        } else {
          return resolver.resolve(data);
        }
      });
      fn.apply(context, args);
    });
  };
};

module.exports = taskify;
