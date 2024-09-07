
import { HuosRemixIcon } from "@huos/icons";
import { Button } from "antd";
import { useSettingState } from "@/framework/stores/useSettings";


export const ConfigSettings = () => {
  const onChange = useSettingState((seletor) => seletor.onChange);

  return (
    <Button
      icon={<HuosRemixIcon type="icon-settings-3-line" />}
      onClick={() => onChange("showSetting", true)}
    />
  );
};
