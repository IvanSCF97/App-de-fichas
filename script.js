document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('characterForm');
  const savedCharactersDiv = document.getElementById('savedCharacters');
  const themeToggle = document.getElementById('themeToggle');

  // Carregar personagens salvos do localStorage
  let savedCharacters = JSON.parse(localStorage.getItem('characters')) || [];

  // Função para salvar um novo personagem
  function saveCharacter(character) {
    savedCharacters.push(character);
    localStorage.setItem('characters', JSON.stringify(savedCharacters));
    renderCharacters();
  }

  // Função para excluir um personagem
  function deleteCharacter(index) {
    savedCharacters.splice(index, 1); // Remove o personagem pelo índice
    localStorage.setItem('characters', JSON.stringify(savedCharacters)); // Atualiza o localStorage
    renderCharacters(); // Re-renderiza as fichas
  }

  // Função para renderizar as fichas salvas
  function renderCharacters() {
    savedCharactersDiv.innerHTML = ''; // Limpa a área de exibição

    savedCharacters.forEach((character, index) => {
      const card = document.createElement('div');
      card.classList.add('character-card');

      // Exibir os detalhes da ficha
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
        <div class="action-buttons">
          <button class="export-button" data-index="${index}">PDF</button>
          <button class="word-export-button" data-index="${index}">WORD</button>
          <button class="delete-button" data-index="${index}">EXCLUIR</button>
        </div>
      `;
      savedCharactersDiv.appendChild(card);
    });

    // Adicionar eventos de clique aos botões de exportação
    document.querySelectorAll('.export-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        exportToPDF(savedCharacters[index]);
      });
    });

    // Adicionar eventos de clique aos botões de exportação para Word
    document.querySelectorAll('.word-export-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        exportToWord(savedCharacters[index]);
      });
    });

    // Adicionar eventos de clique aos botões de exclusão
    document.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        deleteCharacter(index);
      });
    });
  }

  // Evento de envio do formulário
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Criar um objeto com os dados do formulário
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
      image: form.characterImage.files[0] ? URL.createObjectURL(form.characterImage.files[0]) : null,
    };

    // Salvar o personagem e limpar o formulário
    saveCharacter(character);
    form.reset();
  });

  // Função para exportar como PDF
  function exportToPDF(character) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;
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
    y += lineSpacing;
    doc.text(`PV: ${character.hp}`, 10, y);
    y += lineSpacing;
    doc.text(`CA: ${character.ac}`, 10, y);
    y += lineSpacing;
    doc.text(`Velocidade: ${character.speed || 'N/A'}m`, 10, y);

    doc.save(`${character.name}_Ficha.pdf`);
  }

  // Função para exportar como Word
  function exportToWord(character) {
    const template = `
      Nome: ${character.name}
      Raça: ${character.race}
      Classe: ${character.class}
      Alinhamento: ${character.alignment || 'N/A'}
      Idade: ${character.age || 'N/A'}
      Altura: ${character.height || 'N/A'}m
      Peso: ${character.weight || 'N/A'}kg
      Olhos: ${character.eyes || 'N/A'}
      Cabelos: ${character.hair || 'N/A'}
      Pele: ${character.skin || 'N/A'}
      Pano de Fundo: ${character.background || 'N/A'}
      Força: ${character.strength}
      Destreza: ${character.dexterity}
      Constituição: ${character.constitution}
      Inteligência: ${character.intelligence}
      Sabedoria: ${character.wisdom}
      Carisma: ${character.charisma}
      PV: ${character.hp}
      CA: ${character.ac}
      Velocidade: ${character.speed || 'N/A'}m
      Salvaguardas: ${character.savingThrows || 'N/A'}
      Perícias: ${character.skills || 'N/A'}
      Armas: ${character.weapons || 'N/A'}
      Armaduras: ${character.armors || 'N/A'}
      Ferramentas: ${character.tools || 'N/A'}
      Idiomas: ${character.languages || 'N/A'}
      Habilidades de Classe: ${character.classFeatures || 'N/A'}
      Equipamentos: ${character.equipment || 'N/A'}
      Artefato Único: ${character.artifactName || 'N/A'}
      Descrição do Artefato: ${character.artifactDescription || 'N/A'}
      Lore: ${character.lore || 'N/A'}
    `;

    const zip = new JSZip();
    const doc = new window.docxtemplater();
    doc.loadZip(zip);
    doc.setData({ content: template });

    try {
      doc.render();
    } catch (error) {
      console.error(error);
    }

    const out = doc.getZip().generate({ type: "blob" });
    saveAs(out, `${character.name}_Ficha.docx`);
  }

  // Alternar Modo Escuro/Claro
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });

  // Renderizar os personagens salvos ao carregar a página
  renderCharacters();
});