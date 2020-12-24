var arraydata = new Array(0);
var arraydataPie = new Array(0);
function ready() {
    $.ajax({
       url:"/getAllTypeDish",
        type:"POST",
        dataType:"json",
        success:function (data) {
            for(var i=0;i<data.data.length;i++){
                var row = data.data[i];
                arraydataPie.push([row,0]);
            }
        }
    });
}

function changeDate() {
    var startDate = $('#start_date_input').val();
    var stopDate =  $('#end_date_input').val();
    arraydata = new Array(0);
    $.ajax(
        {
            url:"/getBillByDay",
            type:"POST",
            dataType:"json",
            data:{
                "startDate":startDate,
                "stopDate":stopDate
            },
            success:function (data) {
                for(var i=0;i<data.data.length;i++){
                    var row = data.data[i];
                    arraydata.push(row);
                }

                showChart(startDate,stopDate);
            }
        }
    );
}
function showChart(startDate,stopDate) {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var datac= new google.visualization.DataTable();
        datac.addColumn('string', 'Ngày');
        datac.addColumn('number', 'Doanh thu');
        for(var i=0;i<arraydata.length;i++) {
            datac.addRow([arraydata[i][1], parseInt(arraydata[i][0])]);
        }
        console.log(datac);
        var options = {
            title: 'Thống kê doanh thu',
            hAxis: {title: 'Year',  titleTextStyle: {color: '#fff'}},
            interpolateNulls: true,
            vAxis: {minValue: 0}
        };
        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(datac, options);
    }
}

function changeDateChartPie() {
    var startDate = $('#start_date_input2').val();
    var stopDate =  $('#end_date_input2').val();
    arraydata = new Array(0);
    $.ajax(
        {
            url:"/getUsedDishCount",
            type:"POST",
            dataType:"json",
            data:{
                "startDate":startDate,
                "stopDate":stopDate
            },
            success:function (data) {
                for(var i=0;i<data.data.length;i++){
                    var row = data.data[i];
                    for(var i=0;i<arraydataPie.length;i++){
                        if(arraydataPie[i][0]==row[0]) {
                            arraydataPie[i][1] = row[1];
                            break;
                        }
                    }

                }
                console.log(arraydataPie);
                showPieChart();
            }
        }
    );
}
function showPieChart() {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var datac= new google.visualization.DataTable();
        datac.addColumn('string', 'Món ăn');
        datac.addColumn('number', 'Số lượng gọi');
        for(var i=0;i<arraydataPie.length;i++) {
            datac.addRow([arraydataPie[i][0], parseInt(arraydataPie[i][1])]);
        }

        var options = {
            title: 'Thống kê sử dụng loại món ăn',
            sliceVisibilityThreshold:0
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(datac, options);
    }
}