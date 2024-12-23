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

  // dayjs.extend(advancedFormat);

  /* -------------------------------------------------------------------------- */
  /*                             Echarts Total Sales                            */
  /* -------------------------------------------------------------------------- */

  const contactsBySourceChartInit = () => {
    const { getColor, getData, toggleColor } = window.phoenix.utils;
    const chartElContainer = document.querySelector('.echart-fil-balance-status-container');
	const chartEl = chartElContainer.querySelector('.echart-fil-balance-status');
    const chartLabel = chartElContainer.querySelector('[data-label]');

    if (chartEl) {
		const userOptions = getData(chartEl, 'echarts');
        const chart = window.echarts.init(chartEl);

        // totalLodckedFil 및 availableFil DOM 요소에서 데이터 가져오기
        const totalLodckedFil = parseFloat(document.getElementById('totalLodckedFil').getAttribute('data-amount'));
        const availableFil = parseFloat(document.getElementById('availableFil').getAttribute('data-amount'));

   
      
      // 파이차트에 사용될 데이터
        const data = [
            { value: totalLodckedFil, name: '전체 대여 FIL' },
            { value: availableFil, name: '가용 가능한 FIL' }
        ];
        
      // 총 FIL 수 계산
        const totalSource = data.reduce((acc, val) => val.value + acc, 0);
        
      if (chartLabel) {
        chartLabel.innerHTML = totalSource;
      }
      const getDefaultOptions = () => ({
        color: [
          getColor('success'),
          getColor('warning')
        ],
        tooltip: {
          trigger: 'item',
          borderWidth: 0,
          position: (...params) => handleTooltipPosition(params)
        },
        responsive: true,
        maintainAspectRatio: false,

        series: [
          {
            name: 'FIL Status',
                    type: 'pie',
                    radius: ['55%', '90%'],
                    startAngle: 90,
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderColor: getColor('body-bg'),
                        borderWidth: 3
            },

            label: {
              show: false
            },
            emphasis: {
              label: {
                show: false
              }
            },
            labelLine: {
              show: false
            },
            data
          }
        ],
        grid: {
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          containLabel: false
        }
      });

      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  const { docReady } = window.phoenix.utils;

  docReady(contactsBySourceChartInit);

}));
//# sourceMappingURL=crm-dashboard.js.map
