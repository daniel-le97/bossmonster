let gold = 0;
const heroes = [
  {
    name: "Taz",
    type: "devil",
    damage: 1,
    health: 100,
    img: "png-transparent-space-jam-2-thumbnail.png",
    lvl: 1,
  },
  {
    name: "Daffy",
    type: "duck",
    damage: 1,
    health: 50,
    img: "https://secure.img1-fg.wfcdn.com/im/55789700/compr-r85/1539/153915178/daffy-duck-cardboard-standup.jpg",
    lvl: 0,
  },
  {
    name: "Lola",
    type: "bunny",
    damage: 1,
    health: 50,
    img: "/win_taunt_3_by_armentis_davncca.gif",
    lvl: 0,
  },
];

const boss = {
  health: 100,
  maxHealth: 100,
  damage: 1,
  level: 1,
};

function drawHeros() {
  let character = document.getElementById("heros");
  let template = "";
  heroes.forEach((hero) => {
    // console.log(hero);
    if (hero.lvl >= 1) {
      template += `
      <div class="col-4">
      <div class="card p-1">
      <div class="text-center">
      <img src="${hero.img}" class="card-img-top img-height" alt="...">
      </div>
      <div class="card-body">
      <h5 class="card-title">${hero.name} ${hero.type}</h5>
      <p id="health">Health: ${hero.health} <button onclick="potion('${hero.name}')">Potion: 5g</button></p>
      <p class="card-text" id="lvl">Level ${hero.lvl}</p>
      </div>
      </div>
      </div>
      `;
    }
  });
  // @ts-ignore
  character.innerHTML = template;
}

function heroDamage() {
  heroes.forEach((hero) => {
    if (hero.lvl > 0) {
      hero.health -= boss.damage;
      if (hero.health < 0) {
        hero.health = 0;
      }
    }
  });
  drawHeros();
}
function potion(name) {
  let hero = heroes.find((hero) => hero.name == name);
  // @ts-ignore
  hero.health += 25;
  if (hero.health > 100) {
    hero.health = 100;
  }

  if (gold < 5) {
    return;
  }

  gold -= 5;

  let money = document.querySelector("#gold");
  money.innerText = gold;

  drawHeros();
}

function monsterDamage() {
  heroes.forEach((hero) => {
    if (hero.lvl > 0) {
      if (hero.health > 0) {
        boss.health -= hero.damage;
        // @ts-ignore
        console.log(boss.health);
        goldOnHit();
      }
    }
  });
  bossHealth();
  bossLevelUp();
}
function bossHealth() {
  let bosshealth = document.querySelector("#bosshealth");
  let template = "";
  template += `
    <div class="progress">
          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressBar"
            aria-label="Animated striped example" aria-valuenow="${boss.health}%" aria-valuemin="0" aria-valuemax="100"
            style="width: ${boss.health}%">
          </div>
        </div>`;
  // @ts-ignore
  bosshealth.innerHTML = template;
}
function bossLevelUp() {
  if (boss.health <= 0) {
    boss.level++;
    heroes.forEach((hero) => {
      hero.lvl++;
      hero.damage += hero.damage * 1.1;
      console.log(hero.damage);
    });

    console.log("level", boss.level);

    if (boss.level >= 1) {
      boss.maxHealth += boss.maxHealth * 1.5;
      boss.health = boss.maxHealth;
      document.getElementById("levelId").innerText = boss.level;
      // @ts-ignore
      document.getElementById("monsterimg").src =
        "/goaliath___idle_by_porforever_d9t67jo.gif";
      document.querySelector(".back").classList.remove("hidden");
      if (!document.querySelector(".back").classList.contains("hidden")) {
        alert("AHHHHH RUNNNNNN");
      }
    }
  }
}
function goldOnHit() {
  gold++;
  let money = document.querySelector("#gold");
  // @ts-ignore
  money.innerText = gold;

  // @ts-ignore
}

function getHelp(name) {
  let help = heroes.find((hero) => hero.name == name);
  // @ts-ignore
  if (gold < 10) {
    return;
  } else {
    help.lvl++;
  }
  gold -= 10;
  let money = document.querySelector("#gold");
  money.innerText = gold;

  drawHeros();
}

function getStronger() {
  heroes.forEach((hero) => {
    if (hero.health > 1) {
      hero.damage += hero.damage * 5;
    }
  });

  console.log("check");
}

bossHealth();
setInterval(heroDamage, 500);
drawHeros();
