//============================================================
// Register Namespace
//------------------------------------------------------------
var TC = TC||{};
TC.Plotter = TC.Plotter||{};

//============================================================
// Static Variables
//------------------------------------------------------------
TC.Plotter.Points = [
{'x':-80.0243208, 'y':40.5040638},
{'x':-80.0243231, 'y':40.5040616},
{'x':-80.0243455, 'y':40.5040446},
{'x':-80.0243524, 'y':40.5040313},
{'x':-80.0243614, 'y':40.5040142},
{'x':-80.0243618, 'y':40.5040115},
{'x':-80.0243660, 'y':40.5040023},
{'x':-80.0243726, 'y':40.5039923},
{'x':-80.0243734, 'y':40.5039906},
{'x':-80.0243713, 'y':40.5039905},
{'x':-80.0243667, 'y':40.5039894},
{'x':-80.0243633, 'y':40.5039874},
{'x':-80.0243605, 'y':40.5039857},
{'x':-80.0243540, 'y':40.5039828},
{'x':-80.0243540, 'y':40.5039828},
{'x':-80.0243500, 'y':40.5039827},
{'x':-80.0243489, 'y':40.5039837},
{'x':-80.0243479, 'y':40.5039847},
{'x':-80.0243472, 'y':40.5039857},
{'x':-80.0243455, 'y':40.5039908},
{'x':-80.0243450, 'y':40.5039911},
{'x':-80.0243478, 'y':40.5039904},
{'x':-80.0243505, 'y':40.5039897},
{'x':-80.0243531, 'y':40.5039891},
{'x':-80.0243562, 'y':40.5039862},
{'x':-80.0243575, 'y':40.5039847},
{'x':-80.0243589, 'y':40.5039831},
{'x':-80.0243599, 'y':40.5039817},
{'x':-80.0243623, 'y':40.5039787},
{'x':-80.0243625, 'y':40.5039780},
{'x':-80.0243627, 'y':40.5039775},
{'x':-80.0243619, 'y':40.5039774},
{'x':-80.0243627, 'y':40.5039763},
{'x':-80.0243634, 'y':40.5039753},
{'x':-80.0243643, 'y':40.5039741},
{'x':-80.0243643, 'y':40.5039741},
{'x':-80.0243621, 'y':40.5039723},
{'x':-80.0243607, 'y':40.5039725},
{'x':-80.0243596, 'y':40.5039726},
{'x':-80.0243592, 'y':40.5039718},
{'x':-80.0243598, 'y':40.5039708},
{'x':-80.0243585, 'y':40.5039692},
{'x':-80.0243581, 'y':40.5039675},
{'x':-80.0243574, 'y':40.5039668},
{'x':-80.0243525, 'y':40.5039670},
{'x':-80.0243504, 'y':40.5039674},
{'x':-80.0243492, 'y':40.5039697},
{'x':-80.0243484, 'y':40.5039694},
{'x':-80.0243485, 'y':40.5039691},
{'x':-80.0243487, 'y':40.5039680},
{'x':-80.0243492, 'y':40.5039675},
{'x':-80.0243501, 'y':40.5039672},
{'x':-80.0243529, 'y':40.5039670},
{'x':-80.0243535, 'y':40.5039670},
{'x':-80.0243566, 'y':40.5039663},
{'x':-80.0243595, 'y':40.5039656},
{'x':-80.0243622, 'y':40.5039651},
{'x':-80.0243672, 'y':40.5039639},
{'x':-80.0243697, 'y':40.5039635},
{'x':-80.0243723, 'y':40.5039631},
{'x':-80.0243723, 'y':40.5039631}
];
TC.Plotter.$Svg = $('#plot');

TC.Plotter.Draw = function TC_Plotter_Draw(){
    TC.Plotter.ClearDisplay();
    var
        points = TC.Plotter.ReducedPoints();
    var
        xMin = points[0].x,
        xMax = points[0].x,
        yMin = points[0].y,
        yMax = points[0].y;

    for(var i = 1; i < points.length; i++){
        var point = points[i];
        xMin = Math.min(xMin, point.x);
        xMax = Math.max(xMax, point.x);
        yMin = Math.min(yMin, point.y);
        yMax = Math.max(yMax, point.y);
    }

    var
        p1 = null,
        p2 = points[0];
    for(var i = 1; i < points.length; i++){
        p1 = p2;
        p2 = points[i];
        TC.Plotter.DrawLine(p1,p2);
    }

xMin-=1;
yMin-=1;
xMax+=1;
yMax+=1;

    // Show just area that has details
    var viewBox = xMin+" "+yMin+" "+Math.abs(xMax-xMin)+" "+Math.abs(yMax-yMin);
    TC.Plotter.$Svg.get(0).setAttribute("viewBox", viewBox);
    console.log("viewBox: "+viewBox);
}

TC.Plotter.DrawLine = function TC_Plotter_DrawLine(p1, p2){
    var line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',p1.x);
    line.setAttribute('y1',p1.y);
    line.setAttribute('x2',p2.x);
    line.setAttribute('y2',p2.y);
    TC.Plotter.$Svg.append(line);
}

TC.Plotter.ReducedPoints = function TC_Plotter_ReducedPoints(){
    var 
        points = TC.Plotter.Points,
        results = [];

    var firstPoint = points[0];
    var xReduce = Math.round(firstPoint.x * 10000) / 10000;
    var yReduce = Math.round(firstPoint.y * 10000) / 10000;

    for(var i in points){
        var p = points[i];
        var x = (p.x - xReduce)*10000*100;
        var y = (p.y - yReduce)*10000*100;
        results.push({x:x,y:y});
    }

    return results;
}

TC.Plotter.ClearDisplay = function TC_Plotter_ClearDisplay(){
    var svg = TC.Plotter.$Svg.get(0);
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
}

TC.Plotter.Draw();
