
/*
////Open Database
//function openDb() {
//    return new Promise((resolve, reject) => {

//        Dbfile.openDb('Kleren.db',
//            function (db) {
//                try {
//                    centerDatabase = db;
//                    //callBack(db);
//                    resolve(db);



//                } catch (e) {
//                    reject();
//                }
//            });
//    });
//};

////Create Table
//function createTable(tableName, columnNames) {
//    return new Promise((resolve, reject) => {
//        try {

//            if (!centerDatabase) {
//                return reject('You have To create a database!!')
//            }
//            tableExist().then(function (notexist) {
//                if (notexist) {

//                    var tableQuery = "CREATE TABLE " + tableName.trim()
//                        + columnNames;
//                    //swal(tableQuery);
//                    Dbfile.createTable(centerDatabase, tableQuery, function (status) {
//                        if (status) {
//                            resolve("created success");
//                        }
//                        else
//                            reject('error')
//                    });
//                }
//            })



//        } catch (e) {
//            navigator.notification.alert(e.message)
//        }
//    });
//};


////Table Exist
//function tableExist(tableName) {

//    return new Promise((resolve, reject) => {
//        Dbfile.tableExists(centerDatabase, tableName, function (exist) {
//            if (!exist) {
//                resolve()
//            }
//            else
//                reject()

//        })
//    })
//};

//function testPromise() {
//    return new Promise((r, j) => {

//        r("Worked")
//    })
//}


////get data
//function getData(tableName) {
//    return new Promise((resolve, reject) => {

//        Dbfile.getData(centerDatabase, "select * from  " + tableName.trim(),
//            function (result) {
//            if (result) {
//                swal("result Good");
//                resolve(result);
//            }
//            else
//                reject(null);
//        })
//    })
//}


*/





//فتح قاعدة البيانات
function OpenDataBase(callBack) {
    Dbfile.openDb('Kleren1.db',
        function (db) {
            centerDatabase = db;
            callBack(db);
        });
}

//Generate Database
function GenerateDatabase() {
    Dbfile.openDb('Kleren.db',
        function (db) {
            if (db) {
                centerDatabase = db;
                createTable("Customer121", " (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, Name text , phone text , Addres text , email text )", function (status) {
                    if (status) {
                        var customer = {};
                        customer.Name = $('#cName').val();
                        customer.phone = $('#cPhone').val();
                        customer.Addres = $('#cAddress').val();
                        customer.email = $('#cEmail').val();
                        AddUser(customer);
                    }
                })

                //callBack(db);
                //swal("Db Opened", "", "success")
            }
        });
}


//إضافة مستخدم
function AddUser(user) {
    var sqlstr = 'INSERT INTO Customer (Name,phone,Address,email) VALUES("' +
        user.Name + '","' + user.phone + '","' +
        user.Address + '","' + user.email + '")';
    sqlstr = 'INSERT INTO Customer121 (Name,phone,Address,email) VALUES("mm","dd","ff","ff")';

    Dbfile.insertRecord(centerDatabase, sqlstr
        , function (status) {
            if (status) {
                swal("تم إضافة زبون ")
            }
        })
}

//إضافة تقرير
function AddReport(report) {
    Dbfile.insertRecord(centerDatabase,
        'INSERT INTO report (CustomerID,Price,companyName) VALUES(' +
        report.CustomerID + ',' + report.Price + ',"' +
        report.companyName + '")', function (status) {
            if (status) {
                swal("تم إضافة تقرير ")
            }
        })
}


//إنشاء table
function createTable(tableName, columnNames, callback) {
    try {

        if (!centerDatabase) {
            swal('You have To create a database!!')
            return;
        }
        Dbfile.tableExists(centerDatabase, tableName, function (exist) {
            if (!exist) {

                var tableQuery = "CREATE TABLE " + tableName.trim()
                    + columnNames;
                //swal(tableQuery);
                Dbfile.createTable(centerDatabase, tableQuery, function (status) {
                    if (status) {
                        swal("created", "success");
                    }
                    else
                        swal('error', '', 'error')
                });
            }
            else
                swal("Exist", 'The Table Exists before', 'error');
        })
        callback(true)

    } catch (e) {
        navigator.notification.alert(e.message)
    }
};


//الحصول على البيانات
function getData(callBack) {
    if (!centerDatabase) {
        swal("Error centerDatabase", "", "error");
    }
    Dbfile.getData(centerDatabase, "select * from Customer ", function (result) {
        if (result) {
            callBack(result)
            //swal(result[0]["productNumber"] + result[0]["type"])
        }
        else
            swal("result error", "", "error");
    })
};


//إنشاء ListView
function CreateList() {
    getData(function (result) {
        $('#AllUsersBill').empty();

        for (var i = 0; i < result.length; i++) {
            $('#AllUsersBill').append('<li> <a href="#"> <img src="images/apple.png" class="ui-li-thumb"> <h2>' + result[i]["productNumber"] +
                '</h2> <p>' + result[0]["type"] + '</p> <p class="ui-li-aside">iOS</p> </a> </li>');
        }
        $('[data-role=listview]').listview().listview('refresh');

    })


}


//تنفيذ مرة واحدة 
function GenerateDb() {
    swal("start");

    var userTable = "DROP TABLE IF EXISTS Customer; CREATE TABLE Customer (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, Name text , phone text , Addres text , email text )";

    var reportTable = "DROP TABLE IF EXISTS report; CREATE TABLE report (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, CustomerID INTEGER , Price double , reportDate DATETIME DEFAULT CURRENT_DATE , companyName text )";

    OpenDataBase(function (db) {
        try {

            Dbfile.createTable(centerDatabase, userTable, function (status) {

            });
            Dbfile.createTable(centerDatabase, reportTable, function (status) {
                swal("reportTable")

            });
        }
        catch (e) {
            swal(e.message);
        }
    })

}



