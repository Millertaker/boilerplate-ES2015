'use strict';
define('link', [], function () {
    var Link = {};
    return Link;
});
define('components/link', [], function () {
    return;
});
'use strict';
define('musicapp', ['components/link'], function () {
    var App = {};
    console.log('Init my APP');
    return App;
});