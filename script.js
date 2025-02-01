document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('characterForm');
  const savedCharactersDiv = document.getElementById('savedCharacters');

  // Carregar personagens salvos do localStorage
  let savedCharacters = JSON.parse(localStorage.getItem('characters')) || [];

  function saveCharacter(character) {
    savedCharacters.push(character);
    localStorage.setItem('characters', JSON.stringify(savedCharacters));
    renderCharacters();
  }

  function renderCharacters() {
    savedCharactersDiv.innerHTML = '';
    savedCharacters.forEach((character, index) => {
      const card = document.createElement('div');
      card.classList.add('character-card');
      card.innerHTML = `
        <strong>${character.name}</strong> (${character.race} - ${character.class})
        <br>
        Alinhamento: ${character.alignment || 'N/A'}, Idade: ${character.age || 'N/A'}
        <br>
        Altura: ${character.height || 'N/A'}m, Peso: ${character.weight || 'N/A'}kg
        <br>
        Olhos: ${character.eyes || 'N/A'}, Cabelos: ${character.hair || 'N/A'}, Pele: ${character.skin || 'N/A'}
        <br>
        Pano de Fundo: ${character.background || 'N/A'}
        <br>
        Força: ${character.strength}, Destreza: ${character.dexterity}, Constituição: ${character.constitution},
        Inteligência: ${character.intelligence}, Sabedoria: ${character.wisdom}, Carisma: ${character.charisma}
        <br>
        PV: ${character.hp}, CA: ${character.ac}, Velocidade: ${character.speed || 'N/A'}m
        <br>
        Salvaguardas: ${character.savingThrows || 'N/A'}
        <br>
        Perícias: ${character.skills || 'N/A'}
        <br>
        Armas: ${character.weapons || 'N/A'}
        <br>
        Armaduras: ${character.armors || 'N/A'}
        <br>
        Ferramentas: ${character.tools || 'N/A'}
        <br>
        Idiomas: ${character.languages || 'N/A'}
        <br>
        Habilidades de Classe: ${character.classFeatures || 'N/A'}
        <br>
        Equipamentos: ${character.equipment || 'N/A'}
        <br>
        Artefato Único: ${character.artifactName || 'N/A'}
        <br>
        Descrição do Artefato: ${character.artifactDescription || 'N/A'}
        <br>
        Lore: ${character.lore || 'N/A'}
        <button class="export-button" data-index="${index}">Exportar como PDF</button>
      `;
      savedCharactersDiv.appendChild(card);
    });

    // Adicionar evento de clique aos botões de exportação
    document.querySelectorAll('.export-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        exportToPDF(savedCharacters[index]);
      });
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const character = {
      name: form.name.value,
      race: form.race.value,
      class: form.class.value,
      alignment: form.alignment.value,
      age: form.age.value,
      height: form.height.value,
      weight: form.weight.value,
      eyes: form.eyes.value,
      hair: form.hair.value,
      skin: form.skin.value,
      background: form.background.value,
      strength: form.strength.value,
      dexterity: form.dexterity.value,
      constitution: form.constitution.value,
      intelligence: form.intelligence.value,
      wisdom: form.wisdom.value,
      charisma: form.charisma.value,
      hp: form.hp.value,
      ac: form.ac.value,
      speed: form.speed.value,
      savingThrows: form.savingThrows.value,
      skills: form.skills.value,
      weapons: form.weapons.value,
      armors: form.armors.value,
      tools: form.tools.value,
      languages: form.languages.value,
      classFeatures: form.classFeatures.value,
      equipment: form.equipment.value,
      artifactName: form.artifactName.value,
      artifactDescription: form.artifactDescription.value,
      lore: form.lore.value,
    };

    saveCharacter(character);

    // Limpar o formulário
    form.reset();
  });

  // Função para exportar como PDF
  function exportToPDF(character) {
    const { jsPDF } = window.jspdf;

    // Criar um novo documento PDF
    const doc = new jsPDF();

    // Adicionar conteúdo ao PDF
    let y = 10; // Posição vertical inicial
    const lineSpacing = 10;

    doc.setFontSize(18);
    doc.text(`${character.name} - Ficha de Personagem`, 10, y);
    y += lineSpacing + 5;

    doc.setFontSize(12);
    doc.text(`Raça: ${character.race}`, 10, y);
    y += lineSpacing;
    doc.text(`Classe: ${character.class}`, 10, y);
    y += lineSpacing;
    doc.text(`Alinhamento: ${character.alignment || 'N/A'}`, 10, y);
    y += lineSpacing;
    doc.text(`Idade: ${character.age || 'N/A'}`, 10, y);
    y += lineSpacing;
    doc.text(`Altura: ${character.height || 'N/A'}m`, 10, y);
    y += lineSpacing;
    doc.text(`Peso: ${character.weight || 'N/A'}kg`, 10, y);
    y += lineSpacing;
    doc.text(`Olhos: ${character.eyes || 'N/A'}`, 10, y);
    y += lineSpacing;
    doc.text(`Cabelos: ${character.hair || 'N/A'}`, 10, y);
    y += lineSpacing;
    doc.text(`Pele: ${character.skin || 'N/A'}`, 10, y);
    y += lineSpacing;
    doc.text(`Pano de Fundo: ${character.background || 'N/A'}`, 10, y);
    y += lineSpacing + 5;

    doc.text(`Atributos:`, 10, y);
    y += lineSpacing;
    doc.text(`Força: ${character.strength}`, 10, y);
    y += lineSpacing;
    doc.text(`Destreza: ${character.dexterity}`, 10, y);
    y += lineSpacing;
    doc.text(`Constituição: ${character.constitution}`, 10, y);
    y += lineSpacing;
    doc.text(`Inteligência: ${character.intelligence}`, 10, y);
    y += lineSpacing;
    doc.text(`Sabedoria: ${character.wisdom}`, 10, y);
    y += lineSpacing;
    doc.text(`Carisma: ${character.charisma}`, 10, y);
    y += lineSpacing + 5;

    doc.text(`Pontos de Vida: ${character.hp}`, 10, y);
    y += lineSpacing;
    doc.text(`Classe de Armadura: ${character.ac}`, 10, y);
    y += lineSpacing;
    doc.text(`Velocidade: ${character.speed || 'N/A'}m`, 10, y);
    y += lineSpacing + 5;

    doc.text(`Salvaguardas: ${character.savingThrows || 'N/A'}`, 10, y);
    y += lineSpacing;
    doc.text(`Perícias: ${character.skills || 'N/A'}`, 10, y);
    y += lineSpacing;
    doc.text(`Armas: ${character.weapons || 'N/A'}`, 10, y);
    y += lineSpacing;
    doc.text(`Armaduras: ${character.armors || 'N/A'}`, 10, y);
    y += lineSpacing;
    doc.text(`Ferramentas: ${character.tools || 'N/A'}`, 10, y);
    y += lineSpacing;
    doc.text(`Idiomas: ${character.languages || 'N/A'}`, 10, y);
    y += lineSpacing + 5;

    doc.text(`Habilidades de Classe: ${character.classFeatures || 'N/A'}`, 10, y);
    y += lineSpacing + 5;

    doc.text(`Equipamentos: ${character.equipment || 'N/A'}`, 10, y);
    y += lineSpacing + 5;

    doc.text(`Artefato Único: ${character.artifactName || 'N/A'}`, 10, y);
    y += lineSpacing;
    doc.text(`Descrição do Artefato: ${character.artifactDescription || 'N/A'}`, 10, y);
    y += lineSpacing + 5;

    doc.text(`Lore: ${character.lore || 'N/A'}`, 10, y);

    // Salvar o PDF
    doc.save(`${character.name}_Ficha.pdf`);
  }

  // Renderizar os personagens salvos ao carregar a página
  renderCharacters();
});