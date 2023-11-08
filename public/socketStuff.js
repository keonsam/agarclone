const socket = io.connect("http://localhost:9000");
let tockInterval;

const init = async () => {
  const { orbs: initOrbs, index } = await socket.emitWithAck("init", {
    playerName: player.name,
  });

  tockInterval = setInterval(() => {
    socket.emit("tock", {
      xVector: player.xVector,
      yVector: player.yVector,
    });
  });

  orbs = initOrbs;
  player.index = index;

  draw();
};

socket.on("tick", (playerArr) => {
  players = playerArr;
  player.locX = playerArr[player.index].locX;
  player.locY = playerArr[player.index].locY;
});

socket.on("orbSwitch", (orbData) => {
  //the server just told us that an orb was absorbed. Replace it in the orbs array!
  orbs.splice(orbData.capturedOrbI, 1, orbData.newOrb);
});

socket.on("playerAbsorbed", (absorbData) => {
  document.querySelector(
    "#game-message"
  ).innerHTML = `${absorbData.absorbed} was absorbed by ${absorbData.absorbedBy}`;
  document.querySelector("#game-message").style.opacity = 1;
  window.setTimeout(() => {
    document.querySelector("#game-message").style.opacity = 0;
  }, 2000);
});

socket.on("updateLeaderBoard", (leaderBoardArray) => {
  // console.log(leaderBoardArray)
  leaderBoardArray.sort((a, b) => {
    return b.score - a.score;
  });
  document.querySelector(".leader-board").innerHTML = "";
  leaderBoardArray.forEach((p) => {
    if (!p.name) {
      return;
    }
    document.querySelector(".leader-board").innerHTML += `
                <li class="leaderboard-player">${p.name} - ${p.score}</li>
            `;
  });
  const el = leaderBoardArray.find((u) => u.name === player.name);
  document.querySelector(".player-score").innerHTML = el.score;
});
