function tagsPersonalizadas(frase) {
    const tags = []; // Array para armazenar as tags
    let fraseres = '';
    
    if (frase) {
        for (let i = 0; i < frase.length; i++) {
            if (frase[i] === '#') {
                fraseres = frase[i]; // Começa a coletar a tag
                for (let r = i + 1; r < frase.length; r++) {
                    fraseres += frase[r]; // Adiciona o caractere atual
                    if (frase[r] === ';') {
                        tags.push(fraseres); // Adiciona a tag ao array
                        fraseres = ''; // Reseta para coletar outra tag
                        break; // Sai do loop interno para continuar buscando
                    }
                }
            }
        }
    }
    
    return tags; // Retorna o array de tags
}

// Exemplos de uso:
const fraSe1 = 'Vou viajar #coisas; e trazer #presentes; para você.';
const fraSe2 = 'Essa é uma frase sem tag.';
const fraSe3 = 'Só uma tag #exemplo; aqui, outra tag #nova; aqui.';

console.log(tagsPersonalizadas(fraSe1)); // Saída: ['#coisas;', '#presentes;']
console.log(tagsPersonalizadas(fraSe2)); // Saída: []
console.log(tagsPersonalizadas(fraSe3)); // Saída: ['#exemplo;', '#nova;']
