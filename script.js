
const files = [
    'document1.txt', 'presentation1.pdf', 'song1.mp3', 'installer1.exe',
    'archive1.rar', 'image1.jpg', 'graphic1.png', 'animation1.gif', 'compressed1.zip',
    'document2.txt', 'presentation2.pdf', 'song2.mp3', 'installer2.exe',
    'archive2.rar', 'image2.jpg', 'graphic2.png', 'animation2.gif', 'compressed2.zip',
  ];
  
 
  const fileIcons = {
    txt: 'https://via.placeholder.com/50?text=TXT',
    pdf: 'https://via.placeholder.com/50?text=PDF',
    mp3: 'https://via.placeholder.com/50?text=MP3',
    exe: 'https://via.placeholder.com/50?text=EXE',
    rar: 'https://via.placeholder.com/50?text=RAR',
    docx: 'https://via.placeholder.com/50?text=DOCX',
    jpg: 'https://via.placeholder.com/50?text=JPG',
    png: 'https://via.placeholder.com/50?text=PNG',
    gif: 'https://via.placeholder.com/50?text=GIF',
    zip: 'https://via.placeholder.com/50?text=ZIP',
  };
  
 
  const categorizedFiles = files.reduce((acc, file) => {
    const extension = file.split('.').pop();
    if (!acc[extension]) acc[extension] = [];
    acc[extension].push(file);
    return acc;
  }, {});
  

  const folderContainer = document.querySelector('.folder-container');
  const fileListContainer = document.querySelector('.file-list-container');
  const searchInput = document.querySelector('#searchInput');
  const sortButton = document.querySelector('#sortButton');
  

  let currentFolder = null;
  let currentFiles = [];
  
  
  function displayFolders() {
    folderContainer.innerHTML = ''; 
    Object.keys(categorizedFiles).forEach(type => {
      const folder = document.createElement('div');
      folder.classList.add('folder-card');
      folder.textContent = type.toUpperCase();
      folder.addEventListener('click', () => handleFolderClick(type));
      folderContainer.appendChild(folder);
    });
  }
  
  
  function handleFolderClick(type) {
    currentFolder = type;
    currentFiles = categorizedFiles[type];
    displayFiles(currentFiles);
  }
  
 
  function displayFiles(files) {
    fileListContainer.innerHTML = ''; 
    files.forEach(file => {
      const fileItem = document.createElement('div');
      fileItem.classList.add('file-item');
  
     
      const fileName = file.split('.').slice(0, -1).join('.');
      const extension = file.split('.').pop();
  
     
      fileItem.innerHTML = `
        <img src="${fileIcons[extension] || ''}" alt="${extension}" />
        <p>${fileName}</p>
      `;
  
      fileListContainer.appendChild(fileItem);
    });
  }
  
  
  searchInput.addEventListener('input', () => {
    if (!currentFolder) return; 
    const query = searchInput.value.toLowerCase();
    const filteredFiles = currentFiles.filter(file =>
      file.toLowerCase().includes(query)
    );
    displayFiles(filteredFiles);
  });
  

  let isAscending = true;
  sortButton.addEventListener('click', () => {
    if (!currentFolder) return;
    currentFiles.sort((a, b) => {
      const nameA = a.toLowerCase();
      const nameB = b.toLowerCase();
      if (isAscending) return nameA > nameB ? 1 : -1;
      return nameA < nameB ? 1 : -1;
    });
    isAscending = !isAscending;
    displayFiles(currentFiles);
  });
  
 
  displayFolders();
  