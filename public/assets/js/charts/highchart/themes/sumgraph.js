/**
 * Created by adinath on 8/6/17.
 */
var Sum21Graph=function () {
 var series,myChart2,plot,cycleSelected=1,Category=13,name=$("#category2 option:selected").text();
    var url = document.URL;
    var lastPart = url.split("/").pop();
    var daysArray=[];

      $('.cycle').select2({
        minimumResultsForSearch: Infinity,
        width: 150
    });

         
    var start,end;
    first2=true;

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

    
    var firstmenstrual =  function () {
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
                if (series.progesteroneCycles != '') {
                    $('.progesteroneView').html(' ('+series.progesteroneCycles+')');
                };
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
                console.log("dats isssss"+series.daysSeries.indexOf(1, start+1));
                max = series.daysSeries.length;+2
                graph = {

                    title: {
                        text: 'Sum of 21 Questions',
                         margin:50
                    },

                    subtitle: {
                        text: 'Summary'
                    },
                    xAxis: {
                        type: 'string',
                        plotLines: series.days,
                        crosshair: {
                            enabled: true
                        },
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
                        plotBands: series.plot,
                        min:1,max:max
                    },
                    yAxis: {
                        // tickInterval: 1,
                        // labels: {
                        //     formatter: function () {

                        //         switch (this.value) {
                        //             case 1:
                        //                 return 6;
                        //             case 2:
                        //                 return 12;
                        //             case 3:
                        //                 return 18;
                        //             case 4:
                        //                 return 24;
                        //             case 5:
                        //                 return 30;
                        //             case 6:
                        //                 return 36;
                        //         }
                        //     }
                        // },
                        // max: 6,
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
                                    console.log('points====='+this.points.daySeries);
                                    /*pointsnames=''; yAxisPoint=this.y;seriesName=this.series.name;*/
                                    s = '';
                                    first = true;
                                    $.each(this.points, function (i, point) {
                                        if (first) {
                                           
                                            s = '<small>' + point.key + '</small><br>';
                                            j = parseInt(point.x) - 1;
                                            // if (point.series.data[j].description != 'NULL') {
                                            //     lastString = '<small><b>Comment: </b><i>' + point.series.data[j].description + '</i></small>';
                                            // } else {
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
                                     // console.log('point ========='+s);
                                    return s;

                                    /*
                                                                            pointsnames=seriesName+' <b>: '+yAxisPoint+'</b><br>';

                                                                        return pointsnames;*/
                                },
                                shared: true,
                        // formatter: function () {
                        //      $('#constext-menu-div').hide();
                        //      return '';
                        // }
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
                                             $('#constext-menu-div').css({top: e.chartY-13, left: e.chartX+20});
                                             $('#constext-menu-div').show();
                                        };
                                       
                                    }
                                }
                            }
                        }
                    },

                    series: series.series

                };
                myChart2 = Highcharts.chart('sumGraphcontainer', graph);

                // lastpoint=findpoints(parseInt(Category));
                // console.log(lastpoint);
                // myChart2.yAxis[0].setExtremes(0, 6);

                // myChart2.hideLoading();
            },
            error: function (error) {
                        $('#sumGraphcontainer').text("Error in data");
                    }

        });
    
    }




$(document).ready(function() {
    $(".sidebar-main-toggle").trigger("click");
   firstmenstrual();

    var totalcycle;




    });
return{
    firstmenstrual : firstmenstrual,
};
}();