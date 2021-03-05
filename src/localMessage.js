export const message = {
  "tables": {
    "DEFAULT": [
      {
        "dimension": [
          "20200206"
        ],
        "dimension_breakdown": [
          "A"
        ],
        "metric": [
          1.35
        ],
        "box_lower": [
          0.98
        ],
        "box_upper": [
          1.8
        ],
        "whisker_lower": [
          0.98
        ],
        "whisker_upper": [
          1.9
        ],
        "box_mean": [
          1.35
        ],
        "metric_error": [
          0.03, 
          0.3
        ]
      },
      {
        "dimension": [
          "20200206"
        ],
        "dimension_breakdown": [
          "B"
        ],
        "metric": [
          1.3
        ],
        "box_lower": [
          1.02
        ],
        "box_upper": [
          1.552
        ],
        "whisker_lower": [
          1
        ],
        "whisker_upper": [
          2
        ],
        "box_mean": [
          1.1
        ],
        "metric_error": [
          0.02, 
          0.2
        ]
      },
      {
        "dimension": [
          "20200206"
        ],
        "dimension_breakdown": [
          "C"
        ],
        "metric": [
          0
        ],
        "box_lower": [
          -0.17
        ],
        "box_upper": [
          0.15300000000000002
        ],
        "whisker_lower": [
          -0.15
        ],
        "whisker_upper": [
          0.18
        ],
        "box_mean": [
          0.05
        ],
        "metric_error": [
          0.01, 
          0.1
        ]
      },
      {
        "dimension": [
          "20200106"
        ],
        "dimension_breakdown": [
          "A"
        ],
        "metric": [
          0.75
        ],
        "box_lower": [
          0.25
        ],
        "box_upper": [
          1
        ],
        "whisker_lower": [
          0.1
        ],
        "whisker_upper": [
          null
        ],
        "box_mean": [
          0.6
        ],
        "metric_error": [
          0.06, 
          0.6
        ]
      },
      {
        "dimension": [
          "20200106"
        ],
        "dimension_breakdown": [
          "B"
        ],
        "metric": [
          2.5
        ],
        "box_lower": [
          2.2
        ],
        "box_upper": [
          2.77
        ],
        "whisker_lower": [
          1.75
        ],
        "whisker_upper": [
          3
        ],
        "box_mean": [
          2.6
        ],
        "metric_error": [
          0.05, 
          0.5
        ]
      },
      {
        "dimension": [
          "20200106"
        ],
        "dimension_breakdown": [
          "C"
        ],
        "metric": [
          -0.15
        ],
        "box_lower": [
          -0.33999999999999997
        ],
        "box_upper": [
          0.02100000000000002
        ],
        "whisker_lower": [
          -0.5
        ],
        "whisker_upper": [
          0.25
        ],
        "box_mean": [
          -0.2
        ],
        "metric_error": [
          0.04, 
          0.4
        ]
      }
    ]
  },
  "fields": {
    "dimension": [
      {
        "id": "qt_mrm8agpjhc",
        "name": "ds",
        "type": "YEAR_MONTH_DAY",
        "concept": "DIMENSION"
      }
    ],
    "dimension_breakdown": [
      {
        "id": "qt_d03z7bgkhc",
        "name": "group",
        "type": "TEXT",
        "concept": "DIMENSION"
      }
    ],
    "metric": [
      {
        "id": "qt_4ehxeqkjhc",
        "name": "metric",
        "type": "NUMBER",
        "concept": "METRIC"
      }
    ],
    "box_lower": [
      {
        "id": "qt_k4jstlkjhc",
        "name": "ci_lower",
        "type": "NUMBER",
        "concept": "METRIC"
      }
    ],
    "box_upper": [
      {
        "id": "qt_f8arvlkjhc",
        "name": "ci_upper",
        "type": "NUMBER",
        "concept": "METRIC"
      }
    ],
    "whisker_lower": [
      {
        "id": "qt_xw0p2qpkhc",
        "name": "whisker_low",
        "type": "NUMBER",
        "concept": "METRIC"
      }
    ],
    "whisker_upper": [
      {
        "id": "qt_j9xgrrpkhc",
        "name": "whisker_high",
        "type": "NUMBER",
        "concept": "METRIC"
      }
    ],
    "box_mean": [
      {
        "id": "qt_vkv8ndvkhc",
        "name": "mean",
        "type": "NUMBER",
        "concept": "METRIC"
      }
    ],
    "metric_error": [
      {
        "id": "qt_q97ssdvkhc",
        "name": "sd",
        "type": "NUMBER",
        "concept": "METRIC"
      }, 
      {
        "id": "qt_12utwdvkhc",
        "name": "notch_span",
        "type": "NUMBER",
        "concept": "METRIC"
      }
    ]
  },
  "style": {
    "chartTitle": {
      "value": "test me out",
      "defaultValue": ""
    },
    "legendTitle": {
      "value": "My Categories",
      "defaultValue": ""
    },
    "legendOrientation": {
      "value": "v",
      "defaultValue": "v"
    },
    "xAxisDate": {
      "value": true,
      "defaultValue": false
    },
    "xLabel": {
      "value": "test",
      "defaultValue": ""
    },
    "yMin": {
      "value": "",
      "defaultValue": "null"
    },
    "yMax": {
      "value": "",
      "defaultValue": "null"
    },
    "yLabel": {
      "value": "y axis",
      "defaultValue": ""
    },
    "hoverCustom": {
      "value": 1,
      "defaultValue": "0"
    },
    "hoverCenter": {
      "value": true,
      "defaultValue": false
    },
    "hoverBar": {
      "value": true,
      "defaultValue": false
    },
    "hoverWhisker": {
      "value": true,
      "defaultValue": false
    },
    "hoverMean": {
      "value": true,
      "defaultValue": false
    },
    "hoverStd": {
      "value": false,
      "defaultValue": false
    },
    "metricFormatString": {
      "value": ",.2f",
      "defaultValue": ",.0f"
    },
    "errorLineWeight1": {
      "value": 2,
      "defaultValue": 2
    },
    "barColor1": {
      "value": {
        "color": null
      },
      "defaultValue": {
        "color": null
      }
    },
    "errorColor1": {
      "value": {
        "color": "black"
      },
      "defaultValue": {
        "color": null
      }
    },
    "errorLineWeight2": {
      "value": 2,
      "defaultValue": 2
    },
    "barColor2": {
      "value": {
        "color": "#00b6cb"
      },
      "defaultValue": {
        "color": null
      }
    },
    "errorColor2": {
      "value": {
        "color": "black"
      },
      "defaultValue": {
        "color": null
      }
    },
    "errorLineWeight3": {
      "value": 2,
      "defaultValue": 2
    },
    "barColor3": {
      "value": {
        "color": null
      },
      "defaultValue": {
        "color": null
      }
    },
    "errorColor3": {
      "value": {
        "color": "black"
      },
      "defaultValue": {
        "color": null
      }
    },
    "errorOpacity1": {
      "value": 1,
      "defaultValue": 0.1
    },
    "errorOpacity2": {
      "value": 0.9,
      "defaultValue": 0.1
    },
    "errorOpacity3": {
      "value": 0.8,
      "defaultValue": 0.1
    },
    "errorBarWidth1": {
      "value": 5,
      "defaultValue": 0.1
    },
    "errorBarWidth2": {
      "value": 6,
      "defaultValue": 0.1
    },
    "errorBarWidth3": {
      "value": 7,
      "defaultValue": 0.1
    }
  },
  "theme": {
    "themeFillColor": {
      "color": "#f5f5f5",
      "themeRef": {
        "index": 0
      }
    },
    "themeFontColor": {
      "color": "#000000",
      "themeRef": {
        "index": 1
      }
    },
    "themeFontFamily": "Roboto",
    "themeAccentFillColor": {
      "color": "#bdbdbd",
      "themeRef": {
        "index": 2
      }
    },
    "themeAccentFontColor": {
      "color": "#000000",
      "themeRef": {
        "index": 3
      }
    },
    "themeAccentFontFamily": "Roboto",
    "themeSeriesColor": [
      {
        "color": "#0072f0",
        "seriesRef": {
          "index": 0
        },
        "themeRef": {
          "index": 4
        }
      },
      {
        "color": "#00b6cb",
        "seriesRef": {
          "index": 1
        },
        "themeRef": {
          "index": 5
        }
      },
      {
        "color": "#f10096",
        "seriesRef": {
          "index": 2
        },
        "themeRef": {
          "index": 6
        }
      },
      {
        "color": "#f66d00",
        "seriesRef": {
          "index": 3
        },
        "themeRef": {
          "index": 7
        }
      },
      {
        "color": "#ffa800",
        "seriesRef": {
          "index": 4
        },
        "themeRef": {
          "index": 8
        }
      },
      {
        "color": "#7cb342",
        "seriesRef": {
          "index": 5
        },
        "themeRef": {
          "index": 9
        }
      },
      {
        "color": "#5e35b1",
        "seriesRef": {
          "index": 6
        }
      },
      {
        "color": "#03a9f4",
        "seriesRef": {
          "index": 7
        }
      },
      {
        "color": "#ec407a",
        "seriesRef": {
          "index": 8
        }
      },
      {
        "color": "#ff7043",
        "seriesRef": {
          "index": 9
        }
      },
      {
        "color": "#322e21",
        "seriesRef": {
          "index": 10
        }
      },
      {
        "color": "#565142",
        "seriesRef": {
          "index": 11
        }
      },
      {
        "color": "#7c7767",
        "seriesRef": {
          "index": 12
        }
      },
      {
        "color": "#a59f8e",
        "seriesRef": {
          "index": 13
        }
      },
      {
        "color": "#cfc9b8",
        "seriesRef": {
          "index": 14
        }
      },
      {
        "color": "#febb92",
        "seriesRef": {
          "index": 15
        }
      },
      {
        "color": "#da8d60",
        "seriesRef": {
          "index": 16
        }
      },
      {
        "color": "#b26338",
        "seriesRef": {
          "index": 17
        }
      },
      {
        "color": "#853d1c",
        "seriesRef": {
          "index": 18
        }
      },
      {
        "color": "#5a1800",
        "seriesRef": {
          "index": 19
        }
      }
    ],
    "themeIncreaseColor": {
      "color": "#388e3c"
    },
    "themeDecreaseColor": {
      "color": "#f44336"
    },
    "themeGridColor": {
      "color": "#d1d1d1"
    }
  },
  "interactions": {}
};