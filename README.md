# 去哪网

该项目是一个前端项目，主要采用了前端框架 react hook 进项开发。

# 技术栈

    1. react hooks
    2. redux
    3. react-redux
    4. react-router
    5. react-router-dom

# 项目亮点

    1. 采用了lazy懒加载，将单页应用进行拆分，拆分的原则是一页为单位进行拆分。

    2. 使用了useMemo，useCallBack，useEffect，memo函数对组件进行了优化。

# 项目难点

    1. 该项目的数据并不是后端提供的真实数据，所有的数据都是由前端虚拟，这样就增加了项目的数据处理问题的难度，所有的数据逻辑交给前端统一维护。这样也可以锻炼大家数据结构和算法的能力。

    2. 副作用的使用，我们需要十分明确react hooks的副作用函数的目的，以及优化策略。

# 项目使用

    1. yarn start 启动项目

    2. yarn build 打包项目，最总会出现一个build文件
