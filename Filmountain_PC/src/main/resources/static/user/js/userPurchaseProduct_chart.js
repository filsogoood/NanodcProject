(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  const { merge } = window._;

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

  const investmentChartInit = () => {
    const { getData, getColor } = window.phoenix.utils;
    const investmentChart = '.investmentChart';
    const $investmentChartList = document.querySelectorAll(investmentChart);

    $investmentChartList.forEach($investmentChart => {
      const userOptions = getData($investmentChart, 'options');
      const chart = echarts.init($investmentChart);
      const investmentChartParent = $investmentChart.closest('#investmentChartParent');
      
      let hw_invest_fil = parseFloat(investmentChartParent.querySelector('#hw_invest_fil').textContent.replace(/[^0-9.-]+/g,""));
      let total_budget_fil = parseFloat(investmentChartParent.querySelector('#total_budget_fil').textContent.replace(/[^0-9.-]+/g,""));

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
            const obj = { top: pos[1] - 35 };
            if (window.innerWidth > 540) {
              if (pos[0] <= size.viewSize[0] / 2) {
                obj.left = pos[0] + 20;
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
            name: hw_invest_fil.toLocaleString() + " 원",
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
              { value: hw_invest_fil, name: '나의 구매 금액' },
              { value: total_budget_fil - hw_invest_fil, name: '전체 금액' },
            ]
          }
        ],
        grid: { containLabel: true }
      });

      echartSetOption(chart, userOptions, getDefaultOptions);
    });
  };
  
  const { docReady } = window.phoenix.utils;
  docReady(investmentChartInit);
}));
