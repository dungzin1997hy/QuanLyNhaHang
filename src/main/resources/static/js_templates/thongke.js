var arraydata = new Array(0);
var arraydataPie = new Array(0);

function ready() {
    $.ajax({
        url: "/getAllTypeDish",
        type: "POST",
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.data.length; i++) {
                var row = data.data[i];
                arraydataPie.push([row, 0]);
            }
            searchReady();
            showChartDish();
        }

    });

}

function searchReady() {
    $('#select_type_dish').empty();
    for (var i = 0; i < arraydataPie.length; i++) {
        let optEle = document.createElement("option");
        optEle.text = arraydataPie[i][0];
        optEle.value = arraydataPie[i][0];
        select_type_dish.add(optEle);
        //role_add.add(optEle);
    }

}

function showChartDish() {
    var type = $('#select_type_dish option:selected').text();
    var startDate = $('#start_date_input3').val();
    var stopDate = $('#end_date_input3').val();
    $.ajax({
        url: "/chartDishByType",
        dataType: "json",
        type: "POST",
        data: {
            "type": type,
            "startDate": startDate,
            "stopDate": stopDate
        },
        success: function (data) {

            showChartDishByType(data);
        }
    })
}

function showChartDishByType(data1) {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    var allDish = new Array(0);
    var date = new Array(0);
    for (var i = 0; i < data1.data.length; i++) {
        if (data1.data[i][2] != null)

            if (date.includes(data1.data[i][2]) == false)
                date.push(data1.data[i][2]);
    }
    console.log(date);

    function drawChart() {
        var datac = new google.visualization.DataTable();
        datac.addColumn('string', 'Ngày');
        var type = $('#select_type_dish').val();


        $.ajax({
            url: "/searchDishByType",
            dataType: "json",
            type: "POST",
            data: {
                "typeDish": type
            },
            success: function (data) {
                for (var i = 0; i < data.data.length; i++) {
                    datac.addColumn('number', data.data[i].name);
                    allDish.push(data.data[i].name);
                }
                for (var m = 0; m < date.length; m++) {
                    var arraytemp = new Array(0);
                    arraytemp.push(date[m]);
                    for (var j = 0; j < allDish.length; j++) {
                        var tam = 0;
                        for (var k = 0; k < data1.data.length; k++)
                            if (data1.data[k][2] == date[m] && data1.data[k][0] == allDish[j]) {
                                arraytemp.push(data1.data[k][1]);
                                tam =1;
                            }
                        if (tam == 0) {
                            arraytemp.push(0);
                        }
                    }
                    console.log(arraytemp);

                        datac.addRow(arraytemp);
                }
            },
            complete: function (data) {
                var options = {
                    title: 'Thống kê số lượng sử dụng theo loại',
                    legend: { position: 'bottom' }
                };
                var chart = new google.visualization.LineChart(document.getElementById('chart_div_dish'));
                chart.draw(datac, options);
            }

        });

        // var tam =0;
        // for(var k=0;k<data.data.length;k++)
        //     if(data.data[k][2] == date[m]&&data.data[k][0] ==allDish[j]){
        //         arraytemp.push(data.data[k][1]);
        //     }
        // if(tam ==0){
        //     arraytemp.push(0);
        // }


        //   console.log(datac);

        // var chart = new google.visualization.AreaChart(document.getElementById('chart_div_dish'));
        // chart.draw(datac, options);
    }
}

function changeDate() {
    var startDate = $('#start_date_input').val();
    var stopDate = $('#end_date_input').val();
    arraydata = new Array(0);
    $.ajax(
        {
            url: "/getBillByDay",
            type: "POST",
            dataType: "json",
            data: {
                "startDate": startDate,
                "stopDate": stopDate
            },
            success: function (data) {
                for (var i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    arraydata.push(row);
                }

                showChart(startDate, stopDate);
            }
        }
    );
}

function showChart(startDate, stopDate) {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var datac = new google.visualization.DataTable();
        datac.addColumn('string', 'Ngày');
        datac.addColumn('number', 'Doanh thu');
        for (var i = 0; i < arraydata.length; i++) {
            datac.addRow([arraydata[i][1], parseInt(arraydata[i][0])]);
        }
        //   console.log(datac);
        var options = {
            title: 'Thống kê doanh thu',
            hAxis: {title: 'Year', titleTextStyle: {color: '#fff'}},
            interpolateNulls: true,
            vAxis: {minValue: 0}
        };
        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(datac, options);
    }
}

function changeDateChartPie() {
    var startDate = $('#start_date_input2').val();
    var stopDate = $('#end_date_input2').val();
    arraydata = new Array(0);
    $.ajax(
        {
            url: "/getUsedDishCount",
            type: "POST",
            dataType: "json",
            data: {
                "startDate": startDate,
                "stopDate": stopDate
            },
            success: function (data) {
                for (var i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    for (var i = 0; i < arraydataPie.length; i++) {
                        if (arraydataPie[i][0] == row[0]) {
                            arraydataPie[i][1] = row[1];
                            break;
                        }
                    }

                }
                //    console.log(arraydataPie);
                showPieChart();
            }
        }
    );
}

function showPieChart() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var datac = new google.visualization.DataTable();
        datac.addColumn('string', 'Món ăn');
        datac.addColumn('number', 'Số lượng gọi');
        for (var i = 0; i < arraydataPie.length; i++) {
            datac.addRow([arraydataPie[i][0], parseInt(arraydataPie[i][1])]);
        }

        var options = {
            title: 'Thống kê sử dụng loại món ăn',
            sliceVisibilityThreshold: 0
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(datac, options);
    }
}