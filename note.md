* editor 
* framework
* left
* canvas
* right  mount-settings-tsx   属性面板 表单主体, 根据useEditor -> state.events.selected  -> SettingRender

* SettingRender -> 组件导出时配置  ->  setter -> common -> expression-modal等

* @huos/mui       packages/mui


* packages/setter 组件封装
* setter/common  
* expression-modal   packages/setter/components/expression-modal

* CodeEditor  -> onChange={handleOnChange}  -> setCode(codeStr)  setEditing(false)
* onComplete -> props.onChange(code)



* <StringSetter label="按钮文字" name="$$children" initialValue="默认按钮" />
* StringSetter  ->  RenderFieldSetter
* RenderFieldSetter

# 动态逻辑与消息通信

* 消息通信在前面章节的状态设计当中有着重提到过，首先是使用  js的语法糖  封装了基本的  js代码运行时  来完成  属性表达式  的需求支持，这一类是比较基础的功能实现。
* 在React当中，页面是由数据状态来驱动的，阐述就是当状态发生变化时，视图随之而然发生改变。因此，在前期设计状态管理的时候才用中心化的状态进行设计，这样后续在做分发的时候有会自己独特的优势。      中心化 状态分发

* 当低代码平台加载时，在线运行时会将其转换为较为通用的模块来加载执行，来得到用户声明的模块方法，挂载到我们的工作专区当中提供给事件管理器使用。

* ES6模块的在线构建和运行    sucrase
* 模块与组件事件Props的参数绑定
* 如何将API模块化的提供在代码编辑器当中进行使用。

* 模块编译 
* 模块挂载 
* 事件执行

* 物料组件 声明挂载当前的事件列表 以此在编译器中进行挂载。
* 事件管理器    event setter
* 
* packages/core/
    - builder
    - material
    - state zustand
    - vm 
    - loadjs
* packages/setter
* packages/mui 组件库    