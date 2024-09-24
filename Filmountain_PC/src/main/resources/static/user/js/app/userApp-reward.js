(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  // import * as echarts from 'echarts';
  const { merge } = window._;

  // form config.js
  const echartSetOption = (
    chart,
    userOptions,
    getDefaultOptions,
    responsiveOptions
  ) => {
    const { breakpoints, resize } = window.phoenix.utils;
    const handleResize = options => {
      Object.keys(options).forEach(item => {
        if (window.innerWidth > breakpoints[item]) {
          chart.setOption(options[item]);
        }
      });
    };

    const themeController = document.body;
    // Merge user options with lodash
    chart.setOption(merge(getDefaultOptions(), userOptions));

    const navbarVerticalToggle = document.querySelector(
      '.navbar-vertical-toggle'
    );
    if (navbarVerticalToggle) {
      navbarVerticalToggle.addEventListener('navbar.vertical.toggle', () => {
        chart.resize();
        if (responsiveOptions) {
          handleResize(responsiveOptions);
        }
      });
    }

    resize(() => {
      chart.resize();
      if (responsiveOptions) {
        handleResize(responsiveOptions);
      }
    });
    if (responsiveOptions) {
      handleResize(responsiveOptions);
    }

    themeController.addEventListener(
      'clickControl',
      ({ detail: { control } }) => {
        if (control === 'phoenixTheme') {
          chart.setOption(window._.merge(getDefaultOptions(), userOptions));
        }
      }
    );
  };
  // -------------------end config.js--------------------
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                             Echarts Total Sales                            */
  /* -------------------------------------------------------------------------- */

  const totalRewardChartInit = () => {
    const { getColor, getData, getDates } = window.phoenix.utils;
    const $totalSalesChart = document.querySelector('#totalRewardChart');
	var stringStartDate = $('#firstDate').val();
	var stringLastDate = $('#lastDate').val();
	var startDate = new Date(stringStartDate);
	var endDate = new Date(stringLastDate);
	var dataSize = $('#dataSize').val()-1;
	var interval = Math.floor((endDate-startDate)/dataSize);
	var currency = $('#currency').val();
    const dates = getDates(
      startDate,
      endDate,
     interval
    );
	//Math.floor((startDate-endDate)/(1000 * 60 * 60)/30)*1000 * 60 * 60
	//1000 * 60 * 60 * 24 *30
	var dataListString = document.getElementById("totalRewardChart").getAttribute("dataList");
	const currentMonthData = JSON.parse(dataListString);
    const tooltipFormatter = params => {
      const currentDate = window.dayjs(params[0].axisValue);
      const prevDate = window.dayjs(params[0].axisValue).subtract(1, 'month');

      const result = params.map((param, index) => ({
        value: param.value,
        date: index > 0 ? prevDate : currentDate,
        color: param.color
      }));

      let tooltipItem = ``;
      result.forEach((el, index) => {
        tooltipItem += `<h6 class="fs-9 text-body-tertiary ${
        index > 0 && 'mb-0'
      }"><span class="fas fa-circle me-2" style="color:${el.color}"></span>
      [${el.date.format('YYYY/MM/DD hh:mm')}] ${el.value} `+currency+
    `</h6>`;
      });
      return `<div class='ms-1'>
              ${tooltipItem}
            </div>`;
    };

    if ($totalSalesChart) {
      const userOptions = getData($totalSalesChart, 'echarts');
      const chart = window.echarts.init($totalSalesChart);

      const getDefaultOptions = () => ({
        color: [getColor('primary'), getColor('info')],
        tooltip: {
          trigger: 'axis',
          padding: 10,
          backgroundColor: getColor('body-highlight-bg'),
          borderColor: getColor('border-color'),
          textStyle: { color: getColor('light-text-emphasis') },
          borderWidth: 1,
          transitionDuration: 0,
          axisPointer: {
            type: 'none'
          },
          formatter: tooltipFormatter
        },
        xAxis: [
          {
            type: 'category',
            data: dates,
            axisLabel: {
              formatter: value => window.dayjs(value).format('MM/DD'),
              interval: Math.floor(dataSize/5),
              showMinLabel: true,
              showMaxLabel: false,
              color: getColor('secondary-color'),
              align: 'left',
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              fontSize: 12.8
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: getColor('secondary-bg')
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              interval: 0,
              lineStyle: {
                color:
                  window.config.config.phoenixTheme === 'dark'
                    ? getColor('body-highlight-bg')
                    : getColor('secondary-bg')
              }
            },
            boundaryGap: false
          },
          {
            type: 'category',
            position: 'bottom',
            data: dates,
            axisLabel: {
              formatter: value => window.dayjs(value).format('MM/DD'),
              interval: Math.floor(dataSize/5)*10,
              showMaxLabel: true,
              showMinLabel: false,
              color: getColor('secondary-color'),
              align: 'right',
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              fontSize: 12.8
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            boundaryGap: false
          }
        ],
        yAxis: {
          position: 'right',
          axisPointer: { type: 'none' },
          axisTick: 'none',
          splitLine: {
            show: false
          },
          axisLine: { show: false },
          axisLabel: { show: false }
        },
        series: [
          {
            name: 'd',
            type: 'line',
            data: currentMonthData,
            showSymbol: false,
            symbol: 'circle'
          }
        ],
        grid: {
          right: 2,
          left: 5,
          bottom: '20px',
          top: '2%',
          containLabel: false
        },
        animation: false
      });
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };
  const { docReady } = window.phoenix.utils;
  docReady(totalRewardChartInit);
}));