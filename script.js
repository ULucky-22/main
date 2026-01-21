/* ############################################################################################################################# */
/* ####################################################[ SAVE/GAME VARIABLES ]################################################## */
/* ############################################################################################################################# */

// Session Map Data Object
var sessionMapData = {
    vars: {"MOVE_COOLDOWN_MS":150, "xSize":11, "ySize":11, "openTiles":0, "playerCount":0, "bots":0, "result1":0, "result2":0, "gameClock":0, "timestamp":0, "randX":0, "randY":0},
    players: {
        "p1":{
            "active":false, 
            "xPos":0, 
            "yPos":0, 
            "keys":{
                "up":"w", 
                "down":"s", 
                "left":"a", 
                "right":"d"
            },
            "inventory":{
                0:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                1:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                2:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                3:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                4:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                5:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                6:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                7:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                8:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                9:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                10:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                11:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                12:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                13:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                14:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                15:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
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
                0:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                1:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                2:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                3:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                4:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                5:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                6:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                7:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                8:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                9:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                10:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                11:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                12:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                13:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                14:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
                15:{"item":"assets/blank.png", "count":"assets/blank.png", "hold":0},
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
        "entities":[
            "assets/chest.png", 
            "assets/goldChest.png", 
            "assets/key.png", 
            "assets/heartKey.png", 
            "assets/scroll.png", 
            "assets/coins.png", 
            "assets/potion.png", 
            "assets/invisibility.png"
        ], 
        "foodSrcs":[
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
        ]},
    drawMode: {
        "paintColor":"none", 
        "color1":"none", 
        "color2":"black", 
        "mode":"click", 
        "shape":"dot", 
        "drawMode":"clickinputdot", 
        "inputTile":"assets/blank.png", 
        "lastTile":"assets/blank.png", 
        "inputOn":false, 
        "boxOn":true, 
        "bucketOn":false, 
        "x1":0, 
        "y1":0, 
        "x2":0, 
        "y2":0},
    tiles: {}
};

// Saved Map Data Object
// var savedMapData = {
//     // Same variables as sessionMapData
// };

// Game Variables
let session_id = 0; 

/* ############################################################################################################################# */
/* ####################################################[ LOAD/SAVE FUNCTIONS ]################################################## */
/* ############################################################################################################################# */

// /* Sets Tile Data (Single) */
// function setTileData(tileID, {src, background}) {
//     if (!savedMapData.tiles[tileID]) savedMapData.tiles[tileID] = {};
//     if (src !== undefined) savedMapData.tiles[tileID].src = src;
//     if (background !== undefined) savedMapData.tiles[tileID].background = background;
// }

// /* Loads Map Data from Local Storage into Board */
// function loadGame() {
//     loadMapData();
//     boardLoad();
//     requestAnimationFrame(update);
// }

// /* Strings savedMapData and loads from localStorage, Error handling */
// function loadMapData() {
//     try {
//         const string = localStorage.getItem("save");
//         if (!string) return null;
//         const load = JSON.parse(string);
//         savedMapData.vars = load.vars || {};
//         savedMapData.players = load.players || {};
//         savedMapData.games = load.games || {};
//         savedMapData.tiles = load.tiles || {};
//         return savedMapData;
//     } catch (e) {
//         console.warn("Failed to load board:", e);
//         return null;
//     }
// }

// /* Loads board src and background */
// function boardLoad() {
//     if (sessionMapData.vars["xSize"] < savedMapData.vars["xSize"]) {
//         sessionMapData.vars["xSize"] = savedMapData.vars["xSize"];
//         // Additional Code to calculate opentiles
//     } else {
//         // When currentSize > savesize
//     }
//     if (sessionMapData.vars["ySize"] < savedMapData.vars["ySize"]) {
//         sessionMapData.vars["ySize"] = savedMapData.vars["ySize"];
//         // "  "
//     } else {
//         // "  "
//     }
//     // makeBoard(savedMapData.vars.xSize, savedMapData.vars.ySize);
//     for (const [tileID, attribute] of Object.entries(savedMapData.tiles)) {
//         if (!document.getElementById(tileID)) continue;
//         if (attribute.src !== undefined) document.getElementById(tileID).setAttribute('src', attribute.src);
//         if (attribute.background !== undefined) document.getElementById(tileID).style.backgroundColor = attribute.background;
//     }
   
    
//     // Needs to handle different sized-saves and
//     sessionMapData.xyz = savedMapData.xyz (include for all vars)
// }

// /* Saves Board and Map Data into LocalStorage */
// function saveGame() {
//     boardSave();
//     saveMapData();
// }

// /* Saves board src and background */
// function boardSave() {
//     for (let x = 0; x < sessionMapData.vars["xSize"]; x++) {
//         for (let y = 0; y < sessionMapData.vars["ySize"]; y++) {
//         const tileID = x + "_" + y;
//         const computed = getComputedStyle(document.getElementById(tileID));
//         savedMapData.tiles[tileID] = {
//             src: document.getElementById(tileID).getAttribute("src") || "",
//             background: computed.backgroundColor || ""
//         };
//         }
//     }
//     savedMapData.vars["xSize"] = sessionMapData.vars["xSize"];
//     savedMapData.vars["ySize"] = sessionMapData.vars["ySize"];
//     savedMapData.vars["openTiles"] = sessionMapData.vars["openTiles"];
//     savedMapData.vars["playerCount"] = sessionMapData.vars["playerCount"];
//     savedMapData.vars["result1"] = sessionMapData.vars["result1"];
//     savedMapData.vars["result2"] = sessionMapData.vars["result2"];
//     savedMapData.vars["gameClock"] = sessionMapData.vars["gameClock"];
//     savedMapData.vars["timestamp"] = sessionMapData.vars["timestamp"];
//     savedMapData.players["p1"].xPos = sessionMapData.players["p1"].xPos;
//     savedMapData.players["p1"].yPos = sessionMapData.players["p1"].yPos;
//     savedMapData.players["p2"].xPos = sessionMapData.players["p2"].xPos;
//     savedMapData.players["p2"].yPos = sessionMapData.players["p2"].yPos;
//     savedMapData.games["active"] = sessionMapData.games["active"];
//     savedMapData.games["active1"] = sessionMapData.players["p1"].active;
//     savedMapData.games["active2"] = sessionMapData.players["p2"].active;
//     //savedMapData.timestamp = Date.now();
// }

// /* Strings savedMapData and saves to localStorage, Error handling */
// function saveMapData() {
//     try {
//         const string = JSON.stringify(savedMapData);
//         localStorage.setItem("save", string);
//     } catch (e) {
//         console.warn("Failed to save board:", e);
//     }
// }

/* JSON Maker */

/* JSON Loader */

/* ############################################################################################################################# */
/* ######################################################[ GAME FUNCTIONS ]##################################################### */
/* ############################################################################################################################# */

/* On Page Load */
function onload() {
    // Monster Tiles Sandbox Initialization
    makeBoard(sessionMapData.vars["xSize"], sessionMapData.vars["ySize"]);
    sandboxTools();
    setTool("draw");
    setMode("click");
    setShape("dot");
    // Session Tracker (Counts Debug Sessions)
    session_id = parseInt(localStorage.getItem("session_id")) || 0;
    localStorage.setItem("session_id", session_id += 1);
}

/* Board Maker */
function makeBoard(xInput, yInput) {
    sessionMapData.vars["xSize"] = xInput;
    sessionMapData.vars["ySize"] = yInput;
    sessionMapData.vars["openTiles"] = xInput * yInput;
    let boardTextArray = [];
    boardTextArray.push("<table>");
    for (let i = 0; i < sessionMapData.vars["ySize"]; i++) {
        boardTextArray.push("<tr>");
        for (let j = 0; j < sessionMapData.vars["xSize"]; j++) {
            let newString = '<td><img id="' + j + '_' + i + '" class="back" src="' + sessionMapData.assets["space"] + '"></td>';
            boardTextArray.push(newString);
            //setTileData(j + '_' + i, {src: sessionMapData.assets["space"], background: "none"}); <--Save function
        }
        boardTextArray.push("</tr>");
    }
    boardTextArray.push("</table>");
    let boardText = boardTextArray.join("");
    document.getElementById("board").innerHTML = boardText;
}

/* Sandbox Tools, appears with board */
function sandboxTools() {
    document.getElementById("toolbox").innerHTML = '<div><button onclick="paintOff()" ondblclick="paintOn()">Paint Mode: <span id="paint">Off (none)</span></button><button onclick="spawnFood()">Spawn Food</button><button onclick="addTile(' + "'food'" + ')">Add Food</button><button onclick="clearFood()">Clear Food</button><button onclick="fillBoard()">Clear Board</button><button onclick="addPlayer1()">Player 1</button><button onclick="addPlayer2()">Player 2</button><button id="drawModeButton" onclick="drawModeCycle()">Draw Mode: <span id="drawModeCycle">' + sessionMapData.drawMode["drawMode"] + '</span></button><br></div>';
    //document.getElementById("styles").innerHTML = '<div><input type="color" id="colorPicker" name="colorPicker" value="#000000"></div>'
}

/* Game: Adds Player 1 */
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

/* Game: Adds Player 2 */
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

/* Game: Adds Bot */
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

/* Game: Updates Movement and Position if Type */
function swapIfTile(oldID, newID) { 
    if (isFoodTile(newID)) { // Potential for specific food point expansions here in new sub-function
        if (document.getElementById(oldID).getAttribute("src") == sessionMapData.assets["p1"]) {
            sessionMapData.vars["result1"]++;
            document.getElementById("result1").innerHTML = sessionMapData.vars["result1"];
        } else if (document.getElementById(oldID).getAttribute("src") == sessionMapData.assets["p2"]) {
            sessionMapData.vars["result2"]++;
            document.getElementById("result2").innerHTML = sessionMapData.vars["result2"];
        }
        swapTileSrc(oldID, newID);
        document.getElementById(oldID).src = sessionMapData.assets["space"];
        sessionMapData.vars["openTiles"]++;
        return true;
    } else if (isEntity(newID)) {
        // Do something for consumables
        if (document.getElementById(oldID).getAttribute("src") == sessionMapData.assets["p1"]) {
            console.log("p1_" + document.getElementById(newID).getAttribute("src"));
            addToInventory("p1", document.getElementById(newID).getAttribute("src"));
        } else if (document.getElementById(oldID).getAttribute("src") == sessionMapData.assets["p2"]) {
            console.log("p2_" + document.getElementById(newID).getAttribute("src"));
            addToInventory("p2", document.getElementById(newID).getAttribute("src"));
        }
        swapTileSrc(oldID, newID);
        document.getElementById(oldID).src = sessionMapData.assets["space"];
        sessionMapData.vars["openTiles"]++;
        return true;
    } else if (isValidPlace(newID)) {
        swapTileSrc(oldID, newID);
        return true; 
    } else {
        return false;
    }
}

/* Game: Update Inventory */
function updateInventory() {
    for (let x = 0; x < 16; x++) {
        document.getElementById("p1_" + x + "i").src = sessionMapData.players.p1.inventory[x].item;
        document.getElementById("p1_" + x + "c").src = "assets/inventory/inv" + sessionMapData.players.p1.inventory[x].hold + ".png";
        document.getElementById("p2_" + x + "i").src = sessionMapData.players.p2.inventory[x].item;
        document.getElementById("p2_" + x + "c").src = "assets/inventory/inv" + sessionMapData.players.p2.inventory[x].hold + ".png";
    }
}

/* Game: Add to Inventory */
function addToInventory(player, item) {
    let slotIndex = checkInventory(player, item);
    if (slotIndex >= 0) {
        // add to inventory if space available in checkInventory return.
        sessionMapData.players[player].inventory[slotIndex].item = item;
        sessionMapData.players[player].inventory[slotIndex].hold += 1;
        updateInventory();
    } else {     
        alert(player + " inventory full!");
    }
            
}

/* Helper: Returns first available space if item is not in inventory */
function checkInventory(player, item) {
    let slotIndex = 0;
    while (slotIndex < 16) {
        let src = sessionMapData.players[player].inventory[slotIndex].item;
        let itemCount = sessionMapData.players[player].inventory[slotIndex].hold;
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

/* Game: Time and Win Condition */
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
    document.getElementById("alert").style = "color: black;";
    document.getElementById("alert").innerHTML = "Time Remaining: " + sessionMapData.vars["gameClock"] / 10;
    while (sessionMapData.vars["gameClock"] > 0) {
        await delay(100);
        sessionMapData.vars["gameClock"] -= 1;
        document.getElementById("alert").innerHTML = "Time Remaining: " + sessionMapData.vars["gameClock"] / 10;
    }
    await delay(1000);
    document.getElementById("alert").innerHTML = "Time is up!";
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
    document.getElementById("alert").innerHTML = endMessage;
    fillBoard("food");
    await delay(5000);
    document.getElementById("alert").innerHTML = ".";
    document.getElementById("alert").style = "color: white;";
    document.getElementById("start").style = "display: block;";
    document.getElementById("start").innerHTML = "<button onclick='start()'>Play Again?</button>";
}

/* Game Start Function */
function start() {
    addPlayer1();
    addPlayer2();
    spawnTile(sessionMapData.assets["wall"]);
    spawnTile(sessionMapData.assets["wall"]);
    spawnTile(sessionMapData.assets["wall"]);
    spawnFood();
    spawnFood();
    spawnFood();
    timer(25);
}

/* Test Code Startup */
function runTest() {
}

/* ############################################################################################################################# */
/* #################################################[ RANDOM/GENERATION HELPERS ]############################################### */
/* ############################################################################################################################# */

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
    let amt = Math.floor(Math.random() * sessionMapData.assets["foodSrcs"].length);
    return sessionMapData.assets["foodSrcs"][amt];
}

/* ############################################################################################################################# */
/* ###################################################[ PLACEMENT/TYPE CHECKERS ]############################################### */
/* ############################################################################################################################# */

/* Helper: Returns true if valid placement and isn't null */
function isValidPlace(tileID) {
    const src = getSrc(tileID);
    if (src === null) return false;
    return !isFoodTile(tileID) &&
           src !== sessionMapData.assets["p1"] &&
           src !== sessionMapData.assets["p2"] &&
           src !== sessionMapData.assets["wall"];
}

/* Helper: Returns true if food tile for scoring, placement */
function isFoodTile(tileID) {
    const src = getSrc(tileID);
    return src !== null && sessionMapData.assets["foodSrcs"].includes(src);
}

/* Helper: Returns true if item is entity (can be picked up and added to inventory) */
function isEntity(tileID) {
    const src = getSrc(tileID);
    return src !== null && sessionMapData.assets["entities"].includes(src);
}

/* ############################################################################################################################# */
/* #######################################################[ MAP/GENERATION ]#################################################### */
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
    // Input not space; target is space
    if (tileSrc != sessionMapData.assets["space"] && document.getElementById(tileID).getAttribute("src") == sessionMapData.assets["space"]) {
        sessionMapData.vars["openTiles"]--;
        document.getElementById(tileID).src = tileSrc;
    // Input is space; target isn't space
    } else if (tileSrc == sessionMapData.assets["space"] && document.getElementById(tileID).getAttribute("src") != sessionMapData.assets["space"]) {
        sessionMapData.vars["openTiles"]++;
        document.getElementById(tileID).src = tileSrc;
    // Input not space; target not space; does not change openTiles.
    } else {
        document.getElementById(tileID).src = tileSrc;
    }
}

/* Map: Set tile image src in Medium Dot Shape */
function dotMid(tileSrc, x, y) {
    setTileSrc(tileSrc, x, y);
    setTileSrc(tileSrc, x + 1, y);
    setTileSrc(tileSrc, x - 1, y);
    setTileSrc(tileSrc, x, y + 1);
    setTileSrc(tileSrc, x, y - 1);
}

/* Map: Set tile image src in Largest Dot Shape */
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

/* Map: Set tile image src in Horizontal Line */
function hLine(tileSrc, y) {
    for (let x = 0; x < sessionMapData.vars["xSize"]; x++) {
        setTileSrc(tileSrc, x, y);
    }
}

/* Map: Set tile image src in Vertical Line */
function vLine(tileSrc, x) {
    for (let y = 0; y < sessionMapData.vars["ySize"]; y++) {
        setTileSrc(tileSrc, x, y);
    }
}

/* Map: Set tile image src in T-Shaped Cross */
function tCross(tileSrc, x, y) {
    for (let x = 0; x < sessionMapData.vars["xSize"]; x++) {
        setTileSrc(tileSrc, x, y);
    }
    for (let y = 0; y < sessionMapData.vars["ySize"]; y++) {
        setTileSrc(tileSrc, x, y);
    }
}

/* Map: Set tile image src in Top-Down Left-Right Diagonal Line */
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

/* Map: Set tile image src in Top-Down Right-Left Diagonal Line */
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

/* Map: Set tile image src in X-Shaped Cross */
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

/* Map: Set tile image src in Unfilled Rectangle */
function rect() {
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
        setTileSrc(sessionMapData.drawMode["inputTile"], x, lilY);
        setTileSrc(sessionMapData.drawMode["inputTile"], x, bigY);
    }
    for (let y = lilY; y < bigY; y++) {
        setTileSrc(sessionMapData.drawMode["inputTile"], lilX, y);
        setTileSrc(sessionMapData.drawMode["inputTile"], bigX, y);
    }
    setTileSrc(sessionMapData.drawMode["inputTile"], bigX, bigY)
    // Handle bigger than size;
    // Handle click placement mode
}

/* Helper: DrawMode rect() Corner */
function cornerA(x, y) {
    sessionMapData.drawMode["x1"] = x;
    sessionMapData.drawMode["y1"] = y;
    setTileSrc(sessionMapData.drawMode["inputTile"], x, y);
    setDrawMode("clickcbox");
}

/* Helper: DrawMode rect() Corner */
function cornerB(x, y) {
    sessionMapData.drawMode["x2"] = x;
    sessionMapData.drawMode["y2"] = y;
    rect();
    setDrawMode("clickbox");
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

/* Map: Spawn random amount of food */
function spawnFood() {
    if (sessionMapData.vars["openTiles"] == 0) {alert("No open tiles!")};
    let amt = Math.floor(Math.random() * sessionMapData.vars["openTiles"] / 8);
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
            if (isFoodTile(j + "_" + i)) {
                document.getElementById(j + "_" + i).src = sessionMapData.assets["space"];
                sessionMapData.vars["openTiles"]++;
            }
        }
    }
    sessionMapData.vars["result1"] = 0;
    sessionMapData.vars["result2"] = 0;
}

/* Tile: Flip tile from wall to space and vice versa */
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

/* Map: Swap tile source type */
function swapSource(tileTypeA, tileTypeB) {
    for (let i = 0; i < sessionMapData.vars["ySize"]; i++) {
        for (let j = 0; j < sessionMapData.vars["xSize"]; j++) {
            let tileID = j + "_" + i;
            if (document.getElementById(tileID).getAttribute("src") == "assets/" + tileTypeA + ".png") {
                document.getElementById(tileID).src = "assets/" + tileTypeB + ".png";
                sessionMapData.vars["openTiles"]--;
            } else if (document.getElementById(tileID).getAttribute("src") == "assets/" + tileTypeB + ".png") {
                document.getElementById(tileID).src = "assets/" + tileTypeA + ".png";
                sessionMapData.vars["openTiles"]++;
            }
        }
    }
}

/* Movement: Swap tile srcs by tileID */
function swapTileSrc(tileIDa, tileIDb) {
    let tempSrc = document.getElementById(tileIDb).getAttribute("src");
    document.getElementById(tileIDb).src = document.getElementById(tileIDa).getAttribute("src");
    document.getElementById(tileIDa).src = tempSrc;
}

/* ############################################################################################################################# */
/* ####################################################[ DRAWMODE/STYLING ]##################################################### */
/* ############################################################################################################################# */

/* DrawMode: Set DrawMode */
function setDrawMode(mode) {
    for (let i = 0; i < sessionMapData.vars["ySize"]; i++) {
        for (let j = 0; j < sessionMapData.vars["xSize"]; j++) {
            let tile = document.getElementById(j + "_" + i);
            if (!tile) continue;
            tile.onclick = null;
            tile.onmouseover = null;
            if (mode === "clickdot") {
                tile.onclick = () => setTileSrc(sessionMapData.drawMode["inputTile"], j, i);
            } else if (mode === "hoverdot") {
                tile.onmouseover = () => setTileSrc(sessionMapData.drawMode["inputTile"], j, i);
            } else if (mode === "clickdotMid") {
                tile.onclick = () => dotMid(sessionMapData.drawMode["inputTile"], j, i);
            } else if (mode === "hoverdotMid") {
                tile.onmouseover = () => dotMid(sessionMapData.drawMode["inputTile"], j, i);
            } else if (mode === "clickdotMax") {
                tile.onclick = () => dotMax(sessionMapData.drawMode["inputTile"], j, i);
            } else if (mode === "hoverdotMax") {
                tile.onmouseover = () => dotMax(sessionMapData.drawMode["inputTile"], j, i);
            } else if (mode === "clickhLine") {
                tile.onclick = () => hLine(sessionMapData.drawMode["inputTile"], i);
            } else if (mode === "hoverhLine") {
                tile.onmouseover = () => hLine(sessionMapData.drawMode["inputTile"], i);
            } else if (mode === "clickvLine") {
                tile.onclick = () => vLine(sessionMapData.drawMode["inputTile"], j);
            } else if (mode === "hovervLine") {
                tile.onmouseover = () => vLine(sessionMapData.drawMode["inputTile"], j);
            } else if (mode === "clickdLineA") {
                tile.onclick = () => dLineA(sessionMapData.drawMode["inputTile"], j, i);
            } else if (mode === "hoverdLineA") {
                tile.onmouseover = () => dLineA(sessionMapData.drawMode["inputTile"], j, i);
            } else if (mode === "clickdLineB") {
                tile.onclick = () => dLineB(sessionMapData.drawMode["inputTile"], j, i);
            } else if (mode === "hoverdLineB") {
                tile.onmouseover = () => dLineB(sessionMapData.drawMode["inputTile"], j, i);
            } else if (mode === "clicktCross") {
                tile.onclick = () => tCross(sessionMapData.drawMode["inputTile"], j, i);
            } else if (mode === "hovertCross") {
                tile.onmouseover = () => tCross(sessionMapData.drawMode["inputTile"], j, i);
            } else if (mode === "clickxCross") {
                tile.onclick = () => xCross(sessionMapData.drawMode["inputTile"], j, i);
            } else if (mode === "hoverxCross") {
                tile.onmouseover = () => xCross(sessionMapData.drawMode["inputTile"], j, i);
            } else if (mode === "clickbox") {
                tile.onclick = () => cornerA(j, i);
            } else if (mode === "hoverbox") {
                tile.onmouseover = () => cornerAhover(j, i);
            } else if (mode === "clickcbox") {
                tile.onclick = () => cornerB(j, i);
            } else if (mode === "hovercbox") {
                tile.onmouseover = () => cornerBhover(j, i);
            } else {
                document.getElementById("alert").innerHTML = "Not a valid drawMode!";
                setMode("click");
                setShape("dot");
            }
        }
    }
    document.getElementById("drawModeCycle").innerHTML = sessionMapData.drawMode["drawMode"];
}

/* DrawMode: Cycle DrawModes */
function drawModeCycle() { 
    let drawMode = sessionMapData.drawMode["drawMode"];
    if (drawMode === "clickdot") {
        setMode("hover");
    } else if (drawMode === "hoverdot") {
        setMode("click");
        setShape("hLine");
    } else if (drawMode === "clickhLine") {
        setShape("vLine");
    } else if (drawMode === "hoverhLine") {
        setShape("vLine");
    } else if (drawMode === "clickvLine") {
        setMode("hover");
        setShape("hLine");
    } else if (drawMode === "hovervLine") {
        setMode("click");
        setShape("dot");
    } else {
        setMode("click");
        setShape("dot");
        setInputTile(sessionMapData.assets["wall"]);
    }
}

/* DrawMode: Set tool menu */
function setTool(tool) {
    document.getElementById("drawIcon").style = "";
    document.getElementById("eraseIcon").style = "";
    document.getElementById("inputIcon").style = "";
    document.getElementById("flipIcon").style = "";
    if (tool == "draw") {
        document.getElementById("drawIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
        sessionMapData.drawMode["inputTile"] = sessionMapData.assets["wall"];
        sessionMapData.drawMode["inputOn"] = false;
    } else if (tool == "erase") {
        document.getElementById("eraseIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
        sessionMapData.drawMode["inputTile"] = sessionMapData.assets["space"];
        sessionMapData.drawMode["inputOn"] = false;
    } else if (tool == "input") {
        document.getElementById("inputIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
        sessionMapData.drawMode["inputTile"] = sessionMapData.drawMode["lastTile"];
        sessionMapData.drawMode["inputOn"] = true;
    }
}

/* DrawMode: Set mode menu */
function setMode(mode) {
    document.getElementById("clickIcon").style = "";
    document.getElementById("hoverIcon").style = "";
    document.getElementById("bucketIcon").style = "";
    if (mode == "click") {
        document.getElementById("clickIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
        sessionMapData.drawMode["mode"] = "click";
    } else if (mode == "hover") {
        document.getElementById("hoverIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
        sessionMapData.drawMode["mode"] = "hover";
    } else if (mode == "bucket") {
        document.getElementById("bucketIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
        sessionMapData.drawMode["mode"] = "bucket";
    } 
    sessionMapData.drawMode["drawMode"] = sessionMapData.drawMode["mode"] + sessionMapData.drawMode["shape"];
    setDrawMode(sessionMapData.drawMode["drawMode"]);
}

/* DrawMode: Set shape menu */
function setShape(shape) {
    document.getElementById("dotIcon").style = "";
    document.getElementById("dotMidIcon").style = "";
    document.getElementById("dotMaxIcon").style = "";
    document.getElementById("hLineIcon").style = "";
    document.getElementById("vLineIcon").style = "";
    document.getElementById("crossIcon").style = "";
    document.getElementById("dLineAIcon").style = "";
    document.getElementById("dLineBIcon").style = "";
    document.getElementById("xCrossIcon").style = "";
    document.getElementById("boxIcon").style = "";
    if (shape == "dot") {
        document.getElementById("dotIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
        sessionMapData.drawMode["shape"] = "dot";
    } else if (shape == "dotMid") {
        document.getElementById("dotMidIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
        sessionMapData.drawMode["shape"] = "dotMid";
    } else if (shape == "dotMax") {
        document.getElementById("dotMaxIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
        sessionMapData.drawMode["shape"] = "dotMax";
    } else if (shape == "hLine") {
        document.getElementById("hLineIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
        sessionMapData.drawMode["shape"] = "hLine";
    } else if (shape == "vLine") {
        document.getElementById("vLineIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
        sessionMapData.drawMode["shape"] = "vLine";
    } else if (shape == "tCross") {
        document.getElementById("crossIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
        sessionMapData.drawMode["shape"] = "tCross";
    } else if (shape == "dLineA") {
        document.getElementById("dLineAIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
        sessionMapData.drawMode["shape"] = "dLineA";
    } else if (shape == "dLineB") {
        document.getElementById("dLineBIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
        sessionMapData.drawMode["shape"] = "dLineB";
    } else if (shape == "xCross") {
        document.getElementById("xCrossIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
        sessionMapData.drawMode["shape"] = "xCross";
    } else if (shape == "box") {
        document.getElementById("boxIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
        sessionMapData.drawMode["shape"] = "box";
    }
    sessionMapData.drawMode["drawMode"] = sessionMapData.drawMode["mode"] + sessionMapData.drawMode["shape"];
    setDrawMode(sessionMapData.drawMode["drawMode"]);
}

/* DrawMode: Set input tile menu */
function setInputTile(tileSrc) {
    document.getElementById("chestIcon").style = "";
    document.getElementById("goldChestIcon").style = "";
    document.getElementById("keyIcon").style = "";
    document.getElementById("heartKeyIcon").style = "";
    document.getElementById("scrollIcon").style = "";
    document.getElementById("coinsIcon").style = "";
    document.getElementById("potionIcon").style = "";
    document.getElementById("invisibilityIcon").style = "";
    document.getElementById("appleIcon").style = "";
    document.getElementById("bananaIcon").style = "";
    document.getElementById("cherryIcon").style = "";
    document.getElementById("grapeIcon").style = "";
    document.getElementById("kiwiIcon").style = "";
    document.getElementById("lemonIcon").style = "";
    document.getElementById("limeIcon").style = "";
    document.getElementById("mangoIcon").style = "";
    document.getElementById("orangeIcon").style = "";
    document.getElementById("papayaIcon").style = "";
    document.getElementById("pearIcon").style = "";
    document.getElementById("pineappleIcon").style = "";
    document.getElementById("rambutanIcon").style = "";
    document.getElementById("soursopIcon").style = "";
    document.getElementById("starfruitIcon").style = "";
    document.getElementById("strawberryIcon").style = "";
    document.getElementById("watermelonIcon").style = "";
    sessionMapData.drawMode["lastTile"] = tileSrc;
    if (sessionMapData.drawMode["lastTile"] == "assets/chest.png") {
        document.getElementById("chestIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/goldChest.png") {
        document.getElementById("goldChestIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/key.png") {
        document.getElementById("keyIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/heartKey.png") {
        document.getElementById("heartKeyIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/scroll.png") {
        document.getElementById("scrollIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/coins.png") {
        document.getElementById("coinsIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/potion.png") {
        document.getElementById("potionIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/invisibility.png") {
        document.getElementById("invisibilityIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/food/apple.png") {
        document.getElementById("appleIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/food/banana.png") {
        document.getElementById("bananaIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/food/cherry.png") {
        document.getElementById("cherryIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/food/grape.png") {
        document.getElementById("grapeIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/food/kiwi.png") {
        document.getElementById("kiwiIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/food/lemon.png") {
        document.getElementById("lemonIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/food/lime.png") {
        document.getElementById("limeIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/food/mango.png") {
        document.getElementById("mangoIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/food/orange.png") {
        document.getElementById("orangeIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/food/papaya.png") {
        document.getElementById("papayaIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/food/pear.png") {
        document.getElementById("pearIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/food/pineapple.png") {
        document.getElementById("pineappleIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/food/rambutan.png") {
        document.getElementById("rambutanIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/food/soursop.png") {
        document.getElementById("soursopIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/food/starfruit.png") {
        document.getElementById("starfruitIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/food/strawberry.png") {
        document.getElementById("strawberryIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    } else if (sessionMapData.drawMode["lastTile"] == "assets/food/watermelon.png") {
        document.getElementById("watermelonIcon").style = "border: 1px, red, solid; background-color: #D3D3D3";
    }
    if (sessionMapData.drawMode["inputOn"]) sessionMapData.drawMode["inputTile"] = tileSrc;
}

/* Helper: DrawMode Rect() Corner */
function cornerAhover(x, y) {
    sessionMapData.drawMode["x1"] = x;
    sessionMapData.drawMode["y1"] = y;
    setTileSrc(sessionMapData.drawMode["inputTile"], x, y);
    setDrawMode("hovercbox");
}

/* Helper: DrawMode Rect() Corner */
function cornerBhover(x, y) {
    sessionMapData.drawMode["x2"] = x;
    sessionMapData.drawMode["y2"] = y;
    rect();
    setDrawMode("clickbox");
}

/* DrawMode: Flip tile function for whole map */
function flipper() {
    for (let i = 0; i < sessionMapData.vars["ySize"]; i++) {
        for (let j = 0; j < sessionMapData.vars["xSize"]; j++) {
            flipTile(j, i);
        }
    }
    if (document.getElementById("flipIcon").getAttribute("src") == "assets/drawmode/flipA.png") {
        document.getElementById("flipIcon").src = "assets/drawmode/flipB.png";
    } else if (document.getElementById("flipIcon").getAttribute("src") == "assets/drawmode/flipB.png") {
        document.getElementById("flipIcon").src = "assets/drawmode/flipA.png";
    }
}

/* ############################################################################################################################# */
/* ####################################################[ DRAWMODE/STYLING ]##################################################### */
/* ############################################################################################################################# */

/* Paint: Tile Background Color Painter */
function paint(tileID, color) {
    document.getElementById(tileID).style = "background-color: " + color + ";";
}

/* Paint: Toggle/Set Paint Color */
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

/* Paint: Prompt to Change Paint Color */
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

/* ############################################################################################################################# */
/* ######################################################[ EXPERIMENTAL/FUN ]################################################### */
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

/* Fun: Flashing Function */
async function flashTiles() {
    let swaps = 0;
    for (let k = 0; k < 30; k++) {
        swaps += 1;
        for (let i = 0; i < sessionMapData.vars["ySize"]; i++) {
            for (let j = 0; j < sessionMapData.vars["xSize"]; j++) {
                if (((i + j + swaps) % 2) != 0) {
                    document.getElementById(j + "_" + i).style = "background-color: " + sessionMapData.drawMode["color1"];
                } else {
                    document.getElementById(j + "_" + i).style = "background-color: " + sessionMapData.drawMode["color2"];
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

/* Fun: Monster Scare */
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
/* ################################################[ DEVELOPMENT/GLOBAL HELPERS ]############################################### */
/* ############################################################################################################################# */

/* Helper: Delay Promise, Needs Async */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* Helper: Resets Variables */
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

/* DevTools: Testing Tools */
function devTools() {
    // If Empty, Initialize
    if (document.getElementById("devTools").innerHTML == "") {
        document.getElementById("title").innerHTML = "Monster Tiles Sandbox (" + session_id + ")";
        document.getElementById("devTools").innerHTML = '<div><button onclick="timer()">Time</button><br><div id="devClock" class="center"></div></div>';
        devClock(300);
    } else if (document.getElementById("devTools").getAttribute("style") == "display: none;"){ // If Hidden, Show
        document.getElementById("title").innerHTML = "Monster Tiles Sandbox (" + session_id + ")";
        document.getElementById("devTools").style = "display: flex;";
    } else { // If Not Empty or Hidden, Hide;
        document.getElementById("title").innerHTML = "Monster Tiles Sandbox";
        document.getElementById("devTools").style = "display: none;";
    }
}

/* DevTools: Variable Clock for Debugging */
async function devClock(amt) {
    if (document.getElementById("devClock").innerHTML == "") {
        let clock = amt || prompt("How much time do you need (in seconds)?") || 600;
        clock *= 10;
        document.getElementById("devClock").innerHTML = '<div style="border: 1px, solid, black; width: 12vw;"><p>x-Size: <span id="xSize"></span> | y-Size: <span id="ySize"></span></p><p>x-Pos: <span id="xPos"></span> | y-Pos: <span id="yPos"></span></p><p>x2-Pos: <span id="x2Pos"></span> | y2-Pos: <span id="y2Pos"></span></p><p>rand-X: <span id="randX"></span> | rand-Y: <span id="randY"></span></p><p>playerCount: <span id="playerCount"></span> | openTiles: <span id="openTiles"></span></p><p>gameClock: <span id="gameClock"></span> </p><p>active: <span id="active"></span> | active1: <span id="active1"></span> | active2: <span id="active2"></span> | Clock: <span id="clock"></span></p><p>drawMode: <span id="drawMode"></span></p></div>';
        for (let i = 0; i < clock; i++) {
            document.getElementById("xSize").innerHTML = sessionMapData.vars["xSize"];
            document.getElementById("ySize").innerHTML = sessionMapData.vars["ySize"];
            document.getElementById("xPos").innerHTML = sessionMapData.players["p1"].xPos;
            document.getElementById("yPos").innerHTML = sessionMapData.players["p1"].yPos;
            document.getElementById("x2Pos").innerHTML = sessionMapData.players["p2"].xPos;
            document.getElementById("y2Pos").innerHTML = sessionMapData.players["p2"].yPos;
            document.getElementById("randX").innerHTML = sessionMapData.vars["randX"];
            document.getElementById("randY").innerHTML = sessionMapData.vars["randY"];
            document.getElementById("playerCount").innerHTML = sessionMapData.vars["playerCount"];
            document.getElementById("result1").innerHTML = sessionMapData.vars["result1"];
            document.getElementById("result2").innerHTML = sessionMapData.vars["result2"];
            document.getElementById("openTiles").innerHTML = sessionMapData.vars["openTiles"];
            document.getElementById("active").innerHTML = sessionMapData.players["bot"].active;
            document.getElementById("active1").innerHTML = sessionMapData.players["p1"].active;
            document.getElementById("active2").innerHTML = sessionMapData.players["p2"].active;
            document.getElementById("gameClock").innerHTML = sessionMapData.vars["gameClock"] / 10;
            document.getElementById("clock").innerHTML = i / 10;
            document.getElementById("drawMode").innerHTML = sessionMapData.drawMode["drawMode"];
            await delay(100);
        }
        await delay(500);
        document.getElementById("devClock").innerHTML = "<p onclick='devClock()'>Dev Clock Timer Up!</p>";
        await delay(1000);
        document.getElementById("devClock").innerHTML = "";
    } else {
        document.getElementById("devClock").innerHTML == "";
    }
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

/* Game Event Listener: for Monster Sandbox - Updates for Color Picker */
document.addEventListener('change', (event) => {
    paintOn(document.getElementById('colorPicker').value);
});

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
                if (swapIfTile(oldID1, newID1)) {
                    sessionMapData.players["p1"].xPos = new1.x;
                    sessionMapData.players["p1"].yPos = new1.y;
                }
            }
            // Player 2 move if it actually wants to move
            if (sessionMapData.players["p2"].active && !(new2.x === old2.x && new2.y === old2.y)) {
                const oldID2 = old2.x + "_" + old2.y;
                const newID2 = new2.x + "_" + new2.y;
                if (swapIfTile(oldID2, newID2)) {
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