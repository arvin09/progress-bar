'use strict';

(function(){

    function log (log){
        angular.mock.dump(dump(log))
    }

    return {
        log: log
    }

}())