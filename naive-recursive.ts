function normalize(given_word) {
    return given_word.toLowerCase().trim();
}

//naive recursive implementation
function levenshtein(a, b) {
    if(a.length == 0) {
        return b.length;
    }
    else if(b.length == 0) {
        return a.length;
    }

    let head_a = a[0],
        head_b = b[0];
    let tail_a = a.slice(1),
        tail_b = b.slice(1);

    if(head_a == head_b) {
        return levenshtein(tail_a, tail_b);
    }
    else {
        let deletion = levenshtein(tail_a, b),
            insertion = levenshtein(a, tail_b),
            replacement = levenshtein(tail_a, tail_b);

        return 1+Math.min(deletion, insertion, replacement);
    }
}

function possible_matches(given_word, word_list, max_lscore) {
    //computes the levenshtein distance between normalized given_word
    //and words in the word_list. returns matches lower than a certain
    //threshold.
    
    let normal_word = normalize(given_word);
    let matches = [];

    for(let w in word_list) {
        if(levenshtein(given_word, word_list[w]) <= max_lscore) {
            matches.push(word_list[w]);
        }
    }

    return matches;
}

function main() {
    let word_list: string[] = ['hello', 'world', 'foo'];
    
    while(true) {
        let usr_in = prompt(">");
        console.log(possible_matches(usr_in, word_list, 2));
    }
}

main();
