/**
 * Created by adinath on 8/6/17.
 */
var SingleSum21Graph=function () {
 var series,myChart2,plot,cycleSelected=1,Category=13,name=$("#category2 option:selected").text();
    var url = document.URL;
    var lastPart = url.split("/").pop();
    var daysArray=[];

      $('.cycle').select2({
        minimumResultsForSearch: Infinity,
        width: 150
    });

         
    var start,end;
    first2=false;

    function findpoints(total){
        switch(total)
        {
            case 13:return 4;
                break;
            case 14:return 2;
                break;
            default:return 6;
        }
    }

    
    var firstmenstrual =  function (cycle) {
    // if (first2) {
    //     myChart2.showLoading();
    // }

    first2=true;
        $.ajax({
            type: 'GET',
            url: "../getSum21/"+ lastPart,
            dataType: 'json',
            success: function (data) {
                var prev;
                series = data;
                plot = series.plot;
                var daysArray=[];
                series.days.forEach( function (arrayItem)
                {

                    if(arrayItem.color!="purple")
                        daysArray.push(arrayItem.value);
                });
                console.log(daysArray);
                // Graph.generateCycle(daysArray, data.injuctionCount);
                console.log(series.daysSeries);
                start=series.daysSeries.indexOf(1, series.min);
                end=series.daysSeries.indexOf(1, start+1);
                console.log(series.daysSeries.indexOf(1));
                console.log("cycle ===="+cycle);
                if (cycle == 1 && series.daysArray[0] != 0) {
                    min = 1;
                    max = series.daysArray[cycle-1]+3;
                }else{
                     min =series. daysArray[cycle-2]-4;
                    max = series.daysArray[cycle-1]+4;
                };

                day = cycle-1;
                if (series.daysArray[0]==0) {
                    console.log('daysArray ===0');
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
                min = change-2;
                max = end+4;
                console.log("min=="+min);
                console.log("max=="+max);
               //  from =  $value;
               // if ($to   =  $to   =  isset($day1index[$key+1])) {
               //     $to   =  $day1index[$key+1]-1;
               // }else{
               //      $to   =  count($ques_data[1])-1;
               // }

                console.log("dats isssss"+series.daysSeries.indexOf(1, start+1));
                graph = {

                     title: {
                        text: 'Sum of 21 Questions',
                         margin:50
                    },
                    subtitle: {
                        text: 'Summary'
                    },
                    xAxis: {
                        type: 'datetime',
                        plotLines: series.days,
                        crosshair: {
                            enabled: true
                        },
                        labels: {
                            formatter: function () {
                              //  console.log(series.daysSeries[this.value - 1]);
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
                        plotBands: series.plot,
                        min:min,
                        max:max
                    },
                    yAxis: {

                     title: {
                            text: 'Sum Value'
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
                        // padding: 5,
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
                                            lastString = '';
                                            // }
                                            if (point.series.data[j].projestrone != 'NULL') {
                                                if (lastString != '')
                                                    lastString = lastString + '<br>';
                                                lastString = lastString + '<small><b>Progesterone: </b><i>' + point.series.data[j].projestrone + '</i></small>';
                                            }
                                        }
                                         // console.log('point ========='+point);
                                        s += '<i style="color: ' + point.series.color + ';">' + point.series.name + '</i>: <b>' + point.y + '</b><br>';
                                        first = false;
                                    });
                                    s += lastString;
                                    return s;
                                },
                                shared: true,

                    },

                    plotOptions: {
                        series: {
                            pointStart: 1,
                            point: {
                                events: {
                                    click: function (e) {
                                        // if (localStorage.add_cycle == 1) {
                                        //     Graph.changeCycle(this.x, daysArray);
                                        // }

                                        console.log(this.x);
                                        console.log(this.y);
                                        console.log(series.daysSeries[this.x-1]);
                                        day = series.daysSeries[this.x-1];
                                        $('.testDay').remove();
                                        if (day >= 5 && day <= 8) {
                                            console.log("in f dayss");
                                            html =  '<li onclick="changeFDays('+this.x+')"> <a style="padding: 6px 12px;margin-top: 3px;" id="fday-opt" class="testDay">\
                                            <i class="icon-transmission"></i>Set as F Day start</a></li>';
                                        }else if (day >= -6 && day <= -4) {
                                            console.log("in l dayss");
                                            html =  '<li onclick="changeLDays('+this.x+')"> <a style="padding: 6px 12px;margin-top: 3px;" id="lday-opt" class="testDay">\
                                            <i class="icon-transmission"></i>Set as L Day start</a></li>';
                                        }else{
                                            html = '';
                                        };
                                        if (html !== '') {
                                             $(".constext-menu-ul").append(html);
                                             $('#constext-menu-div').css({top: e.chartY+20, left: e.chartX+20});
                                             $('#constext-menu-div').show();
                                        };
                                       
                                    }
                                }
                            }
                        }
                    },

                    series: series.series

                };
                myChart2 = Highcharts.chart('container2', graph);

                // lastpoint=findpoints(parseInt(Category));
                // console.log(lastpoint);
                // myChart2.yAxis[0].setExtremes(0, lastpoint);

                // myChart2.hideLoading();
            },
            error: function (error) {
                        $('#container').text("Error in data");
                    }

        });
    
    }




$(document).ready(function() {
   
    $('a[data-toggle="tab"]').one( "click", function() {
        var cycle;
        cycle=$("#cycleSelect").prop('selectedIndex')+1;
        firstmenstrual(cycle);
        console.log("click executed");
        $('a[data-toggle="tab"]').unbind('click');
       
    });

    $('input[name=radio-unstyled-inline-left]').bind('click', function (e) {
        $("#evaluable-submit").prop('disabled', false);
    });


    $('#cycleSelect').bind('change', function (e) {
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;
        console.log("Cycle is"+valueSelected);
        cycleSelected = parseInt(valueSelected)+1;
        firstmenstrual(cycleSelected);
        $("#evaluable-submit").prop('disabled', true);
        $('input[name=radio-unstyled-inline-left]:checked').prop('checked', false);
        // searchEvaluable(valueSelected);
        
    });


    $(function() {

        $.ajax({


            type: 'GET',
            url: "../getSum21/"+ lastPart,
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

                generatecycles(daysArray);
                

            }

        });
    });
    var totalcycle;
    function generatecycles(line){
        totalcycle=line.length;
        $('#cycleSelect' ).empty();
        var optionsAsString = "";
        var cycle="cycle ";
        for(var i = 0; i <= line.length; i++) {
            console.log(i);
            optionsAsString += "<option value='" + i + "'>" +cycle+(i+1)  + "</option>";
        }
        $( '#cycleSelect' ).append( optionsAsString );
        //$("select[id=cycleSelect] option:last").remove();

    }



    });
return{
    firstmenstrual : firstmenstrual,
};
}();