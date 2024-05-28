import { Connections } from "@prisma/client";
import { AppGlobalConfigsRespositorysContainer } from "../../infrastructure/containers/AppGlobalConfigsRespositorysContainer";
import { operatorEnum } from "@/shared/Types/IFilter";

export const validatesIfConnectionTimeExpired = async (
  lastConnection: Connections
) => {
  const { findAppGlobalConfigs } = AppGlobalConfigsRespositorysContainer;
  const globalDataConfig = await findAppGlobalConfigs([
    {
      field: "connectionDurationTime",
      operator: operatorEnum.GREATER_THAN,
      value: 1,
    },
  ]);
  const lastConnectionDate = new Date(lastConnection.occurredAt);
  const currentDate = new Date();
  const difference = currentDate.getTime() - lastConnectionDate.getTime();
  const hoursDifference = difference / (1000 * 3600);
  return hoursDifference <= (globalDataConfig?.connectionDurationTime ?? 24);
};
