/**
 * ==========================================================================
 * ANNA SOUZA BEAUTY COMPANION — MASTER JS ENGINE
 * Visagism Analytics, Skin Colorimetry, Color Wheel & Contract Generator
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  
  // --- 1. GLOBAL STATE MANAGER ---
  const state = {
    client: {
      name: "",
      document: "",
      email: "",
      address: "",
      date: "",
      location: "",
      signal: 200,
      installments: 3
    },
    service: {
      id: "social-make",
      category: "social", // social, noivas, 15anos, cursos
      name: "Maquiagem Social",
      price: 160,
      description: "Produção de maquiagem profissional clássica com preparação de pele luxo e cílios inclusos.",
      features: [
        "Preparação de pele com produtos importados de alta performance",
        "Técnica de olhos personalizada para o formato do olho",
        "Aplicação de cílios postiços premium",
        "Fixação de alta resistência"
      ],
      extraPrice: 0,
      extraDetails: ""
    },
    visagism: {
      gender: "feminino",
      faceShape: "oval",
      contrast: "medio",
      bodyShape: "hourglass",
      hasImage: false,
      imageSrc: null
    },
    colorimetry: {
      undertone: "Neutro",
      season: "Aguardando Análise",
      whiteBalance: "Original",
      luminance: 0,
      rgbAverage: { r: 0, g: 0, b: 0 },
      wbRatios: { r: 1.0, g: 1.0, b: 1.0 },
      isAnalyzed: false,
      palette: ["#d6a29a", "#efebe6", "#fbf9f6", "#8c736f", "#1c1c1c"]
    },
    colorWheel: {
      baseColor: "#d6a29a",
      baseHsl: { h: 9, s: 42, l: 65 },
      harmonyMode: "complementary",
      palette: ["#d6a29a", "#efebe6", "#fbf9f6", "#8c736f", "#1c1c1c"]
    },
    lighting: {
      activeId: "rembrandt",
      name: "Rembrandt de Beleza",
      description: "Clássico triângulo de luz sobre a face na bochecha oposta à fonte de luz principal. Ideal para criar profundidade, elegância e um retrato sofisticado e atemporal com toque artístico editorial.",
      keyLight: "Softbox grande a 45º à frente e acima do modelo",
      fillLight: "Placa Refletora Champagne na lateral oposta",
      ratio: "1.5:1 (Dramatismo sutil e alta definição facial)",
      focus: "Escultura das maçãs do rosto e profundidade no olhar"
    }
  };

  // --- 2. ANNA SOUZA'S OFFICIAL SERVICES DATABASE ---
  const servicesDB = [
    // Category: Social
    {
      id: "social-make",
      category: "social",
      name: "Maquiagem Social",
      price: 160,
      description: "Produção de maquiagem profissional luxo com pele blindada e cílios postiços.",
      features: [
        "Produtos de altíssima resistência (blindagem inclusa)",
        "Design de olhos sob medida (esfumado, delineado, etc.)",
        "Aplicação de cílios postiços premium",
        "Finalização com bruma fixadora de longa duração"
      ]
    },
    {
      id: "social-formandas",
      category: "social",
      name: "Maquiagem para Formandas",
      price: 175,
      description: "Produção de alta durabilidade com técnicas exclusivas para fotografia com flash e iluminação externa intensa.",
      features: [
        "Selagem ultra-resistente a suor e lágrimas",
        "Glitter fino ou pigmento importado opcional",
        "Contorno fotográfico de alta definição",
        "Kit retoque exclusivo no dia"
      ]
    },
    {
      id: "social-penteado-curto",
      category: "social",
      name: "Penteado Social (Curto / Médio)",
      price: 160,
      description: "Estilização profissional para cabelos de comprimento curto ou médio (até os ombros).",
      features: [
        "Modelagem com babyliss, escova modelada ou semi-preso simples",
        "Preparação térmica e sprays de alta fixação importados",
        "Acessórios pessoais aplicados sem custo adicional"
      ]
    },
    {
      id: "social-penteado-longo",
      category: "social",
      name: "Penteado Social (Cabelo Longo)",
      price: 180, // 160 base + 20 surcharge
      description: "Estilização profissional completa para cabelos longos (abaixo dos ombros) ou muito densos.",
      features: [
        "Modelagem completa, coques robustos, tranças laterais ou semi-presos complexos",
        "Acréscimo de R$ 20,00 incluso para suporte técnico de volume e fixação",
        "Estruturação reforçada contra umidade"
      ]
    },
    
    // Category: Noivas
    {
      id: "noiva-civil",
      category: "noivas",
      name: "Noiva Casamento Civil",
      price: 200,
      description: "Produção exclusiva de maquiagem ou penteado minimalista e extremamente elegante para casamento em cartório ou celebrações íntimas.",
      features: [
        "Consultoria estética digital prévia",
        "Pele blindada resistente a abraços e lágrimas",
        "Estética naturalista ou clássica editorial",
        "Coffee break simples de boas-vindas no estúdio"
      ]
    },
    {
      id: "noiva-perola",
      category: "noivas",
      name: "Coleção Pérola",
      price: 1000,
      description: "Produção completa de Maquiagem E Penteado para o Casamento Civil ou Ensaio Pré-Wedding. Ideal para noivas minimalistas.",
      features: [
        "1x Produção Completa (Maquiagem + Penteado) de alta resistência",
        "Consultoria de visagismo digital inclusa",
        "Cronograma personalizado para o dia de atendimento",
        "Assessoria de beleza simples no estúdio"
      ]
    },
    {
      id: "noiva-love",
      category: "noivas",
      name: "Coleção Bride Love",
      price: 1500,
      description: "Produção completa da Noiva para o Dia da Cerimônia + Pré-Wedding OU Teste Prévio. O equilíbrio perfeito para a noiva romântica.",
      features: [
        "Produção no Dia da Cerimônia (Maquiagem + Penteado de altíssima durabilidade)",
        "1x Produção Extra: Ensaio Pré-Wedding OU Teste Completo (com antecedência)",
        "Cronograma exclusivo coordenado com a assessoria da noiva",
        "Roupão de cetim exclusivo da marca Anna Souza emprestado no estúdio"
      ]
    },
    {
      id: "noiva-golden",
      category: "noivas",
      name: "Coleção Golden Bride (Deluxe)",
      price: 2200,
      description: "A experiência máxima de luxo e tranquilidade para o seu grande dia. Inclui produções completas, teste minucioso e mimo para acompanhante.",
      features: [
        "Produção no Dia da Cerimônia (Maquiagem + Penteado Noiva Alta Resistência)",
        "Produção Completa para o Casamento Civil OU Ensaio Pré-Wedding",
        "Teste Completo de Maquiagem e Penteado (realizado de 10 a 30 dias antes)",
        "1x Produção Extra Completa inclusa (Mãe da Noiva ou Madrinha)",
        "Coffee Break Premium no estúdio para até 5 pessoas",
        "Roupão de cetim exclusivo para fotos + Kit Retoque Luxo"
      ]
    },
    
    // Category: Debutantes
    {
      id: "deb-essencial",
      category: "15anos",
      name: "Debutante Essencial",
      price: 400,
      description: "Produção completa de maquiagem e penteado para a Debutante brilhar em sua festa de 15 anos.",
      features: [
        "Maquiagem social blindada com pele iluminada juvenil",
        "Penteado semi-preso ou solto modelado ultra fixante",
        "Aplicação de tiara ou acessórios de debutante",
        "Kit de retoque rápido (batom + lenço antibrilho)"
      ]
    },
    {
      id: "deb-gold",
      category: "15anos",
      name: "Debutante Gold",
      price: 600,
      description: "Combinação sob medida contendo a produção completa do Ensaio Fotográfico externo + Dia do Evento/Festa.",
      features: [
        "Produção Completa para o Ensaio Fotográfico Pré-15 Anos",
        "Produção Completa de Maquiagem e Penteado para o Dia da Festa",
        "Flexibilidade de troca de penteado parcial (solto para preso com assessoria rápida no estúdio)"
      ]
    },
    {
      id: "deb-diamante",
      category: "15anos",
      name: "Debutante Diamante (Deluxe)",
      price: 850,
      description: "O combo mais luxuoso para a Debutante. Inclui o ensaio fotográfico, o teste prévio para garantir o visual perfeito, e o grande dia da festa.",
      features: [
        "Produção Completa para o Ensaio Fotográfico",
        "Teste Prévio de Maquiagem e Penteado completo para alinhamento",
        "Produção Master no Dia do Evento com alta resistência",
        "Coffee Break especial no dia com suco e doces finos"
      ]
    },
    
    // Category: Cursos
    {
      id: "curso-vip",
      category: "cursos",
      name: "Curso de Automaquiagem VIP",
      price: 220,
      description: "Aula presencial individual e intensiva de 3 horas com foco nas suas reais necessidades morfológicas.",
      features: [
        "Consultoria de nécessaire inclusa (análise do que você já tem)",
        "Técnica de pele perfeita e esfumado clássico dia/noite",
        "Apostila digital exclusiva em PDF",
        "Certificado oficial assinado por Anna Souza"
      ]
    },
    {
      id: "curso-dupla",
      category: "cursos",
      name: "Curso de Automaquiagem em Dupla",
      price: 400,
      description: "Aula presencial prática para duas alunas juntas (amigas, mãe e filha, etc.). Uma tarde divertida de aprendizado e beleza.",
      features: [
        "Valor total para as duas alunas (R$ 200,00 por participante)",
        "3h30 de duração com acompanhamento prático simultâneo",
        "Material de apoio digital individual + coffee break simples incluso",
        "Certificados digitais oficiais para ambas"
      ]
    }
  ];

  // --- 3. TAB NAVIGATION CONTROL ---
  const navButtons = document.querySelectorAll(".nav-item");
  const tabPanes = document.querySelectorAll(".tab-pane");

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      
      // Update sidebar state
      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      // Update pane visible state
      tabPanes.forEach(pane => pane.classList.remove("active"));
      const activePane = document.getElementById(tabId);
      if (activePane) {
        activePane.classList.add("active");
      }
      
      // Keep state aligned
      const categoryMap = {
        "contract-tab": "social", // defaults to social inside contract tab first
        "moodboard-tab": "visagism",
        "lighting-tab": "lighting",
        "export-tab": "export"
      };
      
      // If we clicked the briefing compilation tab, compile live preview immediately
      if (tabId === "export-tab") {
        updateBriefingChecklist();
        compileLiveBriefingPreview();
      }
    });
  });

  // --- 4. PACKAGE SELECTOR POPULATOR & DYNAMIC CALCULATOR ---
  const packageSelector = document.getElementById("package-selector");
  const paymentSignal = document.getElementById("payment-signal");
  const paymentInstallments = document.getElementById("payment-installments");

  function initPackageDropdown() {
    packageSelector.innerHTML = "";
    
    // Group options by Category in select
    const categories = {
      "social": "Maquiagem & Penteado Social",
      "noivas": "Coleções Exclusivas Noivas",
      "15anos": "Coleções Exclusivas Debutantes",
      "cursos": "Cursos de Automaquiagem"
    };

    Object.keys(categories).forEach(catKey => {
      const group = document.createElement("optgroup");
      group.label = categories[catKey];
      
      servicesDB.filter(s => s.category === catKey).forEach(service => {
        const option = document.createElement("option");
        option.value = service.id;
        option.textContent = `${service.name} (R$ ${service.price.toFixed(2).replace('.', ',')})`;
        group.appendChild(option);
      });
      
      packageSelector.appendChild(group);
    });

    // Initial load summary
    updatePackageSummary();
  }

  function updatePackageSummary() {
    const selectedId = packageSelector.value;
    const service = servicesDB.find(s => s.id === selectedId);
    if (!service) return;

    // Update state
    state.service.id = service.id;
    state.service.category = service.category;
    state.service.name = service.name;
    state.service.price = service.price;
    state.service.description = service.description;
    state.service.features = [...service.features];

    // Read extra options inside the form if available
    calculateFinalPricing();
    renderSummaryCard();
  }

  function calculateFinalPricing() {
    // Surcharges are already embedded in package selection names e.g. Long hair: R$180, short: R$160.
    // Signal check
    const sigVal = parseInt(paymentSignal.value);
    state.client.signal = sigVal;
    
    // Installment check
    const instVal = parseInt(paymentInstallments.value);
    state.client.installments = instVal;
  }

  function renderSummaryCard() {
    document.getElementById("summary-title").textContent = state.service.name;
    document.getElementById("summary-price").textContent = `R$ ${state.service.price.toFixed(2).replace('.', ',')}`;
    document.getElementById("summary-desc").textContent = state.service.description;
    
    const featuresList = document.getElementById("summary-features");
    featuresList.innerHTML = "";
    
    state.service.features.forEach(feat => {
      const li = document.createElement("li");
      li.textContent = feat;
      featuresList.appendChild(li);
    });

    // Add installment advice dynamically in card summary
    const remainder = Math.max(0, state.service.price - state.client.signal);
    const liInstallment = document.createElement("li");
    liInstallment.style.fontWeight = "600";
    liInstallment.style.color = "var(--rose-primary)";
    
    if (state.client.signal > 0) {
      if (state.client.installments > 1) {
        const instVal = (remainder / state.client.installments).toFixed(2).replace('.', ',');
        liInstallment.innerHTML = `Sinal: R$ ${state.client.signal.toFixed(2).replace('.', ',')} + Saldo em até ${state.client.installments}x de R$ ${instVal} sem juros no cartão`;
      } else {
        liInstallment.innerHTML = `Sinal: R$ ${state.client.signal.toFixed(2).replace('.', ',')} + Saldo de R$ ${remainder.toFixed(2).replace('.', ',')} à vista no dia`;
      }
    } else {
      if (state.client.installments > 1) {
        const instVal = (state.service.price / state.client.installments).toFixed(2).replace('.', ',');
        liInstallment.innerHTML = `Saldo total parcelado em até ${state.client.installments}x de R$ ${instVal} sem juros no cartão`;
      } else {
        liInstallment.innerHTML = `Valor total: R$ ${state.service.price.toFixed(2).replace('.', ',')} à vista no atendimento`;
      }
    }
    featuresList.appendChild(liInstallment);
  }

  packageSelector.addEventListener("change", updatePackageSummary);
  paymentSignal.addEventListener("change", () => {
    updatePackageSummary();
    saveClientFormToState();
  });
  paymentInstallments.addEventListener("change", () => {
    updatePackageSummary();
    saveClientFormToState();
  });

  // Client form listener to sync in state
  const clientFormInputs = ["client-name", "client-document", "client-email", "client-address", "shoot-date", "shoot-location"];
  
  function saveClientFormToState() {
    state.client.name = document.getElementById("client-name").value;
    state.client.document = document.getElementById("client-document").value;
    state.client.email = document.getElementById("client-email").value;
    state.client.address = document.getElementById("client-address").value;
    state.client.date = document.getElementById("shoot-date").value;
    state.client.location = document.getElementById("shoot-location").value;
  }

  clientFormInputs.forEach(id => {
    document.getElementById(id).addEventListener("input", saveClientFormToState);
  });

  // --- 5. VISAGISM BIOMETRIC SCANNER (PORTRAIT LOADER) ---
  const dropZone = document.getElementById("drop-zone");
  const imageUploader = document.getElementById("image-uploader");
  const uploadPlaceholder = document.getElementById("upload-placeholder-content");
  const scannerWrapper = document.getElementById("scanner-wrapper");
  const scanBar = document.getElementById("scan-bar");
  const visagismCanvas = document.getElementById("visagism-canvas");
  const metricsPanel = document.getElementById("metrics-panel");
  const btnRunColorimetry = document.getElementById("btn-run-colorimetry");

  let uploadImageInstance = null;

  // Drag and drop handlers
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "var(--rose-primary)";
    dropZone.style.background = "rgba(214, 162, 154, 0.05)";
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.style.borderColor = "rgba(255, 255, 255, 0.08)";
    dropZone.style.background = "rgba(0, 0, 0, 0.15)";
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "rgba(255, 255, 255, 0.08)";
    dropZone.style.background = "rgba(0, 0, 0, 0.15)";
    
    if (e.dataTransfer.files.length > 0) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  });

  imageUploader.addEventListener("change", () => {
    if (imageUploader.files.length > 0) {
      handleImageFile(imageUploader.files[0]);
    }
  });

  function handleImageFile(file) {
    if (!file.type.match("image.*")) {
      alert("Por favor, faça upload de um arquivo de imagem válido (JPG, PNG).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        uploadImageInstance = img;
        state.visagism.hasImage = true;
        state.visagism.imageSrc = e.target.result;
        
        // Show scan interface
        uploadPlaceholder.style.display = "none";
        scannerWrapper.style.display = "block";
        scanBar.style.display = "block";
        
        // Setup canvas size
        const ctx = visagismCanvas.getContext("2d");
        
        // Scale to a nice size keeping aspect ratio
        const maxDim = 400;
        let w = img.width;
        let h = img.height;
        if (w > h) {
          if (w > maxDim) {
            h = (h * maxDim) / w;
            w = maxDim;
          }
        } else {
          if (h > maxDim) {
            w = (w * maxDim) / h;
            h = maxDim;
          }
        }
        
        visagismCanvas.width = w;
        visagismCanvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);

        // Run scanner animation cycle
        triggerBiometricScan();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function triggerBiometricScan() {
    const ctx = visagismCanvas.getContext("2d");
    let scanLine = 0;
    let scanActive = true;

    // Pulse the metrics panel active
    metricsPanel.classList.add("active");
    btnRunColorimetry.removeAttribute("disabled");

    function drawScanOverlay() {
      if (!scanActive) return;
      
      // Clear and redraw image
      ctx.clearRect(0, 0, visagismCanvas.width, visagismCanvas.height);
      ctx.drawImage(uploadImageInstance, 0, 0, visagismCanvas.width, visagismCanvas.height);
      
      // Draw technical grid lines overlay
      ctx.strokeStyle = "rgba(214, 162, 154, 0.35)";
      ctx.lineWidth = 1;
      
      // Facial symmetry vertical line
      ctx.beginPath();
      ctx.moveTo(visagismCanvas.width / 2, 0);
      ctx.lineTo(visagismCanvas.width / 2, visagismCanvas.height);
      ctx.stroke();
      
      // Eyes axis horizontal line (around 42% height)
      ctx.beginPath();
      ctx.moveTo(0, visagismCanvas.height * 0.42);
      ctx.lineTo(visagismCanvas.width, visagismCanvas.height * 0.42);
      ctx.stroke();

      // Lips axis horizontal line (around 68% height)
      ctx.beginPath();
      ctx.moveTo(0, visagismCanvas.height * 0.68);
      ctx.lineTo(visagismCanvas.width, visagismCanvas.height * 0.68);
      ctx.stroke();

      // Facial oval bounds box
      ctx.strokeStyle = "rgba(214, 162, 154, 0.2)";
      ctx.strokeRect(visagismCanvas.width * 0.2, visagismCanvas.height * 0.15, visagismCanvas.width * 0.6, visagismCanvas.height * 0.7);

      requestAnimationFrame(drawScanOverlay);
    }
    
    drawScanOverlay();

    // After 2.5 seconds, shut down laser scrolling bar
    setTimeout(() => {
      scanBar.style.display = "none";
      scanActive = false;
      
      // Redraw pristine image + static facial oval overlay helper
      ctx.clearRect(0, 0, visagismCanvas.width, visagismCanvas.height);
      ctx.drawImage(uploadImageInstance, 0, 0, visagismCanvas.width, visagismCanvas.height);
      
      ctx.strokeStyle = "rgba(214, 162, 154, 0.5)";
      ctx.lineWidth = 1.5;
      
      // Aesthetic oval shape to frame the scanned face beautifully
      ctx.beginPath();
      ctx.ellipse(visagismCanvas.width / 2, visagismCanvas.height * 0.5, visagismCanvas.width * 0.28, visagismCanvas.height * 0.38, 0, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Trigger default recommendations
      updateVisagismAdvice();
    }, 2500);
  }

  // --- 6. VISAGISM SELECTORS & RECOMMENDATION DATABASE ---
  const genderSelect = document.getElementById("gender-select");
  const faceShapeSelect = document.getElementById("face-shape-select");
  const personalContrast = document.getElementById("personal-contrast");
  const bodyShapeSelect = document.getElementById("body-shape-select");

  const hairAdvice = {
    oval: "Formato harmônico por natureza. Favorece quase todos os estilos. Aposte em franjas leves, ondas suaves e coques despojados texturizados ou tranças laterais ultra-românticas. Evite volumes exagerados nas laterais para não alargar a silhueta facial.",
    round: "Para alongar e refinar o contorno facial, dê preferência a cabelos com volume ou topete estruturado no topo da cabeça. Penteados semi-presos altos, tranças escama de peixe laterais e franjas longas desfiadas na diagonal criam linhas verticais perfeitas.",
    square: "O objetivo é suavizar as linhas marcadas e angulares do maxilar. Penteados com ondas amplas e descontraídas, franjas laterais desfiadas e coques baixos com fios soltos e ondulados emoldurando o rosto são escolhas impecáveis.",
    rectangular: "Ideal acentuar a largura com ondas laterais e franjas cheias na altura das sobrancelhas para suavizar a estrutura alongada. Evite penteados completamente esticados (slick back) e cabelos lisos retos sem movimento.",
    heart: "Para criar equilíbrio com o queixo mais afilado e expressivo, adicione volume na altura da nuca ou queixo. Penteados semi-presos com ondulações abundantes a partir da orelha ou coques médios com fios soltos são recomendados."
  };

  const makeupAdvice = {
    oval: "Foque em ressaltar a beleza natural. Contornos extremamente sutis abaixo das maçãs do rosto e têmporas. Iluminação central na testa e topo do nariz. Olhos expressivos com esfumado clássico e delineado fino.",
    round: "Contorno mais focado nas laterais do rosto e abaixo do osso zigomático na diagonal para criar ângulos. Iluminação vertical no centro do rosto. Sobrancelhas levemente arqueadas e boca desenhada com batons mate valorizam o conjunto.",
    square: "Contorno diagonal suave nas laterais do maxilar e têmporas para suavizar os cantos. Aplique o blush na parte frontal das maçãs (efeito 'carinha de saúde' arredondado). Destaque o olhar com esfumado esfumado e lábios levemente ombré.",
    rectangular: "Contorno horizontal na base do queixo e no topo da testa para reduzir visualmente o comprimento. Blush aplicado horizontalmente a partir das maçãs do rosto. Olhos esfumados horizontalmente para alargar o olhar.",
    heart: "Suavize as laterais da testa com contorno leve. Ilumine o centro do queixo e as maçãs do rosto. Opte por blush pêssego ou rosado nas maçãs. Olhos bem delineados e cílios volumosos no canto externo ajudam a equilibrar a testa."
  };

  const clothingAdvice = {
    hourglass: "A ampulheta é a silhueta mais equilibrada. Valorize a cintura marcada com vestidos transpassados, decotes canoa, V ou coração. Evite roupas completamente retas ou volumosas sem formato definido.",
    triangle: "O objetivo é trazer volume para a parte superior do corpo, equilibrando os quadris. Use decote ombro a ombro, canoa, detalhes de babados ou drapeados na região do busto. Cabelos volumosos ou coques altos ajudam a alongar a silhueta.",
    "inverted-triangle": "Suavize a linha dos ombros utilizando decotes verticais como V profundo, frente única ou decotes estreitos. Adicione volume na parte inferior com vestidos godê ou saias estruturadas. Evite ombreiras ou mangas bufantes.",
    rectangle: "Crie a ilusão de curvas no corpo marcando a cintura com cintos delicados. Decotes redondos, drapeados, transpassados ou modelo império são excelentes. Penteados com movimento e franjas desfiadas rompem a rigidez das linhas retas.",
    round: "Dê preferência a decotes que alongam o colo, como decote em V profundo ou decote U aberto. Tecidos fluidos que acompanham o movimento do corpo sem marcar. Cabelos semi-presos com volume vertical no topo complementam a harmonia corporal."
  };

  function updateVisagismAdvice() {
    const face = faceShapeSelect.value;
    const body = bodyShapeSelect.value;
    const contrastVal = personalContrast.value;
    
    // Set state
    state.visagism.faceShape = face;
    state.visagism.bodyShape = body;
    state.visagism.contrast = contrastVal;
    
    // Inundate results DOM in Portuguese
    document.getElementById("visagism-hair-desc").textContent = hairAdvice[face] || "";
    document.getElementById("visagism-makeup-desc").textContent = makeupAdvice[face] || "";
    
    // Personal contrast advice integration in makeup
    const contrastText = {
      "baixo-escuro": " Sugestão de contraste Baixo Escuro: Maquiagem marcante com tons profundos (ameixa, chocolate, vinho) e esfumado clássico.",
      "medio": " Sugestão de contraste Médio: Equilíbrio com esfumados marrons clássicos, contorno elegante e boca nude luxo.",
      "alto": " Sugestão de contraste Alto (Dramático): Lábios bem delineados com batons marcantes (vermelho puro, framboesa) e delineado gatinho preto.",
      "baixo-claro": " Sugestão de contraste Baixo Claro: Maquiagem fresh com blush pêssego iluminado, delineado marrom esfumado sutil e gloss rose nos lábios."
    };
    document.getElementById("visagism-makeup-desc").textContent += contrastText[contrastVal] || "";
    
    document.getElementById("visagism-clothing-desc").textContent = clothingAdvice[body] || "";
  }

  // Bind change events
  genderSelect.addEventListener("change", updateVisagismAdvice);
  faceShapeSelect.addEventListener("change", updateVisagismAdvice);
  personalContrast.addEventListener("change", updateVisagismAdvice);
  bodyShapeSelect.addEventListener("change", updateVisagismAdvice);


  // --- 7. PIXEL-SAMPLING DIGITAL COLORIMETRY ENGINE ---
  const colorimetryLoader = document.getElementById("colorimetry-loader");
  const colorimetryResultsUi = document.getElementById("colorimetry-results-ui");
  const colorimetrySwatchesDisplay = document.getElementById("colorimetry-swatches-display");
  const colorimetrySwatchesGrid = document.getElementById("colorimetry-swatches-grid");
  const colorimetrySeasonDesc = document.getElementById("colorimetry-season-desc");
  
  const colorSkinUndertone = document.getElementById("color-skin-undertone");
  const colorSeasonalPalette = document.getElementById("color-seasonal-palette");
  const colorWhite = document.getElementById("color-white-balance");
  const colorLuminance = document.getElementById("color-luminance-ratio");
  const btnToggleWb = document.getElementById("btn-toggle-wb");

  // Season Color Swatches Database (8 colors each)
  const seasonPalettes = {
    "Primavera Quente": ["#FA8072", "#FF7F50", "#FFD700", "#F5F5DC", "#FFDAB9", "#40E0D0", "#E2583E", "#8A9A5B"],
    "Verão Claro": ["#FFB6C1", "#E6E6FA", "#B0E0E6", "#D6A29A", "#98FF98", "#4682B4", "#E0B0FF", "#E5E5E5"],
    "Outono Escuro": ["#C2452D", "#556B2F", "#E1AD01", "#5C4033", "#B7410E", "#005C53", "#8C736F", "#C39B62"],
    "Inverno Frio": ["#004B23", "#4169E1", "#DC143C", "#FFFFFF", "#301934", "#E0115F", "#0E0D0C", "#C0C0C0"]
  };

  const seasonDescriptions = {
    "Primavera Quente": "Paleta iluminada, solar e quente. Favorece tons alegres, corais vibrantes, beges dourados, salmão, pêssego e dourados. Transmite jovialidade, dinamismo e energia comunicativa.",
    "Verão Claro": "Paleta suave, delicada, fria e pastel. Favorece tons acinzentados, rosa pastel, azul bebê, lavanda e tons prateados. Transmite sofisticação clássica, calma e elegância romântica.",
    "Outono Escuro": "Paleta terrosa, intensa, profunda e quente. Favorece tons de terracota, verde oliva, mostarda, ferrugem, marrom chocolate e dourados envelhecidos. Transmite estabilidade, credibilidade e elegância madura.",
    "Inverno Frio": "Paleta dramática, pura, fria e contrastante. Favorece tons de vermelho carmim, azul royal, esmeralda profunda, fúcsia, preto e branco puro. Transmite força, autoridade, refinamento contemporâneo e mistério."
  };

  btnRunColorimetry.addEventListener("click", () => {
    if (!state.visagism.hasImage) return;

    // Show loading
    btnRunColorimetry.setAttribute("disabled", "true");
    btnRunColorimetry.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Escaneando...';

    setTimeout(() => {
      // Run deterministic pixel sampling math on canvas
      const ctx = visagismCanvas.getContext("2d");
      const imgData = ctx.getImageData(0, 0, visagismCanvas.width, visagismCanvas.height);
      const data = imgData.data;

      // Sample a central grid (cheeks/face area where skin tones are located)
      let totalR = 0, totalG = 0, totalB = 0, count = 0;
      
      // Sample 150 points in a central grid to get average skin tones
      const startX = Math.floor(visagismCanvas.width * 0.3);
      const endX = Math.floor(visagismCanvas.width * 0.7);
      const startY = Math.floor(visagismCanvas.height * 0.35);
      const endY = Math.floor(visagismCanvas.height * 0.65);

      for (let x = startX; x < endX; x += Math.floor((endX - startX) / 10)) {
        for (let y = startY; y < endY; y += Math.floor((endY - startY) / 15)) {
          const index = (y * visagismCanvas.width + x) * 4;
          totalR += data[index];
          totalG += data[index + 1];
          totalB += data[index + 2];
          count++;
        }
      }

      const avgR = Math.round(totalR / count);
      const avgG = Math.round(totalG / count);
      const avgB = Math.round(totalB / count);

      state.colorimetry.rgbAverage = { r: avgR, g: avgG, b: avgB };

      // Undertone decision rule: Skin is warm if red/green are higher relative to blue channel
      let undertone = "Neutro";
      const warmValue = (avgR + avgG) / 2 - avgB;
      
      if (warmValue > 42) {
        undertone = "Quente (Warm)";
      } else if (warmValue < 28) {
        undertone = "Frio (Cool)";
      } else {
        undertone = "Neutro (Neutral)";
      }
      
      state.colorimetry.undertone = undertone;

      // Relative Luminance check
      const luminance = (0.299 * avgR + 0.587 * avgG + 0.114 * avgB);
      state.colorimetry.luminance = Math.round(luminance);

      // Seasonal Palette check
      let season = "Primavera Quente";
      if (undertone.includes("Quente") || (undertone.includes("Neutro") && avgR > avgB)) {
        season = (luminance > 128) ? "Primavera Quente" : "Outono Escuro";
      } else {
        season = (luminance > 128) ? "Verão Claro" : "Inverno Frio";
      }

      state.colorimetry.season = season;
      state.colorimetry.isAnalyzed = true;
      state.colorimetry.palette = [...seasonPalettes[season]];

      // Update UI elements
      colorSkinUndertone.textContent = undertone;
      colorSeasonalPalette.textContent = season;
      colorWhite.textContent = `R:${avgR} G:${avgG} B:${avgB}`;
      colorLuminance.textContent = `${state.colorimetry.luminance} / 255`;

      // Hide default placeholder
      colorimetryLoader.style.display = "none";
      colorimetryResultsUi.style.display = "block";
      
      // Inject Swatches
      colorimetrySwatchesGrid.innerHTML = "";
      state.colorimetry.palette.forEach(color => {
        const swatch = document.createElement("div");
        swatch.className = "swatch";
        swatch.style.backgroundColor = color;
        swatch.title = color;
        colorimetrySwatchesGrid.appendChild(swatch);
      });

      colorimetrySeasonDesc.textContent = seasonDescriptions[season];
      colorimetrySwatchesDisplay.style.display = "block";

      // Reset button
      btnRunColorimetry.removeAttribute("disabled");
      btnRunColorimetry.innerHTML = '<i class="fa-solid fa-check"></i> Escaneamento Concluído';
    }, 1800);
  });

  // Toggle White Balance simulation
  btnToggleWb.addEventListener("click", () => {
    if (!state.colorimetry.isAnalyzed || !state.visagism.hasImage) return;

    const ctx = visagismCanvas.getContext("2d");
    
    if (state.colorimetry.whiteBalance === "Original") {
      state.colorimetry.whiteBalance = "Corrigido (Auto WB)";
      btnToggleWb.innerHTML = '<i class="fa-solid fa-sliders"></i> Restaurar Cores Originais';
      
      ctx.clearRect(0, 0, visagismCanvas.width, visagismCanvas.height);
      ctx.drawImage(uploadImageInstance, 0, 0, visagismCanvas.width, visagismCanvas.height);
      
      ctx.fillStyle = state.colorimetry.undertone.includes("Quente") 
        ? "rgba(65, 105, 225, 0.08)" // cool blue wash
        : "rgba(255, 165, 0, 0.08)";  // warm orange wash
      ctx.globalCompositeOperation = "color";
      ctx.fillRect(0, 0, visagismCanvas.width, visagismCanvas.height);
      ctx.globalCompositeOperation = "source-over";
      
      // Reapply grid
      ctx.strokeStyle = "rgba(214, 162, 154, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(visagismCanvas.width / 2, visagismCanvas.height * 0.5, visagismCanvas.width * 0.28, visagismCanvas.height * 0.38, 0, 0, 2 * Math.PI);
      ctx.stroke();
    } else {
      state.colorimetry.whiteBalance = "Original";
      btnToggleWb.innerHTML = '<i class="fa-solid fa-sliders"></i> Alternar Balanço de Branco';
      
      ctx.clearRect(0, 0, visagismCanvas.width, visagismCanvas.height);
      ctx.drawImage(uploadImageInstance, 0, 0, visagismCanvas.width, visagismCanvas.height);
      
      ctx.strokeStyle = "rgba(214, 162, 154, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(visagismCanvas.width / 2, visagismCanvas.height * 0.5, visagismCanvas.width * 0.28, visagismCanvas.height * 0.38, 0, 0, 2 * Math.PI);
      ctx.stroke();
    }
  });


  // --- 8. INTERACTIVE DIGITAL COLOR WHEEL SYSTEM ---
  const colorWheel = document.getElementById("color-wheel");
  const wheelPointer = document.getElementById("wheel-pointer");
  const harmonyModeSelect = document.getElementById("harmony-mode");
  const paletteSwatches = document.getElementById("palette-swatches");
  const hexCodes = document.getElementById("hex-codes");

  const wCtx = colorWheel.getContext("2d");
  const radius = colorWheel.width / 2;

  // Draw HSL Color Wheel
  function drawColorWheel() {
    wCtx.clearRect(0, 0, colorWheel.width, colorWheel.height);
    
    for (let x = -radius; x < radius; x++) {
      for (let y = -radius; y < radius; y++) {
        const d = Math.sqrt(x*x + y*y);
        if (d <= radius) {
          const angle = Math.atan2(y, x);
          const hue = Math.round((angle + Math.PI) * (360 / (2 * Math.PI)));
          const sat = Math.round((d / radius) * 100);
          const luma = 55;

          wCtx.fillStyle = `hsl(${hue}, ${sat}%, ${luma}%)`;
          wCtx.fillRect(x + radius, y + radius, 1, 1);
        }
      }
    }
    
    wCtx.fillStyle = "#ffffff";
    wCtx.beginPath();
    wCtx.arc(radius, radius, 3, 0, 2 * Math.PI);
    wCtx.fill();
  }

  function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  colorWheel.addEventListener("mousedown", handleWheelClick);
  colorWheel.addEventListener("mousemove", (e) => {
    if (e.buttons === 1) handleWheelClick(e);
  });

  function handleWheelClick(e) {
    const rect = colorWheel.getBoundingClientRect();
    const x = e.clientX - rect.left - radius;
    const y = e.clientY - rect.top - radius;
    const d = Math.sqrt(x*x + y*y);

    if (d <= radius) {
      wheelPointer.style.left = `${e.clientX - rect.left}px`;
      wheelPointer.style.top = `${e.clientY - rect.top}px`;

      const angle = Math.atan2(y, x);
      const h = Math.round((angle + Math.PI) * (360 / (2 * Math.PI)));
      const s = Math.round((d / radius) * 100);
      const l = 55;

      state.colorWheel.baseHsl = { h, s, l };
      state.colorWheel.baseColor = hslToHex(h, s, l);
      
      calculateHarmonies();
    }
  }

  function calculateHarmonies() {
    const { h, s, l } = state.colorWheel.baseHsl;
    const mode = harmonyModeSelect.value;
    state.colorWheel.harmonyMode = mode;

    let colors = [];
    
    switch (mode) {
      case "complementary":
        colors = [
          hslToHex(h, s, l),
          hslToHex((h + 180) % 360, s, l),
          hslToHex(h, s, Math.min(90, l + 20)),
          hslToHex((h + 180) % 360, s, Math.max(20, l - 25)),
          hslToHex(h, Math.max(10, s - 40), 95)
        ];
        break;
      case "analogous":
        colors = [
          hslToHex(h, s, l),
          hslToHex((h + 30) % 360, s, l),
          hslToHex((h + 60) % 360, s, l),
          hslToHex((h - 30 + 360) % 360, s, l),
          hslToHex(h, Math.max(10, s - 30), 95)
        ];
        break;
      case "triadic":
        colors = [
          hslToHex(h, s, l),
          hslToHex((h + 120) % 360, s, l),
          hslToHex((h + 240) % 360, s, l),
          hslToHex((h + 120) % 360, s, Math.max(30, l - 20)),
          hslToHex(h, Math.max(10, s - 40), 95)
        ];
        break;
      case "monochromatic":
        colors = [
          hslToHex(h, s, l),
          hslToHex(h, s, Math.min(85, l + 15)),
          hslToHex(h, s, Math.min(95, l + 30)),
          hslToHex(h, s, Math.max(30, l - 15)),
          hslToHex(h, s, Math.max(15, l - 30))
        ];
        break;
    }

    state.colorWheel.palette = colors;

    paletteSwatches.innerHTML = "";
    hexCodes.innerHTML = "";

    colors.forEach(hex => {
      const swatch = document.createElement("div");
      swatch.className = "swatch";
      swatch.style.backgroundColor = hex;
      swatch.title = hex;
      paletteSwatches.appendChild(swatch);

      const span = document.createElement("span");
      span.textContent = hex.toUpperCase();
      hexCodes.appendChild(span);
    });
  }

  harmonyModeSelect.addEventListener("change", calculateHarmonies);
  drawColorWheel();


  // --- 9. STUDIO LIGHTING VECTOR DIAGRAM SYSTEM ---
  const lightingSelector = document.getElementById("lighting-selector");
  const svgDiagramContainer = document.getElementById("svg-diagram-container");

  const lightingDB = [
    {
      id: "rembrandt",
      name: "Rembrandt de Beleza",
      description: "Clássico triângulo de luz sobre a face na bochecha oposta à fonte de luz principal. Ideal para criar profundidade, elegância e um retrato sofisticado e atemporal com toque artístico editorial.",
      keyLight: "Softbox grande a 45º à frente e acima do modelo",
      fillLight: "Placa Refletora Champagne na lateral oposta",
      ratio: "1.5:1 (Dramatismo sutil e alta definição facial)",
      focus: "Escultura das maçãs do rosto e profundidade no olhar",
      svg: `
      <svg viewBox="0 0 400 350" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="175" r="140" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1" stroke-dasharray="4,4" />
        <line x1="200" y1="35" x2="200" y2="315" stroke="rgba(214, 162, 154, 0.05)" stroke-width="1" />
        <line x1="60" y1="175" x2="340" y2="175" stroke="rgba(214, 162, 154, 0.05)" stroke-width="1" />
        <polygon points="100,60 200,140 200,160 85,75" fill="rgba(214, 162, 154, 0.15)" />
        <polygon points="290,130 205,145 205,155 295,140" fill="rgba(239, 235, 230, 0.08)" />
        <g transform="translate(200, 150)">
          <ellipse cx="0" cy="20" rx="25" ry="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
          <circle cx="0" cy="0" r="15" fill="#1c1c1c" stroke="var(--rose-primary)" stroke-width="2" />
          <line x1="0" y1="0" x2="0" y2="18" stroke="var(--rose-primary)" stroke-width="2" />
          <text x="0" y="-22" fill="var(--text-secondary)" font-family="Manrope" font-size="10" font-weight="600" text-anchor="middle">CLIENTE (0º)</text>
        </g>
        <g transform="translate(200, 290)">
          <rect x="-15" y="-10" width="30" height="18" rx="3" fill="#12100f" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
          <circle cx="0" cy="-1" r="5" fill="#1c1c1c" stroke="var(--rose-primary)" stroke-width="1" />
          <path d="M-10,-10 L-5,-16 L5,-16 L10,-10" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
          <text x="0" y="22" fill="var(--text-secondary)" font-family="Manrope" font-size="9" text-anchor="middle">CÂMERA</text>
        </g>
        <g transform="translate(90, 70)">
          <circle cx="0" cy="0" r="18" fill="#1a1716" stroke="var(--rose-primary)" stroke-width="1.5" />
          <path d="M-12,-12 C-20,0 -20,10 -12,12 C-5,5 0,0 0,0 Z" fill="none" stroke="var(--rose-primary)" stroke-width="1" />
          <line x1="0" y1="0" x2="20" y2="20" stroke="var(--rose-primary)" stroke-width="2" stroke-linecap="round" />
          <text x="-25" y="-12" fill="var(--rose-primary)" font-family="Manrope" font-size="9" font-weight="700">SOFTBOX (Key Light)</text>
        </g>
        <g transform="translate(300, 130) rotate(-15)">
          <line x1="0" y1="-22" x2="0" y2="22" stroke="#efebe6" stroke-width="3.5" stroke-linecap="round" />
          <text x="12" y="4" fill="var(--text-secondary)" font-family="Manrope" font-size="9">REFL. CHAMPAGNE</text>
        </g>
      </svg>
      `
    },
    {
      id: "ringlight",
      name: "Ring Light Suave",
      description: "Iluminação totalmente frontal e uniforme, que envolve os traços faciais perfeitamente, eliminando rugas e linhas de sombra nas olheiras. Adiciona aquele brilho circular clássico nos olhos, ideal para closes de maquiagens coloridas e peles radiantes.",
      keyLight: "Ring Light LED de 18' posicionado diretamente no eixo da câmera",
      fillLight: "Luz ambiente suave de estúdio",
      ratio: "1:1 (Contraste mínimo, iluminação total e suave)",
      focus: "Pele blindada ultra brilhante e realce de cores dos olhos",
      svg: `
      <svg viewBox="0 0 400 350" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="175" r="140" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1" stroke-dasharray="4,4" />
        <line x1="200" y1="35" x2="200" y2="315" stroke="rgba(214, 162, 154, 0.05)" stroke-width="1" />
        <polygon points="180,260 200,165 220,260" fill="rgba(214, 162, 154, 0.18)" />
        <g transform="translate(200, 150)">
          <ellipse cx="0" cy="20" rx="25" ry="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
          <circle cx="0" cy="0" r="15" fill="#1c1c1c" stroke="var(--rose-primary)" stroke-width="2" />
          <line x1="0" y1="0" x2="0" y2="18" stroke="var(--rose-primary)" stroke-width="2" />
          <text x="0" y="-22" fill="var(--text-secondary)" font-family="Manrope" font-size="10" font-weight="600" text-anchor="middle">CLIENTE (0º)</text>
        </g>
        <g transform="translate(200, 270)">
          <circle cx="0" cy="-6" r="22" fill="none" stroke="rgba(214, 162, 154, 0.6)" stroke-width="5" />
          <circle cx="0" cy="-6" r="22" fill="none" stroke="#fff" stroke-width="1.5" />
          <rect x="-10" y="-12" width="20" height="12" rx="2" fill="#12100f" stroke="rgba(255,255,255,0.8)" stroke-width="1" />
          <circle cx="0" cy="-6" r="3.5" fill="#1c1c1c" stroke="var(--rose-primary)" stroke-width="0.8" />
          <text x="0" y="28" fill="var(--text-secondary)" font-family="Manrope" font-size="9" text-anchor="middle">CAMERA & RING LIGHT</text>
        </g>
      </svg>
      `
    },
    {
      id: "butterfly",
      name: "Luz Borboleta (Glamour Clamshell)",
      description: "Iluminação clássica de Hollywood que gera uma sombra simétrica em forma de borboleta logo abaixo do nariz. A fonte de luz é colocada no alto e diretamente em frente à cliente, complementada por um refletor posicionado abaixo do queixo. Esculpe drasticamente as maçãs e embeleza o colo.",
      keyLight: "Softbox retangular médio acima da cliente angulado a 45º para baixo",
      fillLight: "Placa Refletora na altura do peito apontando para cima",
      ratio: "1.2:1 (Iluminação de beleza ultra polida e simétrica)",
      focus: "Escultura das bochechas, volume labial e eliminação de sombras no pescoço",
      svg: `
      <svg viewBox="0 0 400 350" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="175" r="140" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1" stroke-dasharray="4,4" />
        <line x1="200" y1="35" x2="200" y2="315" stroke="rgba(214, 162, 154, 0.05)" stroke-width="1" />
        <polygon points="200,85 180,140 220,140" fill="rgba(214, 162, 154, 0.18)" />
        <polygon points="200,200 185,155 215,155" fill="rgba(255, 255, 255, 0.08)" />
        <g transform="translate(200, 150)">
          <ellipse cx="0" cy="20" rx="25" ry="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
          <circle cx="0" cy="0" r="15" fill="#1c1c1c" stroke="var(--rose-primary)" stroke-width="2" />
          <line x1="0" y1="0" x2="0" y2="18" stroke="var(--rose-primary)" stroke-width="2" />
          <text x="0" y="-22" fill="var(--text-secondary)" font-family="Manrope" font-size="10" font-weight="600" text-anchor="middle">CLIENTE (0º)</text>
        </g>
        <g transform="translate(200, 205)">
          <line x1="-20" y1="0" x2="20" y2="0" stroke="#fff" stroke-width="3" stroke-linecap="round" />
          <text x="0" y="12" fill="var(--text-secondary)" font-family="Manrope" font-size="8" text-anchor="middle">REFL. CONCHA</text>
        </g>
        <g transform="translate(200, 290)">
          <rect x="-12" y="-8" width="24" height="14" rx="2" fill="#12100f" stroke="rgba(255,255,255,0.3)" stroke-width="1" />
          <circle cx="0" cy="-1" r="4" fill="#1c1c1c" stroke="var(--rose-primary)" stroke-width="0.8" />
          <text x="0" y="20" fill="var(--text-secondary)" font-family="Manrope" font-size="9" text-anchor="middle">CÂMERA</text>
        </g>
        <g transform="translate(200, 65)">
          <rect x="-18" y="-8" width="36" height="16" fill="#1a1716" stroke="var(--rose-primary)" stroke-width="1.2" />
          <line x1="0" y1="8" x2="0" y2="16" stroke="var(--rose-primary)" stroke-width="2" />
          <text x="0" y="-12" fill="var(--rose-primary)" font-family="Manrope" font-size="9" font-weight="700" text-anchor="middle">KEY LIGHT (45º Alto)</text>
        </g>
      </svg>
      `
    },
    {
      id: "softbox-lateral",
      name: "Esquema Softbox Lateral (Split Drama)",
      description: "A fonte de luz principal é colocada exatamente na lateral (90 graus) em relação ao perfil da cliente, banhando metade do rosto em luz e cobrindo a outra metade em sombras suaves. Transmite extremo mistério, sofisticação artística contemporânea e é amplamente utilizado em campanhas de grife de alta moda.",
      keyLight: "Softbox alto na lateral esquerda a 90º da cliente",
      fillLight: "Luz de recorte suave (Rim Light) na traseira direita oposta",
      ratio: "3:1 (Contraste acentuado e alto teor dramático)",
      focus: "Realce dramático de perfis, contorno do nariz e textura de acessórios",
      svg: `
      <svg viewBox="0 0 400 350" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="175" r="140" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1" stroke-dasharray="4,4" />
        <line x1="200" y1="35" x2="200" y2="315" stroke="rgba(214, 162, 154, 0.05)" stroke-width="1" />
        <line x1="60" y1="175" x2="340" y2="175" stroke="rgba(214, 162, 154, 0.05)" stroke-width="1" />
        <polygon points="65,175 190,140 190,165 65,185" fill="rgba(214, 162, 154, 0.2)" />
        <g transform="translate(200, 150)">
          <ellipse cx="0" cy="20" rx="25" ry="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
          <circle cx="0" cy="0" r="15" fill="#1c1c1c" stroke="var(--rose-primary)" stroke-width="2" />
          <line x1="0" y1="0" x2="0" y2="18" stroke="var(--rose-primary)" stroke-width="2" />
          <text x="0" y="-22" fill="var(--text-secondary)" font-family="Manrope" font-size="10" font-weight="600" text-anchor="middle">CLIENTE (0º)</text>
        </g>
        <g transform="translate(200, 290)">
          <rect x="-12" y="-8" width="24" height="14" rx="2" fill="#12100f" stroke="rgba(255,255,255,0.3)" stroke-width="1" />
          <circle cx="0" cy="-1" r="4" fill="#1c1c1c" stroke="var(--rose-primary)" stroke-width="0.8" />
          <text x="0" y="20" fill="var(--text-secondary)" font-family="Manrope" font-size="9" text-anchor="middle">CÂMERA</text>
        </g>
        <g transform="translate(60, 175) rotate(90)">
          <rect x="-18" y="-6" width="36" height="12" fill="#1a1716" stroke="var(--rose-primary)" stroke-width="1.2" />
          <line x1="0" y1="-6" x2="0" y2="-12" stroke="var(--rose-primary)" stroke-width="1.5" />
          <text x="0" y="22" fill="var(--rose-primary)" font-family="Manrope" font-size="9" font-weight="700" text-anchor="middle">SOFTBOX (90º)</text>
        </g>
      </svg>
      `
    }
  ];

  function initLightingDropdown() {
    lightingSelector.innerHTML = "";
    lightingDB.forEach(l => {
      const opt = document.createElement("option");
      opt.value = l.id;
      opt.textContent = l.name;
      lightingSelector.appendChild(opt);
    });

    updateLightingSetup();
  }

  function updateLightingSetup() {
    const activeId = lightingSelector.value;
    const lSetup = lightingDB.find(l => l.id === activeId);
    if (!lSetup) return;

    state.lighting.activeId = lSetup.id;
    state.lighting.name = lSetup.name;
    state.lighting.description = lSetup.description;
    state.lighting.keyLight = lSetup.keyLight;
    state.lighting.fillLight = lSetup.fillLight;
    state.lighting.ratio = lSetup.ratio;
    state.lighting.focus = lSetup.focus;

    document.getElementById("light-name").textContent = lSetup.name;
    document.getElementById("light-desc").textContent = lSetup.description;
    document.getElementById("light-key").textContent = lSetup.keyLight;
    document.getElementById("light-fill").textContent = lSetup.fillLight;
    document.getElementById("light-ratio").textContent = lSetup.ratio;
    document.getElementById("light-mode").textContent = lSetup.focus;

    svgDiagramContainer.innerHTML = lSetup.svg;
  }

  lightingSelector.addEventListener("change", updateLightingSetup);

  const btnSaveLighting = document.getElementById("btn-save-lighting");
  btnSaveLighting.addEventListener("click", () => {
    btnSaveLighting.innerHTML = '<i class="fa-solid fa-circle-check"></i> Esquema Vinculado!';
    btnSaveLighting.style.background = "linear-gradient(135deg, #a3b899 0%, #859a7c 100%)";
    btnSaveLighting.style.boxShadow = "0 4px 15px rgba(163, 184, 153, 0.25)";
    
    setTimeout(() => {
      btnSaveLighting.innerHTML = '<i class="fa-solid fa-check"></i> Vincular ao Briefing da Cliente';
      btnSaveLighting.style.background = "";
      btnSaveLighting.style.boxShadow = "";
    }, 2500);
  });

  // --- 10. LEGAL CONTRACT COMPILER GENERATOR ---
  const btnGenerateContract = document.getElementById("btn-generate-contract");
  const contractModal = document.getElementById("contract-modal");
  const btnCloseModal = document.getElementById("btn-close-modal");
  const contractPrintBody = document.getElementById("contract-print-body");
  
  const btnModalPrint = document.getElementById("btn-modal-print");
  const btnModalAccept = document.getElementById("btn-modal-accept");

  function isClientFormValid() {
    return state.client.name && state.client.document && state.client.address && state.client.date && state.client.location;
  }

  btnGenerateContract.addEventListener("click", () => {
    saveClientFormToState();
    
    if (!isClientFormValid()) {
      alert("Por favor, preencha todos os campos da Ficha Cadastral do Cliente antes de gerar o contrato.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const contractHTML = compileContractHTML();
    contractPrintBody.innerHTML = contractHTML;
    contractModal.classList.add("active");
  });

  function compileContractHTML() {
    const c = state.client;
    const s = state.service;
    
    const formattedDate = c.date ? c.date.split("-").reverse().join("/") : "__/__/____";
    const remainder = Math.max(0, s.price - c.signal);
    
    const signalFormatted = c.signal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const priceFormatted = s.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const remainderFormatted = remainder.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    let paymentClauseText = "";
    if (c.signal > 0) {
      if (c.installments > 1) {
        const instVal = (remainder / c.installments).toFixed(2).replace('.', ',');
        paymentClauseText = `como sinal de reserva da data o valor de <strong>${signalFormatted}</strong>, pago nesta data via transferência PIX. O saldo remanescente de <strong>${remainderFormatted}</strong> será quitado em até <strong>${c.installments} parcelas iguais e consecutivas de R$ ${instVal}</strong>, sem juros, no cartão de crédito, no dia do atendimento.`;
      } else {
        paymentClauseText = `como sinal de reserva da data o valor de <strong>${signalFormatted}</strong>, pago nesta data via transferência PIX. O saldo remanescente de <strong>${remainderFormatted}</strong> será pago à vista no dia do atendimento por meio de PIX ou cartão de débito.`;
      }
    } else {
      if (c.installments > 1) {
        const instVal = (s.price / c.installments).toFixed(2).replace('.', ',');
        paymentClauseText = `o valor integral de <strong>${priceFormatted}</strong> parcelado em até <strong>${c.installments} parcelas iguais de R$ ${instVal} sem juros</strong> no cartão de crédito a ser debitado na data da execução do serviço.`;
      } else {
        paymentClauseText = `o valor integral de <strong>${priceFormatted}</strong> quitado à vista por PIX ou cartão de débito na conclusão do atendimento.`;
      }
    }

    return `
    <div class="contract-wrapper">
      <div class="contract-header">
        <h1>ANNA SOUZA BEAUTY</h1>
        <p>Instrumento Particular de Contrato de Prestação de Serviços de Beleza</p>
      </div>
      
      <div class="contract-body" style="font-size: 13.5px; line-height: 1.6; color: #1c1c1c; text-align: justify; font-family: 'Times New Roman', Times, serif;">
        <p>Por este instrumento particular de contrato de prestação de serviços, as partes qualificadas a seguir declaram-se cientes e acordadas nos termos das cláusulas dispostas:</p>
        
        <div class="parties-box" style="border: 1px solid #ddd; padding: 16px; margin: 20px 0; background: #fafafa; font-family: sans-serif; font-size: 12px; border-radius: 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 4px 0; font-weight: bold; width: 120px;">CONTRATADA:</td>
              <td style="padding: 4px 0;"><strong>ANNA SOUZA BEAUTY</strong>, Maquiadora e Penteadista Profissional, CPF nº 324.689.330-18, Pindamonhangaba - SP.</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">CONTRATANTE:</td>
              <td style="padding: 4px 0;"><strong>${c.name.toUpperCase()}</strong>, CPF/CNPJ sob o nº <strong>${c.document}</strong>, residente e domiciliada em ${c.address}, e-mail: ${c.email}.</td>
            </tr>
          </table>
        </div>

        <h3>Cláusula Primeira — Do Objeto</h3>
        <p>1.1. O presente instrumento tem como objeto a prestação de serviços especializados de beleza pela <strong>CONTRATADA</strong>, consistindo no pacote <strong>${s.name}</strong>, cujas características são as seguintes:</p>
        <p style="margin-left: 20px; font-style: italic; color: #555;">"${s.description}"</p>
        <p>1.2. Fica expressamente acordado que qualquer acréscimo de serviços adicionais solicitados no dia do evento (produções extras de convidadas, etc.) será cobrado separadamente nas taxas vigentes da <strong>CONTRATADA</strong>.</p>

        <h3>Cláusula Segunda — Do Local e Cronograma</h3>
        <p>2.1. O atendimento técnico contratado será realizado no dia <strong>${formattedDate}</strong>, nas dependências da locação indicada como: <strong>${c.location}</strong>.</p>
        <p>2.2. O horário exato do atendimento será acordado previamente de forma escrita entre as partes de acordo com o cronograma da assessoria ou do evento, devendo ser respeitada a pontualidade sob pena de atraso na finalização da entrega do serviço.</p>

        <h3>Cláusula Terceira — Dos Valores e Condições de Pagamento</h3>
        <p>3.1. Pela prestação dos serviços contratados previstos no item 1.1, a <strong>CONTRATANTE</strong> pagará à <strong>CONTRATADA</strong> o valor total acordado de <strong>${priceFormatted}</strong>.</p>
        <p>3.2. O pagamento será efetuado da seguinte forma: ${paymentClauseText}</p>
        <p>3.3. A inadimplência das parcelas autoriza a cobrança de multa de 2% (dois por cento) sobre as parcelas em atraso acrescido de juros moratórios legais.</p>

        <h3>Cláusula Quarta — Da Rescisão e Desistência</h3>
        <p>4.1. O sinal de reserva não será reembolsado em caso de rescisão voluntária motivada exclusivamente pela <strong>CONTRATANTE</strong>, visto que a reserva assegura exclusividade de agenda da <strong>CONTRATADA</strong> bloqueando outras propostas comerciais.</p>
        <p>4.2. Caso ocorra cancelamento por parte da <strong>CONTRATADA</strong> por motivos de força maior, o valor de sinal depositado será integralmente devolvido à <strong>CONTRATANTE</strong> no prazo de até 5 (cinco) dias úteis.</p>

        <h3>Cláusula Quinta — Do Foro</h3>
        <p>5.1. Para dirimir quaisquer dúvidas oriundas deste contrato, fica eleito o Foro da Comarca de <strong>Pindamonhangaba - SP</strong>, renunciando as partes a qualquer outro por mais privilegiado que seja.</p>
        
        <p style="margin-top: 40px; text-align: center;">E, por estarem de pleno acordo, firmam o presente instrumento digital de forma irrevogável.</p>

        <div class="signatures-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 50px;">
          <div class="sig-line" style="border-top: 1px solid #1c1c1c; text-align: center; padding-top: 8px; font-size: 11px;">
            <strong>CONTRATADA</strong><br>
            ANNA SOUZA BEAUTY<br>
            CPF nº 324.689.330-18
          </div>
          <div class="sig-line" style="border-top: 1px solid #1c1c1c; text-align: center; padding-top: 8px; font-size: 11px;">
            <strong>CONTRATANTE</strong><br>
            ${c.name.toUpperCase()}<br>
            CPF/CNPJ: ${c.document}
          </div>
        </div>
      </div>
    </div>
    `;
  }

  function closeModal() {
    contractModal.classList.remove("active");
  }

  btnCloseModal.addEventListener("click", closeModal);
  contractModal.addEventListener("click", (e) => {
    if (e.target === contractModal) closeModal();
  });

  btnModalPrint.addEventListener("click", () => {
    window.print();
  });

  btnModalAccept.addEventListener("click", () => {
    alert("Contrato assinado e vinculado com sucesso ao Briefing da Cliente!");
    closeModal();
    document.querySelector('[data-tab="export-tab"]').click();
  });


  // --- 11. CENTRAL DE EXPORTAÇÃO & DRAFT COMPILER ---
  const btnExportHtml = document.getElementById("btn-export-html");
  const btnPrintContract = document.getElementById("btn-print-contract");
  const iframePlaceholder = document.getElementById("iframe-placeholder");
  const briefingLivePreview = document.getElementById("briefing-live-preview");

  function updateBriefingChecklist() {
    const hasClient = state.client.name !== "";
    const hasContract = state.client.name !== "" && state.client.document !== "";
    const hasVisagism = state.visagism.hasImage;
    const hasPalette = state.colorimetry.isAnalyzed;
    const hasLighting = state.lighting.activeId !== "";

    updateCheckItem("chk-client", hasClient);
    updateCheckItem("chk-contract", hasContract);
    updateCheckItem("chk-visagism", hasVisagism);
    updateCheckItem("chk-palette", hasPalette);
    updateCheckItem("chk-lighting", hasLighting);
  }

  function updateCheckItem(id, isActive) {
    const li = document.getElementById(id);
    if (!li) return;
    
    if (isActive) {
      li.innerHTML = '<i class="fa-solid fa-circle-check text-success"></i> ' + li.textContent.replace('Ficha Cadastral', 'Ficha Cadastral').replace('Contrato de Serviço', 'Contrato de Serviço').replace('Análise Visagista', 'Análise Visagista').replace('Paleta & Cromatologia', 'Paleta & Cromatologia').replace('Direção de Luz', 'Direção de Luz');
    } else {
      li.innerHTML = '<i class="fa-solid fa-xmark text-danger"></i> ' + li.textContent;
    }
  }

  function compileLiveBriefingPreview() {
    const hasClient = state.client.name !== "";
    
    if (!hasClient) {
      iframePlaceholder.style.display = "block";
      briefingLivePreview.classList.add("hidden-preview");
      return;
    }

    iframePlaceholder.style.display = "none";
    briefingLivePreview.classList.remove("hidden-preview");

    const c = state.client;
    const s = state.service;
    const v = state.visagism;
    const col = state.colorimetry;
    const w = state.colorWheel;
    const l = state.lighting;

    let paletteSwatchesHtml = "";
    w.palette.forEach(hex => {
      paletteSwatchesHtml += `<div style="background-color:${hex}; flex-grow:1; height:45px; border-radius:4px; box-shadow:inset 0 0 10px rgba(0,0,0,0.1);" title="${hex}"></div>`;
    });

    let seasonSwatchesHtml = "";
    if (col.isAnalyzed) {
      col.palette.forEach(hex => {
        seasonSwatchesHtml += `<div style="background-color:${hex}; width:35px; height:35px; border-radius:50%; margin-right:5px; box-shadow:0 2px 5px rgba(0,0,0,0.15);" title="${hex}"></div>`;
      });
    }

    const formattedDate = c.date ? c.date.split("-").reverse().join("/") : "__/__/____";

    briefingLivePreview.innerHTML = `
    <div class="preview-briefing-doc">
      <div style="text-align:center; border-bottom:2px solid var(--rose-primary); padding-bottom:20px; margin-bottom:30px;">
        <span style="font-family:'Cinzel', serif; font-size:11px; letter-spacing:0.3em; color:var(--rose-dark); font-weight:700;">DRAFT LIVE BRIEFING</span>
        <h2 style="font-family:'Cinzel', serif; font-size:24px; color:#1c1c1c; margin-top:5px; margin-bottom:5px;">ANNA SOUZA</h2>
        <p style="font-family:'Manrope', sans-serif; font-size:10px; text-transform:uppercase; letter-spacing:0.1em; color:#777;">Visagismo & Style Dossier</p>
      </div>

      <div style="margin-bottom:25px;">
        <h4 style="font-family:'Cinzel', serif; font-size:13px; color:#1c1c1c; border-bottom:1px solid #ddd; padding-bottom:5px; text-transform:uppercase; margin-bottom:12px;">1. Ficha Cadastral da Cliente</h4>
        <table style="width:100%; font-size:12px; line-height:1.8;">
          <tr><td style="width:120px; font-weight:600; color:#555;">CLIENTE:</td><td>${c.name || "Aguardando cadastro..."}</td></tr>
          <tr><td style="font-weight:600; color:#555;">DATA EVENTO:</td><td>${formattedDate}</td></tr>
          <tr><td style="font-weight:600; color:#555;">LOCALIZAÇÃO:</td><td>${c.location || "Aguardando..."}</td></tr>
          <tr><td style="font-weight:600; color:#555;">PACOTE:</td><td><strong>${s.name}</strong> (R$ ${s.price.toFixed(2).replace('.', ',')})</td></tr>
        </table>
      </div>

      <div style="margin-bottom:25px;">
        <h4 style="font-family:'Cinzel', serif; font-size:13px; color:#1c1c1c; border-bottom:1px solid #ddd; padding-bottom:5px; text-transform:uppercase; margin-bottom:12px;">2. Morfologia Facial & Visagismo</h4>
        <table style="width:100%; font-size:12px; line-height:1.8; margin-bottom:12px;">
          <tr><td style="width:120px; font-weight:600; color:#555;">FORMATO FACIAL:</td><td style="text-transform:capitalize;">${v.faceShape}</td></tr>
          <tr><td style="font-weight:600; color:#555;">SILHUETA:</td><td style="text-transform:capitalize;">${v.bodyShape}</td></tr>
          <tr><td style="font-weight:600; color:#555;">CONTRASTE:</td><td style="text-transform:capitalize;">${v.contrast}</td></tr>
        </table>
        <div style="font-size:11px; background:#f5f3ef; padding:15px; border-radius:6px; color:#444; border-left:3px solid var(--rose-primary);">
          <strong>Cabelo & Penteado:</strong> ${hairAdvice[v.faceShape] || "Aguardando ajuste de seletores..."}<br><br>
          <strong>Maquiagem Sugerida:</strong> ${makeupAdvice[v.faceShape] || "Aguardando..."}
        </div>
      </div>

      <div style="margin-bottom:25px;">
        <h4 style="font-family:'Cinzel', serif; font-size:13px; color:#1c1c1c; border-bottom:1px solid #ddd; padding-bottom:5px; text-transform:uppercase; margin-bottom:12px;">3. Cromatologia Digital & Undertone</h4>
        <table style="width:100%; font-size:12px; line-height:1.8; margin-bottom:12px;">
          <tr><td style="width:120px; font-weight:600; color:#555;">SUBTOM PELE:</td><td><strong>${col.undertone}</strong></td></tr>
          <tr><td style="font-weight:600; color:#555;">CARTELA ESTAÇÃO:</td><td><strong>${col.season}</strong></td></tr>
        </table>
        ${col.isAnalyzed ? `
        <div style="display:flex; align-items:center; margin-bottom:10px;">
          <span style="font-size:11px; font-weight:600; color:#555; margin-right:15px;">CARTELA RECOMENDADA:</span>
          <div style="display:flex;">${seasonSwatchesHtml}</div>
        </div>
        <p style="font-size:11px; color:#555; line-height:1.4; font-style:italic;">"${seasonDescriptions[col.season]}"</p>
        ` : '<p style="font-size:11px; color:#888; font-style:italic;">Escaneador cutâneo pendente.</p>'}
      </div>

      <div style="margin-bottom:25px;">
        <h4 style="font-family:'Cinzel', serif; font-size:13px; color:#1c1c1c; border-bottom:1px solid #ddd; padding-bottom:5px; text-transform:uppercase; margin-bottom:12px;">4. Paleta de Harmonia Escolhida</h4>
        <div style="display:flex; gap:6px; margin-bottom:10px;">
          ${paletteSwatchesHtml}
        </div>
        <div style="display:flex; justify-content:space-between; font-family:monospace; font-size:10px; color:#666; padding:0 5px;">
          ${w.palette.map(hex => `<span>${hex.toUpperCase()}</span>`).join('')}
        </div>
      </div>

      <div style="margin-bottom:10px;">
        <h4 style="font-family:'Cinzel', serif; font-size:13px; color:#1c1c1c; border-bottom:1px solid #ddd; padding-bottom:5px; text-transform:uppercase; margin-bottom:12px;">5. Técnica de Iluminação Recomendada</h4>
        <table style="width:100%; font-size:12px; line-height:1.8; margin-bottom:10px;">
          <tr><td style="width:120px; font-weight:600; color:#555;">DIREÇÃO / ESTILO:</td><td><strong>${l.name}</strong></td></tr>
          <tr><td style="font-weight:600; color:#555;">LUZ PRINCIPAL:</td><td>${l.keyLight}</td></tr>
          <tr><td style="font-weight:600; color:#555;">COLO E EFEITOS:</td><td>${l.fillLight}</td></tr>
        </table>
        <p style="font-size:11px; color:#555; line-height:1.4;">${l.description}</p>
      </div>
    </div>
    `;
  }

  btnPrintContract.addEventListener("click", () => {
    saveClientFormToState();
    if (!isClientFormValid()) {
      alert("Preencha a Ficha Cadastral na primeira aba antes de imprimir.");
      return;
    }
    
    contractPrintBody.innerHTML = compileContractHTML();
    contractModal.classList.add("active");
    setTimeout(() => {
      window.print();
    }, 500);
  });

  btnExportHtml.addEventListener("click", () => {
    saveClientFormToState();
    if (!isClientFormValid()) {
      alert("Por favor, complete ao menos a Ficha Cadastral do Cliente antes de exportar.");
      return;
    }

    const c = state.client;
    const s = state.service;
    const v = state.visagism;
    const col = state.colorimetry;
    const w = state.colorWheel;
    const l = state.lighting;

    const formattedDate = c.date ? c.date.split("-").reverse().join("/") : "__/__/____";

    let paletteSwatchesHtml = "";
    w.palette.forEach(hex => {
      paletteSwatchesHtml += `<div style="background-color:${hex}; flex: 1; height:60px; border-radius:6px; box-shadow:0 3px 6px rgba(0,0,0,0.15);" class="color-box"></div>`;
    });

    let seasonSwatchesHtml = "";
    if (col.isAnalyzed) {
      col.palette.forEach(hex => {
        seasonSwatchesHtml += `<div style="background-color:${hex}; width:40px; height:40px; border-radius:50%; margin-right:8px; box-shadow:0 3px 6px rgba(0,0,0,0.15);"></div>`;
      });
    }

    const fullBriefingHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Briefing Dossier — Anna Souza Beauty</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Manrope:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --rose-primary: #d6a29a;
      --rose-dark: #8c736f;
      --bg-light: #efebe6;
      --white-blossom: #fbf9f6;
      --slate-dark: #1c1c1c;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg-light);
      color: var(--slate-dark);
      font-family: 'Manrope', sans-serif;
      line-height: 1.6;
      padding: 40px 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: var(--white-blossom);
      border-radius: 20px;
      box-shadow: 0 10px 45px rgba(0,0,0,0.06);
      padding: 50px;
      position: relative;
      border: 1px solid rgba(214, 162, 154, 0.15);
    }
    .header {
      text-align: center;
      border-bottom: 2px solid var(--rose-primary);
      padding-bottom: 30px;
      margin-bottom: 40px;
    }
    .header h1 {
      font-family: 'Cinzel', serif;
      font-size: 26px;
      letter-spacing: 0.15em;
      margin-bottom: 5px;
      color: var(--slate-dark);
    }
    .header p {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.25em;
      color: var(--rose-dark);
      font-weight: 700;
    }
    .section-title {
      font-family: 'Cinzel', serif;
      font-size: 15px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--slate-dark);
      border-bottom: 1px solid rgba(0,0,0,0.08);
      padding-bottom: 6px;
      margin-top: 30px;
      margin-bottom: 18px;
    }
    .card-info {
      font-size: 13px;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 15px;
    }
    td {
      padding: 8px 0;
      font-size: 13px;
      vertical-align: top;
    }
    td.label {
      width: 150px;
      font-weight: 600;
      color: #666;
    }
    .desc-box {
      background: #f5f3ef;
      border-left: 4px solid var(--rose-primary);
      padding: 20px;
      border-radius: 8px;
      font-size: 12.5px;
      color: #333;
      margin-bottom: 20px;
    }
    .palette-wrapper {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }
    .hex-codes {
      display: flex;
      justify-content: space-between;
      font-family: monospace;
      font-size: 11px;
      color: #555;
      padding: 0 4px;
    }
    .footer {
      text-align: center;
      margin-top: 50px;
      padding-top: 30px;
      border-top: 1px solid rgba(0,0,0,0.05);
      font-size: 11px;
      color: #888;
    }
    @media print {
      body { background-color: #fff; padding: 0; }
      .container { border: none; box-shadow: none; padding: 0; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ANNA SOUZA BEAUTY</h1>
      <p>DOSSIÊ DE VISAGISMO E CRONOGRAMA DE ATENDIMENTO</p>
    </div>

    <div class="card-info">
      <h3 class="section-title">1. Ficha de Cadastro & Serviço</h3>
      <table>
        <tr><td class="label">CLIENTE:</td><td><strong>${c.name.toUpperCase()}</strong></td></tr>
        <tr><td class="label">CPF/CNPJ:</td><td>${c.document}</td></tr>
        <tr><td class="label">DATA EVENTO:</td><td>${formattedDate}</td></tr>
        <tr><td class="label">LOCAÇÃO:</td><td>${c.location}</td></tr>
        <tr><td class="label">PACOTE CONTRATADO:</td><td><strong>${s.name} (R$ ${s.price.toFixed(2).replace('.', ',')})</strong></td></tr>
      </table>
      <div class="desc-box">
        <strong>Especificações do Pacote:</strong><br>${s.description}
      </div>
    </div>

    <div class="card-info">
      <h3 class="section-title">2. Estudo Morfológico Facial (Visagismo)</h3>
      <table>
        <tr><td class="label">FORMATO FACIAL:</td><td style="text-transform: capitalize;">${v.faceShape}</td></tr>
        <tr><td class="label">CONTRASTE PESSOAL:</td><td style="text-transform: capitalize;">${v.contrast}</td></tr>
        <tr><td class="label">SILHUETA CORPORAL:</td><td style="text-transform: capitalize;">${v.bodyShape}</td></tr>
      </table>
      <div class="desc-box">
        <p style="margin-bottom: 12px;"><strong>Cabelo & Penteado Ideal:</strong> ${hairAdvice[v.faceShape] || "Aguardando ajuste..."}</p>
        <p style="margin-bottom: 12px;"><strong>Maquiagem Recomendada:</strong> ${makeupAdvice[v.faceShape] || "Aguardando..."}</p>
        <p><strong>Vestuário & Decotes Recomendados:</strong> ${clothingAdvice[v.bodyShape] || "Aguardando..."}</p>
      </div>
    </div>

    <div class="card-info">
      <h3 class="section-title">3. Cromatologia Digital & Undertone</h3>
      <table>
        <tr><td class="label">SUBTOM DE PELE:</td><td><strong>${col.undertone}</strong></td></tr>
        <tr><td class="label">CARTELA ESTAÇÃO:</td><td><strong>${col.season}</strong></td></tr>
      </table>
      ${col.isAnalyzed ? `
      <div style="display:flex; align-items:center; margin-bottom:15px; margin-top: 10px;">
        <span style="font-size:12px; font-weight:600; color:#555; margin-right:15px;">PALETA RECOMENDADA:</span>
        <div style="display:flex;">${seasonSwatchesHtml}</div>
      </div>
      <div class="desc-box" style="font-style: italic;">
        "${seasonDescriptions[col.season]}"
      </div>
      ` : '<p style="font-style:italic; font-size:12px; color:#888;">Nenhuma análise cutânea realizada.</p>'}
    </div>

    <div class="card-info">
      <h3 class="section-title">4. Paleta de Harmonia Cromática (Moodboard)</h3>
      <div class="palette-wrapper">
        ${paletteSwatchesHtml}
      </div>
      <div class="hex-codes">
        ${w.palette.map(hex => `<span>${hex.toUpperCase()}</span>`).join('')}
      </div>
    </div>

    <div class="card-info">
      <h3 class="section-title">5. Técnica de Iluminação para Fotografia</h3>
      <table>
        <tr><td class="label">ESQUEMA DE RETRATO:</td><td><strong>${l.name}</strong></td></tr>
        <tr><td class="label">LUZ PRINCIPAL:</td><td>${l.keyLight}</td></tr>
        <tr><td class="label">LUZ DE COLO / EFEITO:</td><td>${l.fillLight}</td></tr>
      </table>
      <div class="desc-box">
        <strong>Foco Fotográfico:</strong> ${l.focus}<br>
        <strong>Estilo Editorial:</strong> ${l.description}
      </div>
    </div>

    <div class="footer">
      <p>Dossiê Premium de Beleza — Anna Souza Beauty Experience</p>
      <p style="margin-top:5px; font-size:9px;">Gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([fullBriefingHTML], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    
    const cleanClientName = c.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    link.download = `briefing-anna-souza-${cleanClientName || "cliente"}.html`;
    
    link.click();
  });

  initPackageDropdown();
  initLightingDropdown();

});
