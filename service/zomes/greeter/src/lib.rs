use hdk::prelude::*;

//
// hello
//
#[hdk_extern]
pub fn hello(_: ()) -> ExternResult<String> {
    Ok(String::from("Hello Holo Dev"))
}

//
// add_thing
//
entry_defs![ThingEntry::entry_def()];

#[hdk_entry(id = "thing")]
pub struct ThingEntry {
    name: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct NewThing {
    name: String,
}

#[hdk_extern]
pub fn add_thing(new_thing: NewThing) -> ExternResult<HeaderHash> {
    let new_entry: ThingEntry = ThingEntry { name: new_thing.name };
    create_entry(new_entry)
}
