import { DrawerForm, ModalForm } from "@ant-design/pro-components";
import { HuosRemixIcon } from "@huos/icons";
import { Button, Tabs } from "antd";
import { css } from "@emotion/css";
import type { TabsProps } from "antd";
import { CodeEditor } from '@huos/setter'

const tpl = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>无标题</title>
</head>
<body>
  <div id="#root" >
    <!-- 当前内容的结构体 -->
  </div>
</body>
</html>`

export const ConfigSettings = () => {
  return (
    <DrawerForm
      drawerProps={{
        placement: "left",
        closeIcon: false,
        styles: {
          body: {
            padding: 0,
          }
        }
      }}
      submitter={false}
      trigger={<Button icon={<HuosRemixIcon type="icon-settings-3-line" />} />}
    >
      <CodeEditor lang="html" value={tpl} />
    </DrawerForm>
  );
};
