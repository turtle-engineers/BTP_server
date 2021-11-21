const ER_DATA_TOO_LONG = 1406;
const ER_DUP_ENTRY = 1062;
const ER_NO_REFERENCED_ROW_2 = 1452;

module.exports = (response, error, item_name) => {
    if(error.original.errno == ER_DUP_ENTRY) {
        response.status(200).json({
            "result": "FAIL",
            "resultcode": "-301",
            "message": `동일한 ${item_name}이 이미 존재합니다. (ER_DUP_ENTRY)`
        });
        return;
    };

    if(error.original.errno == ER_DATA_TOO_LONG) {
        response.status(200).json({
            "result": "FAIL",
            "resultcode": "-302",
            "message": `${item_name}의 최대 길이를 벗어났습니다. (ER_DATA_TOO_LONG)`
        });
        return;
    };

    if(error.original.errno == ER_NO_REFERENCED_ROW_2) {
        response.status(200).json({
            "result": "FAIL",
            "resultcode": "-303",
            "message": "해당 Foreign Key를 찾을 수 없습니다. (ER_NO_REFERENCED_ROW_2)"
        });
        return;
    };

    response.status(200).json({
        "result": "FAIL",
        "resultcode": "-300",
        "message": `데이터베이스에서 오류가 발생하였습니다. (MariaDB Error Code: ${error.original.errno}`
    });
    console.log(error);
    return;
}