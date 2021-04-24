use hdk::prelude::*;

//
// add_thing
//
entry_defs![Thing::entry_def()];

#[hdk_entry(id = "thing")]
pub struct Thing {
    name: String,
}

#[hdk_extern]
pub fn add_thing(new_thing: Thing) -> ExternResult<Thing> {
    create_entry(&new_thing)?;
    let thing_entry_hash = hash_entry(&new_thing)?;

    create_link(
        agent_info()?.agent_latest_pubkey.into(),
        thing_entry_hash.clone(),
        (),
    )?;

    Ok(Thing { name: new_thing.name.clone() })
}

#[hdk_extern]
pub fn get_things_for_agent(agent_pubkey: AgentPubKey) -> ExternResult<Vec<Thing>> {
    let mut things: Vec<Thing> = Vec::new();

    let links = get_links(agent_pubkey.into(), None)?;

    for link in links.into_inner() {
        things.push(_get_thing(link)?);
    }

    Ok(things)
}

fn _get_thing(link: Link) -> ExternResult<Thing> {
    let element: Element = get(link.target, GetOptions::default())?
        .ok_or(WasmError::Guest(String::from("Entry not found")))?;
    let thing_option: Option<Thing> = element.entry().to_app_option()?;
    let thing: Thing =
        thing_option.ok_or(WasmError::Guest("The targeted entry is not a thing".into()))?;
    Ok(thing)
}
