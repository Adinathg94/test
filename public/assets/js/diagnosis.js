/**
 * Created by adinath on 22/4/17.
 */

$(document).ready(function() {
    $('.cycle').select2({
        minimumResultsForSearch: Infinity,
        width: 150
    });
     // var primary = document.querySelector('.switchery-primary');
     // var switchery = new Switchery(primary, {color: '#2196F3'});

    $("#myModal").hide();
    var series, myChart,step,myChart2,first=false,isAddCycle=false,isPreliminary=false,isPreliminaryChecked = false;
    var url = document.URL;
    var lastPart = url.split("/").pop();
    var daysArray=[];
$(function() {
        // primary.onchange = function () {
        //         console.log(primary.checked);
        //         if (primary.checked) {
        //             isPreliminary=false;
        //             // JSON.parse(plot).forEac;(function (item) {
        //             //     console.log(item);
        //             //     if (item.id == 'F-Day')
        //             //         myChart.xAxis[0].addPlotBand(item);
        //             // })

        //         } else {
        //             isPreliminary=false;
        //             // myChart.xAxis[0].removePlotBand('F-Day');
        //         }
        //     };
    $.ajax({


        type: 'GET',
        url: "../getgraphbyques/" + 1 + '/' + lastPart+'/'+1+'/'+true,
        dataType: 'json',
        success: function (data) {
            series = data;
            console.log(series.days);


            series.days.forEach( function (arrayItem)
            {

                if(arrayItem.color!="purple")
                    daysArray.push(arrayItem.value);
            });
            console.log(daysArray);

            generatecycle(daysArray);


        }

    });});
    var pointselected,lines=[];
    function changeCycle(x,line) {
        pointselected = x;lines=line;
        console.log("in open Modal");
        // $('#ajax-modal').show();
        // $("#myModal").modal('show');
    }
    var totalcycle;
    function generatecycle(line){
    totalcycle=line.length;
        $('.cycle' ).empty();
        var optionsAsString = "";
        var cycle="Cycle ";
        for(var i = 0; i <= line.length; i++) {
            console.log(i);
            optionsAsString += "<option value='" + i + "'>" +cycle+(i+1)  + "</option>";
        }
        $( '.cycle' ).append( optionsAsString );
        $("select[id=cycleSelect] option:last").remove();

    }
    $("#add_cycle_type").on("click", function () {
        console.log('in add cycle tpe click');
        console.log('cycle='+cycle);
        console.log('subjet='+lastPart);
        if (series.daysArray[0]==0) {
                change = series.daysArray[day];
            }else{
                if (day == 0) {
                    change = 0;
                } else {
                    change = series.daysArray[day - 1];
                }
            };
            console.log("day ================"+change);
            console.log("cycle ================"+cycle);
            console.log($('#cycle_type').val());
            var type = $('#cycle_type').val();
             var url = document.URL;
                lastPart = url.split("/").pop();
                $.ajax({
                    type: 'GET',
                    url: "../addcycleType/" + lastPart + '/' + change + '/' + type + '/'+cycle,
                    dataType: 'json',
                    success: function (data) {
                        if (data == 1) {
                            $("#myModal").modal('hide');
                        //     $('#success-pop').modal('show');
                        //     $("#category").trigger("change");
                        //     var cycle;
                        //     cycle=$("#cycleSelect").prop('selectedIndex')+1;
                        //     firstmenstrual(cycle);
                        }else{
                            $("#myModal").modal('hide');
                            alert('Cycle type already exist!');
                        }
                    }
                });
    });

    $("#add").on("click", function () {
        // alert( $( this ).text() );
        isAddCycle = true;
        var isFirst = true;
        var cycleStart;
        var cycleEnd;
        var cycleAdd;
        console.log("diagnosis type =="+isPreliminaryChecked);
        console.log("new start ="+pointselected);
        console.log('start = '+start);
        var cycles=$("#cycleSelect").prop('selectedIndex')+1;
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
                cycleAdd = series.daysArray.indexOf(cycleStart)+1;
                console.log(series.daysArray.indexOf(cycleStart));
            }else{
                cycleAdd = series.daysArray.indexOf(cycleEnd)+1;
            }
            if (series.daysArray[0] != 0) {
                cycleAdd = cycleAdd+1;
            };
           
        // }

         console.log('cycle ============='+cycle);
         console.log('cycle ============='+cycleAdd);
        if (isvalid(cycleAdd,pointselected)) {

            if (!isPreliminaryChecked) {
                var url = document.URL;
                lastPart = lastPart = url.split("/").pop();
                $.ajax({
                    type: 'GET',
                    url: "../addcycle/" + lastPart + '/' + cycleAdd + '/' + pointselected+'/'+null,
                    dataType: 'json',
                    success: function (data) {
                        if (data == 1) {
                            $("#myModal").modal('hide');
                            firstmenstrual(cycle);
                        }
                    }
                });
            }else{

                // console.log(myChart.xAxis[0].options.plotLines);
                // myChart.xAxis[0].options.plotLines.forEach( function (arrayItem)
                //     {
                //         if(arrayItem.value == start+1){
                //             arrayItem.value = pointselected;
                //             console.log("before update x axis");
                //             myChart.xAxis[0].update();
                //         }

                //     });
                //  oldStart = start;
                //  start = pointselected-1;

                var url = document.URL;
                lastPart = lastPart = url.split("/").pop();
                $.ajax({
                    type: 'GET',
                    url: "../addDiagnosisCycle/" + lastPart + '/' + cycleAdd + '/' + pointselected+'/'+null,
                    dataType: 'json',
                    success: function (data) {
                        if (data == 1) {
                            $("#myModal").modal('hide');
                            isPreliminary = true;
                            firstmenstrual(cycle);
                        }
                    }
                });
                
            };

        }else {
            alert("Error: The System calculated Day 1 for another cycle is less than 20 days");
        }
    });
    function isvalid(cycles,pointselected) {
        console.log(cycles);


        if (series.daysArray[0] >0) {
            if (Math.abs(pointselected - series.daysArray[cycles - 2]) > 20) {
                return false;
            }
        }else{
            if (Math.abs(pointselected - series.daysArray[cycles-1]) > 20) {
                return false;
            }
        };
        return true;
    }
    var start,end;
    function firstmenstrual(cycle) {
        var url;
        if (isPreliminary) {
            url = "../getdiagnosisgraphbyques/";
        }else{
            url = "../getgraphbyques/";
        };
        $.ajax({


            type: 'GET',
            url: url + 26 + '/' + lastPart+'/'+cycle+'/'+true,
            dataType: 'json',
            success: function (data) {
                var prev;
                series = data;
                console.log(series.daysSeries);
                start = series.daysSeries.indexOf(1, series.min);
                end=series.daysSeries.indexOf(1, start+1);
                day = cycle-1;
                if (series.daysArray[0]==0) {
                    change = series.daysArray[day];
                    if (series.daysArray[day+1]) {
                        end = series.daysArray[day+1];
                    }else{
                        end = series.daysArray[day];
                    }
                    
                }else{
                    if (day == 0) {
                        change = 0;
                        end    = series.daysArray[day];
                    } else {
                        change = series.daysArray[day-1];
                        end    = series.daysArray[day]?series.daysArray[day]:series.daysArray[day-1];
                    }
                };
                start = change;
               console.log("day ================"+change);
               console.log("day end================"+end);
                console.log("dats isssss"+series.daysSeries.indexOf(1, start+1));
                graph = {

                    title: {
                        text: 'Rate of menstrual bleeding'
                    },

                    subtitle: {
                        text: 'Summary'
                    },
                    xAxis: {
                        type: 'datetime',
                        plotLines: series.days,
                        labels: {
                            formatter: function () {
                                // console.log(series.daysSeries[this.value - 1]);
                                if(typeof series.daysSeries[this.value - 1] !== 'undefined'){
                                    text=    series.daysSeries[this.value - 1];
                                }
                                else {
                                    if(typeof series.daysSeries[this.value - 2] !== 'undefined'){
                                        prev=    series.daysSeries[this.value - 2];
                                    }
                                    if(prev!==null &&typeof prev!=='undefined'){
                                        text=prev+1;
                                        prev++;
                                    }else {

                                        text=this.value-1;
                                    }
                                }
                                return 'Day ' +text ;
                            }
                        },
                        title: {
                            text: 'Days'
                        },
                        tickInterval: 1,
                        min:series.min-4,max:series.max+4,
                        plotBands: series.plot,
                    },
                    yAxis: {
                        tickInterval: 1,
                        labels: {
                            formatter: function () {
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
                            }
                        },
                        startOnTick: true,
                        endOnTick: true,
                        min:0,
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
                        hideDuration: 100,
                        showDuration: 100
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
                        // split: true,
                        // distance: 30,
                        // padding: 5
                           formatter: function () {
                                    $('#constext-menu-div').hide();
                                    // console.log('points====='+this.points.daySeries);
                                    /*pointsnames=''; yAxisPoint=this.y;seriesName=this.series.name;*/
                                    s = '';
                                    first = true;
                                    $.each(this.points, function (i, point) {
                                        if (first) {
                                           
                                            s = '<small>' + point.key + '</small><br>';
                                            j = parseInt(point.x) - 1;


                                        }
                                         // console.log('point ========='+point);
                                        s += '<i style="color: ' + point.series.color + ';">' + point.series.name + '</i>: <b>' + point.y + '</b><br>';
                                        first = false;
                                    });

                                    
                                     // console.log('point ========='+s);
                                    return s;

                                    /*
                                                                            pointsnames=seriesName+' <b>: '+yAxisPoint+'</b><br>';

                                                                        return pointsnames;*/
                                },
                                shared: true,
                    },

                    plotOptions: {
                        series: {
                            pointStart: 1,
                            point: {
                                events: {
                                    click: function (e) {
                                        // alert(' value: ' + this.x);
                                        $('#constext-menu-div').css({top: e.chartY+480, left: e.chartX+150});
                                                $('#constext-menu-div').show();
                                        if (localStorage.add_cycle == 1) {
                                            changeCycle(this.x, daysArray);
                                            //console.log(series.days);
                                        }
                                    }
                                }
                            }
                        },

                    },

                    series: series.series

                };
                myChart = Highcharts.chart('container', graph);


            }

        });
    }


    var cycle;
    var preliminaryClick = true;
    $(".stepy-callbacks").stepy({
        validate: true,
        next: function(index) {
            switch (index){

                case 2:
                console.log("case 2");
                    $('.stepy-step').find('.button-next').html('Diagnosis <i class="icon-arrow-right14 position-right"></i>');
                    
                    // newTextBoxDiv.appendTo(appended_div);
                    // $('.stepy-step').find('.button-next').append('<a href="#" class="button-next btn btn-primary next-left">Preliminary Diagnosis <i class="icon-arrow-right14 position-right"></i></a>');
                    //$.fn.stepy.defaults.nextLabel = 'Diagnosis <i class="icon-arrow-right14 position-right"></i>';
                    $('.stepy-step').find('.button-next').addClass('btn btn-primary next-left');
                    $('.stepy-callbacks').children('.stepy-step').eq(1).find('.button-next').attr('id','diagnosisButton');
                    console.log($('.stepy-callbacks').children('.stepy-step').eq(1).find('.button-next').html());
                    
                    isPreliminaryChecked = false;
                    if (preliminaryClick) {
                        preliminaryClick = false;
                        $('.stepy-step').find('.button-next#diagnosisButton').after('<a class="preliminary btn btn-primary next-left">Preliminary Diagnosis <i class="icon-arrow-right14 position-right"></i></a>');
                        $('.stepy-step').find('.button-back').addClass('btn btn-default');
                         $(".stepy-step .preliminary").on("click", function () {
                            console.log('in preliminari diagnosis');
                            // $('.stepy-callbacks').steps("setStep", 3);
                            
                            isPreliminaryChecked = true;
                            // $('.stepy-callbacks').stepy({'enter':true});
                            $('.stepy-callbacks').children('.stepy-step').eq(1).find('.button-next').click();
                            // $(".stepy-callbacks").stepy('step', 3);
                        });
                    };
                   
                    break

                case 3:
                console.log("case 3");
                    $('.stepy-step').find('.button-next').html('Next <i class="icon-arrow-right14 position-right"></i>');
                    $('.stepy-step').find('.button-next').removeClass('next-left');
                    cycle=$("#cycle").prop('selectedIndex')+1;
                    $('.cycleHead').html('Cycle '+cycle);
                    console.log("diagnosis type ==="+isPreliminaryChecked);
                    isPreliminary = false;
                    firstmenstrual(cycle);
                break
                case 4:
                console.log("case 4");
                    $('#questions_1').bind('change', function (e) {
                    var optionSelected = $("option:selected", this);
                    var valueSelected = this.value;
                    if (first) {
                        myChart2.showLoading();
                    };
                        first=true;
                    if (isPreliminary) {
                        url = "../getdiagnosisgraphbyques/";
                    }else{
                        url = "../getgraphbyques/";
                    };

                    $.ajax({


                        type: 'GET',
                        url: url+ valueSelected + '/' + lastPart+'/'+cycle+'/'+true,
                        dataType: 'json',
                        success: function (data) {
                            var prev;
                            series = data;
                            console.log(series.days);
                            graph = {

                                title: {
                                    text: series.series[0].name
                                },

                                subtitle: {
                                    text: 'Summary'
                                },
                                xAxis: {
                                    type: 'datetime',
                                    plotLines: series.days,
                                    labels: {
                                        formatter: function () {
                                            // console.log(series.daysSeries[this.value - 1]);
                                            if(typeof series.daysSeries[this.value - 1] !== 'undefined'){
                                                text=    series.daysSeries[this.value - 1];
                                            }
                                            else {
                                                if(typeof series.daysSeries[this.value - 2] !== 'undefined'){
                                                    prev=    series.daysSeries[this.value - 2];
                                                }
                                                if(prev!==null &&typeof prev!=='undefined'){
                                                    text=prev+1;
                                                    prev++;
                                                }else {

                                                    text=this.value-1;
                                                }
                                            }
                                            return 'Day ' +text ;
                                        }
                                    },
                                    title: {
                                        text: 'Days'
                                    },
                                    tickInterval: 1,
                                    min:series.min-4,max:series.max+4,
                                     plotBands: series.plot
                                },
                                yAxis: {
                                    tickInterval: 1,
                                    labels: {
                                        formatter: function () {
                                            switch (this.value) {
                                                case 1:
                                                    return 'Not at All' + this.value;
                                                case 2:
                                                    return 'Minimal ' + this.value;
                                                case 3:
                                                    return 'Mild ' + this.value;
                                                case 4:
                                                    return 'Moderate ' + this.value;
                                                case 5:
                                                    return 'Severe ' + this.value;
                                                case 6:
                                                    return 'Extreme' + this.value;
                                            }
                                        }
                                    },
                                    startOnTick: true,
                                    endOnTick: true,
                                    min:0,
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
                                    hideDuration: 100,
                                    showDuration: 100
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
                                    split: true,
                                    distance: 30,
                                    padding: 5
                                },

                                plotOptions: {
                                    series: {
                                        pointStart: 1,
                                        point: {
                                            events: {
                                                click: function (e) {
                                                    // alert(' value: ' + this.x);

                                                    //changeCycle(this.x,daysArray);
                                                    //console.log(series.days);

                                                }
                                            }
                                        }
                                    },

                                },

                                series: series.series

                            };
                            myChart2 = Highcharts.chart('container1', graph);
                             myChart2.hideLoading();
                             if ( isPreliminaryChecked && isAddCycle ) {
                            console.log("in step one old start =");
                            // myChart2.xAxis[0].options.plotLines.forEach( function (arrayItem)
                            // {   console.log(arrayItem);
                            //     if(arrayItem.value == oldStart+1){
                            //         arrayItem.value = start+1;
                            //         console.log("before update x axis");
                            //         myChart2.xAxis[0].update();
                            //     }

                            // });
                        };

                        }

                    });});
                    $("#questions_1").trigger("change");
                        
             

                   
                    $.ajax({


                        type: 'GET',
                        url: "../../diagnosis/stepOne/" + lastPart + '/' + cycle+'/'+start+'/'+end+'/'+totalcycle+'/'+isPreliminaryChecked,
                        dataType: 'json',
                        success: function (data){
                            if (data.status!=400){
                                    //console.log(data.details);
                                $("#tstage1 tr").remove();
                                    $.each( data.details, function( key,value ) {
                                        status="diagnosis-success";
                                        if (value.average>2.5 || value.noOfDays > 0)
                                            status="diagnosis-failed";
                                        var markup = "<tr class='"+status+"'><td>Cycle "+cycle+"</td> <td>Q"+value.question+"</td><td>"+value.symptom+"</td> <td>"+value.average+"</td> <td>"+value.noOfDays+" </td> </tr>";
                                        $("#tstage1").append(markup);
                                    });

                                if (data.result=="Success"){
                                    $("#success-stage2").empty();
                                    $( "#success-stage2" ).append( data.message );
                                    $( "#success-stage2" ).show();
                                    $( "#warning-stage2" ).hide();
                                }else {
                                    $("#warning-stage2").empty();
                                    $( "#warning-stage2" ).append('<i class="fa fa-warning"></i> '+ data.message);
                                    $( "#warning-stage2" ).show();
                                    $( "#success-stage2" ).hide();
                                }
                            }
                            else {
                                alert("NOTE: The Subject does not have enough data for diagnosis.");
                                $(".stepy-callbacks").stepy('step', 1);
                                return true;
                            }
                        }
                    });
                        
                    break
                case 5:
                    $('#questions_2').bind('change', function (e) {
                        var optionSelected = $("option:selected", this);
                        var valueSelected = this.value;
                        myChart2.showLoading();
                        if (isPreliminary) {
                            url = "../getdiagnosisgraphbyques/";
                        }else{
                            url = "../getgraphbyques/";
                        };
                        $.ajax({


                            type: 'GET',
                            url: url + valueSelected + '/' + lastPart+'/'+cycle+'/'+true,
                            dataType: 'json',
                            success: function (data) {
                                var prev;
                                series = data;
                                console.log(series.days);

                                graph = {

                                    title: {
                                        text: series.series[0].name
                                    },

                                    subtitle: {
                                        text: 'Summary'
                                    },
                                    xAxis: {
                                        type: '#datetime',
                                        plotLines: series.days,
                                        labels: {
                                            formatter: function () {
                                                console.log(series.daysSeries[this.value - 1]);
                                                if(typeof series.daysSeries[this.value - 1] !== 'undefined'){
                                                    text=    series.daysSeries[this.value - 1];
                                                }
                                                else {
                                                    if(typeof series.daysSeries[this.value - 2] !== 'undefined'){
                                                        prev=    series.daysSeries[this.value - 2];
                                                    }
                                                    if(prev!==null &&typeof prev!=='undefined'){
                                                        text=prev+1;
                                                        prev++;
                                                    }else {

                                                        text=this.value-1;
                                                    }
                                                }
                                                return 'Day ' +text ;
                                            }
                                        },
                                        title: {
                                            text: 'Days'
                                        },
                                        tickInterval: 1,
                                        min:series.min-4,max:series.max+4,
                                         plotBands: series.plot,
                                    },
                                    yAxis: {
                                        tickInterval: 1,
                                        labels: {
                                            formatter: function () {
                                                switch (this.value) {
                                                    case 1:
                                                        return 'Not at All' + this.value;
                                                    case 2:
                                                        return 'Minimal ' + this.value;
                                                    case 3:
                                                        return 'Mild ' + this.value;
                                                    case 4:
                                                        return 'Moderate ' + this.value;
                                                    case 5:
                                                        return 'Severe ' + this.value;
                                                    case 6:
                                                        return 'Extreme' + this.value;
                                                }
                                            }
                                        },
                                        startOnTick: true,
                                        endOnTick: true,
                                        min:0,
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
                                        hideDuration: 100,
                                        showDuration: 100
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
                                        split: true,
                                        distance: 30,
                                        padding: 5
                                    },

                                    plotOptions: {
                                        series: {
                                            pointStart: 1,
                                            point: {
                                                events: {
                                                    click: function (e) {
                                                        // alert(' value: ' + this.x);

                                                        //changeCycle(this.x,daysArray);
                                                        //console.log(series.days);

                                                    }
                                                }
                                            }
                                        },

                                    },

                                    series: series.series

                                };
                                myChart2 = Highcharts.chart('container2', graph);
                                if ( isPreliminaryChecked && isAddCycle ) {
                                    console.log("in step one old start =");
                                    // myChart2.xAxis[0].options.plotLines.forEach( function (arrayItem)
                                    // {   console.log(arrayItem);
                                    //     if(arrayItem.value == oldStart+1){
                                    //         arrayItem.value = start+1;
                                    //         console.log("before update x axis");
                                    //         myChart2.xAxis[0].update();
                                    //     }

                                    // });
                                };

                            }

                        });});

                    $("#questions_2").trigger("change");
                    myChart2.hideLoading();
                    $.ajax({


                        type: 'GET',
                        url: "../../diagnosis/stepTwo/" + lastPart + '/' + cycle+'/'+start+'/'+end+'/'+totalcycle+'/'+isPreliminaryChecked,
                        dataType: 'json',
                        success: function (data){
                            if (data.status!=400){
                                //console.log(data.details);
                                $("#tstage2 tr").remove();
                                var valueHtml;
                                $.each( data.details, function( key, value ) {
                                    status="diagnosis-success";
                                    if (!value.isSymptom)
                                        status="diagnosis-failed";
                                    valueHtml = '<span class="btn day-btn btn-labeled" ><b>&#x2265; 4 </b> '+value.day[0]+'</span>';
                                    valueHtml += '<span class="btn day-btn btn-labeled" > <b>&#x2265; 3 </b> '+value.day[1]+'</span>';
                                    var markup = "<tr class='"+status+"'><td>Cycle "+cycle+"</td> <td>Q"+value.question+"</td> <td>"+value.symptom+" </td> <td>"+valueHtml+" </td> </tr>";
                                    $("#tstage2").append(markup);
                                });

                                if (data.result=="Success"){
                                    $("#success-stage3").empty();
                                    $( "#success-stage3" ).append( data.message );
                                    $( "#success-stage3" ).show();
                                    $( "#warning-stage3" ).hide();
                                }else {
                                    $("#warning-stage3").empty();
                                    $( "#warning-stage3" ).append( data.message );
                                    $( "#warning-stage3" ).show();
                                    $( "#success-stage3" ).hide();
                                }
                            }
                            else {
                                alert("NOTE: The Subject doesnot have enough data for diagnosis.");
                                $(".stepy-callbacks").stepy('step', 1);
                                return true;
                            }
                        }
                    });
                    break
                case 6:
                    $('#questions_3').bind('change', function (e) {
                        var optionSelected = $("option:selected", this);
                        var valueSelected = this.value;
                        myChart2.showLoading();
                        if (isPreliminary) {
                            url = "../getdiagnosisgraphbyques/";
                        }else{
                            url = "../getgraphbyques/";
                        };
                        $.ajax({


                            type: 'GET',
                            url: url + valueSelected + '/' + lastPart+'/'+cycle+'/'+true,
                            dataType: 'json',
                            success: function (data) {
                                var prev;
                                series = data;
                                console.log(series.days);

                                graph = {

                                    title: {
                                        text: series.series[0].name
                                    },

                                    subtitle: {
                                        text: 'Summary'
                                    },
                                    xAxis: {
                                        type: 'datetime',
                                        plotLines: series.days,
                                        labels: {
                                            formatter: function () {
                                                console.log(series.daysSeries[this.value - 1]);
                                                if(typeof series.daysSeries[this.value - 1] !== 'undefined'){
                                                    text=    series.daysSeries[this.value - 1];
                                                }
                                                else {
                                                    if(typeof series.daysSeries[this.value - 2] !== 'undefined'){
                                                        prev=    series.daysSeries[this.value - 2];
                                                    }
                                                    if(prev!==null &&typeof prev!=='undefined'){
                                                        text=prev+1;
                                                        prev++;
                                                    }else {

                                                        text=this.value-1;
                                                    }
                                                }
                                                return 'Day ' +text ;
                                            }
                                        },
                                        title: {
                                            text: 'Days'
                                        },
                                        tickInterval: 1,
                                        min:series.min-4,max:series.max+4,
                                         plotBands: series.plot,
                                    },
                                    yAxis: {
                                        tickInterval: 1,
                                        labels: {
                                            formatter: function () {
                                                switch (this.value) {
                                                    case 1:
                                                        return 'Not at All' + this.value;
                                                    case 2:
                                                        return 'Minimal ' + this.value;
                                                    case 3:
                                                        return 'Mild ' + this.value;
                                                    case 4:
                                                        return 'Moderate ' + this.value;
                                                    case 5:
                                                        return 'Severe ' + this.value;
                                                    case 6:
                                                        return 'Extreme' + this.value;
                                                }
                                            }
                                        },
                                        startOnTick: true,
                                        endOnTick: true,
                                        min:0,
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
                                        hideDuration: 100,
                                        showDuration: 100
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
                                        split: true,
                                        distance: 30,
                                        padding: 5
                                    },

                                    plotOptions: {
                                        series: {
                                            pointStart: 1,
                                            point: {
                                                events: {
                                                    click: function (e) {
                                                        // alert(' value: ' + this.x);

                                                        //changeCycle(this.x,daysArray);
                                                        //console.log(series.days);

                                                    }
                                                }
                                            }
                                        },

                                    },

                                    series: series.series

                                };
                                myChart2 = Highcharts.chart('container3', graph);
                                if ( isPreliminaryChecked && isAddCycle ) {
                                    console.log("in step one old start =");
                             
                                };

                            }

                        });});

                    $("#questions_3").trigger("change");
                    myChart2.hideLoading();
                    $.ajax({


                        type: 'GET',
                        url: "../../diagnosis/stepThree/" + lastPart + '/' + cycle+'/'+start+'/'+end+'/'+totalcycle+'/'+isPreliminaryChecked,
                        dataType: 'json',
                        success: function (data){
                            if (data.status!=400){
                                console.log(data.details);
                                $("#tstage3 tr").remove();
                                var prev;
                                $.each( data.details, function( key, value ) {
                                    status="diagnosis-success";
                                    icon="";
                                    if (!value.isSymptom)
                                    {
                                        status="diagnosis-failed";
                                        icon="";
                                    }

                                    if (typeof(value.symptom) !== 'undefined')
                                        prev=value.symptom;
                                     valueHtml = '<span class="btn day-btn btn-labeled" ><b>&#x2265; 4 </b> '+value.days[0]+'</span>';
                                    valueHtml += '<span class="btn day-btn btn-labeled" > <b>&#x2265; 3 </b> '+value.days[1]+'</span>';
                                        var markup = "<tr class='"+status+"'><td>Cycle "+cycle+"</td> <td>Q"+value.question+"</td><td>"+prev+"</td> <td>"+valueHtml+" </td> </tr>";
                                    $("#tstage3").append(markup);
                                });

                                if (data.result=="Success"){
                                    $("#success-stage4").empty();
                                    $( "#success-stage4" ).append( data.message );
                                    $( "#success-stage4" ).show();
                                    $( "#warning-stage4" ).hide();
                                }else {
                                    $("#warning-stage4").empty();
                                    $( "#warning-stage4" ).append( data.message );
                                    $( "#warning-stage4" ).show();
                                    $( "#success-stage4" ).hide();
                                }
                            }
                            else {
                                alert("NOTE: The Subject doesnot have enough data for diagnosis.");
                                $(".stepy-callbacks").stepy('step', 1);
                                return true;
                            }
                        }
                    });
                    break
                case 7:
                    $('#questions_4').bind('change', function (e) {
                        var optionSelected = $("option:selected", this);
                        var valueSelected = this.value;
                        myChart2.showLoading();
                        if (isPreliminary) {
                            url = "../getdiagnosisgraphbyques/";
                        }else{
                            url = "../getgraphbyques/";
                        };
                        $.ajax({


                            type: 'GET',
                            url: url + valueSelected + '/' + lastPart+'/'+cycle+'/'+true,
                            dataType: 'json',
                            success: function (data) {
                                var prev;
                                series = data;
                                console.log(series.days);

                                graph = {

                                    title: {
                                        text: series.series[0].name
                                    },

                                    subtitle: {
                                        text: 'Summary'
                                    },
                                    xAxis: {
                                        type: 'datetime',
                                        plotLines: series.days,
                                        labels: {
                                            formatter: function () {
                                                console.log(series.daysSeries[this.value - 1]);
                                                if(typeof series.daysSeries[this.value - 1] !== 'undefined'){
                                                    text=    series.daysSeries[this.value - 1];
                                                }
                                                else {
                                                    if(typeof series.daysSeries[this.value - 2] !== 'undefined'){
                                                        prev=    series.daysSeries[this.value - 2];
                                                    }
                                                    if(prev!==null &&typeof prev!=='undefined'){
                                                        text=prev+1;
                                                        prev++;
                                                    }else {

                                                        text=this.value-1;
                                                    }
                                                }
                                                return 'Day ' +text ;
                                            }
                                        },
                                        title: {
                                            text: 'Days'
                                        },
                                        tickInterval: 1,
                                        min:series.min-4,max:series.max+4,
                                         plotBands: series.plot
                                    },
                                    yAxis: {
                                        tickInterval: 1,
                                        labels: {
                                            formatter: function () {
                                                switch (this.value) {
                                                    case 1:
                                                        return 'Not at All' + this.value;
                                                    case 2:
                                                        return 'Minimal ' + this.value;
                                                    case 3:
                                                        return 'Mild ' + this.value;
                                                    case 4:
                                                        return 'Moderate ' + this.value;
                                                    case 5:
                                                        return 'Severe ' + this.value;
                                                    case 6:
                                                        return 'Extreme' + this.value;
                                                }
                                            }
                                        },
                                        startOnTick: true,
                                        endOnTick: true,
                                        min:0,
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
                                        hideDuration: 100,
                                        showDuration: 100
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
                                        split: true,
                                        distance: 30,
                                        padding: 5
                                    },

                                    plotOptions: {
                                        series: {
                                            pointStart: 1,
                                            point: {
                                                events: {
                                                    click: function (e) {
                                                        // alert(' value: ' + this.x);

                                                        //changeCycle(this.x,daysArray);
                                                        //console.log(series.days);

                                                    }
                                                }
                                            }
                                        },

                                    },

                                    series: series.series

                                };
                                myChart2 = Highcharts.chart('container4', graph);
                                if (isPreliminaryChecked && isAddCycle ) {
                                    console.log("in step one old start =");
                                    
                                };

                            }

                        });});

                    $("#questions_4").trigger("change");
                    myChart2.hideLoading();
                    var sum=0,lsum=0,fsum=0;
                    $.ajax({


                        type: 'GET',
                        url: "../../diagnosis/stepFour/" + lastPart + '/' + cycle+'/'+start+'/'+end+'/'+totalcycle+'/'+isPreliminaryChecked,
                        dataType: 'json',
                        success: function (data){
                            if (data.status!=400){
                                console.log(data.details);
                                $("#tstage4 tr").remove();
                                var prev;
                                    $.each( data.details, function( key, value ) {
                                        // status="diagnosis-success";
                                        icon="";
                                        // if (value.ratio<1)
                                        // {
                                        //     status="diagnosis-failed";
                                        //     icon="";
                                        // }
                                        lsum=lsum+value.L1Average;
                                        fsum=fsum+value.F1Average;
                                        if (typeof(value.symptom) !== 'undefined')
                                            prev=value.symptom;
                                        var markup = "<tr'><td>Cycle "+cycle+"</td> <td>Q"+value.question+"</td><td>"+prev+"</td><td>"+value.L1Average+"</td><td>"+value.F1Average+"</td> <td>"+value.ratio+icon+" </td> </tr>";
                                        $("#tstage4").append(markup);
                                    });
                                $("#average").empty();
                                if (data.resultMean > 1.50) {
                                    $( "#average" ).addClass('btn day-btn btn-labeled diagnosis-success');
                                }else{
                                    $( "#average" ).addClass('btn day-btn btn-labeled diagnosis-failed');
                                }
                                
                                $( "#average" ).append( "Average of the qualifying (best 5 days) L-phase mean/F-phase mean values: "+data.resultMean );
                                if (data.result=="Success"){
                                    $("#success-stage5").empty();
                                    $( "#success-stage5" ).append( data.message );
                                    $( "#success-stage5" ).show();
                                    $( "#warning-stage5" ).hide();
                                }else {
                                    $("#warning-stage5").empty();
                                    $( "#warning-stage5" ).append( data.message );
                                    $( "#warning-stage5" ).show();
                                    $( "#success-stage5" ).hide();
                                }
                            }
                            else {
                                alert("NOTE: The Subject doesnot have enough data for diagnosis.");
                                $(".stepy-callbacks").stepy('step', 1);
                                return true;
                            }
                        }
                    });
                    break


                case 8:
                if (isPreliminaryChecked){
                    console.log('preliminary checked==');
                     $('.stepy-finish').html('Back to start');
                }
                    $('#questions_5').bind('change', function (e) {
                        var optionSelected = $("option:selected", this);
                        var valueSelected = this.value;
                        myChart2.showLoading();
                        if (isPreliminary) {
                            url = "../getdiagnosisgraphbyques/";
                        }else{
                            url = "../getgraphbyques/";
                        };
                        $.ajax({


                            type: 'GET',
                            url: url + valueSelected + '/' + lastPart+'/'+cycle+'/'+true,
                            dataType: 'json',
                            success: function (data) {
                                var prev;
                                series = data;
                                console.log(series.days);

                                graph = {

                                    title: {
                                        text: series.series[0].name
                                    },

                                    subtitle: {
                                        text: 'Summary'
                                    },
                                    xAxis: {
                                        type: 'datetime',
                                        plotLines: series.days,
                                        labels: {
                                            formatter: function () {
                                                console.log(series.daysSeries[this.value - 1]);
                                                if(typeof series.daysSeries[this.value - 1] !== 'undefined'){
                                                    text=    series.daysSeries[this.value - 1];
                                                }
                                                else {
                                                    if(typeof series.daysSeries[this.value - 2] !== 'undefined'){
                                                        prev=    series.daysSeries[this.value - 2];
                                                    }
                                                    if(prev!==null &&typeof prev!=='undefined'){
                                                        text=prev+1;
                                                        prev++;
                                                    }else {

                                                        text=this.value-1;
                                                    }
                                                }
                                                return 'Day ' +text ;
                                            }
                                        },
                                        title: {
                                            text: 'Days'
                                        },
                                        tickInterval: 1,
                                        min:series.min-4,max:series.max+4,
                                         plotBands: series.plot
                                    },
                                    yAxis: {
                                        tickInterval: 1,
                                        labels: {
                                            formatter: function () {
                                                switch (this.value) {
                                                    case 1:
                                                        return 'Not at All' + this.value;
                                                    case 2:
                                                        return 'Minimal ' + this.value;
                                                    case 3:
                                                        return 'Mild ' + this.value;
                                                    case 4:
                                                        return 'Moderate ' + this.value;
                                                    case 5:
                                                        return 'Severe ' + this.value;
                                                    case 6:
                                                        return 'Extreme' + this.value;
                                                }
                                            }
                                        },
                                        startOnTick: true,
                                        endOnTick: true,
                                        min:0,
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
                                        hideDuration: 100,
                                        showDuration: 100
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
                                        split: true,
                                        distance: 30,
                                        padding: 5
                                    },

                                    plotOptions: {
                                        series: {
                                            pointStart: 1,
                                            point: {
                                                events: {
                                                    click: function (e) {
                                                        // alert(' value: ' + this.x);

                                                        //changeCycle(this.x,daysArray);
                                                        //console.log(series.days);

                                                    }
                                                }
                                            }
                                        },

                                    },

                                    series: series.series

                                };
                                myChart2 = Highcharts.chart('container5', graph);
                                if ( isPreliminaryChecked && isAddCycle ) {
                                    console.log("in step one old start =");
  
                                };

                            }

                        });});

                    $("#questions_5").trigger("change");
                    myChart2.hideLoading();
                    $.ajax({


                        type: 'GET',
                        url: "../../diagnosis/stepFive/" + lastPart + '/' + cycle+'/'+start+'/'+end+'/'+totalcycle+'/'+isPreliminaryChecked,
                        dataType: 'json',
                        success: function (data){
                            if (data.status!=400){
                                console.log(data.details);
                                $("#tstage5 tr").remove();
                                var prev;
                                $.each( data.details, function( key, value ) {
                                    status="diagnosis-success";
                                    icon="";
                                    if (!value.isSymptom)
                                    {
                                        status="diagnosis-failed";
                                        icon="";
                                    }
                                    valueHtml = '<span class="btn day-btn btn-labeled" ><b>&#x2265; 4 </b> '+value.value[0]+'</span>';
                                    valueHtml += '<span class="btn day-btn btn-labeled" > <b>&#x2265; 3 </b> '+value.value[1]+'</span>';

                                    var markup = "<tr class='"+status+"'><td>Cycle "+cycle+"</td> <td>Q"+value.question+"</td> <td>"+valueHtml+" </td> </tr>";
                                    $("#tstage5").append(markup);
                                });

                                if (data.result=="Success"){
                                    $("#success-stage6").empty();
                                    $( "#success-stage6" ).append( data.message );
                                    $( "#success-stage6" ).show();
                                    $( "#warning-stage6" ).hide();
                                }else {
                                    $("#warning-stage6").empty();
                                    $( "#warning-stage6" ).append( data.message );
                                    $( "#warning-stage6" ).show();
                                    $( "#success-stage6" ).hide();
                                }
                            }
                            else {
                                alert("NOTE: The Subject doesnot have enough data for diagnosis.");
                                $(".stepy-callbacks").stepy('step', 1);
                                return true;
                            }
                        }
                    });
                    break
            }
           // alert('Going to step: ' + index);
        },
        back: function(index) {
            switch (index){
                case 1:
                    $('.stepy-step').find('.button-next').html('Next <i class="icon-arrow-right14 position-right"></i>');
                    $('.stepy-step').find('.button-next').removeClass('next-left');
                    break
                case 2:
                    $('.stepy-step').find('.button-next').html('Diagnosis <i class="icon-arrow-right14 position-right"></i>');
                    //$.fn.stepy.defaults.nextLabel = 'Diagnosis <i class="icon-arrow-right14 position-right"></i>';
                    $('.stepy-step').find('.button-next').addClass('btn btn-primary next-left');
                    $('.stepy-step').find('.button-back').addClass('btn btn-default');
                    break
                case 3:
                    $('.stepy-step').find('.button-next').html('Next <i class="icon-arrow-right14 position-right"></i>');

                    break;
            }
        },
        finish: function() {
            if (isPreliminaryChecked) {

            }else{
                $("#myModal").modal('show');
            };

            $(".stepy-callbacks").stepy('step', 2);
            $('.stepy-step').find('.button-next').html('Diagnosis <i class="icon-arrow-right14 position-right"></i>');
            $('.stepy-step').find('.button-next').addClass('btn btn-primary next-left');
            return false;
        }
    });
    // Initialize plugins
// ------------------------------
    // Apply "Back" and "Next" button styling

// Select2 selects
$('.select').select2();


// Simple select without search
$('.select-simple').select2({
    minimumResultsForSearch: Infinity
});


// Styled checkboxes and radios
$('.styled').uniform({
    radioClass: 'choice'
});


// Styled file input
$('.file-styled').uniform({
    fileButtonClass: 'action btn bg-blue'
});

});