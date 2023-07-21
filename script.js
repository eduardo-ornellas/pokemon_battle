let currentPlayer = "pokemon2"; // Define o jogador atual como o Pokémon 2
let pokemon1HP = 100;
let pokemon2HP = 90;
let gameOver = false;

function switchTurn() {
  currentPlayer = currentPlayer === "pokemon1" ? "pokemon2" : "pokemon1";
  const currentPokemon = document.getElementById(currentPlayer);
  const inactivePokemon = document.getElementById(currentPlayer === "pokemon1" ? "pokemon2" : "pokemon1");

  currentPokemon.style.order = "2"; // Posiciona o Pokémon ativo embaixo
  inactivePokemon.style.order = "1"; // Posiciona o Pokémon inativo em cima
}

function attack(attacker, defender, power) {
  if (gameOver) {
    // Impede ataques após o jogo terminar
    return;
  }

  if (currentPlayer !== attacker) {
    // Impede que o jogador ataque duas vezes seguidas
    alert("Aguarde sua vez!");
    return;
  }

  // Calcula o dano causado ao Pokémon defensor
  const defenderHealth = document.getElementById(`${defender}-health`);
  let currentHealth = parseInt(defenderHealth.style.width, 10) || 100; // Se o valor for NaN, assume 100
  currentHealth -= power;

  // Atualiza a barra de vida do Pokémon defensor
  defenderHealth.style.width = `${currentHealth}%`;

  // Atualiza o contador de HP do Pokémon defensor
  const defenderHPCount = document.getElementById(`${defender}-hp-count`);
  const maxHP = defender === "pokemon1" ? pokemon1HP : pokemon2HP;
  const newHP = Math.max(currentHealth * maxHP / 100, 0); // Evita valores negativos
  defenderHPCount.textContent = `${newHP.toFixed(0)}/${maxHP}`;

  // Verifica se o Pokémon defensor foi derrotado
  if (currentHealth <= 0) {
    alert(`Parabéns! O ${defender} foi derrotado!`);
    gameOver = true;
    return;
  }

  // Muda para o próximo jogador
  switchTurn();

  // Simula o ataque do Pokémon adversário após 1 segundo (apenas para fins de exemplo)
  setTimeout(() => enemyAttack(), 1000);
}

function enemyAttack() {
  // Simula o ataque do Pokémon adversário
  const power = Math.floor(Math.random() * 15) + 5;
  attack("pokemon2", "pokemon1", power);
}

function resetBattle() {
  // Reinicia a vida dos Pokémon
  pokemon1HP = 100;
  pokemon2HP = 90;
  document.getElementById("pokemon1-health").style.width = "100%";
  document.getElementById("pokemon2-health").style.width = "100%";

  // Reinicia os contadores de HP
  document.getElementById("pokemon1-hp-count").textContent = "100/100";
  document.getElementById("pokemon2-hp-count").textContent = "90/90";

  // Reinicia o jogador atual para o Pokémon 2
  currentPlayer = "pokemon2";
  gameOver = false;

  // Posiciona o Pokémon 2 embaixo e o Pokémon 1 em cima
  document.getElementById("pokemon1").style.order = "2";
  document.getElementById("pokemon2").style.order = "1";
}
