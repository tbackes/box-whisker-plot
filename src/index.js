const d3 = require('d3');
const plotly = require('plotly.js-dist');
const dscc = require('@google/dscc');
const local = require('./localMessage.js');

// change this to 'true' for local development
// change this to 'false' before deploying
export const LOCAL = false;

const isNull = (x) => {
  return !(x===0) && (x == null || x == "null" || x == "");
}

const isNumeric = (x) => {
  return !isNull(x) && !isNaN(x);
}

// parse the style value
const styleVal = (message, styleId) => {
  if (!!message.style[styleId].defaultValue && typeof message.style[styleId].defaultValue === "object") {
    return message.style[styleId].value.color !== undefined
      ? message.style[styleId].value.color
      : message.style[styleId].defaultValue.color;
  }
  return message.style[styleId].value !== undefined
    ? message.style[styleId].value
    : message.style[styleId].defaultValue;
};

// parse a style color -- defaulting to the theme color if applicable
const themeColor = (message, styleId, themeId='themeSeriesColor', idx=null) => {
  // if a user specifed value is present, keep that
  if (message.style[styleId].value.color !== undefined && !isNull(message.style[styleId].value.color)) {
    return message.style[styleId].value.color;
  }
  // otherwise use the theme color
  return isNumeric(idx)
    ? message.theme[themeId][idx].color
    : message.theme[themeId].color;
};

// parse a style value -- defaulting to the theme value if applicable
const themeValue = (message, styleId, themeId='themeFontFamily') => {
  return message.style[styleId].value !== undefined
    ? message.style[styleId].value
    : message.theme[themeId];
};

// parse a style value -- defaulting to the theme value if applicable
const hasMetric = (message, metricId) => {
  return message.fields[metricId][0] !== undefined;
};

const hex_to_rgba_str = (hex_color, opacity) => {
  var hex_strip = hex_color.replace(new RegExp("^#"),"");
  hex_strip = (hex_strip.length==3)? hex_strip+hex_strip : hex_strip;
  var rgba = 'rgba(' 
    + parseInt(hex_strip.substring(0,2), 16) + ',' 
    + parseInt(hex_strip.substring(2,4), 16) + ',' 
    + parseInt(hex_strip.substring(4,6), 16) + ','
    + opacity + ')';
  return rgba
}

const toDate = (dateString) => {
  let year = dateString.substring(0,4)
  let month = dateString.substring(4,6)-1
  let day = dateString.substring(6,8)
  let hour = dateString.substring(8,10)
  let min = dateString.substring(10,12)
  let sec = dateString.substring(12,14)

  return new Date(year, month, day, hour, min, sec)
}

Date.prototype.addDays = function(days) {
    return new Date(this.valueOf()+(24*60*60*days))
}

const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const drawViz = message => {

  // set margins + canvas size
  const margin = { top: 10, bottom: 50, right: 10, left: 10 };
  const height = dscc.getHeight() - margin.top - margin.bottom;
  const width = dscc.getWidth() - margin.left - margin.right;

  // remove the div if it already exists
  if (document.querySelector("div")) {
    let oldDiv = document.querySelector("div");
    oldDiv.parentNode.removeChild(oldDiv);
  }

  // create div for plotly plot
  const myDiv = document.createElement('div', {id: 'myDiv'});
  myDiv.setAttribute("height", `${dscc.getHeight()}px`);
  myDiv.setAttribute("width", `${dscc.getWidth()}px`);

  document.body.appendChild(myDiv);

  //console.log("I'm the callback and I was passed this data: " + JSON.stringify(message.style, null, '  '));
  // console.log("I'm the callback and I was passed this data: " + JSON.stringify(message.tables, null, '  '));
  // console.log("Theme data: " + JSON.stringify(message.theme, null, '  '));

  // gather plot-level style parameters
  // -------------------------
  const chartTitle = styleVal(message, 'chartTitle');
  const legendTitle = styleVal(message, 'legendTitle');
  const legendOrientation = styleVal(message, 'legendOrientation');
  const xAxisDate = styleVal(message, 'xAxisDate');
  const xLabel = styleVal(message, 'xLabel');
  const yAxisMin = styleVal(message, 'yMin');
  const yAxisMax = styleVal(message, 'yMax');
  const yLabel = styleVal(message, 'yLabel');
  const metricFmt = styleVal(message, 'metricFormatString');

  // get unique breakdown groups
  // -------------------------
  let breakdown_values = [];
  let n_groups = [];
  let has_breakdown = true;
  let has_offset = true;
  if (message.tables.DEFAULT[0].dimension_breakdown !== undefined){
    breakdown_values = [...new Set(message.tables.DEFAULT.map(d => d.dimension_breakdown[0]))];
    console.log('All groups: ' + breakdown_values)
    n_groups = breakdown_values.length
    if (breakdown_values.length > 10){
      console.log(`More than 10 group by categories provided (n=${n_groups}). Truncating to only plot first 10.`)
      n_groups = 10
    }
    has_offset = !arraysEqual(message.tables.DEFAULT.map(d => d.dimension_breakdown[0]), 
      message.tables.DEFAULT.map(d => d.dimension[0]));
  }
  else {
    has_breakdown = false;
    has_offset = false;
    n_groups = 1;
  }

  // Gather data for x-axis
  // -------------------------
  const xData = xAxisDate
    ? message.tables.DEFAULT.map(d => toDate(d.dimension[0])) 
    : message.tables.DEFAULT.map(d => d.dimension[0]);

  // Gather data for error bars
  // -------------------------
  const error_y = {
  	type: 'data',
  	visible: true, 
  	array: message.tables.DEFAULT.map(d => d.metric_error[0])
  };
  // if a second error offset is provided, use asymmetric error bars
  // with the second series as the lower offset
  if (message.fields.metric_error.length > 1) {
  	error_y.arrayminus = message.tables.DEFAULT.map(d => d.metric_error[1]);
  	error_y.symmetric = false;
  }


  // loop through breakdown groups and add traces
  // -------------------------
  let data = []
  let i;
  // const n_groups = 1
  for (i=0; i<n_groups; i++){
    // Gather all style parameters for series
    const barColor =  themeColor(message, 'barColor'+(i+1), 'themeSeriesColor', i);
    const errorLineWeight =  styleVal(message, 'errorLineWeight'+(i+1));
    const errorBarWidth =  styleVal(message, 'errorBarWidth'+(i+1));
    const errorColor =  themeColor(message, 'errorColor'+(i+1), 'themeSeriesColor', i);
    const errorOpacity = styleVal(message, 'errorOpacity'+(i+1));

    // trace for metric trend line
    const trace_box = {
      type: 'bar',
      x: xData,
      y: message.tables.DEFAULT.map(d => d.metric[0]),
      error_y: Object.assign({}, error_y,
        {
          color: errorColor,
          thickness: errorLineWeight,
          width: errorBarWidth,
          opacity: errorOpacity
        }),
      marker : {color: barColor},
      transforms: !has_breakdown ? [] : [{
      	type: 'filter',
      	target: message.tables.DEFAULT.map(d => d.dimension_breakdown[0]),
        operation: '=',
        value: breakdown_values[i]
      }],
      name: has_breakdown ? breakdown_values[i] : 'None', 
      legendgroup: has_breakdown ? breakdown_values[i] : 'None', 
      offsetgroup: has_offset ? `${i}` : 0, 
      showlegend: has_breakdown ? true : false,
      hoverinfo: 'y+name'
      // hovertemplate
    };

    data.push(trace_box);

  }

  // Chart Titles
  // -------------------------
  const chartTitleLayout = isNull(chartTitle) ? {} : {text: chartTitle};
  const xAxisLayout = isNull(xLabel) ? {} : {title: {text: xLabel}};
  const yAxisLayout = isNull(yLabel) ? {tickformat: metricFmt} : {title: {text: yLabel}, tickformat: metricFmt};

  // format y-axis range
  // -------------------------
  let yAxisMetric = '';
  if (!isNumeric(yAxisMin) && !isNumeric(yAxisMax)){
    yAxisLayout.range = 'auto'
  }
  else if (!isNumeric(yAxisMin)){
    const minValue = Math.min.apply(Math, message.tables.DEFAULT.map(d => d.metric[0] - d.metric_error[0]));
    yAxisLayout.range = [Math.floor(0.9*minValue), yAxisMax];
  }
  else if (!isNumeric(yAxisMax)){
    const maxValue = Math.max.apply(Math, message.tables.DEFAULT.map(d => d.metric[0] + d.metric_error[0]));
    yAxisLayout.range = [yAxisMin, Math.ceil(1.1*maxValue)];
  }
  else{
    yAxisLayout.range = [yAxisMin, yAxisMax];
  }

  // format layout
  // -------------------------
  let legendLayout = legendOrientation == 'v'
    ? {orientation: legendOrientation}
    : {
        orientation: legendOrientation,
        yanchor: "bottom",
        y: 1.02,
        xanchor: "left",
        x: 0
      }
  if (!isNull(legendTitle)) {
    legendLayout.title = {text: legendTitle}
  }

  // Layout config
  // -------------------------
  const layout = {
    height: height+60,
    showlegend: true,
    yaxis: yAxisLayout,
    xaxis: xAxisLayout,
    title: chartTitleLayout,
    boxmode: 'group',
    hovermode: 'closest',
    legend: legendLayout
  };

  plotly.newPlot(myDiv, data, layout);
};

// renders locally
if (LOCAL) {
  drawViz(local.message);
} else {
  dscc.subscribeToData(drawViz, {transform: dscc.objectTransform});
}