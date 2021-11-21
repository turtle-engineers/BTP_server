const errors_database = require("./errors-database");

module.exports = (response, error, item_name) => {
    if (!error.original) {
        response.status(200).json({
            "result": "FAIL",
            "resultcode": "-200",
            "message": `Sequelize Catch Error: (${error})`
        });
        console.log(error);
        return;
    } else {
        errors_database(response, error, item_name);
        return;
    }
}