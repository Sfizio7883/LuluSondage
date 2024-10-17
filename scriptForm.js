window.onload = function() {
    const editIndex = localStorage.getItem('editIndex');

    // Remplir le formulaire avec les données existantes
    const form = document.getElementById('survey-form');

    if (editIndex !== null) {
        // Charger les données existantes
        const data = loadData(); // Assurez-vous que cette fonction charge les données du localStorage
        const row = data[editIndex];
        
        for (let i = 1; i <= 14; i++) {
            const input = form.querySelector(`[name="q${i}"]`);
            if (input) {
                if(i == 4 || i == 8)
                {
                    let checkboxes;
                    let selectedValues;
                    if(i == 4)
                    {
                        checkboxes = form.querySelectorAll('input[name="q4"]');
                        selectedValues = row.q4; 
                    }
                    else{
                        
                        checkboxes = form.querySelectorAll('input[name="q8"]');
                        selectedValues = row.q8; 
                    }
                    
                    checkboxes.forEach((checkbox) => {
                        // Si la valeur de la case est dans les réponses sélectionnées, on la coche
                        if (selectedValues.includes(checkbox.value)) {
                            checkbox.checked = true;
                        } else {
                            checkbox.checked = false;
                        }
                    });
                }
                else
                {
                    if(i == 10 || i == 13 || i == 14)
                    {
                        const input2 = form.querySelector(`[name="q${i}-details"]`);

                        let data = row[`q${i}`];
                        input.value = data[0] || '';
                        input2.value = data[1] || '';
                        if(data[1] =! "")
                        {
                            input2.classList.add("hidden");
                        }
                        else{
                            input2.classList.remove("hidden");
                        }
                    }
                    else
                    {
                        input.value = row[`q${i}`] || '';
                    }
                }
                console.log(input.value);
            }
        }
    
        // Ajouter une classe spéciale pour marquer que nous modifions un enregistrement
        form.querySelector('[name="editIndex"]').value = editIndex;

        // On fait défiler la page vers le formulaire
        window.scrollTo({ top: form.offsetTop, behavior: 'smooth' });
    }
    else 
    {
        form.querySelector('[name="editIndex"]').value = "";
    }
};