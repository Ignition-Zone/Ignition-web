import { useSchema } from "@/framework/stores/useSchema";
import { stringifyLzUtfData } from "@/framework/utils/json";
import { useEditor } from "@craftjs/core";
import { App, Button } from "antd";
import _ from "lodash";
import request from '@/framework/utils/request'
import { useParams } from 'react-router-dom'
import { getHuosScopeJsModule } from "@huos/core";
export const Publish = () => {

  const { query } = useEditor()
  const params = useParams()
  const {  message } = App.useApp()
  
  const pageSchema = useSchema((selector) =>
    _.omit(selector, ["setJsModuleCode", "onChange"])
  );
  const onChangeSchema = useSchema((selector) => selector.onChange
  );

  const handlePublishSchame = async () => {
    const serialize = query.serialize()
    console.log('handlePublishSchame:',serialize)
    onChangeSchema('schema', serialize)

    const newSchema: typeof pageSchema = {
      ...pageSchema,
      schema: serialize
    }
    console.log('handlePublishSchame:',newSchema)
    console.log('getHuosScopeJsModule:',getHuosScopeJsModule())
    const josnState = stringifyLzUtfData(JSON.stringify(newSchema))
    
    const data = await request({
      url: `/save/${params?.id}`,
      method: 'PUT',
      data: {
        state: josnState,
        status: 'ONLINE'
      }
    })

    if (data) {
      message.success("保存并且发布成功")
    }
  };

  return (
    <Button type="primary" onClick={handlePublishSchame}>
      发布
    </Button>
  );
};
