use hdk::prelude::*;
use holo_hash::HeaderHashB64;
use holo_hash::EntryHashB64;

//
// add_thing
//
entry_defs![Thing::entry_def()];

// #[hdk_entry(id = "thing", visibility = "private")] // much slower
#[hdk_entry(id = "thing")]
pub struct Thing {
    name: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct ThingElement {
    thing_name: String,
    header_hash: HeaderHashB64,
    entry_hash: EntryHashB64,
}

#[hdk_extern]
pub fn add_thing(new_thing: Thing) -> ExternResult<ThingElement> {
    let thing_header_hash = create_entry(&new_thing)?;
    let thing_entry_hash = hash_entry(&new_thing)?;

    create_link(
        agent_info()?.agent_latest_pubkey.into(),
        thing_entry_hash.clone(),
        (),
    )?;

    Ok(ThingElement {
        thing_name: new_thing.name.clone(),
        header_hash: HeaderHashB64::from(thing_header_hash),
        entry_hash: EntryHashB64::from(thing_entry_hash),
    })
}

#[hdk_extern]
pub fn get_things_for_agent(agent_pubkey: AgentPubKey) -> ExternResult<Vec<ThingElement>> {
    let mut things: Vec<ThingElement> = Vec::new();

    let links = get_links(agent_pubkey.into(), None)?;

    for link in links.into_inner() {
        let thing_element = _get_thing_element(link)?;
        things.push(thing_element);
    }

    Ok(things)
}

#[hdk_extern]
pub fn get_thing_by_hash(entry_hash_64: EntryHashB64) -> ExternResult<ThingElement> {
    let element: Element = get(EntryHash::from(entry_hash_64), GetOptions::default())?
        .ok_or(WasmError::Guest(String::from("Entry not found")))?;
    let header_hash = HeaderHashB64::from(element.header_address().clone());
    let thing_option: Option<Thing> = element.entry().to_app_option()?;
    let thing: Thing = thing_option.ok_or(
        WasmError::Guest("The targeted entry is not a thing".into())
    )?;
    let thing_entry_hash = hash_entry(&thing)?;
    let entry_hash = EntryHashB64::from(thing_entry_hash);

    Ok(ThingElement {
        thing_name: thing.name.clone(),
        header_hash: header_hash,
        entry_hash: entry_hash,
    })
}

fn _get_thing_element(link: Link) -> ExternResult<ThingElement> {
    let element: Element = get(link.target, GetOptions::default())?
        .ok_or(WasmError::Guest(String::from("Entry not found")))?;
    let header_hash = HeaderHashB64::from(element.header_address().clone());
    let thing_option: Option<Thing> = element.entry().to_app_option()?;
    let thing: Thing = thing_option.ok_or(
        WasmError::Guest("The targeted entry is not a thing".into())
    )?;
    let thing_entry_hash = hash_entry(&thing)?;
    let entry_hash = EntryHashB64::from(thing_entry_hash);
    Ok(ThingElement {
        thing_name: thing.name.clone(),
        header_hash: header_hash,
        entry_hash: entry_hash,
    })
}
