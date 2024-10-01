import { difference } from "lodash";
import { compileModuleResolve, sucraseTransformCode } from '../builder'
import { connectJsRuntimeVM, InjectVMVarsType } from "./iframe";
import { logger } from '..';

export * from "./iframe";
export * from './scope'


export interface ExecuteResult {
  value: any;
  error: any;
  success: boolean;
}

/**
 *
 * @param code 执行的同步代码
 * @param globalScope 全局Scope实例
 */
const handleExecuteEvalCode = (
  code: string,
  gloabalScope?: InjectVMVarsType
) => {
  try {
    const { sandbox } = connectJsRuntimeVM()
    var jsMoudleExample = {
      "exports": {
          "__esModule": true,
          "default": null,
          onAlert1: () => { alert("我是js模块中绑定的alert1事件") },
          onAlert2: () => {
            alert("我是js模块中绑定的alert2事件");
           console.log('调用onAlert1');
              // onAlert1();  注释避免报错
          },
      }
  }
    console.log('gloabalScope:',gloabalScope)
    console.log('sandbox.huosScope.jsMoudle:',sandbox.huosScope.jsMoudle)
    sandbox.__INJECT_VARS__ = Object.assign({},gloabalScope,sandbox.huosScope.jsMoudle);
    console.log('sandbox.__INJECT_VARS__ :',sandbox.__INJECT_VARS__ )
    const value = sandbox.eval(`
        (() => {
          with (window.__INJECT_VARS__) {
            return (${code})
          }
        })()
      `);

    return { value, success: true, error: null } as ExecuteResult;
  } catch (error) {
    return { success: false, error, value: null } as ExecuteResult;
  }
};

/**
 * 
 * @param packageName 包名
 * @param cdnUrl 包地址
 */
const handleInstallNpm = async (packageName: string, cdnUrl?: string) => {
  // if (cdnUrl) {
  //   const data = await import(cdnUrl)
  //   console.log(data, 'data')
  // } else {
  //   logger.error("CDN路径不存在")
  // }
}

/**
 * 处理当前模块地址
 * @param code 代码
 */
const handleMountJsMoudle = async (
  code: string,
) => {
  const { sandbox } = connectJsRuntimeVM()
  const cjsCode = await sucraseTransformCode(code)
  if (cjsCode) {
    const module = compileModuleResolve(cjsCode, sandbox.huosScope.depends)
    console.log('module:',module)
    sandbox.huosScope.jsMoudle = module.exports 
    logger.info("JS模块挂载成功")
  }
}
/**
 * 加载js
 */
const  loadJS =  async function (url: string) {
  this.onGasketInstance();

  const contentWindow = this.iframe.contentWindow!;
  const contentDocument = this.iframe.contentDocument!;

  return new Promise((resolve, reject) => {
    // 先查一遍，看看是否存在已经加载的script
    const matchingElements = contentDocument.querySelectorAll(
      `script[src="${url}"]`
    );

    if (matchingElements.length > 0) {
      resolve(true);
    } else {
      const saveWindowKeys = Object.keys(contentWindow)
      const script = contentDocument.createElement("script");

      script.setAttribute("src", url);

      // 执行过程中发生错误
      contentWindow.addEventListener("error", (evt) => {
        resolve(false);
      });

      script.onload = () => {
        console.log("加载成功: ", url);
        const curWindowKeys = Object.keys(contentWindow)
        const diffKey = difference(curWindowKeys, saveWindowKeys)
        console.log(curWindowKeys.length, saveWindowKeys.length, diffKey, '比对window的长度')
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      // 添加到 iframe 里面
      this.iframe.contentDocument!.head.appendChild(script);
    }
  });
}
export const jsRuntime = {
  execute: handleExecuteEvalCode, //  传入 表达式  function 不一样？
  mountJsMoudle: handleMountJsMoudle,
  installNpm: handleInstallNpm
};


/**
 * 
  jsRuntime.execute(value.$$children.$$jsx, {
  huos: {
    t,
    app,
    // $state: store,
    state: store,
  },
})?.value;


const runFun = jsRuntime.execute(fn, {
          huos: {
            t, // 多语言
            app,
            getState: useCreateStore.getState, // 全局状态
          },
        })?.value;

        eventMap[name] = runFun;
 */


// eval('function test(){console.log(123456)}')

