import type { Person } from "../types/person";

export const Student: Person = {
  prefix: "Monitora:",
  name: "Emanuella Alves Monteiro Marques",
  instagram: "https://www.instagram.com/emanuellanutri/",
};

export const Professor: Person = {
  prefix: "Professor:",
  name: "Leonardo Furtado de Oliveira",
  instagram: "https://www.instagram.com/leofnutricionista/",
  email: "leonardo.oliveira@professor.unifametro.edu.br",
};

export const CURRENT_QUESTIONNAIRE = 4;

export const REPOSITORY_SUPABASE = 1;

export const CURRENT_TECH_REPOSITORY = REPOSITORY_SUPABASE;

// export const data: Question[] = [
//   {
//     id: "caso-1",
//     index: 1,
//     title: "CASO 1",
//     statement:
//       "Durante a monitoria, foi apresentado o seguinte comentário: “Se a gestante pesa pouco, ela obrigatoriamente tem baixo peso pré-gravídico.”",
//     question: "Do ponto de vista técnico, essa afirmação é:",
//     options: [
//       {
//         value: "A",
//         description:
//           "Correta, porque o peso isolado já define a classificação nutricional",
//       },
//       {
//         value: "B",
//         description:
//           "Incorreta, porque a classificação depende do IMC, e o IMC depende da relação entre peso e altura",
//       },
//       {
//         value: "C",
//         description:
//           "Correta apenas se a gestante estiver no primeiro trimestre",
//       },
//     ],
//     correctOptionId: "B",
//     explanation:
//       "Peso isolado não classifica. A classificação depende do IMC, que considera peso e altura.",
//     category: "conceito",
//     difficulty: "facil",
//     tags: ["peso isolado", "IMC"],
//     source: "Texto colado.txt",
//     summaryImage: "/assets/images/caso-1.png",
//   },
//   {
//     id: "caso-2",
//     index: 2,
//     title: "CASO 2",
//     statement:
//       "Na triagem do ambulatório, Mariana informa que engravidou com 58 kg e 1,62 m. No dia da consulta, com 18 semanas, está com 63,4 kg. Um colega anota o IMC usando o peso atual “porque é o peso mais recente”.",
//     question: "Para avaliar o IMC pré-gravídico, qual é a conduta correta?",
//     options: [
//       {
//         value: "A",
//         description:
//           "Usar 63,4 kg e 1,62 m, porque são os dados da consulta atual",
//       },
//       {
//         value: "B",
//         description:
//           "Usar 58 kg e 1,62 m, porque o IMC pré-gravídico deve refletir o estado nutricional antes da gestação",
//       },
//       {
//         value: "C",
//         description:
//           "Fazer a média entre 58 kg e 63,4 kg para evitar erro de subestimação",
//       },
//     ],
//     correctOptionId: "B",
//     explanation:
//       "A pegadinha é confundir peso atual com peso pré-gestacional. Para o IMC pré-gravídico, usa-se o peso antes da gestação.",
//     category: "peso_pre_gestacional",
//     difficulty: "facil",
//     tags: ["imc pre-gravidico", "peso atual x pre-gestacional"],
//     source: "Texto colado.txt",
//     summaryImage: "/assets/images/caso-2.png",
//     data: {
//       prePregnancyWeightKg: 58,
//       currentWeightKg: 63.4,
//       heightM: 1.62,
//       gestationalWeeks: 18,
//     },
//   },
//   {
//     id: "caso-3",
//     index: 3,
//     title: "CASO 3",
//     statement:
//       "Em uma questão discursiva, o professor pergunta: “Por que o IMC pré-gravídico é relevante na avaliação nutricional da gestante?”",
//     question: "Qual alternativa responde melhor?",
//     options: [
//       {
//         value: "A",
//         description:
//           "Porque ele substitui toda a avaliação do ganho de peso ao longo da gestação",
//       },
//       {
//         value: "B",
//         description:
//           "Porque ele ajuda a identificar o estado nutricional antes da gestação e serve como base para acompanhar a evolução ponderal depois",
//       },
//       {
//         value: "C",
//         description:
//           "Porque ele é calculado com o peso do dia da consulta e mostra o estado nutricional do trimestre atual",
//       },
//     ],
//     correctOptionId: "B",
//     explanation:
//       "O IMC pré-gravídico é a base inicial para interpretar o estado nutricional e acompanhar a evolução da gestação.",
//     category: "conceito",
//     difficulty: "facil",
//     tags: ["avaliacao nutricional", "relevancia clinica"],
//     source: "Texto colado.txt",
//   },
//   {
//     id: "caso-4",
//     index: 4,
//     title: "CASO 4",
//     statement:
//       "Bruna pesava 53 kg antes da gestação e media 1,59 m. Um grupo calculou IMC de 20,96 kg/m². Outro grupo arredondou para 21,0 kg/m².",
//     question: "Qual afirmativa está mais correta?",
//     options: [
//       {
//         value: "A",
//         description:
//           "O arredondamento para uma casa decimal é aceitável e a classificação continua sendo eutrofia",
//       },
//       {
//         value: "B",
//         description:
//           "O arredondamento invalida a classificação, então o caso fica sem resposta",
//       },
//       {
//         value: "C",
//         description:
//           "O valor deve ser automaticamente arredondado para 22 kg/m²",
//       },
//     ],
//     correctOptionId: "A",
//     explanation:
//       "O arredondamento adequado para uma casa decimal é aceitável quando não distorce a interpretação clínica.",
//     category: "arredondamento",
//     difficulty: "facil",
//     tags: ["arredondamento", "eutrofia"],
//     source: "Texto colado.txt",
//     data: {
//       prePregnancyWeightKg: 53,
//       heightM: 1.59,
//       expectedBmi: 21.0,
//       expectedClassification: "eutrofia",
//     },
//   },
//   {
//     id: "caso-5",
//     index: 5,
//     title: "CASO 5",
//     statement:
//       "Em um caso discutido em sala, a gestante tinha peso pré-gestacional de 72 kg e altura de 1,68 m. Um aluno encontrou IMC de 42,8 kg/m².",
//     question: "Qual erro ele provavelmente cometeu?",
//     options: [
//       {
//         value: "A",
//         description: "Usou a fórmula do IMC com altura em centímetros",
//       },
//       { value: "B", description: "Não elevou a altura ao quadrado" },
//       {
//         value: "C",
//         description: "Arredondou o resultado antes de terminar a conta",
//       },
//     ],
//     correctOptionId: "B",
//     explanation:
//       "Se fizer 72 ÷ 1,68, o resultado fica perto de 42,8. O erro mais provável foi esquecer o quadrado da altura.",
//     category: "calculo_imc",
//     difficulty: "media",
//     tags: ["formula do imc", "erros comuns"],
//     source: "Texto colado.txt",
//     data: {
//       prePregnancyWeightKg: 72,
//       heightM: 1.68,
//     },
//   },
//   {
//     id: "caso-6",
//     index: 6,
//     title: "CASO 6",
//     statement:
//       "Patrícia relata que antes de engravidar pesava 49 kg e media 1,70 m. No registro antigo da academia consta 1,67 m, mas na consulta atual a altura aferida corretamente é 1,70 m.",
//     question: "Qual IMC pré-gravídico deve ser considerado?",
//     options: [
//       { value: "A", description: "16,9 kg/m²" },
//       { value: "B", description: "17,0 kg/m²" },
//       { value: "C", description: "18,4 kg/m²" },
//     ],
//     correctOptionId: "B",
//     explanation:
//       "IMC = 49 ÷ (1,70²) = 49 ÷ 2,89 = 17,0 kg/m². Usar altura errada muda o resultado e pode mudar a classificação.",
//     category: "calculo_imc",
//     difficulty: "media",
//     tags: ["altura correta", "calculo do imc"],
//     source: "Texto colado.txt",
//     data: {
//       prePregnancyWeightKg: 49,
//       heightM: 1.7,
//       expectedBmi: 17.0,
//     },
//   },
//   {
//     id: "caso-7",
//     index: 7,
//     title: "CASO 7",
//     statement:
//       "Jéssica iniciou a gestação com 64 kg e 1,58 m. Uma aluna calculou o IMC e marcou 25,6 kg/m². Outra disse que, como ficou “quase normal”, poderia classificar como eutrofia.",
//     question: "Qual é a classificação correta do IMC pré-gravídico?",
//     options: [
//       { value: "A", description: "Eutrofia" },
//       { value: "B", description: "Sobrepeso" },
//       { value: "C", description: "Obesidade" },
//     ],
//     correctOptionId: "B",
//     explanation:
//       "IMC = 64 ÷ (1,58²) = 25,6 kg/m². Acima de 25 já entra em sobrepeso.",
//     category: "classificacao_imc",
//     difficulty: "media",
//     tags: ["classificacao", "sobrepeso"],
//     source: "Texto colado.txt",
//     data: {
//       prePregnancyWeightKg: 64,
//       heightM: 1.58,
//       expectedBmi: 25.6,
//       expectedClassification: "sobrepeso",
//     },
//   },
//   {
//     id: "caso-8",
//     index: 8,
//     title: "CASO 8",
//     statement:
//       "Na última questão, a professora entrega este caso: “Gestante com peso pré-gestacional de 90 kg e altura de 1,73 m. O estudante calculou IMC de 30,1 kg/m² e classificou como sobrepeso.”",
//     question: "Qual análise está correta?",
//     options: [
//       {
//         value: "A",
//         description: "O cálculo está certo, mas a classificação está errada",
//       },
//       {
//         value: "B",
//         description: "O cálculo está errado, mas a classificação está certa",
//       },
//       {
//         value: "C",
//         description: "Tanto o cálculo quanto a classificação estão errados",
//       },
//     ],
//     correctOptionId: "A",
//     explanation:
//       "IMC = 90 ÷ (1,73²) = 30,1 kg/m². O cálculo está certo, mas 30,1 já é obesidade, não sobrepeso.",
//     category: "classificacao_imc",
//     difficulty: "media",
//     tags: ["calculo certo classificacao errada"],
//     source: "Texto colado.txt",
//     data: {
//       prePregnancyWeightKg: 90,
//       heightM: 1.73,
//       expectedBmi: 30.1,
//       expectedClassification: "obesidade",
//     },
//   },
//   {
//     id: "caso-9",
//     index: 9,
//     title: "CASO 9",
//     statement:
//       "Na prova prática, a professora mostra o seguinte caso: “Gestante com peso pré-gestacional de 81 kg, peso atual de 85 kg, altura de 1,64 m. O aluno precisa apenas calcular e classificar o IMC pré-gravídico.”",
//     question: "Qual alternativa está correta?",
//     options: [
//       { value: "A", description: "30,1 kg/m² — obesidade" },
//       { value: "B", description: "31,6 kg/m² — obesidade" },
//       { value: "C", description: "26,8 kg/m² — sobrepeso" },
//     ],
//     correctOptionId: "A",
//     explanation:
//       "Usa-se 81 kg, não 85 kg. IMC = 81 ÷ (1,64²) = 30,1 kg/m², classificado como obesidade.",
//     category: "classificacao_imc",
//     difficulty: "dificil",
//     tags: ["peso pre-gestacional", "obesidade"],
//     source: "Texto colado.txt",
//     data: {
//       prePregnancyWeightKg: 81,
//       currentWeightKg: 85,
//       heightM: 1.64,
//       expectedBmi: 30.1,
//       expectedClassification: "obesidade",
//     },
//   },
//   {
//     id: "caso-10",
//     index: 10,
//     title: "CASO 10",
//     statement:
//       "Lorena refere peso pré-gestacional de 46 kg e altura de 1,54 m. O aluno calculou corretamente o IMC, mas classificou como eutrofia “porque está perto de 19”.",
//     question: "Qual é a resposta certa?",
//     options: [
//       { value: "A", description: "IMC 18,4 kg/m² — baixo peso" },
//       { value: "B", description: "IMC 18,4 kg/m² — eutrofia" },
//       { value: "C", description: "IMC 19,4 kg/m² — eutrofia" },
//     ],
//     correctOptionId: "C",
//     explanation:
//       "46 ÷ (1,54²) = 46 ÷ 2,3716 = 19,4 kg/m². Portanto, o IMC correto é 19,4 e a classificação é eutrofia.",
//     category: "calculo_imc",
//     difficulty: "dificil",
//     tags: ["revisao de conta", "pegadinha"],
//     source: "Texto colado.txt",
//     data: {
//       prePregnancyWeightKg: 46,
//       heightM: 1.54,
//       expectedBmi: 19.4,
//       expectedClassification: "eutrofia",
//     },
//   },
// ];
