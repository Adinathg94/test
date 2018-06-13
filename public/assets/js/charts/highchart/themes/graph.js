// $("#myModal").on("show", function() {    // wire up the OK button to dismiss the modal when shown
// $("#myModal a.btn").on("click", function(e) {
//     console.log("button pressed");   // just as an example...
//     $("#myModal").modal('hide');     // dismiss the dialog
// });
// });
var Graph=function () {


    $("#myModal").on("hide", function () {    // remove the event listeners when the dialog is dismissed
        $("#myModal a.btn").off("click");
    });

    $("#myModal").on("hidden", function () {  // remove the actual elements from the DOM when fully hidden
        $("#myModal").remove();
    });

    $("#myModal").modal({                    // wire up the actual modal functionality and show the dialog
        "backdrop": "static",
        "keyboard": true,
        "show": false                     // ensure the modal is shown immediately
    });
    var pointselected, lines = [], editcomment = false, complaintCycle = 0,series;
    var closeCycle = function () {
        console.log("in close Modal");
        $("#myModal").modal('hide');
    }
    var generatecycle = function (line, injuctionData) {
        console.log("line="+line);
        $('select[name="cycle"]').empty();
        var optionsAsString = "";
        var i, cycle = "cycle ";
        for (i = 0; i < line.length; i++) {
            // console.log(i);
            optionsAsString += "<option value='" + i + "'>" + cycle + (i + 1) + "</option>";
        }

        $('select[name="cycle"]').append(optionsAsString);
        $.ajax({
            type: 'GET',
            url: "../getcompliantdata/" + document.URL.split("/").pop(),
            dataType: 'json',
            success: function (data) {
                if (data.status == "200") {
                    var injuctionCycles = [];
                    for (i = 0; i < data.compliant.length; i++) {
                        if (data.compliant[i].cycle == 0) {
                            injuctionCycles.push(0)
                        } else {
                            injuctionCycles.push((line.indexOf(data.compliant[i].cycle)) + 1)
                        }
                    }
                    for (i = 0; i < injuctionData.length; i++) {
                        if (injuctionData[i] >= 4) {
                            // console.log(injuctionCycles.indexOf(i + 1));

                            if (injuctionCycles.indexOf(i + 1) == -1) {
                                $("#compliant-box").show();
                                $('#complaint-alert-warn').text("Cycle " + (i + 1 )+ " is treatment compliant!");
                                complaintCycle = i + 1;
                                break
                            }
                        }
                    }
                } else {
                    for (i = 0; i < injuctionData.length; i++) {
                        if (injuctionData[i] >= 4) {
                            $("#compliant-box").show();
                            $('#complaint-alert-warn').text("Cycle " + (i + 1) + " is treatment compliant!");
                            complaintCycle = i + 1;
                            break

                        }
                    }
                }

            }
        });
    }
    $("#compliant-no").on("click", function () {
         console.log(series.daysArray);
        submitcomplaintdata(0, $(this).attr("data-id"));
        // will return the string "123"
    });
    $("#compliant-yes").on("click", function () {
         console.log(series.daysArray);
        submitcomplaintdata(1, $(this).attr("data-id"));
    });
    var submitcomplaintdata = function (value, status) {
        day = complaintCycle - 1;
        console.log(series.daysArray);
        if (series.daysArray[0] == 0) {
            change = series.daysArray[day];
        } else {
            if (day == 0) {
                change = 0;
            } else {
                change = series.daysArray[day - 1];
            }
        }
        ;
        $.ajax({
            type: 'GET',
            url: "../addcompliant/" + document.URL.split("/").pop() + '/' + change + '/' + value + '/' + status,
            dataType: 'json',
            success: function (data) {
                $("#compliant-box").hide();
                $("#category").trigger("change");
            }
        })
    }
    var findpoints = function (total) {
        switch (total) {
            case 13:
                return 4;
                break;
            case 14:
                return 2;
                break;
            default:
                return 6;
        }
    }



    var changeCycle = function (x, line) {
        pointselected = x;
        lines = line;
        console.log("in open Modal");
        // $('#ajax-modal').show();
        $("#option-pop").modal('show');
    };

    $("#clear-comment").on("click", function () {
        $("#comment-box").val('');
    });
    $("#comment-opt").on("click", function () {
        $("#option-pop").modal('hide');
        subjectId = document.URL.split("/").pop();
        $("#comment-model").modal('show');
        $.ajax({
            type: 'GET',
            url: "../getcomment/" + subjectId + '/' + pointselected,
            dataType: 'json',
            success: function (data) {
                if (data.status == 200) {
                    $("#comment-box").val(data.comment);
                    editcomment = true;
                } else {
                    $("#comment-box").val('');
                    editcomment = false;
                }
            }
        });

    });
     $("#comment-opt2").on("click", function () {
        $("#option-pop").modal('hide');
        subjectId = document.URL.split("/").pop();
        $("#comment-model").modal('show');
        $.ajax({
            type: 'GET',
            url: "../getcomment/" + subjectId + '/' + pointselected,
            dataType: 'json',
            success: function (data) {
                if (data.status == 200) {
                    $("#comment-box").val(data.comment);
                    editcomment = true;
                } else {
                    $("#comment-box").val('');
                    editcomment = false;
                }
            }
        });

    });

       $("#lday-opt").on("click", function () {
        $("#option-pop").modal('hide');
        subjectId = document.URL.split("/").pop();
        $("#comment-model").modal('show');
        $.ajax({
            type: 'GET',
            url: "../saveLDays/" + subjectId + '/' + pointselected,
            dataType: 'json',
            success: function (data) {
                if (data.status == 200) {
                    $("#comment-box").val(data.comment);
                    editcomment = true;
                } else {
                    $("#comment-box").val('');
                    editcomment = false;
                }
            }
        });

    });




    $("#add-comment").on("click", function () {
        var commentText = $("#comment-box").val();
        $("#comment-model").modal('hide');
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        /* console.log(cyclesarray);
         var cyclesData=[];
         var daysstart=0,cycle=1;
         for(var i=0;i<cyclesarray.length;i++){
             if(cyclesarray[i].color=="red"){
                 cyclesData.push(cyclesarray[i].value);
                 if(pointselected<=cyclesarray[i].value && daysstart<pointselected){
                  break;
                 }
                 daysstart=cyclesarray[i].value;
                 cycle++;
             }
         }*/

        $.ajax({
            type: 'POST',
            url: "../save/comment",
            data: {
                comment: commentText,
                subject: document.URL.split("/").pop(),
                day: pointselected,
                update: editcomment
            },
            dataType: 'json',
            success: function (data) {
                var div, message;
                switch (data.status) {
                    case 200:
                        $("#success-pop").modal('show');
                        break;
                    case 303:
                        $("#success-pop").modal('show');
                        break;
                }
                populateCommentTable();
                $("#category").trigger("change");
            }, cache: false
        }).fail(function (jqXHR, textStatus, error) {
            // Handle error here
            $("#error-pop").modal('show');
        });
    });
    $("#add").on("click", function () {
        // alert( $( this ).text() );
        var cycle = $("#cycle").prop('selectedIndex') + 1;
        var type = $('#cycle_type option:selected').text();
        console.log('point selected======'+pointselected);
        if (isvalid(cycle, pointselected)) {
            var url = document.URL;
            lastPart = url.split("/").pop();
            $.ajax({
                type: 'GET',
                url: "../addcycle/" + lastPart + '/' + cycle + '/' + pointselected + '/' + type,
                dataType: 'json',
                success: function (data) {
                    if (data == 1) {
                        $("#myModal").modal('hide');
                        $('#success-pop').modal('show');
                        $("#category").trigger("change");
                        var cycle;
                        cycle=$("#cycleSelect").prop('selectedIndex')+1;
                        SingleGraph.firstmenstrual(cycle);
                    }
                }
            });
        } else {
            alert("Error: The System calculated Day 1 for another cycle is less than 20 days");
        }
    });


    $(document).ready(function () {
        //CheckBox

        

        // var danger = document.querySelector('.switchery-danger');
        // var switchery = new Switchery(danger, {color: '#EF5350'});

        // Select2 select
        $('.select').select2({
            minimumResultsForSearch: Infinity
        });
        $(".sidebar-main-toggle").trigger("click");
        $('#ajax-modal').hide();
        $('#success-pop').modal('hide');
        $(function () {

            var myChart, plot;
            var url = document.URL;
            var lastPart = url.split("/").pop();

            $(function () {

                $("#category").trigger("change");

            });
            first = 0;
            $('#category').on('change', function (e) {

                var optionSelected = $("option:selected", this);
                var valueSelected = this.value;
                var name = optionSelected.html();
                if (first)
                    myChart.showLoading();
                first = 1;
                $.ajax({


                    type: 'GET',
                    url: "../getgraph/" + valueSelected + '/' + lastPart,
                    dataType: 'json',
                    success: function (data) {

                        series = data;
                        if (series.progesteroneCycles != '') {
                            $('.progesteroneView').html(' ('+series.progesteroneCycles+')');
                        };
                        plot = JSON.stringify(data.plot);
                        console.log(series);
                        var daysArray = [];
                        series.days.forEach(function (arrayItem) {

                            if (arrayItem.color != "purple")
                                daysArray.push(arrayItem.value);
                        });
                        console.log(daysArray);
                        generatecycle(daysArray, data.injuctionCount);
                        var s;
                        graph = {
                             chart: {
                                marginTop: 120
                            },
                            title: {
                                text: valueSelected + '. ' + name,
                                margin:50
                            },

                            subtitle: {
                                text: 'Summary'
                            },
                            xAxis: {

                                crosshair: {
                                    enabled: true
                                },
                                type: 'datetime',
                                plotLines: series.days,
                                labels: {
                                    formatter: function () {
                                        return 'Day ' + series.daysSeries[this.value - 1];
                                    }
                                },
                                title: {
                                    text: 'Days'
                                },
                                tickInterval: 1,
                                plotBands: series.plot,
                            },
                            yAxis: {

                                tickInterval: 1,
                                labels: {
                                    formatter: function () {

                                        if (valueSelected == 13) {
                                            // console.log(valueSelected);
                                            switch (this.value) {
                                                case 1:
                                                    return 'Not at All' + this.value;
                                                case 2:
                                                    return 'spotting ' + this.value;
                                                case 3:
                                                    return 'moderate flow ' + this.value;
                                                case 4:
                                                    return 'significant flow ' + this.value;
                                                case 5:
                                                    return 5;
                                                case 6:
                                                    return 6;
                                            }
                                        } else {
                                            if (valueSelected == 14) {
                                                switch (this.value) {
                                                    case 1:
                                                        return 'Yes';
                                                    case 2:
                                                        return 'No';
                                                }
                                            }
                                        }
                                        switch (this.value) {
                                            case 1:
                                                return 'Not at All ' + this.value;
                                            case 2:
                                                return 'Minimal ' + this.value;
                                            case 3:
                                                return 'Mild ' + this.value;
                                            case 4:
                                                return 'Moderate ' + this.value;
                                            case 5:
                                                return 'Severe ' + this.value;
                                            case 6:
                                                return 'Extreme ' + this.value;
                                        }
                                    }
                                },
                                max: 6,
                                title: {
                                    text: 'Severity'
                                }
                            },
                            legend: {},
                            credits: {
                                enabled: false
                            },
                            loading: {
                                hideDuration: 1000,
                                showDuration: 1000
                            },

                            chart: {

                                marginBottom: 120,
                                marginLeft: 94,
                                zoomType: 'x',
                                resetZoomButton: {
                                    theme: {
                                        fill: 'white',
                                        stroke: 'silver',
                                        r: 0,
                                        states: {
                                            hover: {
                                                fill: '#41739D',
                                                style: {
                                                    color: 'white'
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            tooltip: {
                                formatter: function () {
                                    // $('#constext-menu-div').hide();
                                    // console.log('points====='+this.points);
                                    /*pointsnames=''; yAxisPoint=this.y;seriesName=this.series.name;*/
                                    s = '';
                                    first = true;
                                    $.each(this.points, function (i, point) {
                                        if (first) {
                                            // console.log('point ========='+point.key);
                                            s = '<small>' + point.key + '</small><br>';
                                            j = parseInt(point.x) - 1;
                                            if (point.series.data[j].description != 'NULL') {
                                                lastString = '<small><b>Comment: </b><i>' + point.series.data[j].description + '</i></small>';
                                            } else {
                                                lastString = '';
                                            }
                                            if (point.series.data[j].projestrone != 'NULL') {
                                                if (lastString != '')
                                                    lastString = lastString + '<br>';
                                                lastString = lastString + '<small><b>Progesterone: </b><i>' + point.series.data[j].projestrone + '</i></small>';
                                            }

                                        }
                                        s += '<i style="color: ' + point.series.color + ';">' + point.series.name + '</i>: <b>' + point.y + '</b><br>';
                                        first = false;
                                    });

                                    s += lastString;
                                     // console.log('point ========='+s);
                                    return s;

                                    /*
                                                                            pointsnames=seriesName+' <b>: '+yAxisPoint+'</b><br>';

                                                                        return pointsnames;*/
                                },
                                shared: true,
                                /*useHTML: true,
                                headerFormat: '<small>{point.key}</small><br>',
                                pointFormat: '<i style="color: {series.color};">{series.name}</i>: <b>{point.y}</b><br/>',
                                footerFormat:'<small>{series.data..description}</small>',
                                split: false,
                                distance: 30,
                                padding: 5*/

                            },


                            plotOptions: {
                                series: {
                                    pointStart: 1,
                                    point: {
                                        events: {
                                            click: function(e){
                                                if ($("#compliant-box").css('display') === 'none') {
                                                  $('#constext-menu-div').css({top: e.chartY+90, left: e.chartX+20});
                                                }else{
                                                    $('#constext-menu-div').css({top: e.chartY+90+98, left: e.chartX+20});
                                                }
                                                $('#constext-menu-div').show();
                                                if (localStorage.add_cycle == 1) {
                                                    changeCycle(this.x, daysArray);
                                                }
                                                console.log(e.chartY);
                                            }

                                        }
                                    }
                                }
                            },

                            series: series.series

                        };


                        myChart = Highcharts.chart('container', graph);
                        lastpoint = findpoints(parseInt(valueSelected));
                        console.log(lastpoint);
                        if(lastpoint == 4){
                            myChart.yAxis[0].setExtremes(0, lastpoint+2);
                        }else{
                            myChart.yAxis[0].setExtremes(0, lastpoint+1);
                        }
                        
                        myChart.hideLoading();

                    },
                    error: function (error) {
                        $('#container').text("Error in data");
                    }

                });
            });
            console.log("trt");
            
            // danger.onchange = function () {
            //     //alert(danger.checked);
            //     if (danger.checked) {
            //         JSON.parse(plot).forEach(function (item) {
            //             console.log(item);
            //             if (item.id == 'L-Day')
            //                 myChart.xAxis[0].addPlotBand(item);
            //         })


            //     } else {
            //         myChart.xAxis[0].removePlotBand('L-Day');
            //     }
            // };

            /*$("#save-ovulation").on("click", function () {
                $("#ov-opt-model").modal('hide');
                day = $("#cycle-ov").prop('selectedIndex');
                if (day == 0) {
                    change = 1;
                } else {
                    change = series.days[day - 1].value;
                }

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });


                $.ajax({
                    type: 'POST',
                    url: "../save/ovulation",
                    data: {
                        ovulation: $("#switch-state").bootstrapSwitch('state'),
                        subject: document.URL.split("/").pop(),
                        day: change,
                    },
                    dataType: 'json',
                    success: function (data) {
                        var div, message;
                        switch (data.status) {
                            case 200:
                                $("#success-pop").modal('show');
                                break;
                            case 303:
                                $("#success-pop").modal('show');
                                break;
                        }
                        $("#category").trigger("change");
                    }, cache: false
                }).fail(function (jqXHR, textStatus, error) {
                    // Handle error here
                    $("#error-pop").modal('show');
                });
            });*/


    $("#ovulation-opt").on("click", function () {
        console.log("point selected==="+pointselected);
        console.log(series.daysArray);
        var cycleStart;
        if (series.daysArray[0]>pointselected) {
            cycleStart = 1;
        }else{
            
            series.daysArray.forEach(function (arrayItem) {
                if (arrayItem < pointselected)
                    cycleStart = arrayItem;
            });
            
        };
        console.log('cycle start ='+cycleStart);
        $("#option-pop").modal('hide');
        subjectId = document.URL.split("/").pop();
        $("#ov-opt-model").modal('show');
        $(".switch").bootstrapSwitch();

    });

$.fn.clickOff = function(callback, selfDestroy) {
    var clicked = false;
    var parent = this;
    var destroy = selfDestroy || true;
    
    parent.click(function() {
        clicked = true;
    });
    
    $(document).click(function(event) { 
        if (!clicked) {
            callback(parent, event);
        }
        if (destroy) {
            //parent.clickOff = function() {};
            //parent.off("click");
            //$(document).off("click");
            //parent.off("clickOff");
        };
        clicked = false;
    });
};
$.fn.clickOff2 = function(callback, selfDestroy) {
    var clicked = false;
    var parent = this;
    var destroy = selfDestroy || true;
    
    parent.click(function() {
        clicked = true;
    });
    
    $(document).click(function(event) { 
        if (!clicked) {
            callback(parent, event);
        }
        if (destroy) {
            //parent.clickOff = function() {};
            //parent.off("click");
            //$(document).off("click");
            //parent.off("clickOff");
        };
        clicked = false;
    });
};

$("#container").click(function() {
    // alert('clickOn');
    // $('#constext-menu-div').show();
});

$("#container").clickOff(function() {
    // alert('clickOff');
    $('#constext-menu-div').hide();
});
$("#container2").click(function() {
    // alert('clickOn'); 
    // $('#constext-menu-div').show();
});

$("#container2").clickOff2(function() {
    // alert('clickOff');
    $('#constext-menu-div2').hide();
});

    $("#cycle-opt").on("click", function () {
        console.log("seleted point ="+pointselected);
        console.log(series.daysArray);
        var cycleStart;
        var cycleEnd;
        var cycle;
        var isFirst = true;
        // if (series.daysArray[0]>pointselected) {
        //     cycle = 0;
        // }else{
            var daysArray = [];
            series.days.forEach(function (arrayItem) {

                if (arrayItem.color != "purple")
                    daysArray.push(arrayItem.value);
            });
            console.log(daysArray);
            series.daysArray.forEach(function (arrayItem) {
                if (arrayItem+1 <= pointselected)
                    cycleStart = arrayItem;
                if (isFirst && arrayItem+1 > pointselected) {
                    isFirst = false;
                    cycleEnd = arrayItem;
                };
            });
            if (!cycleStart) { cycleStart = 0};
            console.log(cycleStart);
            console.log(cycleEnd);
            console.log('smaller =='+(pointselected -cycleStart));
            console.log("larger  =="+(cycleEnd-pointselected));
            // var diff=pointselected
            if (pointselected -cycleStart < cycleEnd-pointselected) {
                cycle = series.daysArray.indexOf(cycleStart)+1;
                console.log(series.daysArray.indexOf(cycleStart));
            }else{
                cycle = series.daysArray.indexOf(cycleEnd)+1;
            }
            if (series.daysArray[0] != 0) {
                cycle = cycle+1;
            };
           
        // }

         console.log('cycle ============='+cycle);

         if (isvalid(cycle, pointselected)) {
            var url = document.URL;
            lastPart = url.split("/").pop();
            $.ajax({
                type: 'GET',
                url: "../addcycle/" + lastPart + '/' + cycle + '/' + pointselected + '/' + null,
                dataType: 'json',
                success: function (data) {
                    if (data == 1) {
                        $("#myModal").modal('hide');
                        $('#success-pop').modal('show');
                        $("#category").trigger("change");
                        var cycle;
                        cycle=$("#cycleSelect").prop('selectedIndex')+1;
                        SingleGraph.firstmenstrual(cycle);
                    }
                }
            });
        } else {
            alert("Error: The System calculated Day 1 for another cycle is less than 20 days");
        }

        // $("#option-pop").modal('hide');
        // $("#myModal").modal('show');
    });

 $("#cycle-opt2").on("click", function () {
        console.log("seleted point ="+pointselected);
        console.log(series.daysArray);
        var cycleStart;
        var cycleEnd;
        var cycle;
        var isFirst = true;
        // if (series.daysArray[0]>pointselected) {
        //     cycle = 0;
        // }else{
            var daysArray = [];
            series.days.forEach(function (arrayItem) {

                if (arrayItem.color != "purple")
                    daysArray.push(arrayItem.value);
            });
            console.log(daysArray);
            series.daysArray.forEach(function (arrayItem) {
                if (arrayItem+1 < pointselected)
                    cycleStart = arrayItem;
                if (isFirst && arrayItem+1 > pointselected) {
                    isFirst = false;
                    cycleEnd = arrayItem;
                };
            });
            if (!cycleStart) { cycleStart = 0};
            console.log(cycleStart);
            console.log('smaller =='+(pointselected -cycleStart));
            console.log("larger  =="+(cycleEnd-pointselected));
            // var diff=pointselected
            if (pointselected -cycleStart < cycleEnd-pointselected) {
                cycle = series.daysArray.indexOf(cycleStart)+1;
                console.log(series.daysArray.indexOf(cycleStart));
            }else{
                cycle = series.daysArray.indexOf(cycleEnd)+1;
            }
            if (series.daysArray[0] != 0) {
                cycle = cycle+1;
            };
           
        // }

         console.log('cycle ============='+cycle);

         if (isvalid(cycle, pointselected)) {
            var url = document.URL;
            lastPart = url.split("/").pop();
            $.ajax({
                type: 'GET',
                url: "../addcycle/" + lastPart + '/' + cycle + '/' + pointselected + '/' + null,
                dataType: 'json',
                success: function (data) {
                    if (data == 1) {
                        $("#myModal").modal('hide');
                        $('#success-pop').modal('show');
                        $("#category").trigger("change");
                        var cycle;
                        cycle=$("#cycleSelect").prop('selectedIndex')+1;
                        SingleGraph.firstmenstrual(cycle);
                    }
                }
            });
        } else {
            alert("Error: The System calculated Day 1 for another cycle is less than 20 days");
        }

        // $("#option-pop").modal('hide');
        // $("#myModal").modal('show');
    });
    var isvalid = function (cycle, pointselected) {
        console.log(cycle);
        console.log("lines ==="+series.daysArray);
        if (series.daysArray[0] >0) {
            if (Math.abs(pointselected - series.daysArray[cycle - 2]) > 20) {
                return false;
            }
        }else{
            if (Math.abs(pointselected - series.daysArray[cycle - 1]) > 20) {
                return false;
            }
        };
        
        return true;
    }
        });


    });
return{
    generateCycle : generatecycle,
    changeCycle :changeCycle,
    closeCycle  :closeCycle
};
}();