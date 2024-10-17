// Fonction pour récupérer les données stockées en local
function loadData() {
    let entries = localStorage.getItem("formEntries");

    // Vérifier si "formEntries" existe et est une chaîne JSON valide
    if (entries) {
        try {
            entries = JSON.parse(entries); // Tentative de parsing
        } catch (e) {
            console.error("Erreur lors du parsing des données JSON", e);
            entries = []; // Si parsing échoue, on utilise un tableau vide
        }
    } else {
        entries = []; // Si pas de données dans le localStorage, initialiser un tableau vide
    }

    return entries;
}

// Fonction pour sauvegarder les données dans le localStorage
function saveData() {
    // Récupération des valeurs des champs de formulaire
    const q1 = document.getElementById("q1").value;
    const q2 = document.getElementById("q2").value;
    const q3 = document.getElementById("q3").value;
    //  q4
    let checkboxes = document.querySelectorAll('input[name="q4"]:checked');
    let selectedValues = [];
    checkboxes.forEach((checkbox) => {
         selectedValues.push(checkbox.value);
    });
    const q5 = document.getElementById("q5").value;
    const q6 = document.getElementById("q6").value;
    const q7 = document.getElementById("q7").value;
    //  q8
    let checkboxes2 = document.querySelectorAll('input[name="q8"]:checked');
    let selectedValues2 = [];
    checkboxes2.forEach((checkbox) => {
         selectedValues2.push(checkbox.value);
    });
    const q9 = document.getElementById("q9").value;
    // q10
    let selectedValues3 = [];
    if(document.getElementById("q10").value != "")
    {
        selectedValues3.push(document.getElementById("q10").value);
        if(document.getElementById("q10-details").value != "")
        {
            selectedValues3.push(document.getElementById("q10-details").value);
        }   
    }
    const q11 = document.getElementById("q11").value;
    const q12 = document.getElementById("q12").value;
    // q13
    let selectedValues4 = [];
    if(document.getElementById("q13").value != "")
    {
        selectedValues4.push(document.getElementById("q13").value);
        if(document.getElementById("q13-details").value != "")
        {
            selectedValues4.push(document.getElementById("q13-details").value);
        }   
    }
    // q14
    let selectedValues5 = [];
    if(document.getElementById("q14").value != "")
    {
        selectedValues5.push(document.getElementById("q14").value);
        if(document.getElementById("q14-details").value != "")
        {
            selectedValues5.push(document.getElementById("q14-details").value);
        }   
    }

    // On peut stocker les réponses dans le localStorage ou dans une variable
    const data = {
        q1: q1,
        q2: q2,
        q3: q3,
        q4: selectedValues,
        q5: q5,
        q6: q6,
        q7: q7,
        q8: selectedValues2,
        q9: q9,
        q10: selectedValues3,
        q11: q11,
        q12: q12,
        q13: selectedValues4,
        q14: selectedValues5
    };

    const entries = loadData();

    // Remplir le formulaire avec les données existantes
    const form = document.getElementById('survey-form');

    if(form.querySelector('[name="editIndex"]').value)
    {
        entries[form.querySelector('[name="editIndex"]').value] = data;
    }
    else
    {
        entries.push(data); // Ajout de l'enregistrement au tableau
    }

    // Sauvegarde des nouvelles données
    localStorage.setItem("formEntries", JSON.stringify(entries));

    // Rediriger vers la page index.html après sauvegarde
    window.location.href = "index.html";
}

// Fonction pour afficher les données dans le tableau
function displayData() {
    const tableBody = document.getElementById('table-body');
    const data = loadData();
    console.log(data);
    if(tableBody){
        tableBody.innerHTML = ''; // Réinitialiser le tableau

        data.forEach((row, index) => {
            const tr = document.createElement('tr');

            const td = document.createElement('td');
            td.textContent = index + 1;
            tr.appendChild(td);

            // Insérer les cellules avec les réponses pour chaque question
            for (let i = 0; i < 14; i++) {
                const td = document.createElement('td');
                if(i == 3 || i == 7 || i == 9 || i == 12 || i == 13)
                {
                    let row2 = row[`q${i + 1}`];
                    if(row2.length > 0)
                    {
                        td.textContent = row[`q${i + 1}`];
                    }
                    else
                    {
                        td.textContent = 'Ø';
                    }
                }
                else{
                    td.textContent = row[`q${i + 1}`] || 'Ø';
                }
                tr.appendChild(td);
            }

            // Colonne "Actions"
            const actionsTd = document.createElement('td');
            actionsTd.innerHTML = `
                <button class="btn btn-primary btn-sm" onclick="editEntry(${index})">Modifier</button>
                <button class="btn btn-danger btn-sm" onclick="deleteEntry(${index})">Supprimer</button>
            `;
            tr.appendChild(actionsTd);

            tableBody.appendChild(tr);
        });
    }
}

// Fonction pour supprimer une entrée
function deleteEntry(index) {
    const data = loadData();
    data.splice(index, 1); // Supprimer l'entrée
    localStorage.setItem("formEntries", JSON.stringify(data));
    displayData();
}

// Fonction pour modifier une entrée
function editEntry(index) {
    // Stocker l'index de l'enregistrement à modifier dans le localStorage
    localStorage.setItem('editIndex', index);

    // Redirection vers la page du formulaire
    window.location.href = 'form.html';
}

// Charger et afficher les données dès le chargement de la page
window.onload = function() {
    localStorage.removeItem('editIndex');
    displayData();
};

// Affiche le popup des questions
function showQuestionsPopup() {
    const modal = new bootstrap.Modal(document.getElementById('questionsModal'));
    modal.show();
}
