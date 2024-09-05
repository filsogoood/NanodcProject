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

  const echartTabs = document.querySelectorAll('[data-tab-has-echarts]');
  if (echartTabs) {
    echartTabs.forEach(tab => {
      tab.addEventListener('shown.bs.tab', e => {
        const el = e.target;
        const { hash } = el;
        const id = hash || el.dataset.bsTarget;
        const content = document.getElementById(id.substring(1));
        const chart = content?.querySelector('[data-echart-tab]');
        if (chart) {
          window.echarts.init(chart).resize();
        }
      });
    });
  }

  const tooltipFormatter = (params, dateFormatter = 'MMM DD') => {
    let tooltipItem = ``;
    params.forEach(el => {
      tooltipItem += `<div class='ms-1'>
        <h6 class="text-body-tertiary"><span class="fas fa-circle me-1 fs-10" style="color:${
          el.borderColor ? el.borderColor : el.color
        }"></span>
          ${el.seriesName} : ${
      typeof el.value === 'object' ? el.value[1] : el.value
    }
        </h6>
      </div>`;
    });
    return `<div>
            <p class='mb-2 text-body-tertiary'>
              ${
                window.dayjs(params[0].axisValue).isValid()
                  ? window.dayjs(params[0].axisValue).format(dateFormatter)
                  : params[0].axisValue
              }
            </p>
            ${tooltipItem}
          </div>`;
  };

  const handleTooltipPosition = ([pos, , dom, , size]) => {
    // only for mobile device
    if (window.innerWidth <= 540) {
      const tooltipHeight = dom.offsetHeight;
      const obj = { top: pos[1] - tooltipHeight - 20 };
      obj[pos[0] < size.viewSize[0] / 2 ? 'left' : 'right'] = 5;
      return obj;
    }
    return null; // else default behaviour
  };

  /* -------------------------------------------------------------------------- */
  /*                     Echart Bar Member info                                 */
  /* -------------------------------------------------------------------------- */

  const newCustomersChartsInit = () => {
    const { getColor, getData, getDates } = window.phoenix.utils;
    const $echartNewCustomersCharts = document.querySelector(
      '.echarts-new-customers'
    );
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
      ${el.date.format('MMM DD')} : ${el.value}
    </h6>`;
      });
      return `<div class='ms-1'>
              ${tooltipItem}
            </div>`;
    };

    if ($echartNewCustomersCharts) {
      const userOptions = getData($echartNewCustomersCharts, 'echarts');
      const chart = window.echarts.init($echartNewCustomersCharts);
      const getDefaultOptions = () => ({
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
            data: getDates(
              new Date('5/1/2022'),
              new Date('5/7/2022'),
              1000 * 60 * 60 * 24
            ),
            show: true,
            boundaryGap: false,
            axisLine: {
              show: true,
              lineStyle: { color: getColor('secondary-bg') }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: value => window.dayjs(value).format('DD MMM'),
              showMinLabel: true,
              showMaxLabel: false,
              color: getColor('secondary-color'),
              align: 'left',
              interval: 5,
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              fontSize: 12.8
            }
          },
          {
            type: 'category',
            position: 'bottom',
            show: true,
            data: getDates(
              new Date('5/1/2022'),
              new Date('5/7/2022'),
              1000 * 60 * 60 * 24
            ),
            axisLabel: {
              formatter: value => window.dayjs(value).format('DD MMM'),
              interval: 130,
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
          show: false,
          type: 'value',
          boundaryGap: false
        },
        series: [
          {
            type: 'line',
            data: [150, 100, 300, 200, 250, 180, 250],
            showSymbol: false,
            symbol: 'circle',
            lineStyle: {
              width: 2,
              color: getColor('secondary-bg')
            },
            emphasis: {
              lineStyle: {
                color: getColor('secondary-bg')
              }
            }
          },
          {
            type: 'line',
            data: [200, 150, 250, 100, 500, 400, 600],
            lineStyle: {
              width: 2,
              color: getColor('primary')
            },
            showSymbol: false,
            symbol: 'circle'
          }
        ],
        grid: { left: 0, right: 0, top: 5, bottom: 20 }
      });
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  const { echarts: echarts$2 } = window;

  /* -------------------------------------------------------------------------- */
  /*                                Market Share                                */
  /* -------------------------------------------------------------------------- */

  const payingCustomerChartInit = () => {
    const { getData, getColor } = window.phoenix.utils;
    const $chartEl = document.querySelector('.echarts-paying-customer-chart');

    if ($chartEl) {
      const userOptions = getData($chartEl, 'options');
      const chart = echarts$2.init($chartEl);

      const getDefaultOptions = () => ({
        tooltip: {
          trigger: 'item',
          padding: [7, 10],
          backgroundColor: getColor('body-highlight-bg'),
          borderColor: getColor('border-color'),
          textStyle: { color: getColor('light-text-emphasis') },
          borderWidth: 1,
          position: (...params) => handleTooltipPosition(params),
          transitionDuration: 0,
          formatter: params => {
            return `<strong>${params.seriesName}:</strong> ${params.value}%`;
          }
        },
        legend: { show: false },
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            name: 'Paying customer',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 12,
            itemStyle: {
              color: getColor('primary')
            },
            progress: {
              show: true,
              roundCap: true,
              width: 12,
              itemStyle: {
                shadowBlur: 0,
                shadowColor: '#0000'
              }
            },
            pointer: {
              show: false
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 12,
                color: [[1, getColor('primary-bg-subtle')]]
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 30
              }
            ]
          }
        ]
      });

      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  // dayjs.extend(advancedFormat);

  /* -------------------------------------------------------------------------- */
  /*                             Echarts Total Sales                            */
  /* -------------------------------------------------------------------------- */

  const projectionVsActualChartInit = () => {
    const { getColor, getData, getPastDates } = window.phoenix.utils;
    const $projectionVsActualChartEl = document.querySelector(
      '.echart-projection-actual'
    );

    const dates = getPastDates(10);

    const data1 = [
      44485, 20428, 47302, 45180, 31034, 46358, 26581, 36628, 38219, 43256
    ];

    const data2 = [
      38911, 29452, 31894, 47876, 31302, 27731, 25490, 30355, 27176, 30393
    ];

    if ($projectionVsActualChartEl) {
      const userOptions = getData($projectionVsActualChartEl, 'echarts');
      const chart = window.echarts.init($projectionVsActualChartEl);

      const getDefaultOptions = () => ({
        color: [getColor('primary'), getColor('tertiary-bg')],
        tooltip: {
          trigger: 'axis',
          padding: [7, 10],
          backgroundColor: getColor('body-highlight-bg'),
          borderColor: getColor('border-color'),
          textStyle: { color: getColor('light-text-emphasis') },
          borderWidth: 1,
          transitionDuration: 0,
          axisPointer: {
            type: 'none'
          },
          position: (...params) => handleTooltipPosition(params),
          formatter: params => tooltipFormatter(params)
        },
        legend: {
          data: ['Projected revenue', 'Actual revenue'],
          right: 'right',
          width: '100%',
          itemWidth: 16,
          itemHeight: 8,
          itemGap: 20,
          top: 3,
          inactiveColor: getColor('quaternary-color'),
          textStyle: {
            color: getColor('body-color'),
            fontWeight: 600,
            fontFamily: 'Nunito Sans'
            // fontSize: '12.8px'
          }
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          axisLabel: {
            color: getColor('secondary-color'),
            formatter: value => window.dayjs(value).format('MMM DD'),
            interval: 3,
            fontFamily: 'Nunito Sans',
            fontWeight: 600,
            fontSize: 12.8
          },
          data: dates,
          axisLine: {
            lineStyle: {
              color: getColor('tertiary-bg')
            }
          },
          axisTick: false
        },
        yAxis: {
          axisPointer: { type: 'none' },
          // boundaryGap: false,
          axisTick: 'none',
          splitLine: {
            interval: 5,
            lineStyle: {
              color: getColor('secondary-bg')
            }
          },
          axisLine: { show: false },
          axisLabel: {
            fontFamily: 'Nunito Sans',
            fontWeight: 600,
            fontSize: 12.8,
            color: getColor('secondary-color'),
            margin: 20,
            verticalAlign: 'bottom',
            formatter: value => `$${value.toLocaleString()}`
          }
        },
        series: [
          {
            name: 'Projected revenue',
            type: 'bar',
            barWidth: '6px',
            data: data2,
            barGap: '30%',
            label: { show: false },
            itemStyle: {
              borderRadius: [2, 2, 0, 0],
              color: getColor('primary')
            }
          },
          {
            name: 'Actual revenue',
            type: 'bar',
            data: data1,
            barWidth: '6px',
            barGap: '30%',
            label: { show: false },
            z: 10,
            itemStyle: {
              borderRadius: [2, 2, 0, 0],
              color: getColor('info-bg-subtle')
            }
          }
        ],
        grid: {
          right: 0,
          left: 3,
          bottom: 0,
          top: '15%',
          containLabel: true
        },
        animation: false
      });

      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const leaftletPoints = [
    {
      lat: 37.4922803,
      long: 127.0378711,
      name: 'NANODC001',
      street: '논현로63길',
      location: '서울, 한국'
    },
    {
      lat: 35.1249807,
      long: 126.7559051,
      name: 'NANODC002',
      street: '평동로 740번길 34 옥동촌',
      location: '광주, 한국'
    },
    {
      lat: 37.4663802,
      long: 126.8278147,
      name: 'NANODC003',
      street: '양지로 237',
      location: '부천, 한국'
    }
  ];

  /* -------------------------------------------------------------------------- */
  /*                     Echart Bar Member info                                 */
  /* -------------------------------------------------------------------------- */
  const { echarts: echarts$1 } = window;

  const returningCustomerChartInit = () => {
    const { getColor, getData } = window.phoenix.utils;

    const $returningCustomerChart = document.querySelector(
      '.echart-returning-customer'
    );

    if ($returningCustomerChart) {
      const userOptions = getData($returningCustomerChart, 'echarts');
      const chart = echarts$1.init($returningCustomerChart);
      const getDefaultOptions = () => ({
        color: getColor('body-highlight-bg'),
        legend: {
          data: [
            {
              name: 'Fourth time',
              icon: 'roundRect',
              itemStyle: {
                color: getColor('primary-light'),
                borderWidth: 0
              }
            },
            {
              name: 'Third time',
              icon: 'roundRect',
              itemStyle: { color: getColor('info-lighter'), borderWidth: 0 }
            },
            {
              name: 'Second time',
              icon: 'roundRect',
              itemStyle: { color: getColor('primary'), borderWidth: 0 }
            }
          ],

          right: 'right',
          width: '100%',
          itemWidth: 16,
          itemHeight: 8,
          itemGap: 20,
          top: 3,
          inactiveColor: getColor('quaternary-color'),
          inactiveBorderWidth: 0,
          textStyle: {
            color: getColor('body-color'),
            fontWeight: 600,
            fontFamily: 'Nunito Sans'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          padding: [7, 10],
          backgroundColor: getColor('body-highlight-bg'),
          borderColor: getColor('border-color'),
          textStyle: { color: getColor('light-text-emphasis') },
          borderWidth: 1,
          transitionDuration: 0,
          formatter: tooltipFormatter
        },
        xAxis: {
          type: 'category',
          data: months,
          show: true,
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: { color: getColor('tertiary-bg') }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            // interval: 1,
            showMinLabel: false,
            showMaxLabel: false,
            color: getColor('secondary-color'),
            formatter: value => value.slice(0, 3),
            fontFamily: 'Nunito Sans',
            fontWeight: 600,
            fontSize: 12.8
          },
          splitLine: {
            show: true,
            lineStyle: { color: getColor('secondary-bg'), type: 'dashed' }
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: false,
          axisLabel: {
            showMinLabel: true,
            showMaxLabel: true,
            color: getColor('secondary-color'),
            formatter: value => `${value}%`,
            fontFamily: 'Nunito Sans',
            fontWeight: 600,
            fontSize: 12.8
          },
          splitLine: {
            show: true,
            lineStyle: { color: getColor('secondary-bg') }
          }
        },
        series: [
          {
            name: 'Fourth time',
            type: 'line',
            data: [62, 90, 90, 90, 78, 84, 17, 17, 17, 17, 82, 95],
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 10,
            emphasis: {
              lineStyle: {
                width: 1
              }
            },
            lineStyle: {
              type: 'dashed',
              width: 1,
              color: getColor('primary-light')
            },
            itemStyle: {
              borderColor: getColor('primary-light'),
              borderWidth: 3
            }
          },
          {
            name: 'Third time',
            type: 'line',
            data: [50, 50, 30, 62, 18, 70, 70, 22, 70, 70, 70, 70],
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 10,
            emphasis: {
              lineStyle: {
                width: 1
              }
            },
            lineStyle: {
              width: 1,
              color: getColor('info-lighter')
            },
            itemStyle: {
              borderColor: getColor('info-lighter'),
              borderWidth: 3
            }
          },
          {
            name: 'Second time',
            type: 'line',
            data: [40, 78, 60, 78, 60, 20, 60, 40, 60, 40, 20, 78],
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 10,
            emphasis: {
              lineStyle: {
                width: 3
              }
            },
            lineStyle: {
              width: 3,
              color: getColor('primary')
            },
            itemStyle: {
              borderColor: getColor('primary'),
              borderWidth: 3
            }
          }
        ],
        grid: { left: 0, right: 8, top: '14%', bottom: 0, containLabel: true }
      });
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  // import * as echarts from 'echarts';

  const { echarts } = window;

  /* -------------------------------------------------------------------------- */
  /*                                Market Share                                */
  /* -------------------------------------------------------------------------- */

  const topCouponsChartInit = () => {
    const { getData, getColor } = window.phoenix.utils;
    const ECHART_TOP_COUPONS = '.echart-top-coupons';
    const $echartTopCoupons = document.querySelectorAll(ECHART_TOP_COUPONS);

    $echartTopCoupons.forEach($echartTopCoupons => {
        const userOptions = getData($echartTopCoupons, 'options');
        const chart = echarts.init($echartTopCoupons);

      const getDefaultOptions = () => ({
        color: [
          getColor('primary'),
          getColor('primary-lighter'),
          getColor('info-dark')
        ],

        tooltip: {
          trigger: 'item',
          padding: [7, 10],
          backgroundColor: getColor('body-highlight-bg'),
          borderColor: getColor('border-color'),
          textStyle: { color: getColor('light-text-emphasis') },
          borderWidth: 1,
          transitionDuration: 0,
          position(pos, params, el, elRect, size) {
            const obj = { top: pos[1] - 35 }; // set tooltip position over 35px from pointer
            if (window.innerWidth > 540) {
              if (pos[0] <= size.viewSize[0] / 2) {
                obj.left = pos[0] + 20; // 'move in right';
              } else {
                obj.left = pos[0] - size.contentSize[0] - 20;
              }
            } else {
              obj[pos[0] < size.viewSize[0] / 2 ? 'left' : 'right'] = 0;
            }
            return obj;
          },
          formatter: params => {
            return `<strong>${params.data.name}:</strong> ${params.percent}%`;
          }
        },
        legend: { show: false },
        series: [
          {
            name: '10,000 FIL',
            type: 'pie',
            radius: ['100%', '87%'],
            avoidLabelOverlap: false,
            emphasis: {
              scale: false,
              itemStyle: {
                color: 'inherit'
              }
            },
            itemStyle: {
              borderWidth: 2,
              borderColor: getColor('body-bg')
            },
            label: {
              show: true,
              position: 'center',
              formatter: '{a}',
              fontSize: 18,
              color: getColor('light-text-emphasis')
            },
            data: [
              { value: 7000000, name: 'Percentage discount' },
              { value: 3000000, name: 'Fixed card discount' },
             // { value: 1000000, name: 'Fixed product discount' }
            ]
          }
        ],
        grid: { containLabel: true }
      });

      echartSetOption(chart, userOptions, getDefaultOptions);
    });
  };

  // dayjs.extend(advancedFormat);

  /* -------------------------------------------------------------------------- */
  /*                             Echarts Total Sales                            */
  /* -------------------------------------------------------------------------- */

  const totalOrdersChartInit = () => {
    const { getColor, getData, getDates } = window.phoenix.utils;
    const totalOrdersChartEl = document.querySelector('.echart-total-orders');

    if (totalOrdersChartEl) {
      const userOptions = getData(totalOrdersChartEl, 'echarts');
      const chart = window.echarts.init(totalOrdersChartEl);

      const getDefaultOptions = () => ({
        color: getColor('primary'),
        tooltip: {
          trigger: 'item',
          padding: [7, 10],
          backgroundColor: getColor('body-highlight-bg'),
          borderColor: getColor('border-color'),
          textStyle: { color: getColor('light-text-emphasis') },
          position: (...params) => handleTooltipPosition(params),
          borderWidth: 1,
          transitionDuration: 0,
          formatter: params => {
            return `<strong>${window
            .dayjs(params.name)
            .format('DD MMM')}:</strong> ${params.value}`;
          }
        },
        xAxis: {
          type: 'category',
          data: getDates(
            new Date('5/1/2022'),
            new Date('5/7/2022'),
            1000 * 60 * 60 * 24
          ),
          show: true,
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: { color: getColor('secondary-bg') }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: value => window.dayjs(value).format('DD MMM'),
            interval: 6,
            showMinLabel: true,
            showMaxLabel: true,
            color: getColor('secondary-color')
          }
        },
        yAxis: {
          show: false,
          type: 'value',
          boundaryGap: false
        },
        series: [
          {
            type: 'bar',
            barWidth: '5px',
            data: [120, 200, 150, 80, 70, 110, 120],
            showBackground: true,
            symbol: 'none',
            itemStyle: {
              borderRadius: 10
            },
            backgroundStyle: {
              borderRadius: 10,
              color: getColor('primary-bg-subtle')
            }
          }
        ],
        grid: { right: 10, left: 10, bottom: 0, top: 0 }
      });

      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                             Echarts Total Sales                            */
  /* -------------------------------------------------------------------------- */

  const totalSalesChartInit = () => {
    const { getColor, getData, getDates } = window.phoenix.utils;
    const $totalSalesChart = document.querySelector('.echart-total-sales-chart');

    // getItemFromStore('phoenixTheme')

    const dates = getDates(
      new Date('5/1/2022'),
      new Date('5/30/2022'),
      1000 * 60 * 60 * 24
    );

    const currentMonthData = [
      100, 200, 300, 300, 300, 250, 200, 200, 200, 200, 200, 500, 500, 500, 600,
      700, 800, 900, 1000, 1100, 850, 600, 600, 600, 400, 200, 200, 300, 300, 300
    ];

    const prevMonthData = [
      200, 200, 100, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 200, 400, 600,
      600, 600, 800, 1000, 700, 400, 450, 500, 600, 700, 650, 600, 550
    ];

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
      ${el.date.format('MMM DD')} : ${el.value}
    </h6>`;
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
              formatter: value => window.dayjs(value).format('DD MMM'),
              interval: 13,
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
              formatter: value => window.dayjs(value).format('DD MMM'),
              interval: 130,
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
            // data: Array.from(Array(30).keys()).map(() =>
            //   getRandomNumber(100, 300)
            // ),
            data: currentMonthData,
            showSymbol: false,
            symbol: 'circle'
          },
          {
            name: 'e',
            type: 'line',
            // data: Array.from(Array(30).keys()).map(() =>
            //   getRandomNumber(100, 300)
            // ),
            data: prevMonthData,
            // symbol: 'none',
            lineStyle: {
              type: 'dashed',
              width: 1,
              color: getColor('info')
            },
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

  const { L } = window;

  /* -------------------------------------------------------------------------- */
  /*                                   leaflet                                  */
  /* -------------------------------------------------------------------------- */

  const leafletTopRegionsInit = () => {
    const mapContainer = document.getElementById('map');
    if (L && mapContainer) {
      const getFilterColor = () => {
        return window.config.config.phoenixTheme === 'dark'
          ? [
              'invert:98%',
              'grayscale:69%',
              'bright:89%',
              'contrast:111%',
              'hue:205deg',
              'saturate:1000%'
            ]
          : ['bright:101%', 'contrast:101%', 'hue:23deg', 'saturate:225%'];
      };
      const tileLayerTheme =
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

      const tiles = L.tileLayer.colorFilter(tileLayerTheme, {
        attribution: null,
        transparent: true,
        filter: getFilterColor()
      });

      const map = L.map('map', {
        center: L.latLng(25.659195, 30.182691),
        zoom: 0.6,
        layers: [tiles],
        minZoom: 1.4
      });

      const mcg = L.markerClusterGroup({
        chunkedLoading: false,
        spiderfyOnMaxZoom: false
      });

      leaftletPoints.map(point => {
        const { name, location, street } = point;
        const icon = L.icon({
          iconUrl: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAACXBIWXMAAAFgAAABYAEg2RPaAAADpElEQVRYCZ1XS1LbQBBtybIdiMEJKSpUqihgEW/xDdARyAnirOIl3MBH8NK7mBvkBpFv4Gy9IRSpFIQiRPyNfqkeZkY9HwmFt7Lm06+7p/vN2MmyDIrQ6QebALAHAD4AbFuWfQeAAACGs5H/w5jlsJJw4wMA+GhMFuMA99jIDJJOP+ihZwDQFmNuowWO1wS3viDXpdEdZPEc0odruj0EgN5s5H8tJOEEX8R3rbkMtcU34NTqhe5nSQTJ7Tkk80s6/Gk28scGiULguFBffgdufdEwWoQ0uoXo8hdAlooVH0REjISfwZSlyHGh0V5n6aHAtKTxXI5g6nQnMH0P4bEgwtR18Yw8Pj8QZ4ARUAI0Hl+fQZZGisGEBVwHr7XKzox57DXZ/ij8Cdwe2u057z9/wygOxRl4S2vSUHx1oucaMQGAHTrgtdag9mK5aN+Wx/uAAQ9Zenp/SRce4TpaNbQK4+sTcGqeTB/aIXv3XN5oj2VKqii++U0JunpZ8urxee4hvjqVc2hHpBDXuKKT9XMgVYJ1/1fPGSeaikzgmWWkMIi9bVf8UhotXxzORn5gWFchI8QyttlzjS0qpsaIGY2MMsujV/AUSdcY0dDpB6/EiOPYzclR1CI5mOez3ekHvrFLxa7cR5pTscfrXjk0Vhm5V2PqLUWnH3R5GbPGpMVD7E1ckXesKBQ7AS/vmQ1c0+kHuxpBj98lTCm8pbc5QRJRdZ6qHb/wGryXq3Lxszv+5gySuwvxueXySwYvHEjuQ9ofTGKYlrmK1EsCHMd5SoD7mZ1HHFCBHLNbMEshvrugqWLn01hpVVJhFgVGkDvK7hR6n2B+d9C7xsqWsbkqHv4cCsWezEb+o2SR+SFweUBxfA5wH7kShjKt2vWL57Px3GhIFEezkb8pxvUWHYhotAfCk2AtkEcxoOttrxUWDR5svb1emSQKj0WXK1HYIgFREbiBqmoZcB2RkbE+byMZiosorVgAZF1ID7yQhEs38wa7nUqNDezdlavC2HbBGSQkGgZ8uJVBmzeiKCRRpEa9ilWghORVeGB7BxeSKF5xqbFBkxBrFKUk/JHA7ppENQaCnCjthK+3opCEYyANztXmZN858cDYWSUSHk3A311GAZDvo6deNKUk1EsqnJoQlkYBNlmxQZeaMgmxoUokICoHDce351RCCiuKoirJWEgNOYvQplM2VCLhUqF7jf94rW9kHVUjQeheV4riv0i4ZOzzz/2y/+0KAOAfr4EE4HpCFhwAAAAASUVORK5CYII=`
        });
        const marker = L.marker([point.lat, point.long], {
          icon
        });
        const popupContent = `
        <h6 class="mb-1">${name}</h6>
        <p class="m-0 text-body-quaternary">${street}, ${location}</p>
      `;
        const popup = L.popup({ minWidth: 180 }).setContent(popupContent);
        marker.bindPopup(popup);
        mcg.addLayer(marker);
        return true;
      });
      map.addLayer(mcg);

      const themeController = document.body;
      themeController.addEventListener(
        'clickControl',
        ({ detail: { control, value } }) => {
          if (control === 'phoenixTheme') {
            tiles.updateFilter(
              value === 'dark'
                ? [
                    'invert:98%',
                    'grayscale:69%',
                    'bright:89%',
                    'contrast:111%',
                    'hue:205deg',
                    'saturate:1000%'
                  ]
                : ['bright:101%', 'contrast:101%', 'hue:23deg', 'saturate:225%']
            );
          }
        }
      );
    }
  };

  /* eslint-disable no-nested-ternary */
  /*-----------------------------------------------
  |   Gooogle Map
  -----------------------------------------------*/

  const revenueMapInit = () => {
    const themeController = document.body;
    const $googlemaps = document.querySelectorAll('.revenue-map');
    if ($googlemaps.length && window.google) {
      // Visit https://snazzymaps.com/ for more themes
      const mapStyles = {
        SnazzyCustomLight: [
          {
            featureType: 'administrative',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'on'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#525b75'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'administrative.country',
            elementType: 'geometry.stroke',
            stylers: [
              {
                visibility: 'on'
              },
              {
                color: '#ffffff'
              }
            ]
          },
          {
            featureType: 'administrative.province',
            elementType: 'geometry.stroke',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [
              {
                visibility: 'on'
              },
              {
                color: '#E3E6ED'
              }
            ]
          },
          {
            featureType: 'landscape.natural',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'all',
            stylers: [
              {
                color: '#eff2f6'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'transit.station.airport',
            elementType: 'geometry',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'transit.station.airport',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              {
                color: '#F5F7FA'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          }
        ],
        SnazzyCustomDark: [
          {
            featureType: 'administrative',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          },
          {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#8a94ad'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'administrative.country',
            elementType: 'geometry.stroke',
            stylers: [
              { visibility: 'on' },
              {
                color: '#000000'
              }
            ]
          },
          {
            featureType: 'administrative.province',
            elementType: 'geometry.stroke',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ visibility: 'on' }, { color: '#222834' }]
          },
          {
            featureType: 'landscape.natural',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'road',
            elementType: 'all',
            stylers: [{ color: '#141824' }]
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit.station.airport',
            elementType: 'geometry',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit.station.airport',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#0f111a' }]
          },
          {
            featureType: 'water',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      };

      $googlemaps.forEach(itm => {
        const mapElement = itm;
        const mapOptions = {
          zoom: 1.4,
          minZoom: 1.4,
          zoomControl: false,
          scrollwheel: true,
          disableDefaultUI: true,
          center: new window.google.maps.LatLng(25.659195, 30.182691),
          // styles: mapStyles.SnazzyCustomLight
          styles:
            window.config.config.phoenixTheme === 'dark'
              ? mapStyles.SnazzyCustomDark
              : mapStyles.SnazzyCustomLight
        };

        const map = new window.google.maps.Map(mapElement, mapOptions);
        const infoWindow = new window.google.maps.InfoWindow();

        const markers = leaftletPoints.map(point => {
          const { name, location, street } = point;

          const label = `
        <h6 class="mb-1">${name}</h6>
        <p class="m-0 text-body-quaternary">${street}, ${location}</p>
      `;
          const marker = new window.google.maps.Marker({
            position: { lat: point.lat, lng: point.lng }
          });

          marker.addListener('click', () => {
            infoWindow.setContent(label);
            infoWindow.open(map, marker);
          });
          return marker;
        });

        const renderer = {
          render: ({ count, position }) => {
            let color = '#3874ff';
            if (count > 10) {
              color = '#e5780b';
            }
            if (count > 90) {
              color = '#25b003';
            }

            const svg = window.btoa(`
            <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
              <circle cx="120" cy="120" opacity=".9" r="70" />
              <circle cx="120" cy="120" opacity=".3" r="90" />
              <circle cx="120" cy="120" opacity=".2" r="110" />
            </svg>`);

            return new window.google.maps.Marker({
              label: { text: String(count), color: 'white', fontSize: '10px' },
              position,
              icon: {
                url: `data:image/svg+xml;base64,${svg}`,
                scaledSize: new window.google.maps.Size(45, 45)
              },
              // adjust zIndex to be above other markers
              zIndex: Number(window.google.maps.Marker.MAX_ZINDEX) + count
            });
          }
        };

        themeController &&
          themeController.addEventListener(
            'clickControl',
            ({ detail: { control, value } }) => {
              if (control === 'phoenixTheme') {
                map.set(
                  'styles',
                  value === 'dark'
                    ? mapStyles.SnazzyCustomDark
                    : mapStyles.SnazzyCustomLight
                );
              }
            }
          );
        return new window.markerClusterer.MarkerClusterer({
          markers,
          map,
          renderer
        });
      });
    }
  };

  const { docReady } = window.phoenix.utils;

  window.revenueMapInit = revenueMapInit;
  docReady(totalSalesChartInit);
  docReady(newCustomersChartsInit);
  docReady(topCouponsChartInit);
  docReady(projectionVsActualChartInit);
  docReady(returningCustomerChartInit);
  docReady(payingCustomerChartInit);
  docReady(totalOrdersChartInit);
  docReady(leafletTopRegionsInit);

}));
//# sourceMappingURL=ecommerce-dashboard.js.map
