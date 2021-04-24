import { AppWebsocket, CellId } from "@holochain/conductor-api";

export interface Thing {
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
  const cellId = await getCellId(connection);
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

export async function getAllThings(connection: AppWebsocket): Promise<Thing[]> {
  const cellId = await getCellId(connection);
  const things: Thing[] = await connection.callZome({
    cap: null,
    cell_id: cellId,
    zome_name: "thing",
    fn_name: "get_things_for_agent",
    provenance: cellId[1],
    payload: cellId[1],
  });

  return things;
}

async function getCellId(connection: AppWebsocket): Promise<CellId> {
  const appInfo = await connection.appInfo({
    installed_app_id: "alot-app",
  });
  return appInfo.cell_data[0].cell_id;
}
