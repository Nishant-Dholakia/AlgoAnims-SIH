export function isChar(str) {
    let hasChar = false;
    for (let i = 65; i <= 90; i++) {
        if (str.includes(String.fromCharCode(i))) {
            hasChar = true;
            break;
        }
    }
    for (let i = 97; i <= 122; i++) {
        if (str.includes(String.fromCharCode(i))) {
            hasChar = true;
            break;
        }
    }
    return hasChar;
}

export function isDigit(str) {
    let hasDigit = false;
    for (let i = 0; i <= 9; i++) {
        if (str.includes(i.toString())) {
            hasDigit = true;
            break;
        }
    }
    return hasDigit;
}


export function isSpecialChar(str) {
    let isSpecialChar = false;
    let spchars = '@#!$%^&*()_+{}[]|":;<>,./?';
    for (let char of spchars) {
        if (str.includes(char)) {
            isSpecialChar = true;
        }
    }
    return isSpecialChar;
}