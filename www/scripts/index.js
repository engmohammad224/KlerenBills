// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    var centerDatabase = {};
    var ProductsDictionary = {};
    var nowMoment = new moment();
    document.addEventListener('deviceready',
        onDeviceReady.bind(this), false);

    function onDeviceReady() {
        OpenDataBase(function (db) {


        });
        $('#testPromise').click(function () {
            GenerateDb();
        });

        $('#cButtonSave').click(function () {


            try {
                var user = {};
                AddUser(user);
            } catch (e) {
                swal(e.message)
            }
        })
        // loadDeviceReadyEvents();

    };

    //فتح قاعدة البيانات


})();