/**
 * Created by adinath on 8/6/17.
 */
var SingleGraph=function () {
 var series,myChart2,plot,cycleSelected=1,Category=13,name=$("#category2 option:selected").text(),iscycleTypeChange=false;
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
    if (first2) {
        myChart2.showLoading();
    }

    first2=true;
        $.ajax({
            type: 'GET',
            url: "../getgraphbycat/" + Category + '/' + lastPart+'/'+cycle,
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
                Graph.generateCycle(daysArray, data.injuctionCount);
                console.log(series.daysSeries);
                start=series.daysSeries.indexOf(1, series.min);
                end=series.daysSeries.indexOf(1, start+1);
                console.log("dats isssss"+series.daysSeries.indexOf(1, start+1));
                graph = {

                    title: {
                        text: Category + '. ' + name,
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
                        min:series.min-4,max:series.max+4
                    },
                    yAxis: {
                        tickInterval: 1,
                        labels: {
                            formatter: function () {

                                if(Category==13)
                                {
                                    console.log(this.value);
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
                                            return null;
                                        case 6:
                                            return null;
                                    }
                                }else {
                                    if (Category==14)
                                    {
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
                                    // $('#constext-menu-div').hide();
                                    // console.log('points====='+this.points.daySeries);
                                    /*pointsnames=''; yAxisPoint=this.y;seriesName=this.series.name;*/
                                    s = '';
                                    first = true;
                                    $.each(this.points, function (i, point) {
                                        if (first) {
                                           
                                            s = '<small>' + point.key + '</small><br>';
                                            j = parseInt(point.x) - 1;
                                            if (point.series.data[j].description != 'NULL') {
                                                lastString = '<small><b>Comment: </b><i>' + point.series.data[j].description + '</i></small>';
                                            } else {
                                                lastString = '';
                                            }
                                            if (point.series.data[j].projestrone != 'NULL') {
                                                // if (lastString != '')
                                                //     lastString = lastString + '<br>';
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
                                        if (localStorage.add_cycle == 1) {
                                            Graph.changeCycle(this.x, daysArray);
                                        }

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

                                        $(".constext-menu-ul2").append(html);

                                         $('#constext-menu-div2').css({top: e.chartY+102, left: e.chartX+20});
                                         $('#constext-menu-div2').show();
                                    }
                                }
                            }
                        }
                    },

                    series: series.series

                };
                myChart2 = Highcharts.chart('container2', graph);

                lastpoint=findpoints(parseInt(Category));
                console.log(lastpoint);
                myChart2.yAxis[0].setExtremes(0, lastpoint+1);

                myChart2.hideLoading();
            },
            error: function (error) {
                        $('#container').text("Error in data");
                    }

        });
    
    }




$(document).ready(function() {
   $(".switch").bootstrapSwitch();
    $(".evaluable-switch").bootstrapSwitch();
// var primary = document.querySelector('.switchery-primary');
//         var switchery = new Switchery(primary, {color: '#2196F3'});
    //          primary.onchange = function () {
    //             // alert(primary.checked);
    //             $("#evaluable-submit").prop('disabled', false);
    //             if (primary.checked) {

    //             } else {
    //             }
    // console.log('isEvaluableClicked===='+isEvaluableClicked);
    // if (isEvaluableClicked) {
    //     isEvaluableClicked = true;
    //     console.log(' after isEvaluableClicked===='+isEvaluableClicked);
    //         day = $("#cycleSelect").prop('selectedIndex');
    //     console.log(series.daysArray);
    //     if (series.daysArray[0]==0) {
    //         change = series.daysArray[day];
    //     }else{
    //         if (day == 0) {
    //             change = 0;
    //         } else {
    //             change = series.daysArray[day - 1];
    //         }
    //     };
    //     // if (day == 0) {
    //     //     change = 0;
    //     // } else {
    //     //     change = series.days[day - 1].value;
    //     // }
    //     console.log('day =============='+change);
    //     $.ajaxSetup({
    //         headers: {
    //             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //         }
    //     });


    //     $.ajax({
    //         type: 'POST',
    //         url: "../save/evaluable",
    //         data: {
    //             subject: document.URL.split("/").pop(),
    //             day: change,
    //             evaluable: primary.checked,
    //         },
    //         dataType: 'json',
    //         success: function (data) {
    //             var div, message;
    //             switch (data.status) {
    //                 case 200:
    //                     $("#success-pop").modal('show');
    //                     break;
    //                 case 303:
    //                     $("#success-pop").modal('show');
    //                     break;
    //             }
    //             $("#category").trigger("change");
    //         }, cache: false
    //     }).fail(function (jqXHR, textStatus, error) {
    //         // Handle error here
    //         $("#error-pop").modal('show');
    //     });
    // };

    //         };
    
    

    $('a[data-toggle="tab"]').one( "click", function() {

        var cycle;
        cycle=$("#cycleSelect").prop('selectedIndex')+1;
        firstmenstrual(cycle);
        console.log("click executed");
        $('a[data-toggle="tab"]').unbind('click');
        $("#evaluable-submit").prop('disabled', true);
        searchEvaluable($("#cycleSelect").prop('selectedIndex'));
        searchOvulation($("#cycleSelect").prop('selectedIndex'));
        searchCycleType();
       
    });
    $('input[name=radio-unstyled-inline-left]').bind('click', function (e) {
        $("#evaluable-submit").prop('disabled', false);
    });
    $("#evaluable-submit").bind('click', function (e) {
        day = $("#cycleSelect").prop('selectedIndex');
        console.log(series.daysArray);
        if (series.daysArray[0]==0) {
            change = series.daysArray[day];
        }else{
            if (day == 0) {
                change = 0;
            } else {
                change = series.daysArray[day - 1];
            }
        };
        // if (day == 0) {
        //     change = 0;
        // } else {
        //     change = series.days[day - 1].value;
        // }
        console.log('day =============='+change);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });


        $.ajax({
            type: 'POST',
            url: "../save/evaluable",
            data: {
                subject: document.URL.split("/").pop(),
                day: change,
                evaluable: primary.checked,
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
    });

$("#fldays-submit").bind('click', function (e) {
        day  = $("#cycleSelect").prop('selectedIndex');
        fday = $("#fDaySelect").val();
        lday = $("#lDaySelect").val();
        console.log("day =="+day);
        console.log("selected fday=="+fday);
        console.log("selected lday=="+lday);

        if (day == 0) {
            change = 1;
            end    = series.days[0].value;
        } else {
            change = series.days[day - 1].value;
            end    = series.days[cycle].value;
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });


        $.ajax({
            type: 'POST',
            url: "../save/fandlDays",
            data: {
                subject: document.URL.split("/").pop(),
                day : change,
                end : end,
                fday: fday,
                lday: lday,
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
    });



    $('#category2').bind('change', function (e) {
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;
        Category=valueSelected;
        name = optionSelected.html();
        firstmenstrual(cycleSelected);

    });

    $('#cycleType').bind('change', function (e) {
        console.log("in cycleTypeChange=",iscycleTypeChange);
         cycle = $("#cycleSelect").prop('selectedIndex')+1;
        if (iscycleTypeChange) {
             iscycleTypeChange = false;
        }else{
            console.log("if selected from the select box");
            day = $("#cycleSelect").prop('selectedIndex');
            console.log(series.daysArray);
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
            console.log($('#cycleType').val());
            var type = $('#cycleType').val();
             var url = document.URL;
                lastPart = url.split("/").pop();
                $.ajax({
                    type: 'GET',
                    url: "../addcycleType/" + lastPart + '/' + change + '/' + type + '/'+cycle,
                    dataType: 'json',
                    success: function (data) {
                        if (data == 1) {
                            $("#myModal").modal('hide');
                            $('#success-pop').modal('show');
                            $("#category").trigger("change");
                            var cycle;
                            cycle=$("#cycleSelect").prop('selectedIndex')+1;
                            firstmenstrual(cycle);
                        }else{
                             iscycleTypeChange = true;
                            $('#cycleType').val(null).trigger("change");
                            alert('Cycle type already exist!');
                        }
                    }
                });
        }
        
        // var optionSelected = $("option:selected", this);
        // var valueSelected = this.value;
        // Category=valueSelected;
        // name = optionSelected.html();
        // firstmenstrual(cycleSelected);

    });

    $('#cycleSelect').bind('change', function (e) {
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;
        console.log("Cycle is"+valueSelected);
        cycleSelected = parseInt(valueSelected)+1;
        firstmenstrual(cycleSelected);
        $("#evaluable-submit").prop('disabled', true);
        $('input[name=radio-unstyled-inline-left]:checked').prop('checked', false);
        searchEvaluable(valueSelected);
        searchOvulation(valueSelected);
        iscycleTypeChange = true;
        $('#cycleType').val(null).trigger("change");
        searchCycleType();
        // getFandLdays(valueSelected);
        
    });
    $('#switch-state').on('switchChange.bootstrapSwitch', function (event, state) {
        if (isOvulatoryClicked) {
             day = $("#cycleSelect").prop('selectedIndex');
                console.log(series.daysArray);
                if (series.daysArray[0]==0) {
                    change = series.daysArray[day];
                }else{
                    if (day == 0) {
                        change = 0;
                    } else {
                        change = series.daysArray[day - 1];
                    }
                };
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
                        // $("#category").trigger("change");
                    }, cache: false
                }).fail(function (jqXHR, textStatus, error) {
                    // Handle error here
                    $("#error-pop").modal('show');
                });
        };
        
    });

    $('#evaluable-switch-state').on('switchChange.bootstrapSwitch', function (event, state) {

        $("#evaluable-submit").prop('disabled', false);
        // if (primary.checked) {

        // } else {
        // }
        console.log('isEvaluableClicked====' + isEvaluableClicked);
        if (isEvaluableClicked) {
            isEvaluableClicked = true;
            console.log(' after isEvaluableClicked====' + isEvaluableClicked);
            day = $("#cycleSelect").prop('selectedIndex');
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
            // if (day == 0) {
            //     change = 0;
            // } else {
            //     change = series.days[day - 1].value;
            // }
            console.log('day ==============' + change);
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });


            $.ajax({
                type: 'POST',
                url: "../save/evaluable",
                data: {
                    subject: document.URL.split("/").pop(),
                    day: change,
                    evaluable: $("#evaluable-switch-state").bootstrapSwitch('state'),
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
                    var cycle;
                    cycle=$("#cycleSelect").prop('selectedIndex')+1;
                    firstmenstrual(cycle);
                    $("#category").trigger("change");

                }, cache: false
            }).fail(function (jqXHR, textStatus, error) {
                // Handle error here
                $("#error-pop").modal('show');
            });
        }
        ;

    });

    function searchEvaluable(cycle) {
        // if (cycle == 0) {
        //     change = 0;
        // } else {
        //     change = series.days[cycle - 1].value;
        // }

        day = $("#cycleSelect").prop('selectedIndex');
        console.log(series.daysArray);
        if (series.daysArray[0] == 0) {
            change = series.daysArray[day];
        }else{
            if (day == 0) {
                change = 0;
            } else {
                change = series.daysArray[day - 1];
            }
        };
        // if (day == 0) {
        //     change = 0;
        // } else {
        //     change = series.days[day - 1].value;
        // }
        console.log('day =============='+change);
        $.ajax({


            type: 'GET',
            url: "../getevaluable/" + change + '/' + lastPart,
            dataType: 'json',
            success: function (data) {
                isEvaluableClicked = false;
                switch (data.status) {
                    case 200:
                        if (data.evaluable == 1){
                            // primary.checked = true;
                            if (!$("#evaluable-switch-state").bootstrapSwitch('state')) {
                                $("#evaluable-switch-state").bootstrapSwitch('toggleState');
                            }
                            ;
                        }else{
                            // primary.checked = false;
                            if ($("#evaluable-switch-state").bootstrapSwitch('state')) {
                                $("#evaluable-switch-state").bootstrapSwitch('toggleState');
                            }
                            ;
                        }

                        //     console.log('evaluable ===='+data.evaluable);
                        // console.log($("#evaluable").attr('checked'));
                        // $("#evaluable").val('off');
                           // $("#evaluable").attr('checked',false);
                           // console.log($("#evaluable").attr('checked'));
                           // $('.switchery').click();

                        // var event = document.createEvent('HTMLEvents');
                        //  event.initEvent('change', true, true);
                        //  primary.dispatchEvent(event);
                        break;
                    default:
                        // primary.checked = false;
                        // var event = document.createEvent('HTMLEvents');
                        //     event.initEvent('change', true, true);
                        //     primary.dispatchEvent(event);
                        break;

                }
                isEvaluableClicked = true;

            }
        });
    }
    function searchOvulation(cycle) {
        // if (cycle == 0) {
        //     change = 0;
        // } else {
        //     change = series.days[cycle - 1].value;
        // }
        console.log('ovulatory state ===='+$("#switch-state").bootstrapSwitch('state'));


        day = $("#cycleSelect").prop('selectedIndex');
        console.log(series.daysArray);
        if (series.daysArray[0] == 0) {
            change = series.daysArray[day];
        }else{
            if (day == 0) {
                change = 0;
            } else {
                change = series.daysArray[day - 1];
            }
        };
        // if (day == 0) {
        //     change = 0;
        // } else {
        //     change = series.days[day - 1].value;
        // }
        console.log('day =============='+change);
        $.ajax({


            type: 'GET',
            url: "../getOvulation/" + change + '/' + lastPart,
            dataType: 'json',
            success: function (data) {
                isOvulatoryClicked = false;
                if (data.ovulation == 1) {
                    if (!$("#switch-state").bootstrapSwitch('state')) {
                        $("#switch-state").bootstrapSwitch('toggleState');
                    };
                }else if(data.ovulation == 0){
                    if ($("#switch-state").bootstrapSwitch('state')) {
                        $("#switch-state").bootstrapSwitch('toggleState');
                    };
                }
                isOvulatoryClicked = true;

            }
        });
    }
function searchCycleType() {
        day = $("#cycleSelect").prop('selectedIndex');
        console.log(series.daysArray);
        if (series.daysArray[0]==0) {
            change = series.daysArray[day];
        }else{
            if (day == 0) {
                change = 0;
            } else {
                change = series.daysArray[day - 1];
            }
        };
        console.log('day =============='+change);
        $.ajax({


            type: 'GET',
            url: "../getcycleType/" + change + '/' + lastPart,
            dataType: 'json',
            success: function (data) {
                switch (data.status) {
                    case 200:
                    console.log('in status 200='+data.type);
                    console.log($('#cycleType').prop('selectedValue'));
                     iscycleTypeChange = true;
                        $('#cycleType').val(data.type).trigger("change");
                        // $('#cycleType').select2('val',data.type);
                        break;
                    default:
                     iscycleTypeChange = true;
                       $('#cycleType').val(null).trigger("change");
                        break;

                }
            }
        });
    }

     function getFandLdays(cycle) {
        console.log('cycle ========'+cycle);
        if (cycle == 0) {
            change = 1;
            end    = series.days[1].value;
        } else {
            change = series.days[cycle - 1].value;
             end    = series.days[cycle].value;
        }
        console.log("change ==="+change);
        console.log("end value ==="+end);
        console.log("fdayyyy");
        var FDayStart;
        var LDayStart;
        series.plot.forEach( function (arrayItem)
                {
                    if (arrayItem.id == 'F-Day') {
                        if(arrayItem.from>change && arrayItem.from<end){
                            FDayStart = arrayItem.from;
                            FDayStart = series.daysSeries[FDayStart];
                        }
                    }else if (arrayItem.id == 'L-Day') {
                        if(arrayItem.from>change && arrayItem.from<end){
                            LDayStart = arrayItem.from;
                            LDayStart = series.daysSeries[LDayStart];
                        }
                    };
                    
                        
                });
        var FDayOptions;
        var LDayOptions;
        // for (var i = 5; i <9; i++) {
        //     if (i != FDayStart) {
        //         FDayOptions[] = [i,i+4];
        //     };
            
        // };
        // $.ajax({


        //     type: 'GET',
        //     url: "../getFandLdays/" + lastPart + '/' + change+'/'+end,
        //     dataType: 'json',
        //     success: function (data) {
        //         switch (data.status) {
        //             case 200:
        //             console.log("status 20000==");
        //                 // if (data.evaluable == 1)
        //                 //     $("#ev-yes").prop("checked", true)
        //                 break;

        //         }
        //     }
        // });
    }
    $(function() {

        $.ajax({


            type: 'GET',
            url: "../getgraphbyques/" + 1 + '/' + lastPart+'/'+1+'/'+false,
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
        console.log('in generate cycle line==='+line);
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
    firstmenstrual : firstmenstrual
};
}();