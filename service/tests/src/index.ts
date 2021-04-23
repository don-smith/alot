import path from "path";
import { Orchestrator, Config, InstallAgentsHapps } from "@holochain/tryorama";

const conductorConfig = Config.gen();

// Construct proper paths for your DNAs
const dnaPath = path.join(__dirname, "../../workdir/dna/thing.dna");

// create an InstallAgentsHapps array with your DNAs to tell tryorama what
// to install into the conductor.
const installation: InstallAgentsHapps = [
  // agent 0
  [
    // happ 0
    [dnaPath],
  ],
];

const orchestrator = new Orchestrator();

orchestrator.registerScenario("can save thing entry to source chain", async (s, t) => {
  const [alice] = await s.players([conductorConfig]);

  // install your happs into the coductors and destructuring the returned happ data using the same
  // array structure as you created in your installation array.
  const [[alice_common]] = await alice.installAgentsHapps(installation);

  const result = await alice_common.cells[0].call("thing", "add_thing", {name: "test thing"});
  t.equal(result.length, 39);
});

orchestrator.run();
