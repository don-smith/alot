import { AppWebsocket, InstalledAppInfo } from "@holochain/conductor-api";

interface Thing {
  name: string;
}

export async function connect(): Promise<AppWebsocket> {
  const conn = await AppWebsocket.connect("ws://localhost:8888");
  return conn;
}

export async function addNewThing(
  thingName: string,
  connection: AppWebsocket
): Promise<Thing> {
  const appInfo = await getAppInfo(connection);
  const cellId = appInfo.cell_data[0].cell_id;

  const newThing = await connection.callZome({
    cap: null,
    cell_id: cellId,
    zome_name: "thing",
    fn_name: "add_thing",
    provenance: cellId[1],
    payload: { name: thingName },
  });

  return newThing;
}

async function getAppInfo(connection: AppWebsocket): Promise<InstalledAppInfo> {
  const appInfo = await connection.appInfo({
    installed_app_id: "alot-app",
  });
  return appInfo;
}
