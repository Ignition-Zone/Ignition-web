import { ProForm, ProFormSelect } from "@ant-design/pro-components"


const npmCdnOptions = [
  {
    label: 'unpkg',
    value: 'https://unpkg.com/'
  }
]

export const AppConfig = () => {
  return (
    <ProForm layout="horizontal" submitter={false} >
      <ProFormSelect width="md" label="依赖安装源" options={npmCdnOptions} />
    </ProForm>
  )
}