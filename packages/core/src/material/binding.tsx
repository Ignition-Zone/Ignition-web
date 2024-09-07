import React from "react";
import _ from "lodash";
import { jsRuntime } from "../runtime";
import { useTranslation } from "react-i18next";
import { useCreateStore } from "../state";
import { App } from "antd";

export const useParseBinding = (
  props: Record<string, any>,
  events?: {
    name: string;
    fn: string;
  }[]
) => {
  const app = App.useApp();

  const { t } = useTranslation();
  const store = useCreateStore((selector) => selector.data);


  // React.useMemo 
  const memoizedProps = React.useMemo(() => {
    function evaluateProps(value: Record<string, any>) {
      if (typeof value === "object" && value !== null && "$$children" in value) {
        try {
          // example
        var evalExample =   window.eval(`
            (() => {
              with ({hous:{state:{title:123456}}}) {
                return (hous.state.title)
              }
            })()
          `);
          // 注意: eval在这里可能是不安全的!
          return jsRuntime.execute(value.$$children.$$jsx, {
            huos: {
              t,
              app,
              // $state: store,
              state: store,
            },
          })?.value;
        } catch {
          console.error("Unable to evaluate $$jsx", value.$$jsx);
          return value;
        }
      } else if (typeof value === "object" && value !== null) {
        const evaluated: Record<string, any> = {};
        for (const key in value) {
          evaluated[key] = evaluateProps(value[key]); // 递归求值
        }
        return evaluated;
      } else {
        return value;
      }
    }
    var propsExample = {
      "$$children": {
          "$$jsx": "huos.state.title"
      }
  }
  var storeExample = {
    "app": {
        "title": "Title1"
    }
}
    console.log('binding.tsx:',props,store)
    return evaluateProps(props);
  }, [props, store]);

  const memoizedEvents = React.useMemo(() => {
    const eventMap: Record<string, Function> = {};
    // 事件处理
    if (Array.isArray(events)) {
      _.forEach(events, ({ name = "", fn = "" }) => {
        const runFun = jsRuntime.execute(fn, {
          huos: {
            t, // 多语言
            app,
            getState: useCreateStore.getState, // 全局状态
          },
        })?.value;

        eventMap[name] = runFun;
      });
    }

    return eventMap;
  }, [events]);

  return {
    ...memoizedProps,
    ...memoizedEvents,
  } as any;
};
