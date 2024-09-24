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
  /*                                Market Share                                */
  /* -------------------------------------------------------------------------- */

  const investmentChartInit = () => {
    const { getData, getColor } = window.phoenix.utils;
    const investmentChart = '.investmentChart';
    const $investmentChartList = document.querySelectorAll(investmentChart);

    $investmentChartList.forEach($investmentChart => {
        const userOptions = getData($investmentChart, 'options');
        const chart = echarts.init($investmentChart);
		const investmentChartParent = $investmentChart.closest('#investmentChartParent');
	    
	    // Get the original values
	    let hw_invest_fil = investmentChartParent.querySelector('#hw_invest_fil').textContent;
	    let total_budget_fil = investmentChartParent.querySelector('#total_budget_fil').textContent;

	    // Format values to 3 decimal places
	    const formatValue = (value) => {
          const decimalIndex = value.indexOf('.');
          return decimalIndex !== -1 ? value.substring(0, decimalIndex + 3) : value;
	    };

	    hw_invest_fil = formatValue(hw_invest_fil);


	    const invest_percent = investmentChartParent.querySelector('#invest_percent').textContent;

      const getDefaultOptions = () => ({
        color: [
          getColor('success'),
          getColor('success-lighter'),
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
            name: hw_invest_fil + " 원",
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
              { value: hw_invest_fil, name: '나의 투자 FIL' },
              { value: total_budget_fil - hw_invest_fil, name: '전체 투자액' },
            ]
          }
        ],
        grid: { containLabel: true }
      });

      echartSetOption(chart, userOptions, getDefaultOptions);
    });
  };
  const { docReady } = window.phoenix.utils;

  //window.revenueMapInit = revenueMapInit;
  docReady(investmentChartInit);
}));
//# sourceMappingURL=ecommerce-dashboard.js.map
