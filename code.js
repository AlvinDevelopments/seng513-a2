function getStats(txt) {
    let text = txt.toLowerCase();
    let words = cleanArray(text.split(/[^a-zA-Z0-9]/));
    let lines = text.split(/\n/);
    if(lines.length==1){
      lines = cleanArray(lines);
    }
    // calculate number of characters, including all white spaces
    let nchars = text.length;
    // number of words
    let nwords = words.length;
    // number of lines
    let nlines = lines.length;
    // number of non empty lines, currently set at total number of lines before calculation
    let nnonemptylines = lines.length;
    // used to hold average word length
    let avgwordlength = 0;
    // used to hold longest line length
    let maxlinelength = 0;
    let wordfreq = [];
    let longestwords = [];
    let uniquewords = [];
    let palindromes = [];

    // calculate number of non-empty lines
    for (x in lines)
    {
       if(checkEmpty(lines[x])){
        nnonemptylines--;
      }
    }

    // determine the longest line in text
    for(x in lines){
      if(lines[x].length > maxlinelength){
        maxlinelength = lines[x].length;
      }
    }

    // determine the average length of each word in text
    for (x in words){
      avgwordlength += words[x].length;
    }
    avgwordlength /= nwords;

    // find all unique words
    for(x in words){
      uniquewords[x] = {
        word: words[x],
        size: words[x].length,
        count: 1
      };
    }

    for(let x = uniquewords.length-1; x > 0; x--){
      for(let y = uniquewords.length-2; y >= 0; y--){
        if(uniquewords[x]['word']==uniquewords[y]['word']&&x!=y){
          uniquewords[x]['count']++;
          uniquewords.splice(y,1);
          x--;
        }
      }
    }

    // find all unique words that are palindromes
    for(x in uniquewords){
      if(isPalindrome(uniquewords[x].word)){
        palindromes.push(uniquewords[x].word);
      }
    }

    // sort unique words based on frequency
    uniquewords.sort(function compare(a,b){
      if(a.count < b.count){
        return 1;
      }
      else if(a.count > b.count){
        return -1;
      }
      else if(a.count == b.count){
        if(a.word>b.word){
          return 1;
        }
        else{
          return -1;
        }
      }
      else{
        return 0;
      }
    });

    // return top 10 most occuring words
    for(let x = 0; x < 10 && x < uniquewords.length; x++){
      wordfreq.push(uniquewords[x].word+"("+uniquewords[x].count+")");
    }

    // sort unique words based on word length
    uniquewords.sort(function compare(a,b){
      if(a.size < b.size){
        return 1;
      }
      else if(a.size > b.size){
        return -1;
      }
      else if(a.size == b.size){
        if(a.word>b.word){
          return 1;
        }
        else{
          return -1;
        }
      }
      else{
        return 0;
      }
    });

    // return top 10 longest words
    for(let x = 0; x < 10 && x < uniquewords.length; x++){
      longestwords.push(uniquewords[x].word);
    }

    return {
        nChars: nchars,
        nWords: nwords,
        nLines: nlines,
        nNonEmptyLines: nnonemptylines,
        averageWordLength: avgwordlength,
        maxLineLength: maxlinelength,
        palindromes: palindromes,
        longestWords: longestwords,
        mostFrequentWords: wordfreq
    };
}

function checkEmpty(s){
  for(x in s){
    if(s[x]!=" "&&s[x]!=""&&s[x]!="\t"&&s[x]!="\s"){
      return false;
    }
  }
  return true;
}

function cleanArray(a){
  a = arguments[0];
  let checkagain = 1;

  while(checkagain==1){
    checkagain = 0;
    for (x in a){
      if(a[x]==""){
        a.splice(x,1);
        checkagain = 1;
      }
    }
  }

    return a;
}

function isPalindrome(word){
  if(word.length<3){
    return false;
  }

  let first = 0;
  let last = word.length-1;

  while(first<last){
    if(word[first]!=word[last]){
      return false;
    }
    first++;
    last--;
  }
  return true;
}
