const Task = require('folktale/concurrency/task');

module.exports = {
    taskify(fn, context) {
      return function() {
        const args = Array.from(arguments);
        return new Task(function(reject, resolve) {
        args.push(function(err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
        fn.apply(context, args);
        });
      };
    }
};
