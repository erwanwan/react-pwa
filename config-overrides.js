const { override,addLessLoader,addPostcssPlugins,overrideDevServer } = require('customize-cra');

const addProxy = () => (configFunction) => {
    configFunction.proxy = {
      "/question/question/add": {
        target: "http://xxx.com/",
        changeOrigin: true,
      },
    };
  
    return configFunction;
  };

module.exports = {
   webpack: override(
    addLessLoader(),
    addPostcssPlugins([
        require("postcss-write-svg")({
            // 直接在CSS中编写SVG 可以解决1px在retina屏幕下的显示
            utf8: false,
          }),
        require("postcss-viewport-units")({}), //解决vw在低版本移动设备的兼容性
        require("postcss-px-to-viewport")({
            // 可将px转换为vw单位
            viewportWidth: 375, // (Number) The width of the viewport.  设计稿的视口宽度
            viewportHeight: 667, // (Number) The height of the viewport.  设计稿的视口高度
            unitPrecision: 5, // (Number) The decimal numbers to allow the REM units to grow to.  单位转换后保留的精度
            viewportUnit: "vw", // (String) Expected units.  希望使用的视口单位
            selectorBlackList: [".ignore"], // (Array) The selectors to ignore and leave as px.  需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位
            minPixelValue: 1, // (Number) Set the minimum pixel value to replace.  设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // (Boolean) Allow px to be converted in media queries.  媒体查询里的单位是否需要转换单位
          }),
    ])
   ),
   devServer: overrideDevServer(addProxy()),
}