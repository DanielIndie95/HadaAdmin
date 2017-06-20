/**
 * Created by sdani on 19/06/2017.
 */

var chart;
var backgroundColors=[
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'];
var borderColors=[ 'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)']
function Get(){
    $.get( "menu.json", function( data ) {
        var deserialize = JSON.stringify(data);
        alert( "Data Loaded: " + data.dishes[0].id);
    });
}

function ClearCanvas(){
    if(chart!=null)
    {
        chart.destroy()
    }
}

function HighestRatedDishesByCategory(type){
    ClearCanvas();
    var ctx = document.getElementById("myChart");
    ctx.style.visibility="visible";
    ctx.style.maxHeight="400px";
    $.get( "examples/menu.json", function( data ) {
        var dishes=data.dishes;
        var ratings=[];
        var names=[];
        dishes.forEach(function(currentValue, index, array){
            if(currentValue.type==type) {
                ratings.push(currentValue.rank);
                names.push(currentValue.name);
            }
        })
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: names,
                datasets: [{
                    label: 'ratings',
                    data: ratings,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            steps: 10,
                            stepValue: 5,
                            max: 100
                        }
                    }]
                },
                responsive:true,
                maintainAspectRatio:false
            }
        });
    });
}

function MostUsedIngredients(){
    ClearCanvas();
    var ctx = document.getElementById("myChart");
    ctx.style.visibility="visible";
    ctx.style.maxHeight="400px";
    $.get( "examples/menu.json", function( data ) {
        var dishes=data.dishes;
        var ingredients=[];
        dishes.forEach(function(currentValue, index, array){
            {
                currentValue.ingredients.forEach(function(currentValue, index, array){
                    ingredients.push(currentValue);
                })
            }
        })
        var  count = {};

        ingredients.forEach(function(i) { count[i] = (count[i]||0)+1;  });

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(count),
                datasets: [{
                    label: 'ratings',
                    data: Object.values(count),
                    backgroundColor: backgroundColors,
                    borderColor:borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            steps: 10,
                            stepValue: 2,
                        }
                    }]
                },
                responsive:true,
                maintainAspectRatio:false
            }
        });
    });
}

function BestFoodByUses()
{
    ClearCanvas();
    var ctx = document.getElementById("myChart");
    ctx.style.visibility="visible";
    ctx.style.maxHeight="400px";
    $.get( "examples/meals.json", function( data ) {
        var dishes=data.dishes;
        var ranksAndUses=[];
        var names=[]

        dishes.forEach(function(currentValue, index, array){
            {
                var alreadySaved = false;
                names.forEach(function (currentNamesValue, indexNames, arrayNames) {
                        if (currentNamesValue == currentValue.name)
                            alreadySaved = true;
                    }
                )
                if (!alreadySaved) {
                    names.push(currentValue.name);
                    var count = 0;
                    var avg = 0;
                    array.forEach(function (currentValue2, index2, array2) {
                            if (currentValue.name == currentValue2.name) {
                                count++;
                                avg = avg + currentValue2.rank;
                            }
                        }
                    )
                    avg = avg / count;
                    ranksAndUses.push({"x": count, "y": avg})
                }
            }
        })


        chart = new Chart(ctx, {
            type: 'scatter',
            data: {
                labels: names,
                datasets: [{
                    label: 'ratings',
                    data: ranksAndUses,
                    backgroundColor: 'rgba(255, 255,255)',
                    borderColor:'rgba(255, 255,255)',
                    borderWidth: 1,
                    radius:10,
                    hitRadius:15,
                    fill:false,
                    pointHoverRadius:12,
                    pointHoverBackgroundColor:'rgb(128,128,128)'


                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            steps: 10,
                            stepValue: 2,
                        },
                        scaleLabel:{
                            labelString:"דירוג המנה ממוצע",
                            display:true
                        }

                    }],
                    xAxes: [{
                        scaleLabel:{
                            labelString:"כמות הפעמים שהמנה הוגשה",
                            display:true
                        }

                    }]
                },
                responsive:true,
                maintainAspectRatio:false,
                tooltips: {
                    callbacks: {
                        label:function(tooltip,names){
                            return names.labels[tooltip.index]+": ";
                        },
                        footer:function(tooltip,names){
                            return tooltip[0].yLabel.toFixed(2);
                        }
                    }
                },
                legend:{
                    display:false
                },
                title:{
                    text:"כמות הפעמים שהאוכל הוגש ורמתו"
                }



            }
        });
    });

    Chart.defaults.global.showLines=false;
}

function FoodOverTime()
{
    ClearCanvas();
    var ctx = document.getElementById("myChart");
    ctx.style.visibility="visible";
    ctx.style.maxHeight="400px";
    $.get( "examples/meals.json", function( data ) {
        var dishes=data.dishes;
        var allInfo=[];
        var names=[];

        dishes.forEach(function(currentValue, index, array) {
            var alreadySaved = false;

            names.forEach(function (currentNamesValue, indexNames, arrayNames) {
                if (currentNamesValue == currentValue.name)
                    alreadySaved = true;})
            if (!alreadySaved) {
                names.push(currentValue.name);
            }
        })

        names.forEach(function(currentValue, index, array){
            var info={
                name:currentValue,
                ratings:[],
                dates:[],
                ingredients:[]
            }
            dishes.forEach(function(currentDishesValue, dishesIndex, dishesArray){
                if(currentValue==currentDishesValue.name){
                    info.ratings.push(currentDishesValue.rank);
                    info.dates.push(currentDishesValue.date);
                    info.ingredients.push(currentDishesValue.ingredients)
                }
            })
            allInfo.push(info);
        })

        var datasets=[];

        allInfo.forEach(function(currentValue, index, array){
            var data=[];
            currentValue.dates.forEach(function(currentDateValue, dateIndex, dateArray){
                data.push(
                    {
                        "x":currentValue.ratings[dateIndex],
                        "y":moment(currentDateValue,"DD/MM/YYYY")
                    }
                )
            })
            datasets.push({
                label: currentValue.name,
                data:data,
                backgroundColor: backgroundColors[index],
                borderColor:borderColors[index],
                borderWidth: 1,
                radius:3,
                hitRadius:5,
                fill:false,
                pointHoverRadius:5,
                pointHoverBackgroundColor:borderColors[index]
            })
        })

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: datasets
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true

                        },
                        scaleLabel:{
                            labelString:"דירוג",
                            display:true
                        }

                    }],
                    xAxes: [{
                        scaleLabel:{
                            labelString:"ימים",
                            display:true
                        },
                        time: {
                            unit: 'day'
                        }

                    }]
                },
                responsive:true,
                maintainAspectRatio:false,
                legend:{
                    display:true
                },
                title:"דירוג אוכל לפי תאריך"

            }
        });
    });


    Chart.defaults.global.showLines=true;
}

