/**
 * Copyright 2016 Keymetrics Team. All rights reserved.
 * Use of this source code is governed by a license that
 * can be found in the LICENSE file.
 */

var pmx     = require('pmx');
var mysqlClientFactory = require('./lib/clientFactory.js');
var mysqlStats = require('./lib/stats.js');
var mysqlActions = require('./lib/actions.js');

// Initialize the module
pmx.initModule({

    pid              : pmx.resolvePidPaths(['/var/run/mysqld/mysqld.pid',
                                            '/var/run/mysql/mysql.pid',
                                            '/var/run/mysql.pid',
                                            '/var/run/mysqld.pid']),

    widget : {

      // Module display type. Currently only 'generic' is available
      type : 'generic',

      // Logo to be displayed on the top left block
      // Must be https
      logo : 'https://upload.wikimedia.org/wikipedia/en/thumb/6/62/MySQL.svg/1280px-MySQL.svg.png',

      // 0 = main element
      // 1 = secondary
      // 2 = main border
      // 3 = secondary border
      // 4 = text color (not implemented yet)
      theme : ['#262E35', '#015A84', '#F79618', '#F79618'],

      // Toggle horizontal blocks above main widget
      el : {
        probes : true,
        actions: true
      },

      block : {
        // Display remote action block
        actions : false,

        // Display CPU / Memory
        cpu     : true,
        mem     : true,

        // Issues count display
        issues  : true,

        // Display meta block
        meta    : true,

        // Display metadata about the probe (restart nb, interpreter...)
        meta_block : false,

        // Name of custom metrics to be displayed as a "major metrics"
        main_probes : ['questions/s',  'Open Tables', 'Total Processes', 'IO Read kb/s', 'Row Lock Waits', '% Max Used Connections']
      },
    },

    // Status (in the future, not implemented yet)
    status_check : ['latency', 'event loop', 'query/s']
    //= Status Green / Yellow / Red (maybe for probes?)
  }, function(err, conf) {
  var mysqlClient = mysqlClientFactory.build(conf);

  // Init metrics refresh loop
  mysqlStats.init(mysqlClient);

  // Init actions
  mysqlActions.init(mysqlClient);
});
