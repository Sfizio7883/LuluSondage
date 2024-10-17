window.onload = function() {
    
    const entries = loadData();
    
    // Définir les réponses possibles pour chaque question
    const question1Options = ["Moins de 20 ans", "20 à 30 ans", "30 à 45 ans", "45 à 60 ans", "Plus de 60 ans"];
    const question3Options = ["Une personne", "Deux personnes", "Trois personnes", "Plus de quatre personnes"];
    const question4Options = ["Soin anti-âges", "Soin visage hydratant", "Soin visage matifiant",
                              "Soin visage éclaircissant", "Soin visage anti-imperfection",
                              "Soin capillaire", "Soin corps", "Maquillage", "Soin", "solaire Autres"];
    const question5Options = ["Moins de 15€ par mois", "Entre 15€ et 30€ par mois", "Plus de 30€ par mois"];
    const question6Options = ["Plusieurs fois par semaine", "Tous les semaines", "Tous les mois", "1 fois par trimestre", "Occasionnellement"];
    const question7Options = ["Pharmacie", "Parapharmacie", "Parfumerie", "Grandes surfaces", "Internet", "Autres"];
    const question8Options = ["Sa marque", "Son packaging", "Sa composition", "Son parfum", "Sa texture", "Sa rapidité d’application", "Son prix", "Autres"];
    const question10Options = ["Oui", "Non"];
    const question11Options = ["Très compétitifs", "Élevés", "Dans la moyenne des prix généralement pratiqués"];
    const question12Options = ["Oui", "Non"];
    const question13Options = ["Oui", "Non"];
    const question14Options = ["Oui", "Non"];
    
    // Compter les réponses pour la question 1
    const q1Counts = countResponses(entries, 'q1', question1Options);
    const q3Counts = countResponses(entries, 'q3', question3Options);
    const q4Counts = countResponsesCheckbox(entries, 'q4', question4Options);
    const q5Counts = countResponses(entries, 'q5', question5Options);
    const q6Counts = countResponses(entries, 'q6', question6Options);
    const q7Counts = countResponses(entries, 'q7', question7Options);
    const q8Counts = countResponsesCheckbox(entries, 'q8', question8Options);
    
    const q10Counts = countResponses(entries, 'q10', question10Options);
    const q11Counts = countResponses(entries, 'q11', question11Options);
    const q12Counts = countResponses(entries, 'q12', question12Options);
    const q13Counts = countResponses(entries, 'q13', question13Options);
    const q14Counts = countResponses(entries, 'q14', question14Options);
    
    // Créer des graphiques
    createPieChart('chartQ1', 'Question 1', question1Options, q1Counts);
    createPieChart('chartQ3', 'Question 3', question3Options, q3Counts);
    createPieChart('chartQ4', 'Question 4', question4Options, q4Counts);
    createPieChart('chartQ5', 'Question 5', question5Options, q5Counts);
    createPieChart('chartQ6', 'Question 6', question6Options, q6Counts);
    createPieChart('chartQ7', 'Question 7', question7Options, q7Counts);
    createPieChart('chartQ8', 'Question 8', question8Options, q8Counts);
    createPieChart('chartQ10', 'Question 10', question10Options, q10Counts);
    createPieChart('chartQ11', 'Question 11', question11Options, q11Counts);
    createPieChart('chartQ12', 'Question 12', question12Options, q12Counts);
    createPieChart('chartQ13', 'Question 13', question13Options, q13Counts);
    createPieChart('chartQ14', 'Question 14', question14Options, q14Counts);
    // Ajoutez les autres questions ici avec leurs options
};

function countResponses(data, questionKey, options) {
    const counts = Array(options.length).fill(0);
    
    console.log(questionKey);
    data.forEach(entry => {
        const answer = entry[questionKey];
        console.log(answer);
        const index = options.indexOf(answer);
        if (index !== -1) {
            counts[index]++;
        }
    });
    
    return counts;
};

function countResponsesCheckbox(data, questionKey, options) {

    const counts = Array(options.length).fill(0);
    
    console.log(questionKey);
    data.forEach(entry => {
        console.log(entry[questionKey]);
        entry[questionKey].forEach(entry2 => {
            const answer = entry2;
            console.log(answer);
            const index = options.indexOf(answer);
            if (index !== -1) {
                counts[index]++;
            }
        });
    });
    
    return counts;
};

function createPieChart(canvasId, questionLabel, labels, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ],
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: questionLabel
            }
        }
    });
}
