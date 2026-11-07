/* ############################################################################################################################# */
/* #######################################################[ GAME VARIABLES ]#################################################### */
/* ############################################################################################################################# */

// [Variable] Session Map Data Object
var sessionMapData = {
    vars: {
        "MOVE_COOLDOWN_MS":150, // Open: Can be changed for 'speed boost', maybe even game-speed setting
        "xSize":25, // Settings: Used to edit board size
        "ySize":15,  // Settings: Used to edit board size
        "openTiles":0, // Private: Calculated from size
        "playerCount":0, // Private: Used to limit player count
        "bots":0, // Private: Used to limit bot count
        "result1":0, // Private: Player 1 Score
        "result2":0, // Private: Player 2 Score
        "gameClock":0, // Private: Game Clock
        "debugMenuOn":false, // Private: Toggle for debug menu
        "timestamp":0, // Private: Used for save timestamp
        "randX":0, // Private: Used for random tile generation
        "randY":0 // Private: Used for random tile generation
    },
    players: {
        "p1":{
            "active":false, // Private: Used to limit player count
            "xPos":0, // Private: Used to track player position
            "yPos":0, // Private: Used to track player position
            "keys":{ // Settings: Can be changed for custom keybinds
                "up":"w", 
                "down":"s", 
                "left":"a", 
                "right":"d"
            },
            "inventory":{ // Open: Can be changed for custom inventory effects
                0:{"item":"assets/blank.png", "count":0},
                1:{"item":"assets/blank.png", "count":0},
                2:{"item":"assets/blank.png", "count":0},
                3:{"item":"assets/blank.png", "count":0},
                4:{"item":"assets/blank.png", "count":0},
                5:{"item":"assets/blank.png", "count":0},
                6:{"item":"assets/blank.png", "count":0},
                7:{"item":"assets/blank.png", "count":0},
                8:{"item":"assets/blank.png", "count":0},
                9:{"item":"assets/blank.png", "count":0},
                10:{"item":"assets/blank.png", "count":0},
                11:{"item":"assets/blank.png", "count":0},
                12:{"item":"assets/blank.png", "count":0},
                13:{"item":"assets/blank.png", "count":0},
                14:{"item":"assets/blank.png", "count":0},
                15:{"item":"assets/blank.png", "count":0},
            }
        }, 
        "p2":{
            "active":false, 
            "xPos":0, 
            "yPos":0, 
            "keys":{
                "up":"ArrowUp", 
                "down":"ArrowDown", 
                "left":"ArrowLeft", 
                "right":"ArrowRight"
            },
            "inventory":{
                0:{"item":"assets/blank.png", "count":0},
                1:{"item":"assets/blank.png", "count":0},
                2:{"item":"assets/blank.png", "count":0},
                3:{"item":"assets/blank.png", "count":0},
                4:{"item":"assets/blank.png", "count":0},
                5:{"item":"assets/blank.png", "count":0},
                6:{"item":"assets/blank.png", "count":0},
                7:{"item":"assets/blank.png", "count":0},
                8:{"item":"assets/blank.png", "count":0},
                9:{"item":"assets/blank.png", "count":0},
                10:{"item":"assets/blank.png", "count":0},
                11:{"item":"assets/blank.png", "count":0},
                12:{"item":"assets/blank.png", "count":0},
                13:{"item":"assets/blank.png", "count":0},
                14:{"item":"assets/blank.png", "count":0},
                15:{"item":"assets/blank.png", "count":0},
            }
        }, 
        "bot":{
            "active":false, 
            "xPos":0, 
            "yPos":0}
        },
    assets: {
        "p1":"assets/redMonsterDown.png", 
        "p2":"assets/blueMonsterDown.png", 
        "bot":"assets/greenMonsterDown.png", 
        "wall":"assets/tileBlackW.png", 
        "space":"assets/blank.png", 
        "entity":[
            "assets/redMonsterDown.png",
            "assets/blueMonsterDown.png",
            "assets/greenMonsterDown.png",
            "assets/tileBlackW.png"
        ],
        "food":[
            "assets/food/apple.png", 
            "assets/food/banana.png", 
            "assets/food/cherry.png", 
            "assets/food/grape.png", 
            "assets/food/kiwi.png", 
            "assets/food/lemon.png", 
            "assets/food/lime.png", 
            "assets/food/mango.png", 
            "assets/food/orange.png", 
            "assets/food/papaya.png", 
            "assets/food/pear.png", 
            "assets/food/pineapple.png", 
            "assets/food/rambutan.png", 
            "assets/food/soursop.png", 
            "assets/food/starfruit.png", 
            "assets/food/strawberry.png", 
            "assets/food/watermelon.png"
        ],
        "item":[
            "assets/chest.png", 
            "assets/goldChest.png", 
            "assets/key.png", 
            "assets/heartKey.png", 
            "assets/scroll.png", 
            "assets/coins.png", 
            "assets/potion.png", 
            "assets/invisibility.png",
            "assets/cancel.png"
        ]},
    drawMode: {
        "paintColor":"none", 
        "flashColor1":"none", 
        "flashColor2":"red", 
        "current":{
            "tool":"draw",
            "mode":"click", 
            "shape":"dot", 
            "input":"chest",
        },
        "last":{
            "tool":"draw",
            "mode":"click", 
            "shape":"dot", 
            "input":"chest",
        },
        "inputOn":false, // use in tool 
        "boxOn":false, 
        "bucketOn":false, 
        "x1":0, 
        "y1":0, 
        "x2":0, 
        "y2":0},
    tiles: {}
};

/* [Variable] Debug session counter */
let session_id = 0; 

/* ############################################################################################################################# */
/* #######################################################[ SAVING LOGIC ]###################################################### */
/* ############################################################################################################################# */

/* [Saving] Saves game and map to LocalStorage */
function saveGame() {
    try {
        // Saves current board state to sessionMapData.tiles
        boardSave();
        // Saves sessionMapData to localStorage as JSON string
        const string = JSON.stringify(sessionMapData);
        localStorage.setItem("save", string);
        // Alert user that the game has been saved
        announcer("Game saved locally!");
    } catch (e) {
        console.warn("Failed to save board:", e);
    }
}

/* [Saving] Loads game and map from LocalStorage */
function loadGame() {
    try {
        let currentSettings = sessionMapData.drawMode.current;
        const string = localStorage.getItem("save");
        const load = JSON.parse(string);
        sessionMapData.vars = load.vars || {};
        sessionMapData.players = load.players || {};
        sessionMapData.assets = load.assets || {};
        sessionMapData.drawMode = load.drawMode || {};
        sessionMapData.tiles = load.tiles || {};
        sessionMapData.drawMode.last = currentSettings;
        boardLoad(sessionMapData.tiles);
        setDrawMode();
        requestAnimationFrame(update);
        // Alert user that the game has been loaded
        announcer("Game loaded locally!");
    } catch (e) {
        console.warn("Failed to load board:", e);
        return null;
    }
}

/* [Saving] Saves game and map to JSON file */
async function saveToFile(sessionMapData) {
    try {
        // Saves current board state to sessionMapData.tiles; resets last drawmode flags
        boardSave();
        // Open browser 'Save As' dialog
        const handle = await window.showSaveFilePicker({
        suggestedName: 'test.json',
        types: [{
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
        }],
        });

        // Create writable stream and write the stringified object
        const writable = await handle.createWritable();
        await writable.write(JSON.stringify(sessionMapData, null, 2));
        await writable.close();
        announcer("Game saved to file!");
        console.log("File saved successfully!");
    } catch (err) {
        console.error("Save cancelled or failed:", err);
    }
}

/* [Saving] Loads game and map from JSON file */
async function loadFromFile() {
    try {
        let currentSettings = sessionMapData.drawMode.current;
        // Open browser native 'Open File' dialog
        const [handle] = await window.showOpenFilePicker({
        types: [{
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
        }],
        });
        // Get file contents and read as text
        const file = await handle.getFile();
        const text = await file.text();
        // Parse back into a JS Object, load board
        sessionMapData = JSON.parse(text);
        sessionMapData.drawMode.last = currentSettings;
        boardLoad(sessionMapData.tiles);
        setDrawMode();
        requestAnimationFrame(update);
        announcer("Game loaded from file!");
        console.log("File loaded successfully!");
    } catch (err) {
        console.error("Load cancelled or failed:", err);
    }
}

/* [Saving] Saves board src and background to sessionMapData[tiles] object */
function boardSave() {
    for (let x = 0; x < sessionMapData.vars["xSize"]; x++) {
        for (let y = 0; y < sessionMapData.vars["ySize"]; y++) {
            const tileID = x + "_" + y;
            const computed = getComputedStyle(document.getElementById(tileID));
            sessionMapData.tiles[tileID] = {
                src: document.getElementById(tileID).getAttribute("src") || "sessionMapData.assets['blank']",
                background: computed.backgroundColor || "none"
            };
        }
    }
}

/* [Saving] Loads board src and background from sessionMapData[tiles] object */
function boardLoad(map) {
    for (const [tileID, attribute] of Object.entries(map)) {
        if (!document.getElementById(tileID)) 
            continue;
        if (attribute.src !== undefined) 
            document.getElementById(tileID).setAttribute('src', attribute.src);
        if (attribute.background !== undefined) 
            document.getElementById(tileID).style.backgroundColor = attribute.background;
    }
}

/* ############################################################################################################################# */
/* ######################################################[ MAIN GAME LOGIC ]#################################################### */
/* ############################################################################################################################# */

/* [Main] Main function, initializes on page load */
function onload() {
    // Monster Tiles Sandbox Initialization
    initializeBoard(sessionMapData.vars["xSize"], sessionMapData.vars["ySize"]);
    initializeSandboxMenu();
    setTool("draw");
    setMode("click");
    setShape("dot");
    setInput("chest");
    // Session Tracker (Counts Debug Sessions)
    session_id = parseInt(localStorage.getItem("session_id")) || 0;
    localStorage.setItem("session_id", session_id += 1);
}

/* [Main] Game timer and win condition definitions*/
async function timer(time) {
    document.getElementById("start").style = "display: none;";
    if (time == undefined) {
        time = prompt("How long do you want to play?") || 30;
        while (time > sessionMapData.vars["openTiles"]) {
            alert("A bit too long!");
            time = prompt("How much food do you want to add?") || 30;
        }
    }
    sessionMapData.vars["gameClock"] = time * 10;
    document.getElementById("announcer").innerHTML = "Time Remaining: " + sessionMapData.vars["gameClock"] / 10;
    while (sessionMapData.vars["gameClock"] > 0) {
        await delay(100);
        sessionMapData.vars["gameClock"] -= 1;
        document.getElementById("announcer").innerHTML = "Time Remaining: " + sessionMapData.vars["gameClock"] / 10;
    }
    await delay(1000);
    document.getElementById("announcer").innerHTML = "Time is up!";
    sessionMapData.players["p1"].active = false;
    sessionMapData.players["p2"].active = false;
    let endMessage;
    let winner = sessionMapData.assets["bot"];
    if (sessionMapData.vars["result1"] == sessionMapData.vars["result2"]) {
        endMessage = "Tie!";
    } else if (sessionMapData.vars["result1"] > sessionMapData.vars["result2"]) {
        endMessage = "Player 1 Wins!";
        winner = sessionMapData.assets["p1"];
    } else {
        endMessage = "Player 2 Wins!";
        winner = sessionMapData.assets["p2"];
    }
    await delay(1000);
    document.getElementById("announcer").innerHTML = endMessage;
    await delay(5000);
    document.getElementById("announcer").innerHTML = ".";
    document.getElementById("announcer").style = "color: white;";
    document.getElementById("start").style = "display: block;";
    document.getElementById("start").innerHTML = "<button onclick='start()'>Play Again?</button>";
}

/* [Main] Game initialization sequence */
async function start() {
    addPlayer1();
    addPlayer2();
    spawnTile(sessionMapData.assets["wall"]);
    spawnTile(sessionMapData.assets["wall"]);
    spawnTile(sessionMapData.assets["wall"]);
    spawnFood();
    timer(30);
    await delay(5000);
    spawnFood();
    await delay(5000);
    spawnFood();
}

/* [Main] Test code execution */
function runTest() {
    announcer("Test Code Running!");

}

/* ############################################################################################################################# */
/* ####################################################[ MODULE INITIALIZATION ]################################################ */
/* ############################################################################################################################# */

/* [Module] Initializes game board map */
function initializeBoard(xInput, yInput) {
    sessionMapData.vars["xSize"] = xInput;
    sessionMapData.vars["ySize"] = yInput;
    sessionMapData.vars["openTiles"] = xInput * yInput;
    let boardTextArray = [];
    boardTextArray.push("<table>");
    for (let i = 0; i < sessionMapData.vars["ySize"]; i++) {
        boardTextArray.push("<tr>");
        for (let j = 0; j < sessionMapData.vars["xSize"]; j++) {
            let newString = '<td><img id="' + j + '_' + i + '" class="back" src="' + sessionMapData.assets["space"] + '"><p class="posHint" style="margin:0; padding:0; font-size: 0.5vw; display: none; position: absolute; bottom: 0px; right: 0px;">(' + j + ',' + i + ')</p></td>';
            boardTextArray.push(newString);
        }
        boardTextArray.push("</tr>");
    }
    boardTextArray.push("</table>");
    let boardText = boardTextArray.join("");
    document.getElementById("board").innerHTML = boardText;
}

/* [Module] Initializes sandbox menu */
function initializeSandboxMenu() {
    document.getElementById("toolbox").innerHTML = '<div><button onclick="timer()">Time</button><button onclick="spawnFood()">Spawn Food</button><button onclick="addTile(' + "'food'" + ')">Add Food</button><button onclick="clearFood()">Clear Food</button><button onclick="fillBoard()">Clear Board</button></div>'
}

/* [Module] Initializes debug menu for testing */
async function toggleDebugMenu() {
    if (sessionMapData.vars["debugMenuOn"] === false) {
        document.getElementById("debugMenu").innerHTML = '<div><p><b><u>Debug Menu Opened Clock:</b>&nbsp; <span id="clock"></span></u></p><p><b>Map:</b>&nbsp; <span id="xSize"></span> &#10761; <span id="ySize"></span> &nbsp;|&nbsp; <b>Game Clock:</b>&nbsp; <span id="gameClock"></span></p><p><b>Open Tiles:</b>&nbsp; <span id="openTiles"></span> &nbsp;|&nbsp; <b>Players:</b>&nbsp; <span id="playerCount"></span></p><br><p><b>Player 1 (XY):</b>&nbsp; <span id="activeP1"></span>&nbsp; (<span id="xPosP1"></span>,<span id="yPosP1"></span>)</p><p><b>Player 2 (XY):</b>&nbsp; <span id="activeP2"></span>&nbsp; (<span id="xPosP2"></span>,<span id="yPosP2"></span>)</p><p><b>Bot:</b>&nbsp; <span id="activeBot"></span></p><p><b>Random (XY):</b>&nbsp; (<span id="randX"></span>, <span id="randY"></span>)</p><br><p><b>Draw Mode:</b>&nbsp; <span id="drawMode"></span></p><br><p>F2 - Toggle Position Coordinates</p><p>F3 - Toggle Debug Menu</p></div>';
        sessionMapData.vars["debugMenuOn"] = true;
        document.getElementById("debugMenu").style.display = "block";        
    } else {
        document.getElementById("debugMenu").style.display = "none";
        sessionMapData.vars["debugMenuOn"] = false;
    }
    let clock = 0;
    while (sessionMapData.vars["debugMenuOn"]) {
        document.getElementById("xSize").innerHTML = sessionMapData.vars["xSize"];
        document.getElementById("ySize").innerHTML = sessionMapData.vars["ySize"];
        document.getElementById("gameClock").innerHTML = sessionMapData.vars["gameClock"] / 10;
        document.getElementById("openTiles").innerHTML = sessionMapData.vars["openTiles"] + "/" + sessionMapData.vars["xSize"] * sessionMapData.vars["ySize"];
        document.getElementById("playerCount").innerHTML = sessionMapData.vars["playerCount"];
        document.getElementById("xPosP1").innerHTML = sessionMapData.players["p1"].xPos;
        document.getElementById("yPosP1").innerHTML = sessionMapData.players["p1"].yPos;
        document.getElementById("xPosP2").innerHTML = sessionMapData.players["p2"].xPos;
        document.getElementById("yPosP2").innerHTML = sessionMapData.players["p2"].yPos;
        document.getElementById("randX").innerHTML = sessionMapData.vars["randX"];
        document.getElementById("randY").innerHTML = sessionMapData.vars["randY"];
        document.getElementById("activeBot").innerHTML = sessionMapData.players["bot"].active == true ? "active" : "inactive"; 
        document.getElementById("activeP1").innerHTML = sessionMapData.players["p1"].active == true ? "active" : "inactive";
        document.getElementById("activeP2").innerHTML = sessionMapData.players["p2"].active == true ? "active" : "inactive";
        document.getElementById("clock").innerHTML = clock / 10;
        document.getElementById("drawMode").innerHTML = sessionMapData.drawMode.current["tool"] + " " + sessionMapData.drawMode.current["mode"] + " " + sessionMapData.drawMode.current["shape"] + " " + sessionMapData.drawMode.current["input"] + "<br><b>(X1, Y1):</b> &nbsp;(" + sessionMapData.drawMode["x1"] + ", " + sessionMapData.drawMode["y1"] + ") &nbsp;|&nbsp; <b>(X2, Y2):</b> &nbsp;(" + sessionMapData.drawMode["x2"] + ", " + sessionMapData.drawMode["y2"] + ")";
        await delay(100);
        clock += 1;
    }
}

/* ############################################################################################################################# */
/* #######################################################[ PLAYER LOGIC ]###################################################### */
/* ############################################################################################################################# */

/* [Player] Adds red monster player 1 to game */
function addPlayer1() {
    if (sessionMapData.vars["openTiles"] != 0) {
        if (sessionMapData.players["p1"].active == false && sessionMapData.vars["playerCount"] != 2) {
            while (sessionMapData.players["p1"].active != true) {
                document.getElementById(randomValidID()).src = sessionMapData.assets["p1"];
                sessionMapData.vars["openTiles"]--;
                sessionMapData.players["p1"].xPos = sessionMapData.vars["randX"];
                sessionMapData.players["p1"].yPos = sessionMapData.vars["randY"];
                sessionMapData.vars["playerCount"] += 1;
                sessionMapData.players["p1"].active = true;
            }
        } else {
            swapTileSrc(sessionMapData.players["p1"].xPos + "_" + sessionMapData.players["p1"].yPos, randomValidID());
            sessionMapData.players["p1"].xPos = sessionMapData.vars["randX"];
            sessionMapData.players["p1"].yPos = sessionMapData.vars["randY"];
        }
    }
}

/* [Player] Adds blue monster player 2 to game */
function addPlayer2() {
    if (sessionMapData.vars["openTiles"] != 0) {
        if (sessionMapData.players["p2"].active == false && sessionMapData.vars["playerCount"] != 2) {
            while (sessionMapData.players["p2"].active != true) {
                document.getElementById(randomValidID()).src = sessionMapData.assets["p2"];
                sessionMapData.vars["openTiles"]--;
                sessionMapData.players["p2"].xPos = sessionMapData.vars["randX"];
                sessionMapData.players["p2"].yPos = sessionMapData.vars["randY"];
                sessionMapData.vars["playerCount"] += 1;
                sessionMapData.players["p2"].active = true;
            }
        } else {
            swapTileSrc(sessionMapData.players["p2"].xPos + "_" + sessionMapData.players["p2"].yPos, randomValidID());
            sessionMapData.players["p2"].xPos = sessionMapData.vars["randX"];
            sessionMapData.players["p2"].yPos = sessionMapData.vars["randY"];
        }
    }
}

/* [Player] Adds green monster bot to game */
function addBot() {
    if (sessionMapData.vars["openTiles"] != 0) {
        if (sessionMapData.players["bot"].active == false && sessionMapData.vars["bots"] != 1) {
            while (sessionMapData.players["bot"].active != true) {
                document.getElementById(randomValidID()).src = sessionMapData.assets["bot"];
                sessionMapData.vars["openTiles"]--;
                sessionMapData.players["bot"].xPos = sessionMapData.vars["randX"];
                sessionMapData.players["bot"].yPos = sessionMapData.vars["randY"];
                sessionMapData.vars["bots"] += 1;
                sessionMapData.players["bot"].active = true;
            }
        } else {
            swapTileSrc(sessionMapData.players["bot"].xPos + "_" + sessionMapData.players["bot"].yPos, randomValidID());
            sessionMapData.players["bot"].xPos = sessionMapData.vars["randX"];
            sessionMapData.players["bot"].yPos = sessionMapData.vars["randY"];
        }
    }
}

/* ############################################################################################################################# */
/* ######################################################[ MOVEMENT LOGIC ]##################################################### */
/* ############################################################################################################################# */

/* [Movement] Updates movement position by tile type */
function moveTile(oldID, newID) { 
    let subject = document.getElementById(oldID).getAttribute("src");
    let target = document.getElementById(newID).getAttribute("src");
    // Target tile is food tile, increment score, swap src, set old tile to space, increment openTiles
    if (isFood(newID)) { 
        // Potential for specific food point expansions here in new sub-function
        if (subject == sessionMapData.assets["p1"]) {
            sessionMapData.vars["result1"]++;
            document.getElementById("result1").innerHTML = sessionMapData.vars["result1"];
        } else if (subject == sessionMapData.assets["p2"]) {
            sessionMapData.vars["result2"]++;
            document.getElementById("result2").innerHTML = sessionMapData.vars["result2"];
        }
        swapTileSrc(oldID, newID);
        document.getElementById(oldID).src = sessionMapData.assets["space"];
        sessionMapData.vars["openTiles"]++;
        return true;
    // Target tile is entity tile, add to inventory, swap src, set old tile to space, increment openTiles
    } else if (isItem(newID)) {
        // Checks if subject is Player 1
        if (subject == sessionMapData.assets["p1"]) {
            // Potion effect
            if (target == "assets/potion.png") {
                booPotion();
            } else {
                addToInventory("p1", target);
            }
        // Checks if subject is Player 2
        } else if (subject == sessionMapData.assets["p2"]) {
            // Potion effect
            if (target == "assets/potion.png") {
                booPotion();
            } else {
                addToInventory("p2", target);
            }
        }
        swapTileSrc(oldID, newID);
        document.getElementById(oldID).src = sessionMapData.assets["space"];
        sessionMapData.vars["openTiles"]++;
        return true;
    // Target tile is valid placement, swap src, set old tile to space, increment openTiles
    } else if (isValidPlace(newID)) {
        swapTileSrc(oldID, newID);
        return true; 
    // Target tile is invalid placement, do nothing (e.g. wall, player, out of bounds)
    } else {
        return false;
    }
}

/* [Helper] Swap tile srcs by tileID */
function swapTileSrc(tileIDa, tileIDb) {
    let tempSrc = document.getElementById(tileIDb).getAttribute("src");
    document.getElementById(tileIDb).src = document.getElementById(tileIDa).getAttribute("src");
    document.getElementById(tileIDa).src = tempSrc;
}

/* ############################################################################################################################# */
/* ######################################################[ INVENTORY LOGIC ]#################################################### */
/* ############################################################################################################################# */

/* Game: Update Inventory */
function updateInventory() {
    for (let x = 0; x < 16; x++) {
        // Updates Player 1 Items & Counts
        document.getElementById("p1_" + x + "i").src = sessionMapData.players.p1.inventory[x].item;
        if (sessionMapData.players.p1.inventory[x].count > 1)
            document.getElementById("p1_" + x + "c").src = "assets/inventory/inv" + sessionMapData.players.p1.inventory[x].count + ".png";
        // Updates Player 2 Items & Counts
        document.getElementById("p2_" + x + "i").src = sessionMapData.players.p2.inventory[x].item;
        if (sessionMapData.players.p2.inventory[x].count > 1)
            document.getElementById("p2_" + x + "c").src = "assets/inventory/inv" + sessionMapData.players.p2.inventory[x].count + ".png";
    }
}

/* Game: Add to Inventory */
function addToInventory(player, item) {
    let slotIndex = checkInventory(player, item);
    if (slotIndex >= 0) {
        // add to inventory if space available in checkInventory return.
        sessionMapData.players[player].inventory[slotIndex].item = item;
        sessionMapData.players[player].inventory[slotIndex].count += 1;
        updateInventory();
    } else {     
        announcer(player + " inventory full!");
    }
            
}

/* Helper: Returns first available space if item is not in inventory */
function checkInventory(player, item) {
    let slotIndex = 0;
    while (slotIndex < 16) {
        let src = sessionMapData.players[player].inventory[slotIndex].item;
        let itemCount = sessionMapData.players[player].inventory[slotIndex].count;
        if (src == item && itemCount < 64) {
            return slotIndex;
        } else if (src == "assets/blank.png") {
            return slotIndex;
        } 
        slotIndex++;
    }
    if (slotIndex >= 16) {
        return -1;
    }
}

/* ############################################################################################################################# */
/* ###################################################[ PLACEMENT/TYPE CHECKERS ]############################################### */
/* ############################################################################################################################# */

/* Helper: Returns true if valid placement and isn't null */
function isValidPlace(tileID) {
    const src = getSrc(tileID);
    if (src === null) return false;
    return !isFood(tileID) && !isItem(tileID) && !isEntity(tileID);
}

/* Helper: Returns true if tile is food (can be scored) */
function isFood(tileID) {
    const src = getSrc(tileID);
    return src !== null && sessionMapData.assets["food"].includes(src);
}

/* Helper: Returns true if tile is item (can be picked up and added to inventory) */
function isItem(tileID) {
    const src = getSrc(tileID);
    return src !== null && sessionMapData.assets["item"].includes(src);
}

/* Helper: Returns true if tile is entity (cannot be collided with) */
function isEntity(tileID) {
    const src = getSrc(tileID);
    return src !== null && sessionMapData.assets["entity"].includes(src);
}

/* ############################################################################################################################# */
/* ####################################################[ MAP GENERATION LOGIC ]################################################# */
/* ############################################################################################################################# */

/* Map: Set tile image src by position */
function setTileSrc(tileSrc, x, y) {
    let tileID = x + "_" + y;
    // If tile out of bounds, or srcs the same, do nothing
    if (x < 0 || y < 0 || x > sessionMapData.vars["xSize"] - 1 || y > sessionMapData.vars["ySize"] - 1 || document.getElementById(tileID).getAttribute("src") == tileSrc) {
        return;
    }
    // If target src is player1, deactivate game, decrement playerCount
    if (document.getElementById(tileID).getAttribute("src") == sessionMapData.assets["p1"]) {
        sessionMapData.players["p1"].active = false;
        sessionMapData.vars["playerCount"]--;
    // If target src is player2, deactivate game, decrement playerCount
    } else if (document.getElementById(tileID).getAttribute("src") == sessionMapData.assets["p2"]) {
        sessionMapData.players["p2"].active = false;
        sessionMapData.vars["playerCount"]--;
    }
    // Input subject not space, target is space
    if (tileSrc != sessionMapData.assets["space"] && document.getElementById(tileID).getAttribute("src") == sessionMapData.assets["space"]) {
        sessionMapData.vars["openTiles"]--;
        document.getElementById(tileID).src = tileSrc;
    // Input subject is space, target isn't space
    } else if (tileSrc == sessionMapData.assets["space"] && document.getElementById(tileID).getAttribute("src") != sessionMapData.assets["space"]) {
        sessionMapData.vars["openTiles"]++;
        document.getElementById(tileID).src = tileSrc;
    // Input subject not space, target not space; no change to openTiles
    } else {
        document.getElementById(tileID).src = tileSrc;
    }
}

/* Map: Fill board with tileSrc, reset variables */
function fillBoard(tileSrc) {
    resetVars();
    if (tileSrc == null) {
        for (let i = 0; i < sessionMapData.vars["ySize"]; i++) {
            for (let j = 0; j < sessionMapData.vars["xSize"]; j++) {
                let tileID = j + "_" + i;
                document.getElementById(tileID).src = sessionMapData.assets["space"];
            }
        }
    } else if (tileSrc == "food") {
        for (let i = 0; i < sessionMapData.vars["ySize"]; i++) {
            for (let j = 0; j < sessionMapData.vars["xSize"]; j++) {
                let tileID = j + "_" + i;
                document.getElementById(tileID).src = randomFoodType();
            }
        }
        sessionMapData.vars["openTiles"] = 0;
    } else if (tileSrc != sessionMapData.assets["space"]) {
        for (let i = 0; i < sessionMapData.vars["ySize"]; i++) {
            for (let j = 0; j < sessionMapData.vars["xSize"]; j++) {
                let tileID = j + "_" + i;
                document.getElementById(tileID).src = tileSrc;
            }
        }
        sessionMapData.vars["openTiles"] = 0;
    }
}

/* Map: Spawn random amount of tiles */
function spawnTile(tileSrc) {
    let amt = Math.floor(Math.random() * sessionMapData.vars["openTiles"] / 8);
    while (amt != 0) {
        if ((tileSrc) != sessionMapData.assets["space"]) {
            sessionMapData.vars["openTiles"]--;
        }
        document.getElementById(randomValidID()).src = tileSrc;
        amt--;
    }
}

/* Map: Spawn specified amount of tiles */
function addTile(tileSrc, amt) {
    if (amt == undefined) {
        amt = prompt("How many " + tileSrc + " tiles do you want to add?") || 0;
        while (amt > sessionMapData.vars["openTiles"]) {
            alert("Board not big enough!");
            amt = prompt("How many " + tileSrc + " tiles do you want to add?") || 0;
        }
    }
    if (tileSrc == "food") {
        while (amt != 0) {
            let foodType = randomFoodType();
            document.getElementById(randomValidID()).src = foodType;
            sessionMapData.vars["openTiles"]--;
            amt--;
        }
    } else {
        while (amt != 0) {
            if ((tileSrc) != sessionMapData.assets["space"]) {
                sessionMapData.vars["openTiles"]--;
            }
            document.getElementById(randomValidID()).src = tileSrc;
            amt--;
        }
    }
}

/* Helper: Returns random ID */
function randomID() {
    let randX = Math.floor(Math.random() * sessionMapData.vars["xSize"]);
    let randY = Math.floor(Math.random() * sessionMapData.vars["ySize"]);
    let tileID = randX + "_" + randY;
    sessionMapData.vars["randX"] = randX;
    sessionMapData.vars["randY"] = randY;
    return tileID;
}

/* Helper: Returns random valid ID*/
function randomValidID() {
    while (isValidPlace(randomID()) != true) {
        isValidPlace(randomID());
    }
    let tileID = sessionMapData.vars["randX"] + "_" + sessionMapData.vars["randY"];
    return tileID;
}

/* Helper: Returns random food type for generation */
function randomFoodType() {
    let amt = Math.floor(Math.random() * sessionMapData.assets["food"].length);
    return sessionMapData.assets["food"][amt];
}

/* Map: Spawn random amount of food */
function spawnFood() {
    if (sessionMapData.vars["openTiles"] == 0) {
        announcer("No more open tiles!", 1)
    };
    let amt = Math.floor(Math.random() * sessionMapData.vars["openTiles"] / 8);
    if (amt == 0 && sessionMapData.vars["openTiles"] > 0) {
        amt = 1;
    }
    while (amt != 0) {
        let foodType = randomFoodType();
        document.getElementById(randomValidID()).src = foodType;
        sessionMapData.vars["openTiles"]--;
        amt--;
    }
}

/* Map: Clear food from board */
function clearFood() {
    for (let i = 0; i < sessionMapData.vars["ySize"]; i++) {
        for (let j = 0; j < sessionMapData.vars["xSize"]; j++) {
            if (isFood(j + "_" + i)) {
                document.getElementById(j + "_" + i).src = sessionMapData.assets["space"];
                sessionMapData.vars["openTiles"]++;
            }
        }
    }
}

/* Map: Swap tile source type */
// function swapSource(tileTypeA, tileTypeB) {
//     for (let i = 0; i < sessionMapData.vars["ySize"]; i++) {
//         for (let j = 0; j < sessionMapData.vars["xSize"]; j++) {
//             let tileID = j + "_" + i;
//             if (document.getElementById(tileID).getAttribute("src") == "assets/" + tileTypeA + ".png") {
//                 document.getElementById(tileID).src = "assets/" + tileTypeB + ".png";
//                 sessionMapData.vars["openTiles"]--;
//             } else if (document.getElementById(tileID).getAttribute("src") == "assets/" + tileTypeB + ".png") {
//                 document.getElementById(tileID).src = "assets/" + tileTypeA + ".png";
//                 sessionMapData.vars["openTiles"]++;
//             }
//         }
//     }
// }

/* [WIP] Generate random map */
// function generateRandomMap() {
//     randomValidID();
//     dotMid(sessionMapData.assets["wall"], sessionMapData.vars["randX"], sessionMapData.vars["randY"]);
    
// }

/* ############################################################################################################################# */
/* #######################################################[ DRAWMODE LOGIC ]#################################################### */
/* ############################################################################################################################# */

/* [Drawmode: Shape] Medium brush */
function dotMid(tileSrc, x, y) {
    setTileSrc(tileSrc, x, y);
    setTileSrc(tileSrc, x + 1, y);
    setTileSrc(tileSrc, x - 1, y);
    setTileSrc(tileSrc, x, y + 1);
    setTileSrc(tileSrc, x, y - 1);
}

/* [Drawmode: Shape] Large brush */
function dotMax(tileSrc, x, y) {
    setTileSrc(tileSrc, x, y);
    setTileSrc(tileSrc, x + 1, y);
    setTileSrc(tileSrc, x + 1, y + 1);
    setTileSrc(tileSrc, x + 1, y - 1);
    setTileSrc(tileSrc, x - 1, y);
    setTileSrc(tileSrc, x - 1, y + 1);
    setTileSrc(tileSrc, x - 1, y - 1);
    setTileSrc(tileSrc, x, y + 1);
    setTileSrc(tileSrc, x, y - 1);
    setTileSrc(tileSrc, x + 2, y);
    setTileSrc(tileSrc, x + 2, y + 1);
    setTileSrc(tileSrc, x + 2, y - 1);
    setTileSrc(tileSrc, x - 2, y);
    setTileSrc(tileSrc, x - 2, y + 1);
    setTileSrc(tileSrc, x - 2, y - 1);
    setTileSrc(tileSrc, x, y + 2);
    setTileSrc(tileSrc, x + 1, y + 2);
    setTileSrc(tileSrc, x - 1, y + 2);
    setTileSrc(tileSrc, x, y - 2);
    setTileSrc(tileSrc, x + 1, y - 2);
    setTileSrc(tileSrc, x - 1, y - 2);
}

/* [Drawmode: Shape] Horizontal line */
function hLine(tileSrc, y) {
    for (let x = 0; x < sessionMapData.vars["xSize"]; x++) {
        setTileSrc(tileSrc, x, y);
    }
}

/* [Drawmode: Shape] Vertical line */
function vLine(tileSrc, x) {
    for (let y = 0; y < sessionMapData.vars["ySize"]; y++) {
        setTileSrc(tileSrc, x, y);
    }
}

/* [Drawmode: Shape] Plus-shaped (+) cross */
function tCross(tileSrc, x, y) {
    for (let x = 0; x < sessionMapData.vars["xSize"]; x++) {
        setTileSrc(tileSrc, x, y);
    }
    for (let y = 0; y < sessionMapData.vars["ySize"]; y++) {
        setTileSrc(tileSrc, x, y);
    }
}

/* [Drawmode: Shape] Backslash (\) diagonal line */
function dLineA(tileSrc, x, y) {
    let xPos = x;
    let yPos = y;
    while (xPos != 0 && yPos != 0) {
        xPos--;
        yPos--;
    }
    setTileSrc(tileSrc, xPos, yPos);
    while (xPos < sessionMapData.vars["xSize"] - 1 && yPos < sessionMapData.vars["ySize"] - 1) {
        xPos++;
        yPos++;
        setTileSrc(tileSrc, xPos, yPos);
    }
}

/* [Drawmode: Shape] Forward slash (/) diagonal line */
function dLineB(tileSrc, x, y) {
    let xPos = x;
    let yPos = y;
    while (xPos < sessionMapData.vars["xSize"] - 1 && yPos != 0) {
        xPos++;
        yPos--;
    }
    setTileSrc(tileSrc, xPos, yPos);
    while (xPos != 0 && yPos < sessionMapData.vars["ySize"] - 1) {
        xPos--;
        yPos++;
        setTileSrc(tileSrc, xPos, yPos);
    }
}

/* [Drawmode: Shape] X-shaped (x) cross */
function xCross(tileSrc, x, y) {
    let xPos = x;
    let yPos = y;
    while (xPos != 0 && yPos != 0) {
        xPos--;
        yPos--;
    }
    setTileSrc(tileSrc, xPos, yPos);
    while (xPos < sessionMapData.vars["xSize"] - 1 && yPos < sessionMapData.vars["ySize"] - 1) {
        xPos++;
        yPos++;
        setTileSrc(tileSrc, xPos, yPos);
    }
    xPos = x;
    yPos = y;
    while (xPos < sessionMapData.vars["xSize"] - 1 && yPos != 0) {
        xPos++;
        yPos--;
    }
    setTileSrc(tileSrc, xPos, yPos);
    while (xPos != 0 && yPos < sessionMapData.vars["ySize"] - 1) {
        xPos--;
        yPos++;
        setTileSrc(tileSrc, xPos, yPos);
    }
}

/* [Drawmode: Shape] Unfilled rectangle */
function rect() {
    sessionMapData.drawMode.current["tool"] == "draw" ? currentInputSrc = sessionMapData.assets["wall"] : sessionMapData.drawMode.current["tool"] == "erase" ? currentInputSrc = sessionMapData.assets["space"] : currentInputSrc = document.getElementById(sessionMapData.drawMode.current["input"] + "Icon").getAttribute("src");
    let lilX = sessionMapData.drawMode["x1"];
    let bigX = sessionMapData.drawMode["x2"];
    let lilY = sessionMapData.drawMode["y1"];
    let bigY = sessionMapData.drawMode["y2"];
    // Sort the bounds
    if (sessionMapData.drawMode["x1"] > sessionMapData.drawMode["x2"]) {
        bigX = sessionMapData.drawMode["x1"];
        lilX = sessionMapData.drawMode["x2"];
    }
    if (sessionMapData.drawMode["y1"] > sessionMapData.drawMode["y2"]) {
        bigY = sessionMapData.drawMode["y1"];
        lilY = sessionMapData.drawMode["y2"];
    }
    for (let x = lilX; x < bigX; x++) {
        setTileSrc(currentInputSrc, x, lilY);
        setTileSrc(currentInputSrc, x, bigY);
    }
    for (let y = lilY; y < bigY; y++) {
        setTileSrc(currentInputSrc, lilX, y);
        setTileSrc(currentInputSrc, bigX, y);
    }
    setTileSrc(currentInputSrc, bigX, bigY)
    // Handle bigger than size;
    // Handle click placement mode
}

/* [Helper] rect() corner A */
function cornerA(x, y) {
    sessionMapData.drawMode.current["tool"] == "draw" ? currentInputSrc = sessionMapData.assets["wall"] : sessionMapData.drawMode.current["tool"] == "erase" ? currentInputSrc = sessionMapData.assets["space"] : currentInputSrc = document.getElementById(sessionMapData.drawMode.current["input"] + "Icon").getAttribute("src");
    sessionMapData.drawMode["x1"] = x;
    sessionMapData.drawMode["y1"] = y;
    setTileSrc(currentInputSrc, x, y);
}

/* [Helper] rect() corner B */
function cornerB(x, y) {
    sessionMapData.drawMode["x2"] = x;
    sessionMapData.drawMode["y2"] = y;
    rect();
}

/* [Helper] rect() corner A previewer */
// function cornerAhover(x, y) {
//     sessionMapData.drawMode["x1"] = x;
//     sessionMapData.drawMode["y1"] = y;
//     setTileSrc(sessionMapData.drawMode["inputTile"], x, y);
//     setDrawMode("hovercbox");
// }

/* [Helper] rect() corner B previewer */
// function cornerBhover(x, y) {
//     sessionMapData.drawMode["x2"] = x;
//     sessionMapData.drawMode["y2"] = y;
//     rect();
//     setDrawMode("clickbox");
// }

/* [DrawMode: Tool] Flips all tiles from wall to space or vice versa */
function flipper() {
    // Flips all tiles on board
    for (let i = 0; i < sessionMapData.vars["ySize"]; i++) {
        for (let j = 0; j < sessionMapData.vars["xSize"]; j++) {
            flipTile(j, i);
        }
    }
    // Toggles flip icon
    if (document.getElementById("flipIcon").getAttribute("src") == "assets/drawmode/flipA.png") {
        document.getElementById("flipIcon").src = "assets/drawmode/flipB.png";
    } else if (document.getElementById("flipIcon").getAttribute("src") == "assets/drawmode/flipB.png") {
        document.getElementById("flipIcon").src = "assets/drawmode/flipA.png";
    }
    announcer("Tiles flipped!")
}

/* [Helper] flipper() flips single tile from wall to space or vice versa */
function flipTile(x, y) {
    let tileID = x + "_" + y;
    if (document.getElementById(tileID).getAttribute("src") == sessionMapData.assets["space"]) {
        document.getElementById(tileID).src = sessionMapData.assets["wall"];
        sessionMapData.vars["openTiles"]--;
    } else if (document.getElementById(tileID).getAttribute("src") == sessionMapData.assets["wall"]) {
        document.getElementById(tileID).src = sessionMapData.assets["space"];
        sessionMapData.vars["openTiles"]++;
    }
}

/* DrawMode: Sets all 4 settings at once (tool, mode, shape, input) */
function setDrawMode() {
    setTool(sessionMapData.drawMode.current["tool"]);
    setMode(sessionMapData.drawMode.current["mode"]);
    setShape(sessionMapData.drawMode.current["shape"]);
    setInput(sessionMapData.drawMode.current["input"]);
}

/* DrawMode: Set DrawMode */
function updateDrawMode() {
    const {tool, mode, shape, input} = sessionMapData.drawMode.current;
    const tileSrc = tool === "erase"
        ? sessionMapData.assets["space"]
        : tool === "input"
            ? document.getElementById(input + "Icon").getAttribute("src")
            : sessionMapData.assets["wall"];
    const shapes = {
        dot: (x, y) => setTileSrc(tileSrc, x, y),
        dotMid: (x, y) => dotMid(tileSrc, x, y),
        dotMax: (x, y) => dotMax(tileSrc, x, y),
        hLine: (x, y) => hLine(tileSrc, y),
        vLine: (x, y) => vLine(tileSrc, x),
        tCross: (x, y) => tCross(tileSrc, x, y),
        dLineA: (x, y) => dLineA(tileSrc, x, y),
        dLineB: (x, y) => dLineB(tileSrc, x, y),
        xCross: (x, y) => xCross(tileSrc, x, y),
        box: (x, y) => {
            if (sessionMapData.drawMode["boxOn"] == false) {
                cornerA(x, y);
                sessionMapData.drawMode["boxOn"] = true;
            } else {
                cornerB(x, y);
                sessionMapData.drawMode["boxOn"] = false;
            }
        }
    };
    const drawShape = shapes[shape];
    const eventName = mode === "click" ? "onclick" : mode === "hover" ? "onmouseover" : null;
    for (let i = 0; i < sessionMapData.vars["ySize"]; i++) {
        for (let j = 0; j < sessionMapData.vars["xSize"]; j++) {
            let tile = document.getElementById(j + "_" + i);
            if (!tile) continue;
            tile.onclick = null;
            tile.onmouseover = null;
            if (drawShape && eventName && !(shape === "box" && mode === "hover")) {
                tile[eventName] = () => drawShape(j, i);
            } else if (shape === "box" && mode === "hover") {
                announcer("Warning: Box shape not available in hover mode.")
            }
        }
    }
}

/* DrawMode: Set tool menu */
function setTool(tool) {
    // Clear last tool icon style
    document.getElementById(sessionMapData.drawMode.last["tool"] + "Icon").style = "";
    // Update internal tool variables
    sessionMapData.drawMode.last["tool"] = sessionMapData.drawMode.current["tool"];
    sessionMapData.drawMode.current["tool"] = tool;
    // Clear last tool icon style
    document.getElementById(sessionMapData.drawMode.last["tool"] + "Icon").style = "";
    // Update current tool icon style
    document.getElementById(sessionMapData.drawMode.current["tool"] + "Icon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    // Display inputTileMenu if input tool selected
    tool === "input" ? document.getElementById("inputTileMenu").style.display = "block" : document.getElementById("inputTileMenu").style.display = "none"; 
    // Actually updates board function to new settings
    updateDrawMode();
}

/* DrawMode: Set mode menu */
function setMode(mode) {
    // Clear last mode icon style
    document.getElementById(sessionMapData.drawMode.last["mode"] + "Icon").style = "";
    // Update internal mode variables
    sessionMapData.drawMode.last["mode"] = sessionMapData.drawMode.current["mode"];
    sessionMapData.drawMode.current["mode"] = mode;
    // Clear last mode icon style
    document.getElementById(sessionMapData.drawMode.last["mode"] + "Icon").style = "";
    // Update current mode icon style
    document.getElementById(sessionMapData.drawMode.current["mode"] + "Icon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    // Actually updates board function to new settings
    updateDrawMode();
}

/* DrawMode: Set shape menu */
function setShape(shape) {
    // Clear last shape icon style
    document.getElementById(sessionMapData.drawMode.last["shape"] + "Icon").style = "";
    // Update internal shape variables
    sessionMapData.drawMode.last["shape"] = sessionMapData.drawMode.current["shape"];
    sessionMapData.drawMode.current["shape"] = shape;
    // Clear last shape icon style
    document.getElementById(sessionMapData.drawMode.last["shape"] + "Icon").style = "";
    // Update current mode shape style
    document.getElementById(sessionMapData.drawMode.current["shape"] + "Icon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    // Actually updates board function to new settings
    updateDrawMode();
}

/* DrawMode: Set input tile menu */
function setInput(input) {
    // Clear last input icon style
    document.getElementById(sessionMapData.drawMode.last["input"] + "Icon").style = "";
    // Update internal input variables
    sessionMapData.drawMode.last["input"] = sessionMapData.drawMode.current["input"];
    sessionMapData.drawMode.current["input"] = input;
    // Clear last input icon style
    document.getElementById(sessionMapData.drawMode.last["input"] + "Icon").style = "";
    // Update current input icon style
    document.getElementById(sessionMapData.drawMode.current["input"] + "Icon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    // Actually updates board function to new settings
    updateDrawMode();
}

/* ############################################################################################################################# */
/* #####################################################[ PAINT STYLING ]####################################################### */
/* ############################################################################################################################# */

/* [Paint] Tile Background Color Painter */
function paint(tileID, color) {
    document.getElementById(tileID).style = "background-color: " + color + ";";
}

/* [Paint] Toggle/Set Paint Color */
function paintOff() {
    for (let i = 0; i < sessionMapData.vars["ySize"]; i++) {
        for (let j = 0; j < sessionMapData.vars["xSize"]; j++) {
            let tile = document.getElementById(j + "_" + i);
            tile.onmouseover = null;
        }
    }
    sessionMapData.drawMode["paintColor"] = "none";
    document.getElementById("paint").innerHTML = "Off (" + sessionMapData.drawMode["paintColor"] + ")";
}

/* [Paint] Prompt to Change Paint Color */
function paintOn(color) {
    if (color === sessionMapData.drawMode["paintColor"]) {
        document.getElementById("paint").innerHTML = "On (" + sessionMapData.drawMode["paintColor"] + ")";
        return;
    } else if (color == null) {
        color = prompt("What color paint?");
    }
    for (let i = 0; i < sessionMapData.vars["ySize"]; i++) {
        for (let j = 0; j < sessionMapData.vars["xSize"]; j++) {
            let tile = document.getElementById(j + "_" + i);
            tile.onmouseover = () => paint(j + "_" + i, color);
            sessionMapData.drawMode["paintColor"] = color;
            document.getElementById("paint").innerHTML = "On (" + sessionMapData.drawMode["paintColor"] + ")";
        }
    }
    
}

/* [Paint] Flashes tiles in checkerboard pattern */
async function flashTiles() {
    let swaps = 0;
    for (let k = 0; k < 30; k++) {
        swaps += 1;
        for (let i = 0; i < sessionMapData.vars["ySize"]; i++) {
            for (let j = 0; j < sessionMapData.vars["xSize"]; j++) {
                if (((i + j + swaps) % 2) != 0) {
                    document.getElementById(j + "_" + i).style = "background-color: " + sessionMapData.drawMode["flashColor1"];
                } else {
                    document.getElementById(j + "_" + i).style = "background-color: " + sessionMapData.drawMode["flashColor2"];
                }
            }
        }
        await delay(200);
    }
    for (let i = 0; i < sessionMapData.vars["ySize"]; i++) {
        for (let j = 0; j < sessionMapData.vars["xSize"]; j++) {
            document.getElementById(j + "_" + i).style = "background-color: none";
        }
    }
}

/* ############################################################################################################################# */
/* ######################################################[ EXPERIMENTAL/FUN ]################################################### */
/* ############################################################################################################################# */

/* Fun: Give fun message to boo effect */
async function booPotion() {
    boo();
    announcer("The spooky potion is making everyone feel funny!", 15)
    await delay(15000);
    stopBoo();
}

/* Helper: Begins Boo Visuals and Decreases Movement Cooldown (Speed Effect) */
function boo() {
    sessionMapData.assets["p1"] = "assets/blackMonster.png";
    sessionMapData.assets["p2"] = "assets/whiteMonster.png";
    document.getElementById("score1").style = "background-color: white; color: black;";
    document.getElementById("score1img").src = sessionMapData.assets["p1"];
    document.getElementById("score2").style = "background-color: black";
    document.getElementById("score2img").src = sessionMapData.assets["p2"];
    if (sessionMapData.players.p1.active == true) {
        document.getElementById(sessionMapData.players.p1.xPos + '_' + sessionMapData.players.p1.yPos).src = "assets/blackMonster.png";
    }
    if (sessionMapData.players.p2.active == true) {
        document.getElementById(sessionMapData.players.p2.xPos + '_' + sessionMapData.players.p2.yPos).src = "assets/whiteMonster.png";
    }
    sessionMapData.vars["MOVE_COOLDOWN_MS"] = 75;
}

/* Helper: Stops Boo Visuals and Returns Movement Cooldown (Speed Effect) */
function stopBoo() {
    sessionMapData.assets["p1"] = "assets/redMonsterDown.png";
    sessionMapData.assets["p2"] = "assets/blueMonsterDown.png";
    document.getElementById("score1").style = "background-color: red";
    document.getElementById("score1img").src = sessionMapData.assets["p1"];
    document.getElementById("score2").style = "background-color: blue";
    document.getElementById("score2img").src = sessionMapData.assets["p2"];
    if (sessionMapData.players.p1.active == true) {
        document.getElementById(sessionMapData.players.p1.xPos + '_' + sessionMapData.players.p1.yPos).src = "assets/redMonsterDown.png";
    }
    if (sessionMapData.players.p2.active == true) {
        document.getElementById(sessionMapData.players.p2.xPos + '_' + sessionMapData.players.p2.yPos).src = "assets/blueMonsterDown.png";
    }
    sessionMapData.vars["MOVE_COOLDOWN_MS"] = 150;
}

/* ############################################################################################################################# */
/* ######################################################[ WORK-IN-PROGRESS ]################################################### */
/* ############################################################################################################################# */

/* Game: 'Wipe Out' Mechanic - Tiles are wiped out? Not sure tbh */
async function wipeOut(x, y) {
    let ptX = x;
    while (y < sessionMapData.vars["ySize"]) {
        while (x < sessionMapData.vars["xSize"]) {
            let tileID = x + "_" + y;
            swapTileSrc(tileID, x + "_" + y);
            document.getElementById(tileID).src = sessionMapData.assets["wall"];
            x++;
            await delay(250);
        }
        x = ptX;
        let tileID = x + "_" + y;
        swapTileSrc(tileID, x + "_" + y);
        y++;
        await delay(250);
    }
}

/* (Work in Progress, Replace "tileType" Variable) Game: 'Infect' Mechanic - Tile Spreads Out x amt */
function infect(tileType, amt, x, y) {
    let tileID = x + "_" + y;
    while (amt > 0) {
        amt--;
        document.getElementById(tileID).src = "assets/" + tileType + ".png";
        swapTileSrc(tileID, (x + 1) + "_" + y);
        document.getElementById(tileID).src = "assets/" + tileType + ".png";
        swapTileSrc(tileID, (x - 1) + "_" + y);
        document.getElementById(tileID).src = "assets/" + tileType + ".png";
        swapTileSrc(tileID, x + "_" + (y + 1));
        document.getElementById(tileID).src = "assets/" + tileType + ".png";
        swapTileSrc(tileID, x + "_" + (y - 1));
        document.getElementById(tileID).src = "assets/" + tileType + ".png";
    }
}

/* Helper: Returns output Array of 8 tileIDs surrounding input tileID */
function circleAround(tileID) {
    let circleTileIDs = [];
    circleTileIDs.push((parseInt(tileID.split("_")[0]) - 1) + "_" + (parseInt(tileID.split("_")[1]) - 1));
    circleTileIDs.push((parseInt(tileID.split("_")[0]) - 1) + "_" + parseInt(tileID.split("_")[1]));
    circleTileIDs.push((parseInt(tileID.split("_")[0]) - 1) + "_" + (parseInt(tileID.split("_")[1]) + 1));
    circleTileIDs.push(parseInt(tileID.split("_")[0]) + "_" + (parseInt(tileID.split("_")[1]) + 1));
    circleTileIDs.push((parseInt(tileID.split("_")[0]) + 1) + "_" + (parseInt(tileID.split("_")[1]) + 1));
    circleTileIDs.push((parseInt(tileID.split("_")[0]) + 1) + "_" + parseInt(tileID.split("_")[1]));
    circleTileIDs.push((parseInt(tileID.split("_")[0]) + 1) + "_" + (parseInt(tileID.split("_")[1]) - 1));
    circleTileIDs.push(parseInt(tileID.split("_")[0]) + "_" + (parseInt(tileID.split("_")[1]) - 1));
    return circleTileIDs;
}

/* Generates preview circle around tile */
function placePreview(tileID) {
    let tileArray = circleAround(tileID);
    for (let i = 0; i < tileArray.length; i++) {
        let circleID = tileArray[i];
        document.getElementById(circleID).style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    }
}

/* ############################################################################################################################# */
/* ################################################[ DEVELOPMENT/GLOBAL HELPERS ]############################################### */
/* ############################################################################################################################# */

/* Development: Toggles position coordinate hint for board, triggered by F3 */
function togglePosHint() {
    const elements = document.getElementsByClassName("posHint");
    Array.from(elements).forEach(element => {
        if (element.style.display === "block") 
            element.style.display = "none";
        else 
            element.style.display = "block";
    });
}

/* Global: Announcer box notification */
async function announcer(message, seconds) {
    let timeLeft = seconds || 3;
    while (timeLeft != 0) {
        document.getElementById("announcer").innerHTML = message + " (" + timeLeft + ")";
        timeLeft--;
        await delay(1000);
    }
    document.getElementById("announcer").innerHTML = "&nbsp;";
}

/* Global: Delay Promise, Needs Async */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* Global: Resets Variables */
function resetVars() {
    sessionMapData.players["p1"].xPos = undefined;
    sessionMapData.players["p1"].yPos = undefined;
    sessionMapData.players["p2"].xPos = undefined;
    sessionMapData.players["p2"].yPos = undefined;
    sessionMapData.vars["playerCount"] = 0;
    sessionMapData.vars["result1"] = 0;
    sessionMapData.vars["result2"] = 0;
    sessionMapData.vars["openTiles"] = sessionMapData.vars["xSize"] * sessionMapData.vars["ySize"];
    sessionMapData.players["p1"].active = false;
    sessionMapData.players["p2"].active = false;
    document.getElementById("result1").innerHTML = sessionMapData.vars["result1"];
    document.getElementById("result2").innerHTML = sessionMapData.vars["result2"];
}

/* Helper: Returns element ID or null; error handling for better key presses */
function getTileElement(tileID) {
    const element = document.getElementById(tileID);
    if (!element) {
        console.warn("Tile element not found for id: " + tileID);
        return null;
    }
    return element;
}

/* Helper: Returns source or null; error handling for better key presses */
function getSrc(tileID) {
    const element = getTileElement(tileID);
    if (!element) return null;
    return element.getAttribute("src");
}

/* Helper: Calculates New Position */
function getNewPos(x, y, keymap) {
    let newX = x;
    let newY = y;
    if (keymap.up && keysPressed[keymap.up] && y > 0) 
        newY = y - 1;
    else if (keymap.down && keysPressed[keymap.down] && y < sessionMapData.vars["ySize"] - 1) 
        newY = y + 1;
    else if (keymap.left && keysPressed[keymap.left] && x > 0) 
        newX = x - 1;
    else if (keymap.right && keysPressed[keymap.right] && x < sessionMapData.vars["xSize"] - 1) 
        newX = x + 1;
    return {newX, newY};
}

/* ############################################################################################################################# */
/* ########################################################[ LISTENERS ]######################################################## */
/* ############################################################################################################################# */

/* Game Event Listener: for Monster Sandbox - Keypresses */
const keysPressed = {};
document.addEventListener('keydown', (move) => {
    keysPressed[move.key] = true;
    // Movement Keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(move.key)) {
        move.preventDefault();
    }
    // Both-Player Can Use Keys
    if (move.key === 'f') {
        flashTiles();
    }
    if (move.key === 'F3') {
        toggleDebugMenu();
    }
    if (move.key === 'F2') {
        togglePosHint();
    }
    // Player 1 Keys
    if (move.key === ' ') {
        updateInventory();
    }
    if (move.key === ' ') {
        updateInventory();
    }
    if (move.key === ' ') {
        updateInventory();
    }
    // Player 2 Keys
    if (move.key === '/') {
        // Shoot Key
    }
    if (move.key === ',') {
        // Utility 1 Key
    }
    if (move.key === '.') {
        // Utility 2 Key
    }
});
document.addEventListener('keyup', (move) => {
    keysPressed[move.key] = false;
});

/* Game Event Listener: for Monster Sandbox - Updates for Color Picker */
document.addEventListener('change', (event) => {
    paintOn(document.getElementById('colorPicker').value);
});

/* Game Event Listener: for Monster Sandbox - Movement Updater */
function update(timestamp) {
    const last = sessionMapData.vars.timestamp || 0;
    if (timestamp - last >= sessionMapData.vars["MOVE_COOLDOWN_MS"]) {
        const old1 = {x: sessionMapData.players["p1"].xPos, y: sessionMapData.players["p1"].yPos};
        const old2 = {x: sessionMapData.players["p2"].xPos, y: sessionMapData.players["p2"].yPos};
        let new1 = {x: sessionMapData.players["p1"].xPos, y: sessionMapData.players["p1"].yPos};
        let new2 = {x: sessionMapData.players["p2"].xPos, y: sessionMapData.players["p2"].yPos};
        if (sessionMapData.players["p1"].active) {
            const {newX, newY} = getNewPos(sessionMapData.players["p1"].xPos, sessionMapData.players["p1"].yPos, sessionMapData.players["p1"].keys);
            new1 = {x: newX, y: newY};
        }
        if (sessionMapData.players["p2"].active) {
            const { newX, newY } = getNewPos(sessionMapData.players["p2"].xPos, sessionMapData.players["p2"].yPos, sessionMapData.players["p2"].keys);
            new2 = {x: newX, y: newY};
        }
        // Conflict: Both want same tile OR they would be swapping places
        const wantSameTile = new1.x === new2.x && new1.y === new2.y;
        const swapping = sessionMapData.players["p1"].active && sessionMapData.players["p2"].active &&
                        new1.x === old2.x &&
                        new1.y === old2.y &&
                        new2.x === old1.x &&
                        new2.y === old1.y;
        const conflict = wantSameTile || swapping;
        if (!conflict) {
            // Player 1 move if it actually wants to move
            if (sessionMapData.players["p1"].active && !(new1.x === old1.x && new1.y === old1.y)) {
                const oldID1 = old1.x + "_" + old1.y;
                const newID1 = new1.x + "_" + new1.y; 
                if (moveTile(oldID1, newID1)) {
                    sessionMapData.players["p1"].xPos = new1.x;
                    sessionMapData.players["p1"].yPos = new1.y;
                }
            }
            // Player 2 move if it actually wants to move
            if (sessionMapData.players["p2"].active && !(new2.x === old2.x && new2.y === old2.y)) {
                const oldID2 = old2.x + "_" + old2.y;
                const newID2 = new2.x + "_" + new2.y;
                if (moveTile(oldID2, newID2)) {
                    sessionMapData.players["p2"].xPos = new2.x;
                    sessionMapData.players["p2"].yPos = new2.y;
                }
            }
        }
        sessionMapData.vars.timestamp = timestamp;
    }
    requestAnimationFrame(update);
}
requestAnimationFrame(update);