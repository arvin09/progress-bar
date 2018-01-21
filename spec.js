var testsContext;

require('./dist/vendor.bundle');
require('./node_modules/angular-mocks/angular-mocks');

require('./app/app.module');
require('./app/services/app.data.factory');
require('./app/components/home/app.home.component');
require('./app/components/progress-bar/app.progress.bar.component');


testsContext = require.context('./app', true, /_spec\.js$/);
testsContext.keys().forEach(testsContext);