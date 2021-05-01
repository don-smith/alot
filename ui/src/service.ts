import { AppWebsocket, CellId } from "@holochain/conductor-api";

export interface Thing {
  name: string;
}

export interface ThingElement {
  thing_name: string;
  header_hash: string;
  entry_hash: string;
}

export async function connect(): Promise<AppWebsocket> {
  const conn = await AppWebsocket.connect("ws://localhost:8888");
  return conn;
}

export async function addNewThing(
  thingName: string,
  connection?: AppWebsocket
): Promise<Thing> {
  const conn = connection ? connection : await connect();
  const cellId = await getCellId(conn);

  const newThing = await conn.callZome({
    cap: null,
    cell_id: cellId,
    zome_name: "thing",
    fn_name: "add_thing",
    provenance: cellId[1],
    payload: { name: thingName },
  });

  return newThing;
}

export async function getAllThings(
  connection?: AppWebsocket
): Promise<ThingElement[]> {
  const conn = connection ? connection : await connect();
  const cellId = await getCellId(conn);

  const things: ThingElement[] = await conn.callZome({
    cap: null,
    cell_id: cellId,
    zome_name: "thing",
    fn_name: "get_things_for_agent",
    provenance: cellId[1],
    payload: cellId[1],
  });

  // console.log("things:", JSON.stringify(things, null, 2));
  return things;
}

export async function getThing(
  hash: string,
  connection?: AppWebsocket
): Promise<ThingElement> {
  const conn = connection ? connection : await connect();
  const cellId = await getCellId(conn);

  const thing: ThingElement = await conn.callZome({
    cap: null,
    cell_id: cellId,
    zome_name: "thing",
    fn_name: "get_thing_by_hash",
    provenance: cellId[1],
    payload: hash,
  });

  // console.log("things:", JSON.stringify(things, null, 2));
  return thing;
}

async function getCellId(connection: AppWebsocket): Promise<CellId> {
  const appInfo = await connection.appInfo({
    installed_app_id: "alot-app",
  });
  return appInfo.cell_data[0].cell_id;
}
